import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" } });
  return <section><h1>Manage Payments</h1><pre className="card">{JSON.stringify(payments, null, 2)}</pre></section>;
}
