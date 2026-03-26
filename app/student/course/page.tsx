import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Lesson = {
  id: string | number;
  orderNo: number;
  title: string;
};

type LiveClass = {
  id: string | number;
  classDate: string | Date;
  title: string;
};

type EnrollmentWithCourse = {
  id: string | number;
  courseId: string;
  course: {
    title: string;
    lessons: Lesson[];
    liveClasses: LiveClass[];
  };
};

export default async function StudentCoursePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");

  const enrollments: EnrollmentWithCourse[] = await prisma.enrollment.findMany({
    where: { userId: session.userId },
    include: { course: { include: { lessons: true, liveClasses: true } } }
  });
  const attempts = await prisma.mcqAttempt.findMany({
    where: { userId: session.userId },
    orderBy: { submittedAt: "desc" }
  });

  if (enrollments.length === 0) {
    return (
      <section>
        <h1>Purchased Course Access</h1>
        <p>No course unlocked yet. Complete payment to unlock all lessons.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Purchased Course Access</h1>
      {enrollments.map((enroll: EnrollmentWithCourse) => (
        <article key={enroll.id} className="card" style={{ marginBottom: 12 }}>
          <h3>{enroll.course.title}</h3>
          <h4>Lessons/Modules</h4>
          <ul>{enroll.course.lessons.map((l: Lesson) => <li key={l.id}>{l.orderNo}. {l.title}</li>)}</ul>
          <h4>Weekly Live Class Schedule</h4>
          <ul>{enroll.course.liveClasses.map((c: LiveClass) => <li key={c.id}>{new Date(c.classDate).toDateString()} - {c.title}</li>)}</ul>
          <p className="small">
            MCQ completion status: {attempts.find((a) => a.courseId === enroll.courseId) ? "Test submitted ✅" : "Pending submission"}
          </p>
        </article>
      ))}
    </section>
  );
}
