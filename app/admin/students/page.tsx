import { prisma } from "@/lib/prisma";

export default async function AdminStudentsPage() {
  const students = await prisma.user.findMany({ where: { role: "STUDENT" } });
  return <section><h1>Manage Students</h1><pre className="card">{JSON.stringify(students, null, 2)}</pre></section>;
}
