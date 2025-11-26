import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET still works for browser checks
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "vision-call endpoint alive",
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("➡️ VISION CALL POST BODY:", body);

    const {
      name,
      email,
      focus,
      goals,
      background,
      availability,
      preferences,
      context, // e.g. "vision-call-request"
    } = body || {};

    if (!name || !email || !focus || !goals) {
      console.warn("⚠️ Missing required fields:", {
        name,
        email,
        focus,
        goals,
      });
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // For now, Vision Calls are always from RISE members
    // but we still log the context just in case you change it later
    let originLabel = "RISE Member";
    if (context) originLabel = `RISE Member (${context})`;

    // --- STEP A: Validate env vars ----
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
      console.error("❌ Missing OAUTH ENV VARS (vision-call)");
      return NextResponse.json(
        { ok: false, error: "Server email config missing" },
        { status: 500 },
      );
    }

    // --- STEP B: Create OAuth client ---
    console.log("➡️ [VISION CALL] Creating OAuth2 client...");
    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    let accessToken;
    try {
      console.log("➡️ [VISION CALL] Getting access token...");
      const tokenResult = await oAuth2Client.getAccessToken();
      accessToken = tokenResult?.token;
      console.log("✔️ [VISION CALL] Access token acquired");
    } catch (err) {
      console.error("❌ [VISION CALL] Error getting access token:", err);
      return NextResponse.json(
        { ok: false, error: "OAuth access token failed: " + err.message },
        { status: 500 },
      );
    }

    // --- STEP C: Create nodemailer transporter ---
    console.log("➡️ [VISION CALL] Creating transporter...");
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

    const html = `
      <h2>New Vision Call Request</h2>

      <p><strong>Request origin:</strong> ${originLabel}</p>

      <p><strong>Name:</strong> ${name || "—"}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>

      <p><strong>What feels most important to talk about right now?</strong></p>
      <p>${(focus || "—").replace(/\n/g, "<br />")}</p>

      <p><strong>What they’re hoping to walk away with from this Vision Call:</strong></p>
      <p>${(goals || "—").replace(/\n/g, "<br />")}</p>

      <p><strong>Anything they’ve already tried to support themselves:</strong></p>
      <p>${(background || "—").replace(/\n/g, "<br />")}</p>

      <p><strong>Preferred days/times for the call:</strong></p>
      <p>${(availability || "—").replace(/\n/g, "<br />")}</p>

      <p><strong>Preferences or notes:</strong></p>
      <p>${(preferences || "—").replace(/\n/g, "<br />")}</p>

      <p><strong>Context:</strong> ${context || "—"}</p>
    `;

    const text = [
      `Request origin: ${originLabel}`,
      "",
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      "",
      `What feels most important to talk about right now?`,
      focus || "—",
      "",
      `What they’re hoping to walk away with from this Vision Call:`,
      goals || "—",
      "",
      `Anything they’ve already tried to support themselves:`,
      background || "—",
      "",
      `Preferred days/times for the call:`,
      availability || "—",
      "",
      `Preferences or notes:`,
      preferences || "—",
      "",
      `Context: ${context || "—"}`,
    ].join("\n");

    // --- STEP D: Send the email ---
    console.log("➡️ [VISION CALL] Sending email...");
    await transporter.sendMail({
      from: `Dr. Juan Pablo Salerno <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New Vision Call Request - RISE Member",
      text,
      html,
      replyTo: email,
    });

    console.log("✔️ [VISION CALL] Email sent!");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ [VISION CALL] FINAL CATCH ERROR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 },
    );
  }
}
