import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const form = await request.formData();
    const email = (form.get("email") || "").toString().trim();
    const hp = (form.get("hp") || "").toString().trim(); // honeypot

    // 🧩 Honeypot check
    if (hp) return NextResponse.json({ success: true });

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 💡 Small UX delay
    await new Promise((r) => setTimeout(r, 400));

    // --- ✅ Hoppy Copy integration ---
    const payload = {
      email,
      attributes: { source: "website-signup" },
      tags: ["WebsiteSignup"],
      audience_id: process.env.HOPPY_COPY_AUDIENCE_ID || undefined,
    };

    const res = await fetch("https://app.hoppycopy.co/api/v2/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HOPPY_COPY_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Hoppy Copy error:", text);
      return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
