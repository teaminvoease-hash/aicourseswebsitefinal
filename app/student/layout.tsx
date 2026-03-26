import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookie();

  if (!session) redirect("/login");

  return <>{children}</>;
}
