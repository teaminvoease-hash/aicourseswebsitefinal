import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section className="card">
      <h1>Manage Courses</h1>
      <p className="small">Create, edit, delete, and publish course catalog entries.</p>
      <table className="table">
        <thead><tr><th>Title</th><th>Slug</th><th>Fee</th><th>Published</th></tr></thead>
        <tbody>{courses.map((c) => <tr key={c.id}><td>{c.title}</td><td>{c.slug}</td><td>₹{c.discountedFeeInr}</td><td>{c.isPublished ? "Yes" : "No"}</td></tr>)}</tbody>
      </table>
    </section>
  );
}
