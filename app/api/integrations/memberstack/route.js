// app/api/integrations/memberstack/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Helper: constant-time equality
function safeEqual(a, b) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export async function POST(req) {
  try {
    // 1) Read the RAW body first (needed for signature verification)
    const raw = await req.text();

    // 2) Get Memberstack signature from headers (they may use one of these)
    const sigHeader =
      req.headers.get("memberstack-signature") ||
      req.headers.get("x-memberstack-signature") ||
      req.headers.get("x-ms-signature") ||
      "";

    const secret = process.env.MEMBERSTACK_SIGNING_SECRET;

    if (!secret) {
      console.error("[MS webhook] Missing MEMBERSTACK_SIGNING_SECRET");
      return NextResponse.json({ ok: false, error: "server_misconfig" }, { status: 500 });
    }

    if (!sigHeader) {
      console.warn("[MS webhook] Missing signature header");
      return NextResponse.json({ ok: false, error: "no_signature" }, { status: 400 });
    }

    // 3) Compute HMAC SHA256 of the raw body
    const computed = crypto.createHmac("sha256", secret).update(raw).digest("hex");

    if (!safeEqual(computed, sigHeader)) {
      console.warn("[MS webhook] Signature mismatch");
      return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
    }

    // 4) Signature valid → parse JSON
    const payload = JSON.parse(raw);
    const member = payload?.data?.member || payload?.member || {};
    const email = member.email?.trim();
    const name = [member.firstName, member.lastName].filter(Boolean).join(" ").trim() || null;

    if (!email) {
      return NextResponse.json({ ok: false, error: "no_email" }, { status: 400 });
    }

    // 5) Forward to your existing newsletter subscribe endpoint (Hoppy Copy)
    const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.drjuanpablosalerno.com";
    const res = await fetch(`${base}/api/subscribe`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, name }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("[MS webhook] /api/subscribe failed:", txt);
      return NextResponse.json({ ok: false, error: "subscribe_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[MS webhook] Error:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
