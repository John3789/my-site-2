import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  // 👉 TEMP: Allow Meditation Library without membership check (like members-dev)
  if (pathname === "/members/meditations") {
    return NextResponse.next();
  }

  // Paths that REQUIRE membership
  const isProtected =
    pathname.startsWith("/members/") ||   // subpaths only
    pathname.startsWith("/api/media/") ||
    pathname === "/api/go";

  if (isProtected) {
    const hasStripeCustomer = req.cookies.get("stripe_cust")?.value;
    if (!hasStripeCustomer) {
      return NextResponse.redirect(new URL("/membership", url.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members/:path*", "/api/media/:path*", "/api/go"],
};
