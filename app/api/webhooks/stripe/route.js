// app/api/webhooks/stripe/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Minimal webhook stub (no signature verification yet)
export async function POST() {
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
