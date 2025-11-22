// app/api/custom-meditation/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("TEST /api/custom-meditation BODY:", body);

    // Just sanity-check that name/email/support exist
    const { name, email, support } = body || {};
    if (!name || !email || !support) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // No email, no HoppyCopy. Just say “ok”.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("TEST /api/custom-meditation ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
