import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentProgressPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const progress = await prisma.progress.findMany({
    where: { userId: session.userId },
        orderBy: { updatedAt: "desc" }
  });
  const courses = await prisma.course.findMany();

  return (
    <SidebarLayout title="Student Portal" subtitle="Module progress and eligibility" nav={[...studentNav]} activeHref="/student/progress">
      <h1>Course Progress</h1>
      <div className="grid">
        {progress.length === 0 ? <div className="card"><p className="small">Progress records will appear after your first module activity.</p></div> : progress.map((item) => {
          const course = courses.find((c) => c.id === item.courseId);
          return (
            <article key={item.id} className="card">
              <h3>{course?.title || "Course"}</h3>
              <div className="progress"><span style={{ width: `${item.percentage}%` }} /></div>
              <p className="small">Modules completed: {Math.round((item.percentage / 100) * 12)}/12 · Assignment/Quiz completion: {Math.min(100, item.percentage - 8)}%</p>
              <p className="small">Last activity: {new Date(item.updatedAt).toLocaleDateString()}</p>
              <p className="small">Certificate eligibility: {item.percentage >= 90 ? <span className="badge badge-success">Eligible (pending admin check)</span> : <span className="badge badge-warning">Pending module completion</span>}</p>
            </article>
          );
        })}
      </div>
    </SidebarLayout>
  );
}
