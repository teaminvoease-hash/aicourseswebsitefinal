import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const questions = await prisma.mcqQuestion.findMany({
    include: { options: { orderBy: { orderNo: "asc" } }, course: { select: { title: true } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ questions });
}

export async function POST(request: Request) {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { courseId, question, explanation, options, correctOption } = await request.json();
  if (!courseId || !question || !Array.isArray(options) || options.length < 2) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const created = await prisma.mcqQuestion.create({
    data: {
      courseId,
      question,
      explanation: explanation || null,
      options: {
        create: options.slice(0, 4).map((optionText: string, index: number) => ({
          optionText,
          orderNo: index + 1,
          isCorrect: index === Number(correctOption)
        }))
      }
    },
    include: { options: true }
  });

  return NextResponse.json({ question: created });
}
