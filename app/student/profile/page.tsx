import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentProfilePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) redirect("/login");

  return <section><h1>My Profile</h1><pre className="card">{JSON.stringify(user, null, 2)}</pre></section>;
}
