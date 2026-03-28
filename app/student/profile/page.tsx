import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { studentNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function StudentProfilePage() {
  const session = getSessionFromCookie();
  if (!session) redirect("/login?role=student");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) redirect("/login?role=student");

  return (
    <SidebarLayout title="Student Portal" subtitle="Profile and account details" nav={[...studentNav]} activeHref="/student/profile">
      <h1>Profile</h1>
      <div className="card">
        <div className="grid grid-2">
          <label>Full Name<input defaultValue={user.fullName} /></label>
          <label>Email<input defaultValue={user.email} readOnly /></label>
          <label>Mobile<input defaultValue={user.mobile} /></label>
          <label>Law College<input defaultValue={user.lawCollege ?? ""} /></label>
          <label>Year/Semester<input defaultValue={user.yearSemester ?? ""} /></label>
          <label>City/State<input defaultValue={user.cityState ?? ""} /></label>
          <label>Profession<input defaultValue={user.profession ?? ""} /></label>
          <label>Profile Image URL<input defaultValue={user.profilePhotoUrl ?? ""} /></label>
        </div>
        <button className="btn" style={{ marginTop: 12 }}>Save Profile</button>
      </div>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        <article className="card"><span className="small">Account status</span><p><span className="badge badge-success">Active</span></p></article>
        <article className="card"><span className="small">Enrolled since</span><p>{new Date(user.createdAt).toLocaleDateString()}</p></article>
        <article className="card"><span className="small">Profile completion</span><p>92%</p></article>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Security</h3>
        <p className="small">For account safety, update your password regularly and avoid sharing login credentials.</p>
      </div>
    </SidebarLayout>
  );
}
