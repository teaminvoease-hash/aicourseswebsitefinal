import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const certificates = await prisma.certificate.findMany();
  return NextResponse.json({ certificates });
}

export async function POST(request: Request) {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { certificateId, fileUrl } = await request.json();
  const updated = await prisma.certificate.update({ where: { id: certificateId }, data: { isIssued: true, fileUrl } });
  return NextResponse.json({ updated });
}
