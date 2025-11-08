// app/api/billing/portal/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const customerId = cookies().get("stripe_cust")?.value;

    if (!customerId) {
      return NextResponse.json({ error: "No Stripe customer on file." }, { status: 401 });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl}/account`,
    });

    return NextResponse.json({ url: portal.url });
  } catch (err) {
    console.error("Portal error:", err);
    return NextResponse.json({ error: "Failed to create billing portal session." }, { status: 500 });
  }
}
