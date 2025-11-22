// app/members/custom-meditation/page.jsx
"use client";

import { useRef, useState } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";
import MembersHomeLink from "../MembersHomeLink";

export default function MembersCustomMeditationPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

 const [formStatus, setFormStatus] = useState("idle");
const [formError, setFormError] = useState("");

const handleRequestSubmit = async (e) => {
  e.preventDefault();
  if (formStatus === "submitting") return;

  const form = e.currentTarget;
  const formData = new FormData(form);

const payload = {
  name: formData.get("name")?.toString().trim() || "",
  email: formData.get("email")?.toString().trim() || "",
  current: formData.get("current")?.toString().trim() || "",
  support: formData.get("support")?.toString().trim() || "",
  length: formData.get("length")?.toString().trim() || "",
  timing: formData.get("timing")?.toString().trim() || "",
  preferences: formData.get("preferences")?.toString().trim() || "",
  context: "rise-member", // 👈 MEMBER REQUEST (discount pricing)
};


  if (!payload.name || !payload.email || !payload.support) {
    setFormError(
      "Please fill in your name, email, and what you’d like this meditation to support."
    );
    setFormStatus("error");
    return;
  }

  try {
    setFormStatus("submitting");
    setFormError("");

    const res = await fetch("/api/custom-meditation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Request failed");
    }

    setFormStatus("success");
    form.reset();
  } catch (err) {
    console.error("Member custom meditation error:", err);
    setFormError(
      "Something went wrong. Please try again or email me directly."
    );
    setFormStatus("error");
  }
};




  return (
    <TopOnMount>
      <div
        ref={wrapRef}
        className="lg:contents origin-top data-[zoom=on]:[transform:scale(var(--z))] data-[zoom=on]:[width:calc(100%/var(--z))] mx-auto lg:[transform:none] lg:[width:100%] landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))] landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))] overflow-visible"
      >
<main
  data-page="members-custom-meditation"
  className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] pb-16"
>
          {/* HERO */}
          <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-10">
            <div className="mb-6">
              <MembersHomeLink />
            </div>

            <div className="max-w-[720px]">
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-2">For RISE Members</p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight opacity-95">Custom Meditations &amp; Vision Calls</h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mt-4 mb-5 rounded" />
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                Personalized audio and a focused 1:1 call to support what you&apos;re moving through right now — created just for you, with exclusive RISE member benefits.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                Complimentary 30-minute Vision Call included
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* HOW IT WORKS */}
          <section className="mx-auto max-w-[900px] px-6 py-12 narrow-landscape-80">
            <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">How It Works</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-8 rounded mx-auto" />

            <div className="space-y-6">
              <Step
                number="1"
                title="Share what you need"
                body="Use the request form below to tell me what you're moving through and what you want this meditation to support. You don’t need perfect language — just your honest starting point."
              />
              <Step
                number="2"
                title="Vision Call"
                body="We’ll schedule a complimentary 30-minute Vision Call to explore your intentions, emotional patterns, spiritual needs, and the themes you’d like reflected in your meditation."
              />
              <Step
                number="3"
                title="I create your meditation"
                body="After our call, I’ll write and record a personalized meditation tailored to your goals, mindset, and emotional landscape. Every detail is chosen specifically for you."
              />
              <Step
                number="4"
                title="Receive & integrate"
                body="Your meditation will be delivered within 5–7 days of your Vision Call, along with suggestions on how to weave it into your daily or weekly routine."
              />
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* CHOOSING YOUR LENGTH + MEMBER PRICING */}
          <section className="mx-auto max-w-[1100px] px-6 py-12 narrow-landscape-80">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Choosing your length */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl opacity-95">Choosing Your Length</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded" />
                <div className="space-y-5">
                  <LengthCard
                    label="5 minutes — Quick Reset"
                    body="Perfect for grounding between tasks, easing tension, and creating a fast emotional shift during a busy day."
                  />
                  <LengthCard
                    label="10 minutes — Steady Grounding"
                    body="Ideal for working through a specific pattern, restoring clarity, and reconnecting with yourself during demanding seasons."
                  />
                  <LengthCard
                    label="15 minutes — Deep Reset"
                    body="An immersive experience for deeper emotional work, visualization, or moving through burnout, stress, or major life transitions."
                  />
                </div>
                <p className="mt-4 text-sm opacity-85">
                  Not sure which length to choose? Pick what feels right — we can always adjust it together during your Vision Call.
                </p>
              </div>

              {/* Member pricing */}
              <div className="rounded-2xl border border-[var(--color-gold)]/60 bg-white/5 p-5 shadow-2xl">
                <h2 className="text-xl font-semibold">Your Member Pricing</h2>
                <p className="mt-2 text-sm opacity-85">
                  As a RISE member, you receive exclusive reduced rates on all custom meditations.
                </p>

                <div className="mt-5 grid gap-3">
                  <PricingRow label="5 minutes" member="$40" regular="$50" />
                  <PricingRow label="10 minutes" member="$75" regular="$100" />
                  <PricingRow label="15 minutes" member="$100" regular="$150" />
                </div>

                <div className="mt-6 rounded-xl border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-4 py-3 text-sm">
                  <div className="font-semibold">Yearly Member Perk</div>
                  <p className="mt-1 opacity-90">
                    If you&apos;re on the yearly plan, you also receive a <span className="font-semibold">free 5-minute custom meditation + Vision Call</span> (a $50 value). You can redeem it anytime using the form below.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* WHAT I'LL ASK YOU / IS THIS RIGHT FOR YOU */}
          <section className="mx-auto max-w-[1100px] px-6 py-12 narrow-landscape-80">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* What I'll ask you */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl opacity-95">What I’ll Ask You</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded" />
                <p className="text-base md:text-lg opacity-90 leading-relaxed mb-4">
                  These questions help me create a meditation that feels deeply aligned with your current season of life:
                </p>
                <ul className="space-y-2 text-sm md:text-base opacity-90 leading-relaxed">
                  <li>• What you&apos;re currently moving through (emotionally, mentally, spiritually)</li>
                  <li>• What you want this meditation to support</li>
                  <li>• Any specific patterns, blocks, or themes you want to shift</li>
                  <li>• Your preferred meditation length (5, 10, or 15 minutes)</li>
                  <li>• When you plan to use it (morning, evenings, between shifts, before or after work, etc.)</li>
                  <li>• Any language, spiritual, or cultural preferences you&apos;d like honored</li>
                </ul>
                <p className="mt-4 text-sm opacity-85">
                  You don&apos;t need to write long answers. Whatever feels natural is enough — we&apos;ll refine everything together during the Vision Call.
                </p>
              </div>

              {/* Is this right for you */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl opacity-95">Is This Right for You?</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded" />
                <p className="text-base md:text-lg opacity-90 leading-relaxed mb-4">
                  Custom meditations are especially supportive if you are:
                </p>
                <ul className="space-y-2 text-sm md:text-base opacity-90 leading-relaxed">
                  <li>• Feeling emotionally drained, overwhelmed, or stuck in old patterns</li>
                  <li>• Moving through burnout or a demanding season at work or home</li>
                  <li>• Navigating a big life transition or change</li>
                  <li>• Wanting something more personal than general meditations</li>
                  <li>• Ready to build a grounding ritual that you can return to again and again</li>
                  <li>• Looking for a gentle, structured way to reconnect with clarity and self-trust</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* IMPORTANT NOTES + FORM */}
          <section className="mx-auto max-w-[900px] px-6 py-12 narrow-landscape-80">
                                    <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">Custom Meditation Request Form</h2>
                                                <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto" />



            <div className="text-center mb-6">
              <p className="text-base md:text-lg opacity-90 leading-relaxed">
                When you&apos;re ready, you can request your custom meditation below. Once I receive your form, I&apos;ll reach out with next steps to schedule your Vision Call.
              </p>
            </div>

            {/* REQUEST FORM (placeholder structure you can wire up) */}
            <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4">Custom Meditation Request Form</h3>
              <form className="space-y-4" onSubmit={handleRequestSubmit}>
  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <label className="block text-sm font-medium mb-1">Name</label>
      <input
        type="text"
        name="name"
        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
        placeholder="Your name"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <input
        type="email"
        name="email"
        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
        placeholder="you@example.com"
        required
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">What are you currently moving through?</label>
    <textarea
      name="current"
      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
      rows={3}
      placeholder="Share anything you feel comfortable sharing about what you’re navigating emotionally, mentally, or spiritually."
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">What would you like this meditation to support?</label>
    <textarea
      name="support"
      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
      rows={3}
      placeholder="For example: anxiety, burnout, confidence, clarity, grief, motivation, self-trust, etc."
      required
    />
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <label className="block text-sm font-medium mb-1">Preferred length</label>
      <select
        name="length"
        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="5">5 minutes</option>
        <option value="10">10 minutes</option>
        <option value="15">15 minutes</option>
        <option value="unsure">I&apos;m not sure yet</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">When do you imagine using this meditation?</label>
      <input
        type="text"
        name="timing"
        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
        placeholder="Mornings, before bed, between shifts, after work, etc."
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Language or spiritual preferences (optional)</label>
    <textarea
      name="preferences"
      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
      rows={2}
      placeholder="For example: English or Spanish, any phrases you resonate with, or anything you'd prefer to avoid."
    />
  </div>

  {formError && (
    <p className="text-sm text-red-300">{formError}</p>
  )}

  {formStatus === "success" && (
    <p className="text-sm text-[var(--color-gold)]">
      Thank you — your request was received. I&apos;ll be in touch soon to schedule your Vision Call.
    </p>
  )}

  <div className="pt-2 flex justify-center">
    <button
      type="submit"
      disabled={formStatus === "submitting"}
      className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 disabled:opacity-60"
    >
      {formStatus === "submitting" ? "Sending…" : "Submit Request"}
    </button>
  </div>
</form>
          </div>

           {/* QUESTIONS / CONTACT */}
<div className="mt-8 text-center">
  <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
    Additional questions? Include them in your form or{" "}
    <a
      href="/contact"
      className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90"
    >
      Contact Dr. Salerno
    </a>
  </p>
</div>

          </section>


             {/* Divider — match other section borders */}
          <div className="mt-0 mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* IMPORTANT NOTES */}
          <section className="-mt-1 mx-auto max-w-[900px] px-6 py-12 narrow-landscape-80">
            <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">
              Important Notes
            </h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto" />
            <ul className="space-y-2 text-sm md:text-base opacity-90 leading-relaxed mb-0">
              <li>
                • Custom meditations are for personal growth and emotional support. They do not replace therapy, medical care, or crisis services.
              </li>
              <li>
                • If you are in immediate distress or experiencing a crisis, please reach out to local emergency services or a crisis hotline before using these tools.
              </li>
              <li>
                • These meditations are for your personal use only. Please don&apos;t share, repost, or resell them.
              </li>
            </ul>
          </section>
                {/* Divider ABOVE footer, matching membership/meditations */}
      <div className="mx-auto max-w-[1200px] px-6 mt-0">
        <hr className="border-t border-[var(--color-cream)]/22" />
      </div>

      {/* Desktop footer row (socials + bio + legal) */}
      <div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 text-[13px] leading-relaxed opacity-85">
        {/* LEFT: socials + bio */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-4">
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">
              Follow Dr. Salerno:
            </p>
            {/* socials (same as meditations) */}
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@drjuanpablosalerno"
              aria-label="TikTok"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/drjuanpablosalerno/"
              aria-label="Instagram"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/drjpsalerno"
              aria-label="YouTube"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61582412806274#"
              aria-label="Facebook"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert
            and transformation advisor, author, and professor—credited with more than
            30 peer-reviewed publications and over 2,000 citations.
          </p>
        </div>

        {/* RIGHT: legal */}
        <div className="text-left translate-y-[-4px]">
          <p>© Dr. Juan Pablo Salerno™</p>
          <p className="mt-1">
            <span>All rights reserved</span>
            <span className="mx-2 opacity-50">·</span>
            <a href="/terms" className="underline underline-offset-4 hover:opacity-80">
              Terms
            </a>
            <span className="mx-2 opacity-50">·</span>
            <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
              Privacy
            </a>
          </p>
        </div>
      </div>

      {/* Mobile divider */}
      <div className="lg:hidden mx-auto w-full px-0 mt-8">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer stack */}
      <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-6">
        <div className="mt-0 text-[13px] leading-relaxed">
          <p className="uppercase tracking-[0.18em] text-left opacity-70">
            Follow Dr. Salerno:
          </p>
          {/* mobile socials (same as above) */}
          {/* ...you can paste the same social icons + text as your meditations footer... */}
        </div>
      </div>

      {/* Hide global site footer ONLY on this page */}
      <style>{`
        body:has(main[data-page="live-sessions"]) :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
      `}</style>
        </main>
      </div>
    </TopOnMount>
  );
}

/* Local helper components */

function Step({ number, title, body }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-sm font-semibold">
        {number}
      </div>
      <div>
        <div className="font-semibold mb-1">{title}</div>
        <p className="text-sm md:text-base opacity-90 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function LengthCard({ label, body }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4">
      <div className="font-semibold mb-1">{label}</div>
      <p className="text-sm md:text-base opacity-90 leading-relaxed">{body}</p>
    </div>
  );
}

function PricingRow({ label, member, regular }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm">
      <span className="font-medium">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className="font-semibold text-[var(--color-gold)]">{member}</span>
        <span className="text-xs line-through opacity-70">{regular}</span>
      </div>
    </div>
  );
}
