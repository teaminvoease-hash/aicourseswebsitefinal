import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const students = await prisma.user.findMany({ where: { role: "STUDENT" }, orderBy: { createdAt: "desc" } });
  return (
    <section className="card">
      <h1>Manage Students</h1>
      <p className="small">Search, filter, and export-ready student records.</p>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Profession</th><th>Status</th></tr></thead>
        <tbody>{students.map((s) => <tr key={s.id}><td>{s.fullName}</td><td>{s.email}</td><td>{s.mobile}</td><td>{s.profession ?? "-"}</td><td>Active</td></tr>)}</tbody>
      </table>
    </section>
  );
}
