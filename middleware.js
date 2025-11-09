// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  // Paths that REQUIRE membership
  const protectedMatchers = [
    "/members",
    "/members/",
    "/members/:path*",
    "/api/media/:path*", // streaming audio/files
    "/api/go",           // guarded external redirects
  ];

  // Does the current path match any of the protected prefixes?
  const isProtected =
    pathname === "/members" ||
    pathname.startsWith("/members/") ||
    pathname.startsWith("/api/media/") ||
    pathname === "/api/go";

  if (isProtected) {
    const hasStripeCustomer = req.cookies.get("stripe_cust")?.value;
    if (!hasStripeCustomer) {
      return NextResponse.redirect(new URL("/join", url.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members", "/members/:path*", "/api/media/:path*", "/api/go"],
};
