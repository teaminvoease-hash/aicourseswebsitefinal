import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie, signToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await hashPassword(parsed.data.password);

  const user = await prisma.user.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
      passwordHash,
      lawCollege: parsed.data.lawCollege,
      yearSemester: parsed.data.yearSemester,
      cityState: parsed.data.cityState,
      profession: parsed.data.profession,
      profilePhotoUrl: parsed.data.profilePhotoUrl || null
    }
  });

  const token = signToken({ userId: user.id, role: "STUDENT", email: user.email });
  setSessionCookie(token);

  return NextResponse.json({ ok: true, userId: user.id });
}
