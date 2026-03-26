import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentPaymentsPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const payments = await prisma.payment.findMany({ where: { userId: session.userId }, include: { course: true }, orderBy: { createdAt: "desc" } });

  return <SidebarLayout title="Student Portal" subtitle="Payment records" nav={[...studentNav]} activeHref="/student/payments">
    <h1>Payment History</h1>
    {payments.length === 0 ? <div className="card"><p className="small">No payment records yet.</p></div> : <div className="table-wrap"><table className="table"><thead><tr><th>Course</th><th>Amount</th><th>Status</th><th>Payment Date</th><th>Order Ref</th></tr></thead><tbody>{payments.map((p) => <tr key={p.id}><td>{p.course.title}</td><td>₹{p.amountInr}</td><td><span className={`badge ${p.status === "SUCCESS" ? "badge-success" : p.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{p.status}</span></td><td>{new Date(p.createdAt).toLocaleDateString()}</td><td>{p.providerOrderId}</td></tr>)}</tbody></table></div>}
  </SidebarLayout>;
}
