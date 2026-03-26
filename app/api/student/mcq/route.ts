import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = getSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId") || "";

  const enrollment = await prisma.enrollment.findFirst({ where: { userId: session.userId, courseId } });
  if (!enrollment) return NextResponse.json({ error: "Course not unlocked" }, { status: 403 });

  const questions = await prisma.mcqQuestion.findMany({
    where: { courseId, isActive: true },
    include: { options: { orderBy: { orderNo: "asc" } } },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json({
    questions: questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options.map((o) => ({ id: o.id, text: o.optionText }))
    }))
  });
}

export async function POST(request: Request) {
  const session = getSessionFromCookie();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { courseId, answers } = await request.json();
  const enrollment = await prisma.enrollment.findFirst({ where: { userId: session.userId, courseId } });
  if (!enrollment) return NextResponse.json({ error: "Course not unlocked" }, { status: 403 });

  const questions = await prisma.mcqQuestion.findMany({
    where: { courseId, isActive: true },
    include: { options: true }
  });

  const total = questions.length;
  if (!total) return NextResponse.json({ error: "No MCQ configured yet" }, { status: 400 });

  let correct = 0;
  for (const q of questions) {
    const selectedOptionId = answers?.[q.id];
    const correctOption = q.options.find((o) => o.isCorrect);
    if (correctOption && correctOption.id === selectedOptionId) correct += 1;
  }

  const scorePercent = Math.round((correct / total) * 100);
  const isPassed = scorePercent >= 60;

  await prisma.mcqAttempt.create({
    data: {
      userId: session.userId,
      courseId,
      totalQuestions: total,
      correctAnswers: correct,
      scorePercent,
      isPassed
    }
  });

  await prisma.progress.upsert({
    where: { userId_courseId: { userId: session.userId, courseId } },
    update: { percentage: 100 },
    create: { userId: session.userId, courseId, percentage: 100 }
  });

  await prisma.certificate.updateMany({
    where: { userId: session.userId, courseId },
    data: { isIssued: isPassed }
  });

  return NextResponse.json({ scorePercent, isPassed, correct, total });
}
