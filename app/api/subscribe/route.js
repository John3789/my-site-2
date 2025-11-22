// app/api/subscribe/route.js
export const runtime = "nodejs";

// ---- GET: health check ----
export async function GET() {
  // Optional connectivity probes
  let googleOk = false, hoppyOk = false;
  try {
    const g = await fetch("https://www.google.com", { method: "HEAD", timeout: 3000 });
    googleOk = g.ok;
  } catch {}

  try {
    const h = await fetch("https://app.hoppycopy.co/api/v2/health", { method: "GET", timeout: 5000 });
    hoppyOk = h.ok;
  } catch {}

  return new Response(
    JSON.stringify({
      ok: true,
      hasHoppyApiKey: !!process.env.HOPPY_COPY_API_KEY,
      hasWorkspaceId: !!process.env.HOPPY_COPY_WORKSPACE_ID,
      node: process.version,
      env: process.env.VERCEL ? "vercel" : "local",
      probe: { googleOk, hoppyOk }
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

// ---- POST: subscribe ----
export async function POST(req) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("application/json"))
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { status: 415 });

    const { email } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      return new Response(JSON.stringify({ error: "Valid email required" }), { status: 400 });

    const apiKey = process.env.HOPPY_COPY_API_KEY;
    const workspaceId = process.env.HOPPY_COPY_WORKSPACE_ID;
    if (!apiKey || !workspaceId)
      return new Response(
        JSON.stringify({ error: "Missing HOPPY_COPY_API_KEY or HOPPY_COPY_WORKSPACE_ID in environment variables" }),
        { status: 500 }
      );

    // Build request for Hoppy Copy v2
    const body = {
      workspace_id: workspaceId,
      person: { email }
    };

    const upstream = await fetch("https://app.hoppycopy.co/api/v2/person/null", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!upstream.ok) {
      return new Response(JSON.stringify({ step: "upstream", status: upstream.status, body: data }),
        { status: upstream.status });
    }

    return new Response(JSON.stringify({ success: true, body: data }),
      { status: 200, headers: { "content-type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: String(err) }), { status: 500 });
  }
}
