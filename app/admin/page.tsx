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
    prisma.user.findMany({ where: { role: "STUDENT" }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, course: true }, take: 6 }),
    prisma.certificate.findMany({ where: { isIssued: false }, include: { user: true, course: true }, take: 6 }),
    prisma.liveClass.findMany({ where: { classDate: { gte: new Date() } }, include: { course: true }, orderBy: { classDate: "asc" }, take: 6 })
  ]);

  return (
    <SidebarLayout title="Admin Command Center" subtitle="Admissions, academic delivery, and financial operations" nav={[...adminNav]} activeHref="/admin">
      <section className="hero" style={{ marginTop: 0, padding: "1rem" }}>
        <span className="badge">Operations Overview</span>
        <h1 style={{ fontSize: "clamp(1.6rem,2.8vw,2.35rem)" }}>AI Law Platform Control Center</h1>
        <p>Monitor enrollments, revenue, schedules, and certificate workflows from one trusted operating layer.</p>
      </section>

      <div className="section grid grid-4">
        <article className="card kpi"><span className="small">Total students</span><strong>{students}</strong></article>
        <article className="card kpi"><span className="small">Active enrollments</span><strong>{enrollments}</strong></article>
        <article className="card kpi"><span className="small">Pending payments</span><strong>{pendingPayments}</strong></article>
        <article className="card kpi"><span className="small">Revenue</span><strong>₹{revenue._sum.amountInr ?? 0}</strong></article>
        <article className="card kpi"><span className="small">Pending certificates</span><strong>{pendingCertificates}</strong></article>
        <article className="card kpi"><span className="small">Upcoming classes</span><strong>{upcomingClasses}</strong></article>
        <article className="card kpi"><span className="small">Content requests</span><strong>{inquiries}</strong></article>
      </div>

      <div className="section grid grid-2">
        <article className="card">
          <h3>Recent student signups</h3>
          {recentStudents.map((student) => <p key={student.id}><strong>{student.fullName}</strong> <span className="small">• {student.email}</span></p>)}
        </article>
        <article className="card">
          <h3>Latest payments</h3>
          {latestPayments.map((payment) => (
            <p key={payment.id}>
              <strong>{payment.user.fullName}</strong> paid ₹{payment.amountInr} for {payment.course.title} {" "}
              <span className={`badge ${payment.status === "SUCCESS" ? "badge-success" : payment.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{payment.status}</span>
            </p>
          ))}
        </article>
        <article className="card">
          <h3>Certificate queue</h3>
          {pendingCertRows.length === 0 ? <p className="small">No pending certificates.</p> : pendingCertRows.map((row) => (
            <p key={row.id}>{row.user.fullName} • {row.course.title} • {row.verificationId}</p>
          ))}
        </article>
        <article className="card">
          <h3>Upcoming classes</h3>
          {upcomingSchedule.length === 0 ? <p className="small">No classes scheduled.</p> : upcomingSchedule.map((item) => (
            <p key={item.id}>{item.title} • {item.course.title} • {new Date(item.classDate).toLocaleString()}</p>
          ))}
        </article>
      </div>
    </SidebarLayout>
  );
}
