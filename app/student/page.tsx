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
    <SidebarLayout title="Student Portal" subtitle="Learning, classes, certificates, support" nav={[...studentNav]} activeHref="/student">
      <h1>Welcome back, {user.fullName.split(" ")[0]}</h1>
      <p className="small">Continue your legal-tech learning journey with live sessions, assignments, and completion milestones.</p>

      <div className="card" style={{ marginBottom: 12 }}>
        <h3 style={{ marginTop: 0 }}>Continue Learning</h3>
        <p className="small">Pick up where you left off and stay on track for certification.</p>
        <Link href="/student/course" className="btn">Resume My Courses</Link>
      </div>

      <div className="grid grid-4">
        <article className="card kpi"><span className="small">Enrolled courses</span><strong>{user.enrollments.length}</strong></article>
        <article className="card kpi"><span className="small">Progress summary</span><strong>{avgProgress}%</strong></article>
        <article className="card kpi"><span className="small">Certificate status</span><strong>{user.certificates[0]?.isIssued ? "Issued" : "Pending"}</strong></article>
        <article className="card kpi"><span className="small">Profile completion</span><strong>{user.cityState && user.lawCollege ? "92%" : "68%"}</strong></article>
      </div>

      <div className="grid grid-2" style={{ marginTop: 12 }}>
        <article className="card">
          <h3 style={{ marginTop: 0 }}>Upcoming live class</h3>
          {nextLiveClass ? <>
            <p><strong>{nextLiveClass.title}</strong> · {nextLiveClass.course.title}</p>
            <p className="small">{new Date(nextLiveClass.classDate).toLocaleString()}</p>
            <a className="btn btn-soft" href={nextLiveClass.meetingLink}>Join Class</a>
          </> : <p className="small">No upcoming class yet. Check the live schedule page for updates.</p>}
        </article>

        <article className="card">
          <h3 style={{ marginTop: 0 }}>Announcements</h3>
          <p className="small">• New assignment rubric for compliance drafting uploaded.</p>
          <p className="small">• Weekend Q&A session announced for enrolled students.</p>
          <p className="small">• Certificate issuance batch will run every Friday.</p>
        </article>
      </div>

      <div className="grid grid-4" style={{ marginTop: 12 }}>
        {studentNav.slice(1).map((item) => (
          <Link key={item.href} href={item.href} className="card"><h4 style={{ margin: 0 }}>{item.label}</h4><p className="small">Open module</p></Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Latest payment status</h3>
        {user.payments.length === 0 ? <p className="small">No payment records available yet.</p> : (
          <div className="table-wrap">
            <table className="table"><thead><tr><th>Course</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>
              {user.payments.map((payment) => <tr key={payment.id}><td>{payment.course.title}</td><td>₹{payment.amountInr}</td><td><span className={`badge ${payment.status === "SUCCESS" ? "badge-success" : payment.status === "PENDING" ? "badge-warning" : "badge-danger"}`}>{payment.status}</span></td><td>{new Date(payment.createdAt).toLocaleDateString()}</td></tr>)}
            </tbody></table>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
