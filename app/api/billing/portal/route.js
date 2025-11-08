// app/api/billing/portal/route.js
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
const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");

export async function POST() {
  const customerId = cookies().get("stripe_cust")?.value;
  if (!customerId) {
    return NextResponse.json({ error: "No Stripe customer. Complete checkout first." }, { status: 401 });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${siteUrl}/account`,
  });

  return NextResponse.json({ url: portal.url });
}
