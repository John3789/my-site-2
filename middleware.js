// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Keep the meditation library fully open while you're editing it
  if (pathname === "/members/meditations") {
    return NextResponse.next();
  }

  // Only protect media + /api/go with the stripe_cust cookie for now
  const needsStripeCookie =
    pathname.startsWith("/api/media/") || pathname === "/api/go";

  if (needsStripeCookie) {
    const cookie = req.cookies.get("stripe_cust")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/membership", url.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members", "/members/:path*", "/api/media/:path*", "/api/go"],
};
