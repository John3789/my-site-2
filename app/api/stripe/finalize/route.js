// app/api/stripe/finalize/route.js
export const runtime = "nodejs";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return NextResponse.redirect("/join");

    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["customer"] });
    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
    if (!customerId) return NextResponse.redirect("/join");

    cookies().set("stripe_cust", customerId, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.redirect("/members");
  } catch (err) {
    console.error("Finalize error:", err);
    return NextResponse.redirect("/join");
  }
}
