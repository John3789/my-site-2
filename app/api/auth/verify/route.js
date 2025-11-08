// app/api/auth/verify/route.js
export const runtime = "nodejs";

export async function GET() {
  return new Response(JSON.stringify({ ok: false }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}
