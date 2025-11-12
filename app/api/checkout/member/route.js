// app/api/checkout/member/route.js
export const dynamic = "force-dynamic";

const MS_SECRET = process.env.MEMBERSTACK_SECRET_KEY; // server-side key

export async function POST(req) {
  try {
    if (!MS_SECRET) {
      return new Response(JSON.stringify({ error: "missing_secret" }), { status: 500 });
    }

    const { origin } = new URL(req.url);
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl = `${origin}/membership?canceled=1`;

    // You provided pln_… IDs → use planIds (not priceIds)
    const payload = {
      mode: "subscription",
      planIds: [
        "pln_rise-monthly-plan-y9ao098m",
        "pln_rise-yearly-plan-4w9s0n01",
      ],
      successUrl,
      cancelUrl,
    };

    const msRes = await fetch("https://api.memberstack.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MS_SECRET}`,
      },
      body: JSON.stringify(payload),
    });

    if (!msRes.ok) {
      const text = await msRes.text();
      return new Response(
        JSON.stringify({ error: "memberstack_error", status: msRes.status, details: text }),
        { status: 500 }
      );
    }

    const data = await msRes.json();
    if (!data?.url) {
      return new Response(JSON.stringify({ error: "no_checkout_url_returned" }), { status: 500 });
    }

    return new Response(JSON.stringify({ url: data.url }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "server_error", message: String(err?.message || err) }),
      { status: 500 }
    );
  }
}
