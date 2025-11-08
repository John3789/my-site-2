// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  // Protect the members area
  const isMembers = pathname === "/members" || pathname.startsWith("/members/");
  if (isMembers) {
    const hasStripeCustomer = req.cookies.get("stripe_cust")?.value;
    if (!hasStripeCustomer) {
      const joinUrl = new URL("/join", url.origin);
      return NextResponse.redirect(joinUrl);
    }
  }

  return NextResponse.next();
}

// Only run on members routes
export const config = {
  matcher: ["/members", "/members/:path*"],
};
