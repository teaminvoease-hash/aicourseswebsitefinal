import { NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function ensureAdmin() {
  const session = getSessionFromCookie();
  return !!session && session.role === "ADMIN";
}

export async function GET() {
  if (!ensureAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const settings = await prisma.appSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ settings });
}

export async function POST(request: Request) {
  if (!ensureAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await request.json()) as { settings?: Array<{ key: string; value: string }> };
  if (!Array.isArray(body.settings)) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const cleaned = body.settings
    .map((item) => ({ key: item.key.trim(), value: item.value.trim() }))
    .filter((item) => item.key.length > 0);

  await prisma.$transaction(
    cleaned.map((item) =>
      prisma.appSetting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value }
      })
    )
  );

  return NextResponse.json({ ok: true });
}
