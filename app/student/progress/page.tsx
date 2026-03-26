import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentProgressPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login");
  const progress = await prisma.progress.findMany({ where: { userId: session.userId } });

  return (
    <section>
      <h1>Progress Tracker</h1>
      {progress.map((p) => (
        <div key={p.id} className="card">Course ID: {p.courseId} — {p.percentage}% complete</div>
      ))}
    </section>
  );
}
