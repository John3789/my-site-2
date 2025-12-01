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

// Simple map from field prefix to human-readable section name
const SECTION_LABELS = {
  live: "Monthly Live Inner Growth Sessions",
  med: "Meditation Library",
  ai: "Dr. Salerno AI",
  ww: "Weekly Wisdom Emails",
  tc: "Transformation Calls",
  cm: "Custom Meditations + Vision Calls",
  web: "Website & Members Area",
  overall: "Overall Experience",
  sm: "Social Media Inspiration Space",
  mh: "Mental Health & Alignment Guides",
  welcome: "Welcome & Orientation",
  somethingElse: "Something Else",
  final: "Final Questions",
};

function groupNonEmptyFields(body) {
  const grouped = {};

  for (const [key, rawValue] of Object.entries(body)) {
    if (key === "selectedAreas") continue;
    if (rawValue === "" || rawValue == null) continue;

    const value = String(rawValue);
    const prefix = key.split("_")[0];
    const section = SECTION_LABELS[prefix] || "Other";

    if (!grouped[section]) grouped[section] = [];
    grouped[section].push({ key, value });
  }

  return grouped;
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
        } catch {
          // ignore parse error – script might not always return JSON
        }

        if (!res.ok || json.ok === false) {
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

    if (
      !OAUTH_CLIENT_ID ||
      !OAUTH_CLIENT_SECRET ||
      !OAUTH_REFRESH_TOKEN ||
      !OAUTH_USER
    ) {
      console.error("❌ Missing OAUTH ENV VARS (members-feedback)");
      return NextResponse.json(
        { ok: false, error: "Server email config missing" },
        { status: 500 }
      );
    }

    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    const tokenResult = await oAuth2Client.getAccessToken();
    const accessToken = tokenResult?.token;

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

    const selectedAreas = Array.isArray(body.selectedAreas)
      ? body.selectedAreas.join(", ")
      : "—";

    const grouped = groupNonEmptyFields(body);

    // Build a human-readable HTML email with only non-empty responses
    let sectionsHtml = "";
    for (const [sectionName, fields] of Object.entries(grouped)) {
      const itemsHtml = fields
        .map(
          ({ key, value }) => `
          <li>
            <strong>${key}</strong><br/>
            ${value.replace(/\n/g, "<br />")}
          </li>
        `
        )
        .join("");

      sectionsHtml += `
        <h3>${sectionName}</h3>
        <ul>
          ${itemsHtml}
        </ul>
      `;
    }

    const html = `
      <h2>New RISE Member Feedback</h2>
      <p><strong>Selected Areas:</strong> ${selectedAreas}</p>

      ${
        sectionsHtml.trim() ||
        "<p><em>No non-empty fields besides selected areas.</em></p>"
      }

      <hr />
      <p style="font-size: 11px; color: #777;">
        Raw payload (for reference):<br/>
        <pre style="white-space: pre-wrap; font-size: 10px;">${JSON.stringify(
          body,
          null,
          2
        )
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</pre>
      </p>
    `;

    // Plain-text fallback
    let textSections = [`Selected Areas: ${selectedAreas}`, ""];
    for (const [sectionName, fields] of Object.entries(grouped)) {
      textSections.push(sectionName);
      fields.forEach(({ key, value }) => {
        textSections.push(`- ${key}:`);
        textSections.push(value);
        textSections.push("");
      });
    }
    if (textSections.length === 2) {
      textSections.push("No non-empty fields besides selected areas.");
    }

    const text = textSections.join("\n");

    await transporter.sendMail({
      from: `Dr. Juan Pablo Salerno <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New RISE Member Feedback Submitted",
      html,
      text,
    });

    console.log("✔️ [MEMBERS FEEDBACK] Email sent!");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ [MEMBERS FEEDBACK] FINAL CATCH ERROR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
