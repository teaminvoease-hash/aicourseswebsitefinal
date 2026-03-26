import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const txnid = String(form.get("txnid") || "");
  const status = String(form.get("status") || "failed");
  const mihpayid = String(form.get("mihpayid") || "");
  const hash = String(form.get("hash") || "");

  if (!txnid) {
    return NextResponse.redirect(new URL("/student?payment=failed", request.url));
  }

  const payment = await prisma.payment.findFirst({ where: { providerOrderId: txnid } });
  if (!payment) {
    return NextResponse.redirect(new URL("/student?payment=failed", request.url));
  }

  if (status !== "success") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "FAILED",
        gatewayResponse: JSON.stringify(Object.fromEntries(form.entries()))
      }
    });
    return NextResponse.redirect(new URL("/student?payment=failed", request.url));
  }

  await fetch(new URL("/api/payment/verify", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: request.headers.get("cookie") || "" },
    body: JSON.stringify({
      paymentId: payment.id,
      txnId: mihpayid || txnid,
      status,
      hash,
      payuResponse: Object.fromEntries(form.entries())
    })
  });

  return NextResponse.redirect(new URL("/student?payment=success", request.url));
}
