import { redirect } from "next/navigation";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const session = getSessionFromCookie();
  if (!session || session.role !== "ADMIN") redirect("/login?role=admin");

  const coupons = await prisma.coupon.findMany();
  return <section><h1>Manage Coupons/Discounts</h1><pre className="card">{JSON.stringify(coupons, null, 2)}</pre></section>;
}
