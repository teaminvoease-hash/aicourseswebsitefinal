import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const [students, enrollments, pendingPayments, revenue, pendingCertificates, upcomingClasses, inquiries] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.enrollment.count(),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.payment.aggregate({ _sum: { amountInr: true }, where: { status: "SUCCESS" } }),
    prisma.certificate.count({ where: { isIssued: false } }),
    prisma.liveClass.count({ where: { classDate: { gte: new Date() } } }),
    prisma.siteContent.count()
  ]);

  const [recentStudents, latestPayments, pendingCertRows, upcomingSchedule] = await Promise.all([
    prisma.user.findMany({ where: { role: "STUDENT" }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, course: true }, take: 5 }),
    prisma.certificate.findMany({ where: { isIssued: false }, include: { user: true, course: true }, take: 5 }),
    prisma.liveClass.findMany({ where: { classDate: { gte: new Date() } }, include: { course: true }, orderBy: { classDate: "asc" }, take: 5 })
  ]);

  return (
    <SidebarLayout title="Admin Control" subtitle="Admissions, learning ops, and finance" nav={[...adminNav]} activeHref="/admin">
      <h1>Operations Dashboard</h1>
      <p className="small">Real-time visibility across student admissions, payments, classes, support, and certifications.</p>
      <div className="grid grid-4">
        <article className="card kpi"><span className="small">Total students</span><strong>{students}</strong></article>
        <article className="card kpi"><span className="small">Active enrollments</span><strong>{enrollments}</strong></article>
        <article className="card kpi"><span className="small">Pending payments</span><strong>{pendingPayments}</strong></article>
        <article className="card kpi"><span className="small">Revenue summary</span><strong>₹{revenue._sum.amountInr ?? 0}</strong></article>
        <article className="card kpi"><span className="small">Certificates pending</span><strong>{pendingCertificates}</strong></article>
        <article className="card kpi"><span className="small">Upcoming live classes</span><strong>{upcomingClasses}</strong></article>
        <article className="card kpi"><span className="small">Inquiries/leads</span><strong>{inquiries}</strong></article>
      </div>

      <div className="grid grid-2" style={{ marginTop: 12 }}>
        <article className="card"><h3>Recent student registrations</h3>{recentStudents.map((student) => <p key={student.id}><strong>{student.fullName}</strong> <span className="small">· {student.email}</span></p>)}</article>
        <article className="card"><h3>Latest payments</h3>{latestPayments.map((payment) => <p key={payment.id}><strong>{payment.user.fullName}</strong> paid ₹{payment.amountInr} for {payment.course.title} <span className={`badge ${payment.status === "SUCCESS" ? "badge-success" : payment.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{payment.status}</span></p>)}</article>
        <article className="card"><h3>Pending certificate actions</h3>{pendingCertRows.length === 0 ? <p className="small">No pending certificate actions.</p> : pendingCertRows.map((row) => <p key={row.id}>{row.user.fullName} · {row.course.title} · Verification ID: {row.verificationId}</p>)}</article>
        <article className="card"><h3>Upcoming class schedule</h3>{upcomingSchedule.length === 0 ? <p className="small">No scheduled classes.</p> : upcomingSchedule.map((item) => <p key={item.id}>{item.title} · {item.course.title} · {new Date(item.classDate).toLocaleString()}</p>)}<p className="small">Recent support requests widget: coming from Help module integration.</p></article>
      </div>
    </SidebarLayout>
  );
}
