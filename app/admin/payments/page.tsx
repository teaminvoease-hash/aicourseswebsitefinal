import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, course: true } });

  return <SidebarLayout title="Admin Control" subtitle="Payments and reconciliation" nav={[...adminNav]} activeHref="/admin/payments">
    <h1>Payments Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-4"><input placeholder="Search student / order id / course" /><select><option>All statuses</option><option>SUCCESS</option><option>PENDING</option><option>FAILED</option></select><button className="btn btn-soft">Manual verification</button><button className="btn btn-soft">Export</button></div><p className="small">Course-wise revenue summary placeholder and detailed payment review workflows are ready for backend integrations.</p></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Course</th><th>Amount</th><th>Status</th><th>Payment Date</th><th>Order ID</th></tr></thead><tbody>{payments.map((payment) => <tr key={payment.id}><td>{payment.user.fullName}</td><td>{payment.course.title}</td><td>₹{payment.amountInr}</td><td><span className={`badge ${payment.status === "SUCCESS" ? "badge-success" : payment.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{payment.status}</span></td><td>{new Date(payment.createdAt).toLocaleDateString()}</td><td>{payment.providerOrderId}</td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
