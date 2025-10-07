import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const email = (form.get("email") || "").toString().trim();
    const hp = (form.get("hp") || "").toString().trim(); // honeypot

    // 🧩 Honeypot check: if bots fill it, do nothing (pretend success)
    if (hp) {
      return NextResponse.json({ success: true });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 💡 Small natural delay (makes UX feel smoother)
    await new Promise((r) => setTimeout(r, 400));

    // --- OPTION A (default): stub success for testing ---
    return NextResponse.json({ success: true });

    // --- OPTION B: MailerLite (uncomment to use) ---
    // Requires env: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID
    // const res = await fetch("https://api.mailerlite.com/api/v2/groups/" + process.env.MAILERLITE_GROUP_ID + "/subscribers", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-MailerLite-ApiDocs": "true",
    //     "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
    //   },
    //   body: JSON.stringify({ email }),
    // });
    // if (!res.ok) {
    //   const t = await res.text();
    //   console.error("MailerLite error:", t);
    //   return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
    // }
    // return NextResponse.json({ success: true });

    // --- OPTION C: ConvertKit (uncomment to use) ---
    // Requires env: CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID
    // const res = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
    // });
    // if (!res.ok) {
    //   const t = await res.text();
    //   console.error("ConvertKit error:", t);
    //   return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
    // }
    // return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
