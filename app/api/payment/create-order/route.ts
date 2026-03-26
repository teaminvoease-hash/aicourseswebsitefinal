import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const PAYU_KEY = process.env.PAYU_KEY || "gtKFFx";
const PAYU_SALT = process.env.PAYU_SALT || "eCwWELxi";
const PAYU_BASE_URL = process.env.PAYU_BASE_URL || "https://test.payu.in/_payment";

export async function POST(request: Request) {
  const session = getSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseSlug, couponCode } = await request.json();
  const course = await prisma.course.findUnique({ where: { slug: courseSlug } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  let amount = course.discountedFeeInr;

  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
    if (coupon?.isActive) amount = Math.max(0, amount - coupon.discountInr);
  }

  const order = await prisma.payment.create({
    data: {
      userId: session.userId,
      courseId: course.id,
      amountInr: amount,
      status: "PENDING",
      providerOrderId: `PAYU-${Date.now()}`,
      provider: "PayU",
      couponCode: couponCode || null
    }
  });

  const txId = order.providerOrderId;
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/payu-callback`;
  const hashSource = `${PAYU_KEY}|${txId}|${amount}|${course.title}|${session.userId}|${session.email}|||||||||||${PAYU_SALT}`;
  const hash = crypto.createHash("sha512").update(hashSource).digest("hex");

  await prisma.payment.update({
    where: { id: order.id },
    data: { providerHash: hash }
  });

  return NextResponse.json({
    paymentId: order.id,
    amountInr: amount,
    payu: {
      action: PAYU_BASE_URL,
      fields: {
        key: PAYU_KEY,
        txnid: txId,
        amount: String(amount),
        productinfo: course.title,
        firstname: "Student",
        email: session.email,
        phone: "",
        surl: callbackUrl,
        furl: callbackUrl,
        hash
      }
    }
  });
}
