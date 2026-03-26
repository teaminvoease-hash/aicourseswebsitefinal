import Link from "next/link";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modules: ReadonlyArray<readonly [string, Route]> = [
  ["Manage Students", "/admin/students"],
  ["Manage Courses", "/admin/courses"],
  ["Manage Payments", "/admin/payments"],
  ["Upload/Issue Certificates", "/admin/certificates"],
  ["Manage Class Schedules", "/admin/schedules"],
  ["Manage Coupons/Discounts", "/admin/coupons"],
  ["Manage Website Content", "/admin/content"],
  ["Platform Settings", "/admin/settings"]
];

export default async function AdminDashboardPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const [registeredStudents, feesSubmitted, completedStudents] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.payment.count({ where: { status: "SUCCESS" } }),
    prisma.progress.count({ where: { percentage: { gte: 100 } } })
  ]);

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-3" style={{ marginBottom: 12 }}>
        <article className="card"><h3>Students Registered</h3><p>{registeredStudents}</p></article>
        <article className="card"><h3>Fees Submitted</h3><p>{feesSubmitted}</p></article>
        <article className="card"><h3>Course Completed</h3><p>{completedStudents}</p></article>
      </div>
      <div className="grid grid-3">
        {modules.map(([name, href]) => (
          <Link key={href} href={href} className="card"><h3>{name}</h3></Link>
        ))}
      </div>
    </section>
  );
}
