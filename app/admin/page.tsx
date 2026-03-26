import Link from "next/link";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";

const modules: ReadonlyArray<readonly [string, Route]> = [
  ["Manage Students", "/admin/students"],
  ["Manage Courses", "/admin/courses"],
  ["Manage Payments", "/admin/payments"],
  ["Upload/Issue Certificates", "/admin/certificates"],
  ["Manage Class Schedules", "/admin/schedules"],
  ["Manage Coupons/Discounts", "/admin/coupons"],
  ["Manage Website Content", "/admin/content"]
];

export default function AdminDashboardPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div className="grid grid-3">
        {modules.map(([name, href]) => (
          <Link key={href} href={href} className="card"><h3>{name}</h3></Link>
        ))}
      </div>
    </section>
  );
}
