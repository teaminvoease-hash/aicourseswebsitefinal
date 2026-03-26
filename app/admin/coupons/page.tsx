import { prisma } from "@/lib/prisma";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany();
  return <section><h1>Manage Coupons/Discounts</h1><pre className="card">{JSON.stringify(coupons, null, 2)}</pre></section>;
}
