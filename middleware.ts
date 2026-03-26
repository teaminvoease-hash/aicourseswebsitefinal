import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/student", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("ailaw_token")?.value;
  if (!token) {
    const loginUrl = new URL(pathname.startsWith("/admin") ? "/login?role=admin" : "/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Note: JWT verification is performed in server components/API routes.
  // Middleware runs on Edge runtime, so keep it lightweight and runtime-safe.
  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/admin/:path*"]
};
