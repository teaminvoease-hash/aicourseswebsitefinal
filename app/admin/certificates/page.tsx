import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const certificates = await prisma.certificate.findMany({ include: { user: true } });
  return <section><h1>Upload/Issue Certificates</h1><pre className="card">{JSON.stringify(certificates, null, 2)}</pre></section>;
}
