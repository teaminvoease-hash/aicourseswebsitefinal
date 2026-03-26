import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminEnrollmentsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const enrollments = await prisma.enrollment.findMany({ include: { user: true, course: true }, orderBy: { enrolledAt: "desc" } });
  return <SidebarLayout title="Admin Control" subtitle="Enrollment operations" nav={[...adminNav]} activeHref="/admin/enrollments">
    <h1>Enrollments Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-3"><input placeholder="Search by student" /><select><option>Filter by course</option></select><select><option>Status</option><option>Active</option><option>Pending access unlock</option></select></div></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Course</th><th>Enrolled At</th><th>Status</th></tr></thead><tbody>{enrollments.map((enrollment) => <tr key={enrollment.id}><td>{enrollment.user.fullName}</td><td>{enrollment.course.title}</td><td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td><td><span className="badge badge-success">Active</span></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
