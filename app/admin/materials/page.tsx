import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminMaterialsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const courses = await prisma.course.findMany({ include: { lessons: true } });

  return <SidebarLayout title="Admin Control" subtitle="Learning materials" nav={[...adminNav]} activeHref="/admin/materials">
    <h1>Learning Materials Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-3"><select><option>Select course</option>{courses.map((course) => <option key={course.id}>{course.title}</option>)}</select><input placeholder="Material name" /><button className="btn">Upload (placeholder)</button></div></div>
    {courses.map((course) => <article key={course.id} className="card" style={{ marginBottom: 12 }}><h3>{course.title}</h3>{course.lessons.map((lesson) => <p key={lesson.id}>{lesson.orderNo}. {lesson.title} <span className="badge badge-info">Visible</span> <button className="btn btn-soft" style={{ marginLeft: 8 }}>Edit</button></p>)}</article>)}
  </SidebarLayout>;
}
