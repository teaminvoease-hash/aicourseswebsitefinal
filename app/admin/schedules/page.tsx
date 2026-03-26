import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSchedulesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const schedules = await prisma.liveClass.findMany({ include: { course: true } });
  return <section><h1>Manage Class Schedules</h1><pre className="card">{JSON.stringify(schedules, null, 2)}</pre></section>;
}
