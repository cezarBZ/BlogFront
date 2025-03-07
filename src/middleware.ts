// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const protectedRoutes = ["/"];
  const authRoutes = ["/signin", "/signup"];
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
