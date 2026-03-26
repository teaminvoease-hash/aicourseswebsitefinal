import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const courses = await prisma.course.findMany({ include: { lessons: true } });
  return <section><h1>Manage Courses</h1><pre className="card">{JSON.stringify(courses, null, 2)}</pre></section>;
}
