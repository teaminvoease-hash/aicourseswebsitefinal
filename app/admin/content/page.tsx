import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminContentPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const content = await prisma.siteContent.findMany({ orderBy: { updatedAt: "desc" } });

  return <SidebarLayout title="Admin Control" subtitle="Website and content CMS" nav={[...adminNav]} activeHref="/admin/content">
    <h1>Content Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><p className="small">Manage homepage banners, testimonials, FAQ entries, batch start date messaging, and announcements without developer support.</p><div className="grid grid-3"><button className="btn btn-soft">Homepage Banner</button><button className="btn btn-soft">Testimonials</button><button className="btn btn-soft">Announcements</button></div></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Page Key</th><th>Title</th><th>Updated</th><th>Action</th></tr></thead><tbody>{content.map((item) => <tr key={item.id}><td>{item.pageKey}</td><td>{item.title}</td><td>{new Date(item.updatedAt).toLocaleDateString()}</td><td><button className="btn btn-soft">Edit</button></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
