import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";

export default async function StudentDashboard() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      enrollments: { include: { course: true } },
      payments: { orderBy: { createdAt: "desc" }, take: 5, include: { course: true } },
      certificates: true,
      progressRecords: true
    }
  });
  if (!user) redirect("/login?role=student");

  const avgProgress = user.progressRecords.length
    ? Math.round(user.progressRecords.reduce((sum, p) => sum + p.percentage, 0) / user.progressRecords.length)
    : 0;

  const nextLiveClass = await prisma.liveClass.findFirst({
    where: { course: { enrollments: { some: { userId: user.id } } }, classDate: { gte: new Date() } },
    include: { course: true },
    orderBy: { classDate: "asc" }
  });

  return (
    <SidebarLayout title="Student Workspace" subtitle="Courses, live sessions, performance, and certification" nav={[...studentNav]} activeHref="/student">
      <section className="hero" style={{ marginTop: 0, padding: "1rem" }}>
        <span className="badge badge-success">Welcome back</span>
        <h1 style={{ fontSize: "clamp(1.6rem,2.8vw,2.35rem)" }}>{user.fullName.split(" ")[0]}, continue your AI law sprint.</h1>
        <p>Track milestones, complete assignments, and stay on schedule to unlock certificate eligibility.</p>
        <div className="cta-row">
          <Link href="/student/course" className="btn">Resume Learning</Link>
          <Link href="/student/live-schedule" className="btn btn-outline">Live Schedule</Link>
        </div>
      </section>

      <div className="section grid grid-4">
        <article className="card kpi"><span className="small">Enrolled courses</span><strong>{user.enrollments.length}</strong></article>
        <article className="card kpi"><span className="small">Average progress</span><strong>{avgProgress}%</strong></article>
        <article className="card kpi"><span className="small">Certificate status</span><strong>{user.certificates[0]?.isIssued ? "Issued" : "In review"}</strong></article>
        <article className="card kpi"><span className="small">Profile readiness</span><strong>{user.cityState && user.lawCollege ? "92%" : "68%"}</strong></article>
      </div>

      <div className="section grid grid-2">
        <article className="card">
          <h3>Upcoming live class</h3>
          {nextLiveClass ? (
            <>
              <p><strong>{nextLiveClass.title}</strong> • {nextLiveClass.course.title}</p>
              <p className="small">{new Date(nextLiveClass.classDate).toLocaleString()}</p>
              <a className="btn btn-soft" href={nextLiveClass.meetingLink}>Join live class</a>
            </>
          ) : <p className="small">No upcoming class currently scheduled.</p>}
        </article>

        <article className="card">
          <h3>Assessment and certification track</h3>
          <p>Keep assignments and quiz attempts above threshold to remain certificate-eligible.</p>
          <div className="progress"><span style={{ width: `${avgProgress}%` }} /></div>
          <p className="small" style={{ marginTop: 8 }}>Current completion trend: {avgProgress >= 80 ? "Excellent" : "Needs consistency"}</p>
        </article>
      </div>

      <div className="section card">
        <h3>Recent payments</h3>
        {user.payments.length === 0 ? <p className="small">No payment records yet.</p> : (
          <div className="table-wrap">
            <table className="table"><thead><tr><th>Course</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>
              {user.payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.course.title}</td>
                  <td>₹{payment.amountInr}</td>
                  <td><span className={`badge ${payment.status === "SUCCESS" ? "badge-success" : payment.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{payment.status}</span></td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody></table>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
