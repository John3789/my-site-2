// app/api/checkout/custom-meditation/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com";
    const priceId = process.env.STRIPE_PRICE_CUSTOM_MEDITATION;

    if (!priceId) {
      // Safe fallback until you create the one-time price
      return NextResponse.json({ url: `${siteUrl}/members` });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/api/stripe/finalize?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/members/discount`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Custom meditation checkout error:", err);
    return NextResponse.json({ error: "Checkout failed." }, { status: 500 });
  }
}
