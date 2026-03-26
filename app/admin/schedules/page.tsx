import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminSchedulesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const schedules = await prisma.liveClass.findMany({ include: { course: true }, orderBy: { classDate: "asc" } });

  return <SidebarLayout title="Admin Control" subtitle="Class scheduling" nav={[...adminNav]} activeHref="/admin/schedules">
    <h1>Schedules Management</h1>
    <div className="card" style={{ marginBottom: 12 }}><h3 style={{ marginTop: 0 }}>Create / Reschedule Live Class</h3><div className="grid grid-3"><input placeholder="Class topic" /><input placeholder="Instructor" /><input placeholder="Meeting link" /><input type="datetime-local" /><select><option>Assign course</option></select><select><option>Status</option><option>Upcoming</option><option>Completed</option><option>Rescheduled</option></select></div><button className="btn" style={{ marginTop: 10 }}>Save Schedule (placeholder)</button></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Course</th><th>Class Title</th><th>Date/Time</th><th>Meeting Link</th><th>Status</th></tr></thead><tbody>{schedules.map((item) => <tr key={item.id}><td>{item.course.title}</td><td>{item.title}</td><td>{new Date(item.classDate).toLocaleString()}</td><td><a href={item.meetingLink}>Open link</a></td><td><span className="badge badge-info">{new Date(item.classDate) > new Date() ? "Upcoming" : "Past"}</span></td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
