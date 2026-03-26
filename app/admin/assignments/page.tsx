import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";

const rows = [
  { title: "Draft AI Liability Memorandum", course: "AI Law Bootcamp", due: "2026-04-05", state: "Published" },
  { title: "Privacy Risk Quiz", course: "Data Compliance Track", due: "2026-04-08", state: "Draft" }
];

export default async function AdminAssignmentsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  return <SidebarLayout title="Admin Control" subtitle="Assignments and quiz builder" nav={[...adminNav]} activeHref="/admin/assignments">
    <h1>Assignments / Quiz Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-3"><input placeholder="Assignment title" /><select><option>Link to course/module</option></select><input type="date" /></div><button className="btn" style={{ marginTop: 10 }}>Create Assignment (placeholder)</button></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>State</th><th>Scoring</th></tr></thead><tbody>{rows.map((row) => <tr key={row.title}><td>{row.title}</td><td>{row.course}</td><td>{row.due}</td><td><span className={`badge ${row.state === "Published" ? "badge-success" : "badge-warning"}`}>{row.state}</span></td><td>Future-ready scoring placeholder</td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
