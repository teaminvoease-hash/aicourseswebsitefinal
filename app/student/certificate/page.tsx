import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentCertificatePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/student-login");

  const certificates = await prisma.certificate.findMany({
    where: { userId: session.userId },
    include: { course: true },
  });

  return (
    <section className="card">
      <h1>Certificate Center</h1>
      <p className="small">Certificates become visible only after successful course completion and admin issuance.</p>
      {certificates.length === 0 ? (
        <p>No certificate records yet.</p>
      ) : (
        <table className="table">
          <thead><tr><th>Course</th><th>Verification ID</th><th>Status</th><th>Download</th></tr></thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>{cert.course.title}</td>
                <td>{cert.verificationId}</td>
                <td>{cert.isIssued ? "Issued" : "Pending"}</td>
                <td>{cert.fileUrl ? <a href={cert.fileUrl}>Download</a> : "Not available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="small">Certificate confirms completion only. Verification ID confirms authenticity only.</p>
    </section>
  );
}
