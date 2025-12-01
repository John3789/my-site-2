import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "members-feedback endpoint alive",
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("➡️ MEMBERS FEEDBACK POST BODY:", body);

    // -----------------------------
    // 1️⃣ FORWARD TO GOOGLE SHEETS
    // -----------------------------
    const scriptUrl = process.env.FORMS_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("❌ Missing FORMS_SCRIPT_URL env var");
    } else {
      try {
        const res = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            formType: "members-feedback",
          }),
        });

        let json = {};
        try {
          json = await res.json();
        } catch {}

        if (!res.ok || !json.ok) {
          console.error("❌ Sheet append failed:", json);
        } else {
          console.log("✔️ Sheet updated successfully");
        }
      } catch (err) {
        console.error("❌ Error calling FORMS_SCRIPT_URL:", err);
      }
    }

    // -----------------------------
    // 2️⃣ EMAIL NOTIFICATION
    // -----------------------------
    const {
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      OAUTH_REFRESH_TOKEN,
      OAUTH_USER,
    } = process.env;

    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    const accessToken = (await oAuth2Client.getAccessToken())?.token;

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

    const selectedAreasText = Array.isArray(body.selectedAreas)
      ? body.selectedAreas.join(", ")
      : "—";

    const html = `
      <h2>New RISE Member Feedback</h2>
      <p><strong>Selected Areas:</strong> ${selectedAreasText}</p>
      <pre>${JSON.stringify(body, null, 2)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</pre>
    `;

    await transporter.sendMail({
      from: `Dr. Juan Pablo Salerno <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New RISE Member Feedback Submitted",
      html,
      text: JSON.stringify(body, null, 2),
    });

    console.log("✔️ Email sent!");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Members Feedback Error:", err);
    return NextResponse.json({ ok: false, error: err.message });
  }
}
