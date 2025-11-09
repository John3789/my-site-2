// app/api/integrations/memberstack/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * SAFE MODE: no signature checks, no forwarding to /api/subscribe.
 * It simply logs headers/body and returns {ok:true}.
 * Once we confirm delivery, we can turn verification & forwarding back on.
 */
export async function POST(req) {
  try {
    const raw = await req.text();
    // Log a concise snapshot to Vercel logs
    console.log("[MS webhook] Received", {
      method: req.method,
      url: req.url,
      contentType: req.headers.get("content-type"),
      sigHeaders: {
        "memberstack-signature": req.headers.get("memberstack-signature") ? "present" : "absent",
        "x-memberstack-signature": req.headers.get("x-memberstack-signature") ? "present" : "absent",
        "x-ms-signature": req.headers.get("x-ms-signature") ? "present" : "absent",
        "x-webhook-signature": req.headers.get("x-webhook-signature") ? "present" : "absent",
        "webhook-signature": req.headers.get("webhook-signature") ? "present" : "absent",
      },
      bodyLen: raw.length,
      bodyPreview: raw.slice(0, 300),
    });

    // Try to parse JSON (won’t throw if not JSON)
    let json = null;
    try { json = JSON.parse(raw); } catch {}

    return NextResponse.json({
      ok: true,
      sawJson: Boolean(json),
      bodyLen: raw.length,
    });
  } catch (e) {
    console.error("[MS webhook] SAFE MODE error:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// Optional GET for quick browser ping
export async function GET() {
  return NextResponse.json({ ok: true, ping: "memberstack webhook alive" });
}
