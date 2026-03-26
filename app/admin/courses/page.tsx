import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminCoursesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const courses = await prisma.course.findMany({ include: { lessons: true, enrollments: true }, orderBy: { createdAt: "desc" } });

  return <SidebarLayout title="Admin Control" subtitle="Course operations" nav={[...adminNav]} activeHref="/admin/courses">
    <h1>Course Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><h3 style={{ marginTop: 0 }}>Create / Edit Course</h3><div className="grid grid-3"><input placeholder="Course title" /><input placeholder="Fee (INR)" /><select><option>Status</option><option>Published</option><option>Draft</option><option>Upcoming</option></select><input placeholder="Duration" /><input placeholder="Level" /><input placeholder="Course image URL" /></div><textarea rows={3} placeholder="Description" style={{ marginTop: 10 }} /><button className="btn" style={{ marginTop: 10 }}>Save Course (placeholder)</button></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Course</th><th>Fee</th><th>Duration</th><th>Status</th><th>Modules</th><th>Enrollments</th><th>Performance</th></tr></thead><tbody>{courses.map((course) => <tr key={course.id}><td>{course.title}<br /><span className="small">{course.shortDescription}</span></td><td>₹{course.discountedFeeInr}</td><td>{course.durationWeeks} weeks</td><td><span className={`badge ${course.isPublished ? "badge-success" : "badge-warning"}`}>{course.isPublished ? "Published" : "Draft"}</span></td><td>{course.lessons.length}</td><td>{course.enrollments.length}</td><td><span className="small">Performance summary placeholder</span></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
