import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  // 👉 TEMP: Allow Meditation Library without membership check (like members-dev)
  if (pathname === "/members/meditations") {
    return NextResponse.next();
  }

  // ✅ NEW: allow /members?status=success through even if cookie isn't set yet
  if (pathname === "/members" && url.searchParams.get("status") === "success") {
    return NextResponse.next();
  }

  // Paths that REQUIRE membership
  const isProtected =
    pathname === "/members" ||
    pathname.startsWith("/members/") ||
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
  matcher: ["/members", "/members/:path*", "/api/media/:path*", "/api/go"],
};
