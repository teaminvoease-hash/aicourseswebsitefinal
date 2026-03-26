import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ valid: false, message: "Verification ID required" }, { status: 400 });

  const certificate = await prisma.certificate.findUnique({
    where: { verificationId: id },
    include: { user: true, course: true }
  });

  if (!certificate || !certificate.isIssued) {
    return NextResponse.json({ valid: false, message: "Certificate not found or not yet issued" });
  }

  return NextResponse.json({
    valid: true,
    studentName: certificate.user.fullName,
    courseTitle: certificate.course.title,
    issuedAt: certificate.issuedAt.toISOString().split("T")[0]
  });
}
