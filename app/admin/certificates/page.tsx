import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ include: { user: true, course: true }, orderBy: { issuedAt: "desc" } });
  return (
    <section className="card">
      <h1>Manage Certificates</h1>
      <p className="small">Upload/generate certificates and assign unique verification IDs.</p>
      <table className="table">
        <thead><tr><th>Student</th><th>Course</th><th>Verification ID</th><th>Issued</th></tr></thead>
        <tbody>{certificates.map((c) => <tr key={c.id}><td>{c.user.fullName}</td><td>{c.course.title}</td><td>{c.verificationId}</td><td>{c.isIssued ? "Yes" : "No"}</td></tr>)}</tbody>
      </table>
    </section>
  );
}
