export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentPaymentsPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");
  const payments = await prisma.payment.findMany({ where: { userId: session.userId }, orderBy: { createdAt: "desc" } });

  return (
    <section className="card">
      <h1>Payment History</h1>
      <p className="small">One-time course payment model. No hidden charges after successful enrollment unlock.</p>
      <table className="table">
        <thead><tr><th>Date</th><th>Order ID</th><th>Amount</th><th>Status</th><th>Coupon</th></tr></thead>
        <tbody>
          {payments.length === 0 ? <tr><td colSpan={5}>No payment records available yet.</td></tr> : payments.map((p) => (
            <tr key={p.id}><td>{new Date(p.createdAt).toLocaleDateString()}</td><td>{p.providerOrderId}</td><td>₹{p.amountInr}</td><td>{p.status}</td><td>-</td></tr>
          ))}
        </tbody>
      </table>
      <p className="form-note">Payment success/failure states are recorded in your dashboard for traceability.</p>
    </section>
  );
}
