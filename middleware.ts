import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const protectedStudentRoutes = ["/student"];
const protectedAdminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ailaw_token")?.value;
  const pathname = request.nextUrl.pathname;

  const requiresStudent = protectedStudentRoutes.some((route) => pathname.startsWith(route));
  const requiresAdmin = protectedAdminRoutes.some((route) => pathname.startsWith(route));

  if (!requiresStudent && !requiresAdmin) return NextResponse.next();

  if (!token) {
    const loginUrl = new URL(requiresAdmin ? "/login?role=admin" : "/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = verifyToken(token);

    if (requiresAdmin && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student", request.url));
    }

    if (requiresStudent && payload.role !== "STUDENT" && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*"]
};
