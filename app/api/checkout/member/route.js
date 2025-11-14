// app/api/checkout/member/route.js
export const dynamic = "force-dynamic";

const MS_SECRET = process.env.MEMBERSTACK_SECRET_KEY;

// ✅ USE YOUR LIVE PLAN IDs from Memberstack dashboard (not Stripe)
const PLAN_IDS = {
  monthly: "pln_rise-monthly-plan-y9ao098m",
  yearly:  "pln_rise-yearly-plan-aw6404a4",
};

export async function POST(req) {
  try {
    if (!MS_SECRET) {
      return new Response(JSON.stringify({ error: "Missing MEMBERSTACK_SECRET_KEY" }), { status: 500 });
    }

    let cadence = "monthly";
    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      cadence = body?.cadence === "yearly" ? "yearly" : "monthly";
    } else if (ctype.includes("application/x-www-form-urlencoded") || ctype.includes("multipart/form-data")) {
      const fd = await req.formData().catch(() => null);
      cadence = fd?.get("cadence") === "yearly" ? "yearly" : "monthly";
    }

    const planId = PLAN_IDS[cadence];
    if (!planId) {
      return new Response(JSON.stringify({ error: `Unknown cadence: ${cadence}` }), { status: 400 });
    }

    const { origin } = new URL(req.url);
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl  = `${origin}/membership?canceled=1`;

    const res = await fetch("https://api.memberstack.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MS_SECRET}`,
      },
      body: JSON.stringify({
        mode: "subscription",
        planIds: [planId],   // ✅ planIds ONLY, just one plan
        successUrl,
        cancelUrl,
      }),
    });

    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch {}

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "memberstack_error", status: res.status, details: data || text }), { status: 500 });
    }
    if (!data?.url) {
      return new Response(JSON.stringify({ error: "no_checkout_url_returned", details: data || text }), { status: 500 });
    }
    return new Response(JSON.stringify({ url: data.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "server_error", message: String(err?.message || err) }), { status: 500 });
  }
}