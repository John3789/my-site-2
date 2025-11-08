// app/api/stripe/finalize/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// ---- Strict env helpers
function requireEnv(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL"); // e.g., https://www.drjuanpablosalerno.com

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return NextResponse.redirect(`${siteUrl}/join`);

    // Retrieve the Checkout Session (LIVE)
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;

    if (!customerId) return NextResponse.redirect(`${siteUrl}/join`);

    // Store Stripe customer id for the billing portal
    cookies().set("stripe_cust", customerId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.redirect(`${siteUrl}/members`);
  } catch (e) {
    // If something goes wrong in prod, return JSON so we can see the reason
    return new NextResponse(
      JSON.stringify({ error: "finalize-failed", message: e?.message || "unknown" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
