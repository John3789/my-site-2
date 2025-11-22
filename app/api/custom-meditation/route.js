// app/api/custom-meditation/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  OAUTH_USER,
} = process.env;

// 🔹 Emails that should receive the requests
const TO_EMAILS = [
  "contact@drjuanpablosalerno.com",
  "john3789@gmail.com",
];

// OAuth2 client configured for Gmail
const oAuth2Client = new google.auth.OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: OAUTH_USER,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
      accessToken: accessToken?.token,
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      current,
      support,
      length,
      timing,
      preferences,
      origin,   // <--- NEW
    } = body;

    if (!name || !email || !support) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Public vs member detection
    const cameFromMemberPage = origin === "member";

    // ------------------------------
    // 1) SEND YOUR EMAIL (always)
    // ------------------------------
    const html = `
      <h2>New Custom Meditation Request</h2>

      <p><strong>Name:</strong> ${name || "—"}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>
      <p><strong>Preferred length:</strong> ${length || "—"}</p>
      <p><strong>When they'll use it:</strong> ${timing || "—"}</p>

      <p><strong>What they're currently moving through:</strong></p>
      <p>${(current || "").replace(/\n/g, "<br />")}</p>

      <p><strong>What they'd like this meditation to support:</strong></p>
      <p>${(support || "").replace(/\n/g, "<br />")}</p>

      <p><strong>Language / spiritual preferences:</strong></p>
      <p>${(preferences || "").replace(/\n/g, "<br />")}</p>
    `;

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: `Dr. Juan Pablo <${OAUTH_USER}>`,
      to: TO_EMAILS,
      subject: "New Custom Meditation Request",
      html,
      replyTo: email,
    });

    // ------------------------------
    // 2) HOPPY COPY SUBSCRIBE (PUBLIC ONLY)
    // ------------------------------
    if (!cameFromMemberPage) {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        process.env.NEXT_PUBLIC_SITE_ORIGIN ||
        process.env.AUTH_ORIGIN ||
        "https://drjuanpablosalerno.com";

      const subscribeBody = {
        email,
        name: name || null,
        source: "custom-meditation-request",
        member_type: "rise-lead",
      };

      const r = await fetch(`${base}/api/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(subscribeBody),
      });

      if (!r.ok) {
        const txt = await r.text();
        console.error("[Custom Meditation] /api/subscribe failed:", r.status, txt);
        // Not blocking the user if subscribe fails
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Custom meditation request error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
