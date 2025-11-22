// app/api/custom-meditation/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET still works for browser checks
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "custom-meditation endpoint alive",
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("➡️ CUSTOM MEDITATION POST BODY:", body);

    const { name, email, support } = body || {};

    if (!name || !email || !support) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // --- STEP A: Validate env vars ----
    const {
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      OAUTH_REFRESH_TOKEN,
      OAUTH_USER,
    } = process.env;

    if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN || !OAUTH_USER) {
      console.error("❌ Missing OAUTH ENV VARS");
      return NextResponse.json(
        { ok: false, error: "Server email config missing" },
        { status: 500 },
      );
    }

    // --- STEP B: Create OAuth client ---
    console.log("➡️ Creating OAuth2 client...");
    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    let accessToken;
    try {
      console.log("➡️ Getting access token...");
      const tokenResult = await oAuth2Client.getAccessToken();
      accessToken = tokenResult?.token;
      console.log("✔️ Access token acquired");
    } catch (err) {
      console.error("❌ Error getting access token:", err);
      return NextResponse.json(
        { ok: false, error: "OAuth access token failed: " + err.message },
        { status: 500 },
      );
    }

    // --- STEP C: Create nodemailer transporter ---
    console.log("➡️ Creating transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: OAUTH_USER,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken,
      },
    });

    // --- STEP D: Send the email ---
    console.log("➡️ Sending email...");
    await transporter.sendMail({
      from: `Dr. Juan Pablo <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New Custom Meditation Request",
      text: `Name: ${name}\nEmail: ${email}\nSupport: ${support}`,
    });

    console.log("✔️ Email sent!");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ FINAL CATCH ERROR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 },
    );
  }
}
