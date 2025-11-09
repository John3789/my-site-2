// app/api/integrations/memberstack/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeEqual(a, b) {
  const A = Buffer.from(a, "utf8");
  const B = Buffer.from(b, "utf8");
  if (A.length !== B.length) return false;
  return crypto.timingSafeEqual(A, B);
}

function getSigHeader(req) {
  const names = [
    "memberstack-signature",
    "x-memberstack-signature",
    "x-ms-signature",
    "x-webhook-signature",
    "webhook-signature",
  ];
  for (const n of names) {
    const v = req.headers.get(n);
    if (v) return v;
  }
  return "";
}

export async function POST(req) {
  try {
    const raw = await req.text();
    const secret = process.env.MEMBERSTACK_SIGNING_SECRET || "";

    // Accept unsigned tests, but verify if a signature header is present
    const sigHeader = getSigHeader(req);
    if (sigHeader && secret) {
      const provided = sigHeader.includes("=") ? sigHeader.split("=").pop() : sigHeader;
      const computed = crypto.createHmac("sha256", secret).update(raw).digest("hex");
      if (!safeEqual(computed, provided)) {
        return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
      }
    }

    // Parse payload (supports both legacy and current shapes)
    let json = {};
    try { json = JSON.parse(raw || "{}"); } catch {}
    // Your test sample uses { event, payload: { auth.email, customFields['first-name'], ... } }
    const evt = json.event || json.type || "";
    const p = json.payload || json.data || {};
    const email =
      p?.auth?.email?.trim() ||
      p?.member?.email?.trim() ||
      p?.email?.trim() ||
      null;

    const first =
      p?.customFields?.["first-name"] ||
      p?.member?.firstName ||
      p?.firstName ||
      "";
    const last =
      p?.customFields?.["last-name"] ||
      p?.member?.lastName ||
      p?.lastName ||
      "";
    const name = [first, last].filter(Boolean).join(" ").trim() || null;

    if (!email) {
      return NextResponse.json({ ok: false, error: "no_email" }, { status: 400 });
    }

    // Only auto-subscribe on creations/updates
    const actionable = /member\.created|member\.updated/i.test(evt) || !evt; // accept empty evt for test tools
    if (actionable) {
      const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.drjuanpablosalerno.com";
      const r = await fetch(`${base}/api/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (!r.ok) {
        const txt = await r.text();
        console.error("[MS webhook] /api/subscribe failed:", txt);
        return NextResponse.json({ ok: false, error: "subscribe_failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[MS webhook] Error:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// Optional quick ping
export async function GET() {
  return NextResponse.json({ ok: true, ping: "memberstack webhook alive" });
}
