import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentLiveSchedulePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const classes = await prisma.liveClass.findMany({
    where: { course: { enrollments: { some: { userId: session.userId } } } },
    include: { course: true },
    orderBy: { classDate: "asc" }
  });

  const now = new Date();
  const upcoming = classes.filter((c) => new Date(c.classDate) >= now);
  const past = classes.filter((c) => new Date(c.classDate) < now);

  return <SidebarLayout title="Student Portal" subtitle="Live class schedule" nav={[...studentNav]} activeHref="/student/live-schedule">
    <h1>Live Schedule</h1>
    <div className="card"><h3>Upcoming Classes</h3>{upcoming.length === 0 ? <p className="small">No upcoming live sessions right now.</p> : upcoming.map((item) => <p key={item.id}><strong>{item.title}</strong> · {item.course.title} · Faculty: Assigned Instructor · {new Date(item.classDate).toLocaleString()} <a className="btn btn-soft" href={item.meetingLink} style={{ marginLeft: 8 }}>Join</a> <span className="badge badge-info" style={{ marginLeft: 8 }}>Upcoming</span></p>)}</div>
    <div className="card" style={{ marginTop: 12 }}><h3>Past Classes</h3>{past.length === 0 ? <p className="small">No past classes available yet.</p> : past.map((item) => <p key={item.id}><strong>{item.title}</strong> · {item.course.title} · {new Date(item.classDate).toLocaleString()} <span className="badge badge-warning">Completed</span></p>)}</div>
  </SidebarLayout>;
}
