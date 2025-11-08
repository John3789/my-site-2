// app/api/checkout/custom-meditation/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/checkout/custom-meditation
 *
 * Creates a discounted one-time checkout session for members.
 * If the STRIPE_PRICE_CUSTOM_MEDITATION env var hasn’t been set yet,
 * we return a safe fallback instead of throwing a build error.
 */
export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const priceId = process.env.STRIPE_PRICE_CUSTOM_MEDITATION;

    // ✅ Temporary fallback until you create the Stripe price & env var
    if (!priceId) {
      console.warn("⚠️ Missing STRIPE_PRICE_CUSTOM_MEDITATION env var. Returning fallback redirect.");
      return NextResponse.json({ url: `${siteUrl}/members` });
    }

    // ✅ Real Stripe Checkout Session (once priceId exists)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/api/stripe/finalize?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/members/discount`,
      // allow_promotion_codes: true, // optional later
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("❌ Custom meditation checkout error:", err);
    return NextResponse.json({ error: "Checkout failed." }, { status: 500 });
  }
}
