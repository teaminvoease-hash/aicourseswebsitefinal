import { redirect } from "next/navigation";
import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { adminNav } from "@/components/dashboard/nav";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminCouponsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });

  return <SidebarLayout title="Admin Control" subtitle="Discount controls" nav={[...adminNav]} activeHref="/admin/coupons">
    <h1>Coupons / Offers</h1>
    <div className="card" style={{ marginBottom: 12 }}><div className="grid grid-4"><input placeholder="Coupon code" /><input placeholder="Discount amount" /><input type="date" /><button className="btn">Create Coupon (placeholder)</button></div></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Code</th><th>Discount</th><th>Validity</th><th>Status</th><th>Usage</th></tr></thead><tbody>{coupons.map((coupon) => <tr key={coupon.id}><td>{coupon.code}</td><td>₹{coupon.discountInr}</td><td>{coupon.validTill ? new Date(coupon.validTill).toLocaleDateString() : "No expiry"}</td><td><span className={`badge ${coupon.isActive ? "badge-success" : "badge-warning"}`}>{coupon.isActive ? "Enabled" : "Disabled"}</span></td><td>Usage count placeholder</td></tr>)}</tbody></table></div>
  </SidebarLayout>;
}
