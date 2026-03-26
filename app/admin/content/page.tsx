import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await prisma.siteContent.findMany();
  return <section><h1>Manage Website Content</h1><pre className="card">{JSON.stringify(content, null, 2)}</pre></section>;
}
