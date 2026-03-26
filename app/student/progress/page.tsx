import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ProgressRecord = {
  id: string | number;
  courseId: string | number;
  percentage: number;
};

export default async function StudentProgressPage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login");
  const progress: ProgressRecord[] = await prisma.progress.findMany({ where: { userId: session.userId } });

  return (
    <section>
      <h1>Progress Tracker</h1>
      {progress.map((p: ProgressRecord) => (
        <div key={p.id} className="card">Course ID: {p.courseId} — {p.percentage}% complete</div>
      ))}
    </section>
  );
}
