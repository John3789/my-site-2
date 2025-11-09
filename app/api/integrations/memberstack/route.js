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
  // Try several common header names used by Memberstack variants/tools
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

    const VERIFY = (process.env.MS_WEBHOOK_VERIFY ?? "on").toLowerCase() !== "off";
    const secret = process.env.MEMBERSTACK_SIGNING_SECRET || "";

    // Allow a temporary test bypass if you set MS_WEBHOOK_VERIFY=off (Production ONLY while testing)
    if (VERIFY) {
      if (!secret) {
        console.error("[MS webhook] Missing MEMBERSTACK_SIGNING_SECRET");
        return NextResponse.json({ ok: false, error: "server_misconfig" }, { status: 500 });
      }
      const sigHeader = getSigHeader(req);
      if (!sigHeader) {
        console.warn("[MS webhook] Missing signature header. Headers seen:", JSON.stringify(
          Object.fromEntries(Array.from(req.headers).map(([k]) => [k, "present"]))
        ));
        return NextResponse.json({ ok: false, error: "no_signature" }, { status: 400 });
      }

      // Some providers prefix like "sha256=abcdef..."
      const provided = sigHeader.includes("=") ? sigHeader.split("=").pop() : sigHeader;

      const computed = crypto.createHmac("sha256", secret).update(raw).digest("hex");
      if (!safeEqual(computed, provided)) {
        console.warn("[MS webhook] Signature mismatch");
        return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 401 });
      }
    } else {
      console.log("[MS webhook] Signature verification is OFF (testing)");
    }

    const payload = JSON.parse(raw || "{}");
    const member = payload?.data?.member || payload?.member || {};
    const email = member.email?.trim();
    const name = [member.firstName, member.lastName].filter(Boolean).join(" ").trim() || null;

    if (!email) {
      return NextResponse.json({ ok: false, error: "no_email" }, { status: 400 });
    }

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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[MS webhook] Error:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
