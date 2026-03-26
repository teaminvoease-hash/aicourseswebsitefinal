import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modules = [
  ["Students", "/admin/students"],
  ["Courses", "/admin/courses"],
  ["Enrollments", "/admin/enrollments"],
  ["Payments", "/admin/payments"],
  ["Certificates", "/admin/certificates"],
  ["Schedules", "/admin/schedules"],
  ["Learning Materials", "/admin/content"],
  ["Quizzes / Assignments", "/admin/mcq"],
  ["Lead / Inquiry Management", "/admin/leads"],
  ["Coupons / Offers", "/admin/coupons"],
  ["Settings", "/admin/settings"],
] as const;

export default async function AdminDashboardPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/admin-login");

  const [students, courses, enrollments, pendingPayments, payments, pendingCertificates] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.payment.count({ where: { status: { not: "SUCCESS" } } }),
    prisma.payment.aggregate({ _sum: { amountInr: true } }),
    prisma.certificate.count({ where: { isIssued: false } }),
  ]);

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card">
        <h1>Admin Admissions & Operations Dashboard</h1>
        <p className="small">Track registrations, admissions conversion, payment clearance, certificate issuance, content operations, and learner communications.</p>
      </article>

      <section className="grid grid-3">
        <article className="card"><p className="small">Total Students</p><p className="kpi">{students}</p></article>
        <article className="card"><p className="small">Active Enrollments</p><p className="kpi">{enrollments}</p></article>
        <article className="card"><p className="small">Pending Payments</p><p className="kpi">{pendingPayments}</p></article>
        <article className="card"><p className="small">Course Catalog Size</p><p className="kpi">{courses}</p></article>
        <article className="card"><p className="small">Revenue Summary</p><p className="kpi">₹{payments._sum.amountInr ?? 0}</p></article>
        <article className="card"><p className="small">Pending Certificates</p><p className="kpi">{pendingCertificates}</p></article>
      </section>

      <section className="grid grid-3">
        {modules.map(([name, href]) => <Link key={name} href={href} className="card"><strong>{name}</strong></Link>)}
      </section>

      <article className="card">
        <h3>Announcements</h3>
        <p className="small">• New batch orientation email scheduled for Friday.</p>
        <p className="small">• Pending payment reminders to be sent to admissions pipeline.</p>
      </article>
    </section>
  );
}
