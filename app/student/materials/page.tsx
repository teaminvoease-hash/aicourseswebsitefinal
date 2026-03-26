import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentMaterialsPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const enrollments = await prisma.enrollment.findMany({ where: { userId: session.userId }, include: { course: { include: { lessons: true } } } });
  return <SidebarLayout title="Student Portal" subtitle="Study resources" nav={[...studentNav]} activeHref="/student/materials">
    <h1>Study Materials</h1>
    {enrollments.length === 0 ? <div className="card"><p className="small">Materials unlock after enrollment.</p></div> : enrollments.map((en) => <div key={en.id} className="card" style={{ marginBottom: 12 }}><h3>{en.course.title}</h3>{en.course.lessons.map((lesson) => <div key={lesson.id} style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e6ebf5", paddingTop: 8, marginTop: 8 }}><div><strong>{lesson.orderNo}. {lesson.title}</strong><p className="small">Module handout and AI law notes</p></div><div><span className="badge badge-success">Unlocked</span> <a href="#" className="btn btn-soft" style={{ marginLeft: 8 }}>Download PDF</a></div></div>)}</div>)}
  </SidebarLayout>;
}
