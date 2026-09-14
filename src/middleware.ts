import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that should NOT be accessible when authenticated
const authRoutes = ["/login", "/forgot-password", "/reset-password", "/verify-otp"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(route));

  // If user is NOT authenticated and trying to access a protected route
  if (!token && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user IS authenticated and trying to access an auth route (like /login)
  if (token && isAuthRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, manifest.json, sw.js (PWA assets)
     * - images & public assets (.svg, .png, .jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

