// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Allow meditation library temporarily
  if (pathname === "/members/meditations") {
    return NextResponse.next();
  }

  // Allow redirect from Stripe immediately after purchase
  if (pathname === "/members" && url.searchParams.get("status") === "success") {
    return NextResponse.next();
  }

  // Protect /members routes
  const isProtected =
    pathname === "/members" ||
    pathname.startsWith("/members/") ||
    pathname.startsWith("/api/media/") ||
    pathname === "/api/go";

  if (isProtected) {
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
