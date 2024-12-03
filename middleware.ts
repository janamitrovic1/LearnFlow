// middleware.ts (Next.js 13+)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.pathname;

  // Exclude the routes you don't want to protect
  if (
    !url.startsWith("/student/signin") &&
    !url.startsWith("/student/signup") &&
    !url.startsWith("/teacher/signin") &&
    !url.startsWith("/teacher/signup")
  ) {
    // Check for role-based protection for student and teacher routes
    if (url.startsWith("/student") && token?.role !== "student") {
      return NextResponse.redirect(new URL("/student/signin", req.url));
    }

    if (url.startsWith("/teacher") && token?.role !== "teacher") {
      return NextResponse.redirect(new URL("/teacher/signin", req.url));
    }
  }

  return NextResponse.next();
}
