// app/api/media/[id]/route.js
export const runtime = "nodejs";

const MEDITATION_SOURCES = {
  // id: absolute URL to your real audio file (S3, CloudFront, etc.)
  // Examples — replace with your real URLs:
  "morning-reset-5m": "https://YOUR-BUCKET.s3.amazonaws.com/audio/morning-reset-5m.mp3",
  "evening-release-7m": "https://YOUR-BUCKET.s3.amazonaws.com/audio/evening-release-7m.mp3",
  // add more here...
};

export async function GET(_req, { params }) {
  const id = params?.id;
  const url = MEDITATION_SOURCES[id];
  if (!url) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
  // 302 so the browser navigates (middleware enforces membership before this code runs)
  return Response.redirect(url, 302);
}
