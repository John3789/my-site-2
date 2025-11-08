// middleware.js
import { NextResponse } from "next/server";

const PROTECTED = [/^\/members(\/.*)?$/, /^\/library(\/.*)?$/, /^\/resources(\/.*)?$/, /^\/account(\/.*)?$/];

export function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const isProtected = PROTECTED.some((re) => re.test(pathname));
  if (!isProtected) return NextResponse.next();

  // Stub for now (we’ll wire real verification later).
  const token = req.cookies.get("ms_session")?.value || req.headers.get("x-ms-session");
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/join";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/members/:path*", "/library/:path*", "/resources/:path*", "/account/:path*"] };
