import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookie();

  if (!session) redirect("/login?role=admin");
  if (session.role !== "ADMIN") redirect("/student");

  return <>{children}</>;
}
