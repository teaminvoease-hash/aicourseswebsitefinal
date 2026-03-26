import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminCertificatesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const certificates = await prisma.certificate.findMany({ include: { user: true, course: true }, orderBy: { issuedAt: "desc" } });

  return <SidebarLayout title="Admin Control" subtitle="Certificates issue desk" nav={[...adminNav]} activeHref="/admin/certificates">
    <h1>Certificates Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-4"><input placeholder="Search by student or course" /><select><option>All</option><option>Issued</option><option>Pending</option></select><button className="btn btn-soft">Upload certificate</button><button className="btn btn-soft">Bulk actions (coming soon)</button></div><p className="small">Generate verification IDs, preview certificate templates, and mark as issued from this workspace.</p></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Course</th><th>Verification ID</th><th>Issue Date</th><th>Status</th><th>Action</th></tr></thead><tbody>{certificates.map((item) => <tr key={item.id}><td>{item.user.fullName}</td><td>{item.course.title}</td><td>{item.verificationId}</td><td>{new Date(item.issuedAt).toLocaleDateString()}</td><td><span className={`badge ${item.isIssued ? "badge-success" : "badge-warning"}`}>{item.isIssued ? "Issued" : "Pending"}</span></td><td><button className="btn btn-soft">Preview</button></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
