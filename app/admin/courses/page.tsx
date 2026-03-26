import { prisma } from "@/lib/prisma";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ include: { lessons: true } });
  return <section><h1>Manage Courses</h1><pre className="card">{JSON.stringify(courses, null, 2)}</pre></section>;
}
