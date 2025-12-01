import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// Map area keys to their labels (from AREA_OPTIONS)
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

// Map field keys → full question text
const FIELD_LABELS = {
  // A – Overall Experience
  overall_experience: "A1. How would you describe your experience in RISE so far?",
  overall_mostImpactful: "A2. What has been the most impactful part of your journey?",
  overall_unclear: "A3. Is there anything that feels unclear, overwhelming, or less relevant to you?",
  overall_morePowerful: "A4. What would make RISE feel even more powerful or supportive?",
  overall_enhanceValue: "A5. (Not currently used) How could we further enhance the value of RISE for you?",

  // B – Welcome and Orientation
  welcome_overallRating: "B1. How would you rate your welcome and orientation to the RISE Membership Program?",
  welcome_emailHelpful: "B2. How helpful was the welcome email you received after signing up for RISE?",
  welcome_videoHelpful: "B3. How helpful was the welcome video?",
  welcome_roadmapHelpful: "B4. How helpful was the RISE Roadmap?",
  welcome_startHereHelpful: "B5. How helpful was the “Start Here – your first 7 days” section in the RISE Members Area?",
  welcome_moreMeaningful: "B6. What would make the Welcome and Orientation process even more meaningful or supportive?",
  welcome_improve: "B7. What could be improved in the Welcome and Orientation process in the future?",

  // C – RISE Membership Website & Members Area
  web_membershipPageRating: "C1. How would you rate the RISE Membership page (where you sign up or login)?",
  web_membershipPageImprove: "C2. How could we improve the RISE Membership page (where you sign up or login)?",
  web_membersAreaRating: "C3. How would you rate the RISE Members Area (after you login)?",
  web_membersAreaEase: "C4. How easy is it for you to navigate the RISE Members Area (after you login)?",
  web_confusingFlows: "C5. Which pages or flows feel overwhelming, unclear, or confusing in the RISE Members Area (after you login)?",
  web_membersAreaImprove: "C6. How could we improve the RISE Members Area (after you login)?",
  web_device: "C7. What specific device do you access your membership on most often?",
  web_deviceMultiDetail: "C7a. If multiple devices, please specify which you use most often:",
  web_mobileImprove: "C8. Anything about your mobile/tablet experience that you'd like to see improve?",

  // D – Dr. Salerno AI
  ai_helpfulRating: "D1. How helpful has Dr. Salerno AI been for you? (1 = not at all helpful, 5 = extremely helpful)",
  ai_love: "D2. What do you love about Dr. Salerno AI so far?",
  ai_moreIntuitive: "D3. What could make Dr. Salerno AI even more intuitive or supportive?",
  ai_newFeatures: "D4. Are there any new features you wish Dr. Salerno AI had?",
  ai_improveExperience: "D5. How can we improve your experience using Dr. Salerno AI?",

  // E – Monthly Live Inner Growth Sessions
  live_attended: "E1. Have you attended a Monthly Live Inner Growth Session?",
  live_attendedCount: "E2. If yes, how many Live Sessions have you attended in total? (0–6)",
  live_watchedRecording: "E3. Have you watched a recording from a Monthly Live Inner Growth Session?",
  live_recordingCount: "E4. If yes, how many recordings have you watched? (0–6)",
  live_experienceRating: "E5. How would you rate your Live Session experience overall?",
  live_helpfulRating: "E6. How helpful have the Live Sessions been for you?",
  live_mostMeaningful: "E7. What parts of the Live Sessions have felt most meaningful or powerful?",
  live_improvements: "E8. What could be improved in future Live Sessions?",
  live_moreOf: "E9. What would you love to see more of in the Live Sessions?",
  live_moreMeaningful: "E10. What would make the Live Sessions even more significant or supportive for you?",

  // F – Custom Meditations + Vision Calls
  cm_hadCustom: "F1. Have you had a Custom Meditation created for you?",
  cm_visionRating: "F2. How would you rate your Vision Call experience?",
  cm_meditationAccuracy: "F3. How meaningful or accurate did your Custom Meditation feel?",
  cm_processBetter: "F4. What could make the Custom Meditation process even better for you?",
  cm_visionImprove: "F5. What could be improved in future Vision Calls?",

  // G – Transformation Calls
  tc_hadCall: "G1. Have you had a Transformation Call yet?",
  tc_experienceRating: "G2. How would you rate your Transformation Call experience?",
  tc_mostMeaningful: "G3. What parts of your Transformation Call felt most meaningful or powerful?",
  tc_improve: "G4. What could be improved in future Transformation Calls?",

  // H – Meditation Library
  med_helpfulRating: "H1. How helpful has the Meditation Library been for you?",
  med_supportiveThemes: "H2. Which meditations or themes have been most supportive for you?",
  med_moreOf: "H3. What would you love to see more of in the Meditation Library?",
  med_improve: "H4. What could be improved in the Meditation Library to enhance your experience?",

  // I – Weekly Wisdom Emails
  ww_helpfulRating: "I1. How helpful has the Weekly Wisdom been for you?",
  ww_frequency: "I2. How often do you read your Weekly Wisdom?",
  ww_moreOf: "I3. What would you love to see more of in the Weekly Wisdom?",
  ww_moreMeaningful: "I4. What would make the Weekly Wisdom even more meaningful or supportive?",

  // J – Social Media Inspiration Space
  sm_frequency: "J1. How often do you use the Social Media Inspiration Space?",
  sm_helpfulRating: "J2. How helpful has the Social Media Inspiration Space been for you?",
  sm_supportiveThemes: "J3. Which themes or topics have been most supportive in the Social Media Inspiration Space?",
  sm_moreOf: "J4. What would you love to see more of in the Social Media Inspiration Space?",
  sm_moreMeaningful: "J5. What would make the Social Media Inspiration Space even more meaningful or supportive?",

  // K – Mental Health & Alignment Guides
  mh_frequency: "K1. How often do you use the Mental Health & Alignment Guides?",
  mh_helpfulRating: "K2. How helpful have the Mental Health & Alignment Guides been for you?",
  mh_supportiveThemes: "K3. Which themes or topics have been most supportive in the Mental Health & Alignment Guides?",
  mh_moreOf: "K4. What would you love to see more of in the Mental Health & Alignment Guides?",
  mh_moreMeaningful: "K5. What would make the Mental Health & Alignment Guides even more meaningful or supportive?",

  // L – Something Else
  somethingElse_text: "L1. Share anything else you'd like to provide feedback on:",

  // Final Questions
  final_newTools: "Final 1. What new tools, services, or features would you love to see added to RISE?",
  final_anythingElse: "Final 2. Is there anything else you'd like me to know about your experience?",
  final_followup: "Final 3. Would you be open to a follow-up conversation?",
  final_email: "Final 4. If yes, what's the best email to reach you at? (optional)",
};

function formatFeedbackForEmail(body) {
  if (!body) return { text: "", html: "" };

  const { selectedAreas = [], ...answers } = body;

  // Human-friendly selected areas
  const selectedAreaLabels =
    Array.isArray(selectedAreas) && selectedAreas.length > 0
      ? selectedAreas.map((key) => AREA_LABELS[key] || key).join(", ")
      : "None selected";

  const textLines = [];
  const htmlBlocks = [];

  textLines.push(`Selected areas: ${selectedAreaLabels}`);
  htmlBlocks.push(`<p><strong>Selected areas:</strong> ${selectedAreaLabels}</p>`);

  // Loop through all fields, but ONLY include non-empty ones
  for (const [key, rawValue] of Object.entries(answers)) {
    if (rawValue === "" || rawValue == null) continue;

    const label = FIELD_LABELS[key] || key;
    const value = String(rawValue);

    textLines.push(`${label}\n${value}`);

    htmlBlocks.push(`
      <p>
        <strong>${label}</strong><br />
        ${value.replace(/\n/g, "<br />")}
      </p>
    `);
  }

  const text = textLines.join("\n\n");
  const html = htmlBlocks.join("\n");

  return { text, html };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET still works for browser checks
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

    // ✅ Use the formatter with labels + skip blanks
    const { text, html } = formatFeedbackForEmail(body);

    await transporter.sendMail({
      from: `Dr. Juan Pablo Salerno <${OAUTH_USER}>`,
      to: ["contact@drjuanpablosalerno.com", "john3789@gmail.com"],
      subject: "New RISE Member Feedback Submitted",
      text,
      html,
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
