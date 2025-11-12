// app/api/checkout/member/route.js
export const dynamic = "force-dynamic";

const MS_SECRET = process.env.MEMBERSTACK_SECRET_KEY;

// Map your cadences to LIVE IDs
const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly:  "prc_89-99-lt9v0nf5",
};

// If your site is wired to Plan IDs in Memberstack, keep these fallbacks:
const PLAN_IDS = {
  monthly: "pln_rise-monthly-plan-y9ao098m",
  yearly:  "pln_rise-yearly-plan-4w9s0n01",
};

async function createSession(payload) {
  const res = await fetch("https://api.memberstack.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MS_SECRET}`,
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { /* keep text */ }
  return { ok: res.ok, status: res.status, data, raw: text };
}

export async function POST(req) {
  try {
    if (!MS_SECRET) {
      return new Response(JSON.stringify({ error: "Missing MEMBERSTACK_SECRET_KEY" }), { status: 500 });
    }

    // Support JSON body or <form> POSTs
    let cadence = "monthly";
    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      cadence = (body?.cadence === "yearly" ? "yearly" : "monthly");
    } else if (ctype.includes("application/x-www-form-urlencoded") || ctype.includes("multipart/form-data")) {
      const fd = await req.formData().catch(() => null);
      const v = fd?.get("cadence");
      cadence = (v === "yearly" ? "yearly" : "monthly");
    }

    // Build URLs against current origin
    const { origin } = new URL(req.url);
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl  = `${origin}/membership?canceled=1`;

    // --- Attempt 1: use PRICE IDs (paid) -----------------------
    const priceId = PRICE_IDS[cadence];
    let resp = await createSession({
      mode: "subscription",
      priceIds: [priceId],
      successUrl,
      cancelUrl,
      // allowPromoCodes: true, // optional
    });

    // --- Fallback Attempt 2: use PLAN IDs (if your site expects plans) ---
    if (!resp.ok) {
      const planId = PLAN_IDS[cadence];
      resp = await createSession({
        mode: "subscription",
        planIds: [planId],
        successUrl,
        cancelUrl,
      });
    }

    if (!resp.ok) {
      return new Response(
        JSON.stringify({
          error: "memberstack_error",
          status: resp.status,
          details: resp.data || resp.raw,
        }),
        { status: 500 }
      );
    }

    const url = resp?.data?.url;
    if (!url) {
      return new Response(JSON.stringify({ error: "no_checkout_url_returned", details: resp.data || resp.raw }), { status: 500 });
    }

    // Return JSON; client will navigate
    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "server_error", message: String(err?.message || err) }),
      { status: 500 }
    );
  }
}
