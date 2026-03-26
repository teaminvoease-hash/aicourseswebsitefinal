import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, course: true } });
  return (
    <section className="card">
      <h1>Payment Tracking</h1>
      <p className="small">One-time payment tracking, manual verification support, and status updates.</p>
      <table className="table">
        <thead><tr><th>Student</th><th>Course</th><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{payments.map((p) => <tr key={p.id}><td>{p.user.fullName}</td><td>{p.course.title}</td><td>{p.providerOrderId}</td><td>₹{p.amountInr}</td><td>{p.status}</td></tr>)}</tbody>
      </table>
    </section>
  );
}
