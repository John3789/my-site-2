export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function cookieDomainFrom(urlString) {
  try {
    const { hostname } = new URL(urlString);
    const parts = hostname.split(".");
    if (parts.length >= 2) return `.${parts.slice(-2).join(".")}`;
  } catch {}
  return undefined;
}

export async function POST() {
  const siteUrl = process.env.SITE_URL || "https://www.drjuanpablosalerno.com";
  const domain = cookieDomainFrom(siteUrl);

  // Clear host-scoped cookie
  cookies().set("stripe_cust", "", {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0,
  });

  // Clear domain-scoped cookie if applicable
  if (domain) {
    cookies().set("stripe_cust", "", {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0, domain,
    });
  }

  // Redirect back to the unified membership page
  return NextResponse.redirect(`${siteUrl}/membership`, { status: 303 });
}
