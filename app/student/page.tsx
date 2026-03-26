import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modules = [
  ["My Courses", "/student/course"],
  ["Course Progress", "/student/progress"],
  ["Live Schedule", "/student/schedule"],
  ["Study Materials", "/student/materials"],
  ["Assignments / Quiz", "/student/mcq"],
  ["Certificate", "/student/certificate"],
  ["Payment History", "/student/payments"],
  ["Profile", "/student/profile"],
  ["Help & Support", "/student/support"],
] as const;

export default async function StudentDashboard() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { course: true } },
      payments: { orderBy: { createdAt: "desc" }, take: 5 },
      certificates: true,
      progressRecords: true,
    },
  });

  if (!user) redirect("/student-login");

  const avg = user.progressRecords.length ? Math.round(user.progressRecords.reduce((acc, p) => acc + p.percentage, 0) / user.progressRecords.length) : 0;

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>Welcome, {user.fullName}</h1>
        <p className="small">Continue your legal-tech learning with class updates, assignments, payment records, and certificate eligibility in one place.</p>
        <div className="inline-list">
          <Link href="/student/course" className="btn">Continue Learning</Link>
          <Link href="/student/support" className="btn btn-outline">Need Support</Link>
        </div>
      </article>

      <section className="grid grid-4">
        <article className="card"><p className="small">Enrolled Courses</p><p className="kpi">{user.enrollments.length}</p></article>
        <article className="card"><p className="small">Average Progress</p><p className="kpi">{avg}%</p></article>
        <article className="card"><p className="small">Certificate Eligibility</p><p className="kpi">{user.certificates.some((c) => c.isIssued) ? "Eligible" : "In Progress"}</p></article>
        <article className="card"><p className="small">Profile Completion</p><p className="kpi">85%</p></article>
      </section>

      <section className="grid grid-3">
        {modules.map(([name, href]) => <Link key={name} href={href} className="card"><strong>{name}</strong></Link>)}
      </section>

      <section className="grid grid-2">
        <article className="card">
          <h3>Upcoming classes</h3>
          <p className="small">Friday • 6:30 PM: Prompt Quality for Legal Drafting</p>
          <p className="small">Sunday • 11:00 AM: Research Validation Clinic</p>
          <Link href="/student/schedule" className="btn btn-outline">View Full Schedule</Link>
        </article>
        <article className="card">
          <h3>Announcements</h3>
          <p className="small">Assignment 2 submission window closes this Sunday.</p>
          <p className="small">Certificate review starts after MCQ pass + assignment completion.</p>
          <p className="small">Join learner community group from Support page.</p>
        </article>
      </section>

      <article className="card">
        <h3>Recent Payment Status</h3>
        <table className="table">
          <thead><tr><th>Order</th><th>Amount</th><th>Status</th><th>Provider</th></tr></thead>
          <tbody>
            {user.payments.length === 0 ? <tr><td colSpan={4}>No payment entries yet.</td></tr> : user.payments.map((p) => (
              <tr key={p.id}><td>{p.providerOrderId}</td><td>₹{p.amountInr}</td><td>{p.status}</td><td>{p.provider}</td></tr>
            ))}
          </tbody>
        </table>
      </article>

      <p className="small">Certificate disclaimer: completion certificate only; not a statutory qualification or legal practice license.</p>
    </section>
  );
}
