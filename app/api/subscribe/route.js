// app/api/subscribe/route.js
export const runtime = "nodejs";

import fs from "node:fs";
import path from "node:path";

/* -----------------------------------------------------------------
   Flexible .env.local reader — finds keys regardless of name
------------------------------------------------------------------*/
function readDotEnvLocal() {
  try {
    const p = path.join(process.cwd(), ".env.local");
    if (!fs.existsSync(p)) return {};
    const lines = fs.readFileSync(p, "utf8").split("\n");
    const out = {};
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (m) out[m[1]] = m[2];
    }
    return out;
  } catch {
    return {};
  }
}

function pickFirst(obj, keys) {
  for (const k of keys) if (obj[k]) return obj[k];
  return undefined;
}

function getServerSecrets() {
  const local = readDotEnvLocal();

  const apiKey = pickFirst({ ...process.env, ...local }, [
    "HOPPY_API_KEY",
    "HOPPYAPIKEY",
    "HOPPY_APIKEY",
    "HOPPY_API_TOKEN",
    "HOPPY_TOKEN",
    "HOPPYCOPY_API_KEY",
    "HOPPY_COPY_API_KEY",
    "HC_API_KEY",
    "HOPPYKEY",
  ]);

  const workspaceId = pickFirst({ ...process.env, ...local }, [
    "HOPPY_WORKSPACE_ID",
    "HOPPYWORKSPACEID",
    "HOPPY_WORKSPACEID",
    "HC_WORKSPACE_ID",
    "HOPPY_WS_ID",
  ]);

  return { HOPPY_API_KEY: apiKey, HOPPY_WORKSPACE_ID: workspaceId };
}

/* -----------------------------------------------------------------
   Helper: try both .com and .co hosts with detailed error info
------------------------------------------------------------------*/
async function postToHoppyCopy(email, apiKey) {
  const HOSTS = ["api.hoppycopy.com"];
  let lastErr = null;

  for (const host of HOSTS) {
    try {
      const res = await fetch(`https://${host}/v1/subscribers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(8000),
      });
      return { host, res };
    } catch (e) {
      lastErr = {
        host,
        code: e?.cause?.code || e?.code || null,
        message: e?.cause?.message || e?.message || String(e),
      };
    }
  }
  throw Object.assign(new Error("All Hoppy Copy hosts failed"), { network: lastErr });
}

/* -----------------------------------------------------------------
   Main POST handler
------------------------------------------------------------------*/
export async function POST(req) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    if (!ct.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), { status: 415 });
    }

    const { email } = await req.json();
    if (!email || !/^\S+@\S+\.\S+$/.test(String(email))) {
      return new Response(JSON.stringify({ error: "Valid email required" }), { status: 400 });
    }

    const { HOPPY_API_KEY } = getServerSecrets();
    if (!HOPPY_API_KEY) {
      const envPath = path.join(process.cwd(), ".env.local");
      return new Response(
        JSON.stringify({
          error: "HOPPY_API_KEY not available to the server",
          diagnostics: {
            cwd: process.cwd(),
            hasEnvFile: fs.existsSync(envPath),
            envPath,
            sawInProcessEnv: !!process.env.HOPPY_API_KEY,
            note: "Flexible reader looked for multiple possible key names; none found.",
          },
        }),
        { status: 500 }
      );
    }

    /* -------------------------------------------------------------
       Try to reach Hoppy Copy (.com first, fallback .co)
    --------------------------------------------------------------*/
    let info;
    try {
      info = await postToHoppyCopy(email, HOPPY_API_KEY);
    } catch (e) {
      return new Response(
        JSON.stringify({
          step: "network",
          error: "Fetch to Hoppy Copy failed",
          lastTriedHost: e?.network?.host || null,
          code: e?.network?.code || null,
          message: e?.network?.message || String(e),
        }),
        { status: 502 }
      );
    }

    const upstream = info.res;
    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({
          step: "upstream",
          host: info.host,
          status: upstream.status,
          body: data,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        host: info.host,
        result: data,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error", details: String(err) }),
      { status: 500 }
    );
  }
}
