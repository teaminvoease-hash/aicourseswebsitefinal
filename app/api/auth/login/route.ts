import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, isUserRole, setSessionCookie, signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email format or password length. Please review and try again." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user) return NextResponse.json({ error: "Account not found. Please register first or verify your email." }, { status: 404 });

  const match = await comparePassword(parsed.data.password, user.passwordHash);
  if (!match) return NextResponse.json({ error: "Incorrect password. Please try again or use forgot password." }, { status: 401 });

  if (body.role === "admin" && user.role !== "ADMIN") {
    return NextResponse.json({ error: "This account is not authorized for admin login." }, { status: 403 });
  }

  if (body.role === "student" && user.role !== "STUDENT") {
    return NextResponse.json({ error: "Use admin login for administrator accounts." }, { status: 403 });
  }

  if (!isUserRole(user.role)) {
    return NextResponse.json({ error: "Invalid account role" }, { status: 500 });
  }

  const token = signToken({ userId: user.id, role: user.role, email: user.email });
  setSessionCookie(token);
  return NextResponse.json({ ok: true, role: user.role });
}
