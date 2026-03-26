import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modules = [
  ["My Courses", "/student/course"],
  ["Course Progress", "/student/progress"],
  ["Live Class Schedule", "/student/course"],
  ["Study Materials", "/student/course"],
  ["Assignments / Quiz", "/student/mcq"],
  ["Certificate Download", "/student/certificate"],
  ["Profile Management", "/student/profile"],
  ["Payment History", "/student"],
  ["Help & Support", "/contact"],
] as const;

export default async function StudentDashboard() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { course: true } },
      payments: { orderBy: { createdAt: "desc" } },
      certificates: true,
      progressRecords: true,
    },
  });

  if (!user) redirect("/student-login");

  const upcoming = user.enrollments.flatMap((e) => []);

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>Welcome, {user.fullName}</h1>
        <p className="small">Track enrolled courses, progress, payments, assessments, materials, and certificates from one dashboard.</p>
      </article>

      <section className="grid grid-3">
        <article className="card"><p className="small">Enrolled Courses</p><p className="kpi">{user.enrollments.length}</p></article>
        <article className="card"><p className="small">Average Progress</p><p className="kpi">{user.progressRecords[0]?.percentage ?? 0}%</p></article>
        <article className="card"><p className="small">Certificate Status</p><p className="kpi">{user.certificates.some((c) => c.isIssued) ? "Issued" : "Pending"}</p></article>
      </section>

      <section className="grid grid-3">
        {modules.map(([name, href]) => (
          <Link key={name} href={href} className="card"><strong>{name}</strong></Link>
        ))}
      </section>

      <article className="card">
        <h3>Upcoming Live Classes</h3>
        <p className="small">Class schedules appear here once published by admin.</p>
        <p>{upcoming.length === 0 ? "No classes scheduled yet." : "Schedules available."}</p>
      </article>

      <article className="card">
        <h3>Payment Status</h3>
        <table className="table">
          <thead><tr><th>Order</th><th>Amount</th><th>Status</th><th>Provider</th></tr></thead>
          <tbody>
            {user.payments.map((p) => (
              <tr key={p.id}><td>{p.providerOrderId}</td><td>₹{p.amountInr}</td><td>{p.status}</td><td>{p.provider}</td></tr>
            ))}
          </tbody>
        </table>
      </article>

      <p className="small">Certificate disclaimer: completion certificate only; not a statutory qualification or legal practice license.</p>
    </section>
  );
}
