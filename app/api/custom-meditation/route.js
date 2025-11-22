// app/api/custom-meditation/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  OAUTH_USER,
  NEXT_PUBLIC_SITE_URL,
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
    console.log("➡️ Custom meditation body:", body);

    const {
      name,
      email,
      current,
      support,
      length,
      timing,
      preferences,
      // NEW optional flags:
      subscribeToHoppyCopy, // boolean
      context,              // "member" | "public" | undefined
    } = body;

    if (!name || !email || !support) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isMember = context === "member";

    const subjectBase = "New Custom Meditation Request";
    const subject = isMember
      ? `${subjectBase} (RISE Member)`
      : subjectBase;

    const headerTitle = isMember
      ? "New Custom Meditation Request (RISE Member)"
      : "New Custom Meditation Request";

    const html = `
      <h2>${headerTitle}</h2>

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
      subject,
      html,
      replyTo: email,
    });

    // 🔹 Only send to HoppyCopy for PUBLIC leads
    if (subscribeToHoppyCopy) {
      try {
        const baseUrl =
          NEXT_PUBLIC_SITE_URL ||
          (process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "");

        if (!baseUrl) {
          console.warn("⚠️ No NEXT_PUBLIC_SITE_URL set; skipping /api/subscribe");
        } else {
          const hcRes = await fetch(`${baseUrl}/api/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              name,
              // ⬇️ Adjust this payload to match your existing /api/subscribe contract
              source: "custom-meditation-public",
            }),
          });

          const hcData = await hcRes.json();
          console.log("HoppyCopy subscribe response:", hcRes.status, hcData);
        }
      } catch (err) {
        console.error("HoppyCopy subscribe error (non-fatal):", err);
        // do NOT throw; email already sent, we don't want to break the form
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
