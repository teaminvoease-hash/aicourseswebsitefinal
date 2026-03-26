export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({ include: { user: true, course: true }, take: 50 });
  return (
    <section className="card">
      <h1>Enrollments</h1>
      <p className="small">Track active enrollments, payment-pending learners, and course-wise student allocation.</p>
      <table className="table">
        <thead><tr><th>Student</th><th>Course</th><th>Payment State</th><th>Enrolled On</th></tr></thead>
        <tbody>{enrollments.map((e) => <tr key={e.id}><td>{e.user.fullName}</td><td>{e.course.title}</td><td>Pending/Active</td><td>{"-"}</td></tr>)}</tbody>
      </table>
    </section>
  );
}
