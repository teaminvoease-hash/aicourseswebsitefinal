import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentDashboard() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { course: true } },
      payments: { orderBy: { createdAt: "desc" } },
      certificates: true,
      progressRecords: true
    }
  });

  if (!user) redirect("/login");

  return (
    <section>
      <h1>Student Dashboard</h1>
      <div className="grid grid-3">
        <Link className="card" href="/student/profile"><h3>Profile</h3><p>{user.fullName}</p></Link>
        <Link className="card" href="/student/course"><h3>Purchased Course Access</h3><p>{user.enrollments.length} course(s)</p></Link>
        <Link className="card" href="/student/progress"><h3>Progress Tracker</h3><p>{user.progressRecords[0]?.percentage ?? 0}%</p></Link>
        <Link className="card" href="/student/certificate"><h3>Certificate</h3><p>{user.certificates[0]?.isIssued ? "Available" : "Pending"}</p></Link>
      </div>
      <h3 style={{ marginTop: 16 }}>Payment Status</h3>
      <table className="table">
        <thead><tr><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>{user.payments.map((p) => <tr key={p.id}><td>{p.providerOrderId}</td><td>₹{p.amountInr}</td><td>{p.status}</td></tr>)}</tbody>
      </table>
    </section>
  );
}
