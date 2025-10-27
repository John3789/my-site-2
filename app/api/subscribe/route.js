// app/api/subscribe/route.js
export const runtime = "nodejs";

async function probe(url, init) {
  try {
    const res = await fetch(url, { method: "GET", ...init });
    const text = await res.text();
    return { ok: res.ok, status: res.status, snippet: text.slice(0, 200) };
  } catch (e) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}

export async function GET() {
  const hasKey = Boolean(process.env.HOPPY_API_KEY);

  // Probes:
  const google = await probe("https://www.google.com");
  const hoppyBase = await probe("https://api.hoppycopy.co"); // should at least resolve/TLS
  const hoppyV1  = await probe("https://api.hoppycopy.co/v1/subscribers"); // likely 401/404 but should CONNECT

  return new Response(
    JSON.stringify({
      ok: true,
      hasHoppyApiKey: hasKey,
      node: process.version,
      env: process.env.VERCEL ? "vercel" : "local",
      probe: { google, hoppyBase, hoppyV1 }
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

export async function POST(req) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { status: 415 });
    }
    let email;
    try { email = (await req.json())?.email; } catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 }); }
    if (!email || !/^\S+@\S+\.\S+$/.test(String(email))) {
      return new Response(JSON.stringify({ error: "Valid email required" }), { status: 400 });
    }

    const apiKey = process.env.HOPPY_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing HOPPY_API_KEY on server" }), { status: 500 });
    }

    const url = "https://api.hoppycopy.co/v1/subscribers";
    let upstream;
    try {
      upstream = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (netErr) {
      return new Response(
        JSON.stringify({ error: "Network error contacting Hoppy Copy", details: String(netErr?.message ?? netErr) }),
        { status: 502 }
      );
    }

    const raw = await upstream.text();
    let data; try { data = JSON.parse(raw); } catch { data = { raw }; }
    if (!upstream.ok) {
      return new Response(JSON.stringify({ step: "upstream", status: upstream.status, body: data }), { status: 400 });
    }
    return new Response(JSON.stringify({ success: true, body: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: String(err) }), { status: 500 });
  }
}
