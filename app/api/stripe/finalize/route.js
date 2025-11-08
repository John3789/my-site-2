// app/api/stripe/finalize/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return NextResponse.redirect("/join");

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    // Session.customer can be an ID string or a full object (when expanded)
    const customerId =
      typeof session.customer === "string" ? session.customer : session.customer?.id;

    if (!customerId) {
      console.error("No customer id on session", sessionId);
      return NextResponse.redirect("/join");
    }

    // Store customer id in a secure HttpOnly cookie (temporary, no DB yet)
    cookies().set("stripe_cust", customerId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return NextResponse.redirect("/members");
  } catch (err) {
    console.error("Finalize error:", err);
    return NextResponse.redirect("/join");
  }
}
