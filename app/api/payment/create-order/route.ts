import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
      providerOrderId: `ORD-${Date.now()}`,
      couponCode: couponCode || null
    }
  });

  return NextResponse.json({ orderId: order.providerOrderId, paymentId: order.id, amountInr: amount });
}
