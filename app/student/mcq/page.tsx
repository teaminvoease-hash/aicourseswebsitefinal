import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentMcqPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.userId },
    include: { course: { select: { id: true, title: true } } }
  });

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>MCQ Test Center</h1>
        <p className="small">After submitting your MCQ test, your course is marked complete. Pass score is 60% for certificate issue.</p>
      </article>

      {enrollments.map((enrollment) => (
        <article key={enrollment.id} className="card">
          <h3>{enrollment.course.title}</h3>
          <Link className="btn" href={`/student/mcq/${enrollment.course.id}`}>Start / Reattempt MCQ</Link>
        </article>
      ))}
    </section>
  );
}
