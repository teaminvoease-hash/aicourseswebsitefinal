import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";

const mockAssignments = [
  { title: "Draft AI Liability Note", due: "2026-04-05", status: "Pending", score: "-" },
  { title: "Privacy Compliance Quiz", due: "2026-03-20", status: "Completed", score: "18/20" }
];

export default async function StudentAssignmentsPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  return <SidebarLayout title="Student Portal" subtitle="Assignments and quiz" nav={[...studentNav]} activeHref="/student/assignments">
    <h1>Assignments / Quiz</h1>
    <div className="table-wrap">
      <table className="table"><thead><tr><th>Title</th><th>Due Date</th><th>Status</th><th>Result</th></tr></thead><tbody>{mockAssignments.map((item) => <tr key={item.title}><td>{item.title}</td><td>{item.due}</td><td><span className={`badge ${item.status === "Completed" ? "badge-success" : "badge-warning"}`}>{item.status}</span></td><td>{item.score}</td></tr>)}</tbody></table>
    </div>
  </SidebarLayout>;
}
