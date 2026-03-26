import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = getSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { course: true } },
      payments: true,
      certificates: true,
      progressRecords: true
    }
  });

  return NextResponse.json({ data });
}
