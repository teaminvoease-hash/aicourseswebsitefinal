import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";

export default async function StudentHelpPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  return <SidebarLayout title="Student Portal" subtitle="Support and FAQs" nav={[...studentNav]} activeHref="/student/help">
    <h1>Help & Support</h1>
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Raise a support request</h3>
      <div className="grid grid-2">
        <label>Subject<input placeholder="Login issue / Payment / Certificate" /></label>
        <label>Priority<select><option>Normal</option><option>High</option></select></label>
      </div>
      <label style={{ marginTop: 10 }}>Describe your issue<textarea rows={4} placeholder="Add details so the support team can assist faster." /></label>
      <button className="btn" style={{ marginTop: 10 }}>Submit Support Request</button>
    </div>
    <div className="grid grid-2" style={{ marginTop: 12 }}>
      <article className="card"><h3>Direct support</h3><p className="small">Email: support@ailawacademy.in</p><a className="btn btn-soft" href="#">WhatsApp Support</a></article>
      <article className="card"><h3>Common FAQs</h3><p className="small">• Login issues: reset password from login page.</p><p className="small">• Payment pending: allow up to 30 minutes.</p><p className="small">• Certificate: issued after progress and assessment checks.</p></article>
    </div>
  </SidebarLayout>;
}
