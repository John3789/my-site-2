import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Map area keys -> labels for nicer email text
const AREA_LABELS = {
  overall: "1. Overall Experience",
  welcome: "2. Welcome and Orientation",
  website: "3. RISE Membership Website & Members Area",
  ai: "4. Dr. Salerno AI",
  liveSessions: "5. Monthly Live Inner Growth Sessions",
  customMeditations: "6. Custom Meditations + Vision Calls",
  transformationCalls: "7. Transformation Calls",
  meditationLibrary: "8. Meditation Library",
  weeklyWisdom: "9. Weekly Wisdom Emails",
  socialMediaSpace: "10. Social Media Inspiration Space",
  mhGuides: "11. Mental Health & Alignment Guides",
  somethingElse: "12. Something Else",
};

// Simple helper: format values with line breaks for HTML
function formatHtmlValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value !== "string") return String(value);
  if (!value.trim()) return "—";
  return value.replace(/\n/g, "<br />");
}

// And for plain text
function formatTextValue(value) {
  if (value === null || value === undefined) return "—";
  if (typeof value !== "string") return String(value);
  if (!value.trim()) return "—";
  return value;
}

// GET – health check
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

    const { selectedAreas = [], ...formData } = body || {};

    // --- STEP A: Validate env vars (same pattern as Vision Call) ---
    const {
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      OAUTH_REFRESH_TOKEN,
      OAUTH_USER,
    } = process.env;

    if (
      !OAUTH_CLIENT_ID ||
      !OAUTH_CLIENT_SECRET ||
      !OAUTH_REFRESH_TOKEN ||
      !OAUTH_USER
    ) {
      console.error("❌ Missing OAUTH ENV VARS (members-feedback)");
      return NextResponse.json(
        { ok: false, error: "Server email config missing" },
        { status: 500 },
      );
    }

    // --- STEP B: Create OAuth client ---
    console.log("➡️ [MEMBERS FEEDBACK] Creating OAuth2 client...");
    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    let accessToken;
    try {
      console.log("➡️ [MEMBERS FEEDBACK] Getting access token...");
      const tokenResult = await oAuth2Client.getAccessToken();
      accessToken = tokenResult?.token;
      console.log("✔️ [MEMBERS FEEDBACK] Access token acquired");
    } catch (err) {
      console.error("❌ [MEMBERS FEEDBACK] Error getting access token:", err);
      return NextResponse.json(
        { ok: false, error: "OAuth access token failed: " + err.message },
        { status: 500 },
      );
    }

    // --- STEP C: Create nodemailer transporter (same as Vision Call) ---
    console.log("➡️ [MEMBERS FEEDBACK] Creating transporter...");
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

    // Selected areas (pretty labels)
    const areasLabel =
      selectedAreas.length > 0
        ? selectedAreas
            .map((key) => AREA_LABELS[key] || key)
            .join(", ")
        : "No specific areas selected";

    // Build HTML block of all responses
    const htmlLines = Object.entries(formData).map(([key, value]) => {
      return `
        <p>
          <strong>${key}:</strong><br />
          ${formatHtmlValue(value)}
        </p>
      `;
    });

    const html = `
      <h2>New RISE Member Experience Feedback Submission</h2>

      <p><strong>Selected feedback areas:</strong> ${areasLabel}</p>

      <hr />

      <h3>Full Responses</h3>
      ${htmlLines.join("\n")}
    `;

    // Plain-text version
    const textLines = [
      `Selected feedback areas: ${areasLabel}`,
      "",
      "Full responses:",
      "",
      ...Object.entries(formData).map(([key, value]) => {
        return `${key}:\n${formatTextValue(value)}\n`;
      }),
    ];

    const text = textLines.join("\n");

    // --- STEP D: Send the email ---
    console.log("➡️ [MEMBERS FEEDBACK] Sending email...");
    await transporter.sendMail({
      from: `Dr. Juan Pablo Salerno <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New RISE Member Experience Feedback Submission",
      text,
      html,
      // no replyTo here because the survey currently doesn't collect respondent email
    });

    console.log("✔️ [MEMBERS FEEDBACK] Email sent!");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ [MEMBERS FEEDBACK] FINAL CATCH ERROR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 },
    );
  }
}
