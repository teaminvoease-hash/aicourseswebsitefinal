import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, course: true }
  });

  return (
    <section>
      <h1>Manage Payments</h1>
      <table className="table card" style={{ marginTop: 12 }}>
        <thead><tr><th>Student</th><th>Course</th><th>Amount</th><th>Status</th><th>Order ID</th></tr></thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.user.fullName}</td>
              <td>{payment.course.title}</td>
              <td>₹{payment.amountInr}</td>
              <td>{payment.status}</td>
              <td>{payment.providerOrderId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
