import { prisma } from "@/lib/prisma";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ include: { user: true } });
  return <section><h1>Upload/Issue Certificates</h1><pre className="card">{JSON.stringify(certificates, null, 2)}</pre></section>;
}
