import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modules = [
  ["Dashboard overview", "/admin"],
  ["Manage students", "/admin/students"],
  ["Manage courses", "/admin/courses"],
  ["Manage enrollments", "/admin/students"],
  ["Payment tracking", "/admin/payments"],
  ["Upload class schedules", "/admin/schedules"],
  ["Upload learning materials", "/admin/content"],
  ["Create quizzes/assignments", "/admin/mcq"],
  ["Manage certificates", "/admin/certificates"],
  ["Support/contact requests", "/admin/content"],
  ["Website content management", "/admin/content"],
  ["Policy pages management", "/admin/content"],
  ["Notifications", "/admin/content"],
  ["Reporting and analytics", "/admin/payments"],
] as const;

export default async function AdminDashboardPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/admin-login");

  const [students, courses, enrollments, payments] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.payment.aggregate({ _sum: { amountInr: true } }),
  ]);

  return (
    <section className="grid" style={{ gap: 16 }}>
      <article className="card"><h1>Admin Panel</h1><p className="small">Role-separated controls for students, courses, enrollments, payments, certificates, and content.</p></article>
      <section className="grid grid-3">
        <article className="card"><p className="small">Registered Students</p><p className="kpi">{students}</p></article>
        <article className="card"><p className="small">Courses</p><p className="kpi">{courses}</p></article>
        <article className="card"><p className="small">Total Revenue</p><p className="kpi">₹{payments._sum.amountInr ?? 0}</p></article>
      </section>
      <article className="card"><p><strong>Total Enrollments:</strong> {enrollments}</p><p className="small">Use filters and exports from module pages for operations and reporting.</p></article>
      <section className="grid grid-3">
        {modules.map(([name, href]) => <Link key={name} href={href} className="card">{name}</Link>)}
      </section>
    </section>
  );
}
