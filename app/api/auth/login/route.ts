import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, setSessionCookie, signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await comparePassword(parsed.data.password, user.passwordHash);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  if (body.role === "admin" && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not an admin account" }, { status: 403 });
  }

  const token = signToken({ userId: user.id, role: user.role, email: user.email });
  setSessionCookie(token);
  return NextResponse.json({ ok: true, role: user.role });
}
