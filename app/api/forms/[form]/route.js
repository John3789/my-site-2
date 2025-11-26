// app/api/forms/[form]/route.js
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const scriptUrl = process.env.FORMS_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("Missing FORMS_SCRIPT_URL env var");
      return NextResponse.json(
        { ok: false, error: "Server misconfigured" },
        { status: 500 },
      );
    }

    const { form } = params; // "vision-call", "meditation-members", etc.
    const body = await req.json();

    // Send everything to Apps Script + formType
    const payload = {
      ...body,
      formType: form,
    };

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let scriptResponse = {};
    try {
      scriptResponse = await res.json();
    } catch {
      console.error("Non-JSON response from Apps Script");
    }

    if (!res.ok || !scriptResponse.ok) {
      console.error("Apps Script error:", scriptResponse);
      return NextResponse.json(
        { ok: false, error: "Failed to save form to Sheets" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Forms API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
