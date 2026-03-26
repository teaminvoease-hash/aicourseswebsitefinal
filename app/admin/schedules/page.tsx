import { prisma } from "@/lib/prisma";

export default async function AdminSchedulesPage() {
  const schedules = await prisma.liveClass.findMany({ include: { course: true } });
  return <section><h1>Manage Class Schedules</h1><pre className="card">{JSON.stringify(schedules, null, 2)}</pre></section>;
}
