// app/api/checkout/member/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const form = await req.formData();
    const plan = (form.get("plan") || "monthly").toLowerCase();

    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_PRICE_MEMBER_YEARLY
        : process.env.STRIPE_PRICE_MEMBER_MONTHLY;

    if (!priceId) {
      return NextResponse.json({ error: "Missing price id" }, { status: 400 });
    }

  const site = process.env.SITE_URL || "https://www.drjuanpablosalerno.com";
  const auth = process.env.AUTH_ORIGIN || "https://auth.drjuanpablosalerno.com"; // if needed elsewhere


    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/members?checkout=success`,
      cancel_url: `${site}/membership?checkout=cancel`,
      allow_promotion_codes: true,
    });

    // Crucial: 303 redirect makes the browser NAVIGATE to Stripe (no CORS)
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
