import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentCertificatePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login");
  const certificate = await prisma.certificate.findFirst({ where: { userId: session.userId } });

  return (
    <section>
      <h1>Certificate Status</h1>
      {!certificate ? (
        <p>No certificate generated yet.</p>
      ) : (
        <div className="card">
          <p>Verification ID: <b>{certificate.verificationId}</b></p>
          <p>Status: {certificate.isIssued ? "Issued" : "Pending"}</p>
          {certificate.fileUrl ? <a className="btn" href={certificate.fileUrl}>Download Certificate</a> : null}
        </div>
      )}
    </section>
  );
}
