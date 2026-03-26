import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";

const leads = [
  { name: "Aarav Mehta", type: "Brochure Request", source: "Website Form", date: "2026-03-24" },
  { name: "Nisha Rao", type: "Callback Request", source: "WhatsApp", date: "2026-03-25" },
  { name: "Rahul Menon", type: "Syllabus Request", source: "Landing Page", date: "2026-03-25" }
];

export default async function AdminLeadsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  return <SidebarLayout title="Admin Control" subtitle="Admissions leads" nav={[...adminNav]} activeHref="/admin/leads">
    <h1>Leads / Inquiries Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-4"><input placeholder="Search lead" /><select><option>Inquiry type</option><option>Callback</option><option>Brochure</option><option>Syllabus</option></select><button className="btn btn-soft">Sort</button><button className="btn btn-soft">Export</button></div></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Name</th><th>Inquiry</th><th>Source</th><th>Date</th><th>Action</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.name}><td>{lead.name}</td><td>{lead.type}</td><td>{lead.source}</td><td>{lead.date}</td><td><button className="btn btn-soft">Mark called</button></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
