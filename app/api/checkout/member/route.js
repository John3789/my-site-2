// app/api/checkout/member/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";

// ---- Strict env helpers (Production only)
function requireEnv(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));

export async function GET() {
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL"); // live domain only
  const priceId = requireEnv("STRIPE_PRICE_MEMBER_MONTHLY"); // LIVE price_xxx

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/api/stripe/finalize?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/join`,
  });

  return NextResponse.redirect(session.url, { status: 303 });
}
