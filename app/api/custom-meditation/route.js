export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      current,
      support,
      length,
      timing,
      preferences,
      origin: formOrigin, // renamed to avoid confusion
    } = body;

    if (!name || !email || !support) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cameFromMemberPage = formOrigin === "member";

    // 1) SEND YOUR EMAIL (always)
    const html = `
      <h2>New Custom Meditation Request${cameFromMemberPage ? " (RISE Member)" : ""}</h2>

      <p><strong>Name:</strong> ${name || "—"}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>
      <p><strong>Preferred length:</strong> ${length || "—"}</p>
      <p><strong>When they'll use it:</strong> ${timing || "—"}</p>

      <p><strong>What they're currently moving through:</strong></p>
      <p>${(current || "").replace(/\n/g, "<br />")}</p>

      <p><strong>What they'd like this meditation to support:</strong></p>
      <p>${(support || "").replace(/\n/g, "<br />")}</p>

      <p><strong>Language / spiritual preferences:</strong></p>
      <p>${(preferences || "").replace(/\n/g, "<br />")}</p>
    `;

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: `Dr. Juan Pablo <${OAUTH_USER}>`,
      to: TO_EMAILS,
      subject: cameFromMemberPage
        ? "New Custom Meditation Request (RISE Member)"
        : "New Custom Meditation Request",
      html,
      replyTo: email,
    });

    // 2) HOPPY COPY SUBSCRIBE (PUBLIC ONLY, NEVER BREAKS THE FORM)
    if (!cameFromMemberPage) {
      try {
        const { origin } = new URL(req.url); // e.g. http://localhost:3000 or https://drjuanpablosalerno.com

        const subscribeBody = {
          email,
          name: name || null,
          source: "custom-meditation-request",
          member_type: "rise-lead",
        };

        const r = await fetch(`${origin}/api/subscribe`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(subscribeBody),
        });

        if (!r.ok) {
          const txt = await r.text();
          console.error(
            "[Custom Meditation] /api/subscribe failed:",
            r.status,
            txt
          );
          // we log it but DO NOT throw
        }
      } catch (subErr) {
        console.error(
          "[Custom Meditation] HoppyCopy subscribe error:",
          subErr
        );
        // swallow errors so form still succeeds
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Custom meditation request error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
