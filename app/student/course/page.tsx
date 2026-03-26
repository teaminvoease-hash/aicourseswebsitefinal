import Link from "next/link";
import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentCoursePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.userId },
    include: {
      course: { include: { lessons: true, liveClasses: true } },
      user: { include: { progressRecords: true } }
    }
  });

  return (
    <SidebarLayout title="Student Portal" subtitle="My courses and learning assets" nav={[...studentNav]} activeHref="/student/course">
      <h1>My Courses</h1>
      <p className="small">Structured learning cards with modules, sessions, recordings, and assignment flow.</p>
      {enrollments.length === 0 ? <div className="card"><h3>No enrolled courses yet</h3><p className="small">Complete payment to unlock course access, class links, and study resources.</p></div> : (
        <div className="grid grid-2">
          {enrollments.map((enrollment) => {
            const progress = enrollment.user.progressRecords.find((item) => item.courseId === enrollment.courseId)?.percentage ?? 0;
            const nextClass = enrollment.course.liveClasses.sort((a, b) => +new Date(a.classDate) - +new Date(b.classDate))[0];
            return (
              <article key={enrollment.id} className="card">
                <span className={`badge ${progress >= 100 ? "badge-success" : "badge-info"}`}>{progress >= 100 ? "Completed" : "In Progress"}</span>
                <h3>{enrollment.course.title}</h3>
                <p className="small">{enrollment.course.shortDescription}</p>
                <div className="progress"><span style={{ width: `${progress}%` }} /></div>
                <p className="small">{progress}% complete</p>
                <p className="small"><strong>Next class:</strong> {nextClass ? new Date(nextClass.classDate).toLocaleString() : "Schedule pending"}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span className="badge badge-info">Modules: {enrollment.course.lessons.length}</span>
                  <span className="badge badge-info">Live sessions: {enrollment.course.liveClasses.length}</span>
                  <span className="badge badge-info">Recordings: Available after class</span>
                  <span className="badge badge-info">Resources: Downloadable</span>
                </div>
                <Link href="/student/progress" className="btn">Continue Learning</Link>
              </article>
            );
          })}
        </div>
      )}
    </SidebarLayout>
  );
}
