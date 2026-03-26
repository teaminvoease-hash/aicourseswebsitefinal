import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentCertificatePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const certificate = await prisma.certificate.findFirst({ where: { userId: session.userId }, include: { course: true } });

  const status = !certificate ? "Pending" : certificate.isIssued ? "Issued" : "Eligible";

  return (
    <SidebarLayout title="Student Portal" subtitle="Certification and verification" nav={[...studentNav]} activeHref="/student/certificate">
      <h1>Certificate</h1>
      <div className="card">
        <span className={`badge ${status === "Issued" ? "badge-success" : status === "Eligible" ? "badge-info" : "badge-warning"}`}>{status}</span>
        <h3>{certificate?.course.title || "Certificate not generated yet"}</h3>
        <p className="small">Issue date: {certificate ? new Date(certificate.issuedAt).toLocaleDateString() : "Pending"}</p>
        <p className="small">Verification ID: {certificate?.verificationId || "Will be assigned post-issuance"}</p>
        {certificate?.fileUrl ? <a className="btn" href={certificate.fileUrl}>Download Certificate</a> : <p className="small">Pending reasons: incomplete modules, pending assessment requirements, or admin approval in progress.</p>}
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <p className="small">Certificate confirms course completion only. Verification ID confirms authenticity for third-party checks.</p>
      </div>
    </SidebarLayout>
  );
}
