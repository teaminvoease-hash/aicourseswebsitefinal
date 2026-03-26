import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const students = await prisma.user.findMany({ where: { role: "STUDENT" }, include: { enrollments: true, payments: true, certificates: true }, orderBy: { createdAt: "desc" } });

  return <SidebarLayout title="Admin Control" subtitle="Students management" nav={[...adminNav]} activeHref="/admin/students">
    <h1>Students Management</h1>
    <div className="card" style={{ marginBottom: 12 }}>
      <div className="grid grid-4"><input placeholder="Search student by name/email" /><select><option>Profession</option><option>Student</option><option>Advocate</option></select><input placeholder="City/State" /><select><option>Payment status</option><option>SUCCESS</option><option>PENDING</option><option>FAILED</option></select></div>
      <p className="small">Enrollment status filter, export, activate/deactivate, and internal notes controls are available as operations placeholders.</p>
    </div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Profession</th><th>Location</th><th>Enrollments</th><th>Payment Status</th><th>Certificate</th><th>Actions</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><strong>{student.fullName}</strong><br /><span className="small">{student.email}</span></td><td>{student.profession ?? "-"}</td><td>{student.cityState ?? "-"}</td><td>{student.enrollments.length}</td><td><span className="badge badge-info">{student.payments[0]?.status ?? "No payment"}</span></td><td><span className={`badge ${student.certificates[0]?.isIssued ? "badge-success" : "badge-warning"}`}>{student.certificates[0]?.isIssued ? "Issued" : "Pending"}</span></td><td><button className="btn btn-soft">View detail</button></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
