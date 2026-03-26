import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function generateVerificationId() {
  return `AILAW-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
}

export async function POST(request: Request) {
  const session = getSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { paymentId, txnId, status, hash, payuResponse } = await request.json();

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  const expectedHash = payment.providerHash;
  const receivedStatus = status || "success";
  const responseHash = hash ? String(hash).toLowerCase() : null;
  const hashMatched = !expectedHash || !responseHash || expectedHash.toLowerCase() === responseHash;

  if (receivedStatus !== "success" || !hashMatched) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "FAILED",
        gatewayResponse: payuResponse ? JSON.stringify(payuResponse) : null
      }
    });
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const txnReference = txnId || `PAYU-TXN-${Date.now()}`;
  const canonicalHash = crypto.createHash("sha256").update(txnReference).digest("hex").slice(0, 16);

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: "SUCCESS",
      providerTxnId: `${txnReference}-${canonicalHash}`,
      gatewayResponse: payuResponse ? JSON.stringify(payuResponse) : null,
      paidAt: new Date()
    }
  });

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: session.userId, courseId: payment.courseId } },
    update: {},
    create: { userId: session.userId, courseId: payment.courseId }
  });

  await prisma.progress.upsert({
    where: { userId_courseId: { userId: session.userId, courseId: payment.courseId } },
    update: {},
    create: { userId: session.userId, courseId: payment.courseId, percentage: 0 }
  });

  await prisma.certificate.upsert({
    where: { userId_courseId: { userId: session.userId, courseId: payment.courseId } },
    update: {},
    create: {
      userId: session.userId,
      courseId: payment.courseId,
      verificationId: generateVerificationId(),
      isIssued: false
    }
  });

  return NextResponse.json({ ok: true });
}
