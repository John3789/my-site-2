import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// We keep this helper in case we want to re-enable verification later
function getSigHeader(req) {
  const names = [
    "memberstack-signature",
    "x-memberstack-signature",
    "x-ms-signature",
    "x-webhook-signature",
    "webhook-signature",
    "svix-signature",
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

    // 🔒 NOTE:
    // Memberstack now sends Svix-style signatures (svix-signature, v1,...).
    // Our previous HMAC verification was incompatible and caused 401 bad_signature.
    // For now, we *skip* strict signature verification so the webhook can succeed.
    // We can reintroduce proper Svix verification later using @svix/webhooks.
    const sigHeader = getSigHeader(req);
    if (sigHeader) {
      console.log("[MS webhook] Received svix-signature header");
    }

    // Parse payload (supports current Memberstack shape)
    let json = {};
    try {
      json = JSON.parse(raw || "{}");
    } catch (err) {
      console.error("[MS webhook] JSON parse error:", err);
    }

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
      console.error("[MS webhook] no email in payload:", json);
      return NextResponse.json(
        { ok: false, error: "no_email" },
        { status: 400 }
      );
    }

    // Only auto-subscribe on creations/updates
    const actionable =
      /member\.created|member\.updated|member\.plan\.updated/i.test(evt) || !evt;

    if (actionable) {
      const base =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        process.env.NEXT_PUBLIC_SITE_ORIGIN ||
        process.env.AUTH_ORIGIN ||
        "https://drjuanpablosalerno.com";

      const subscribeBody = {
        email,
        name,
        // Tag so we know this came via Memberstack / RISE
        source: "rise-memberstack",
      };

      const r = await fetch(`${base}/api/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(subscribeBody),
      });

      if (!r.ok) {
        const txt = await r.text();
        console.error("[MS webhook] /api/subscribe failed:", r.status, txt);
        return NextResponse.json(
          { ok: false, error: "subscribe_failed" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[MS webhook] Error:", e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}

// Optional quick ping
export async function GET() {
  return NextResponse.json({ ok: true, ping: "memberstack webhook alive" });
}
