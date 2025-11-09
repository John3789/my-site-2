// app/api/go/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function allowHttp(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export async function GET(req) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to");

  // Not logged in? -> join
  const cust = cookies().get("stripe_cust")?.value;
  if (!cust) return NextResponse.redirect(`${siteUrl}/join`);

  // Logged in: only allow http(s) destinations
  if (!to || !allowHttp(to)) {
    return NextResponse.redirect(`${siteUrl}/members`);
  }

  // Safe 302 to the external link
  return NextResponse.redirect(to);
}
