// app/api/checkout/member/route.js
export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const priceId = process.env.STRIPE_PRICE_MEMBER_MONTHLY;
    if (!siteUrl || !priceId) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SITE_URL or STRIPE_PRICE_MEMBER_MONTHLY env vars." },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // 👇 After checkout, go to a finalize route that stores the customer id in a cookie
      success_url: `${siteUrl}/api/stripe/finalize?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/join`,
    });

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Stripe checkout failed." }, { status: 500 });
  }
}
