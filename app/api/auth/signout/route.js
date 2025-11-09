// app/api/auth/signout/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function cookieDomainFrom(urlString) {
  try {
    const { hostname } = new URL(urlString);
    const parts = hostname.split(".");
    if (parts.length >= 2) return `.${parts.slice(-2).join(".")}`;
  } catch {}
  return undefined;
}

export async function POST() {
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");
  const domain = cookieDomainFrom(siteUrl);

  // Clear host-scoped cookie
  cookies().set("stripe_cust", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  // Clear domain-scoped cookie (if it was set with Domain=.example.com)
  if (domain) {
    cookies().set("stripe_cust", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      domain,
    });
  }

  // Redirect to membership page after logout
  return NextResponse.redirect(`${siteUrl}/membership`, { status: 303 });
}
