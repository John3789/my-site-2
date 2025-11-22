// app/api/custom-meditation/route.js
import { NextResponse } from "next/server";

// Force Node.js runtime so we can later use Node libraries safely
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple GET so you can visit /api/custom-meditation in the browser
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "custom-meditation endpoint alive",
  });
}

// Simple POST used by your forms
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("TEST /api/custom-meditation body:", body);

    const { name, email, support } = body || {};

    if (!name || !email || !support) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // No email sending yet — just echo back success
    return NextResponse.json({
      ok: true,
      message: "Request received (no email sent yet, test route).",
    });
  } catch (err) {
    console.error("TEST /api/custom-meditation ERROR:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
