// app/api/stripe/finalize/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");

// Derive cookie domain from your public site URL
function cookieDomainFrom(urlString) {
  try {
    const { hostname } = new URL(urlString);
    // If you’re standardizing on www, set Domain=.drjuanpablosalerno.com so it works on apex too
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join(".")}`; // e.g., .drjuanpablosalerno.com
    }
  } catch {}
  return undefined; // fallback: no Domain attribute
}

const COOKIE_DOMAIN = cookieDomainFrom(siteUrl);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return NextResponse.redirect(`${siteUrl}/join`);

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customerId) return NextResponse.redirect(`${siteUrl}/join`);

    // Set cookie for the whole registrable domain
    cookies().set("stripe_cust", customerId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    });

    return NextResponse.redirect(`${siteUrl}/members`);
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ error: "finalize-failed", message: e?.message || "unknown" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
