// app/contact/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import NewsletterMeditationPopup from "../../components/NewsletterMeditationPopup";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const msg = (form.get("message") || "").toString().trim();

    if (!name || !email || msg.length < 8) {
      setLoading(false);
      alert("Please complete all fields (message must be at least 8 characters).");
      return;
    }

    // TODO: replace with real submission (API route / Formspree / Resend)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 " +
    "placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 " +
    "focus:border-[var(--color-gold)]/50 transition";

  const topics = [
    { value: "Consulting", label: "Consulting" },
    { value: "Speaking", label: "Speaking" },
    { value: "Meditations", label: "Meditations" },
    { value: "Media", label: "Media / Press" },
    { value: "Collaborations", label: "Collaborations" },
    { value: "Other", label: "Another Inquiry" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      {/* soft gradient wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(1200px 600px at 10% -10%, rgba(255,221,149,0.07), transparent 60%), radial-gradient(900px 500px at 110% 10%, rgba(255,221,149,0.06), transparent 60%)" }} />

      {/* ============== MOBILE (zoom wrapper) ============== */}
      <div className="lg:hidden mx-auto max-w-[1200px] px-6 py-20">
        <div style={{ "--z": 3.0, "--zoomL": 1.6 }} className="zoomwrap origin-top [transform:scale(var(--z))] [width:calc(100%/var(--z))] mx-auto landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))] overflow-visible">
{/* Page header now inside the zoom so it scales crisply */}
<header className="max-w-3xl mx-auto text-center mb-10">
  {/* Mobile: centered title with headshot on the left (balanced with a right spacer) */}
  <div className="md:hidden flex items-center justify-center gap-3">
    <img
      src="/headshot.jpg"
      alt="Dr. Juan Pablo Salerno"
      className="w-14 h-14 rounded-full object-cover border border-white/15"
    />
    <h1 className="font-serif text-5xl leading-[1.06] opacity-90">Contact</h1>
    <span className="w-14 h-14" aria-hidden /> {/* right spacer for balance */}
  </div>

  {/* Desktop: original centered title unchanged */}
  <h1 className="hidden md:block font-serif text-5xl leading-[1.06] opacity-90">Contact</h1>

  <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />
  <p className="text-base opacity-90 mt-6">
    I’m glad you’re here. Share a few details below or email{" "}
    <a
      href="mailto:contact@drjuanpablosalerno.com"
      className="underline underline-offset-4 hover:opacity-80 transition whitespace-nowrap"
    >
      contact@drjuanpablosalerno.com
    </a>.
  </p>
</header>

          {/* SINGLE form card (Consulting shell, no blur on mobile) */}
          <section className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />

            {sent ? (
              <div role="status" aria-live="polite" className="text-center py-4">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/90 text-black">✓</div>
                <p className="font-semibold opacity-95 text-lg">Got it—thanks for reaching out!</p>
                <p className="opacity-80 mt-1">I’ll follow up shortly.</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link href="/resources" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">Browse Resources</Link>
                  <Link href="/" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">Return Home</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam */}
                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5">Name</label>
                    <input type="text" name="name" required className={field} placeholder="Your name" />
                    <p className="mt-1 text-[12px] opacity-70">How you’d like to be addressed.</p>
                  </div>
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5">Email</label>
                    <input type="email" name="email" required className={field} placeholder="you@example.com" />
                    <p className="mt-1 text-[12px] opacity-70">I’ll reply here.</p>
                  </div>
                </div>

{/* Topic chips (radios) — ARIA group (no fieldset hairline) */}
<div
  role="group"
  aria-labelledby="topic-label"
  className="m-0 p-0 relative isolate before:content-[''] before:absolute before:inset-x-0 before:-top-px before:h-[0px] before:bg-[var(--color-teal-850)]"
>

  <p id="topic-label" className="block text-sm opacity-90 mb-2">Topic</p>

  {/* MOBILE version */}
  <div className="flex flex-wrap gap-2 pb-8 mt-2">
    {topics.map((t, i) => (
      <div key={t.value} className="relative">
        <input
          id={`m-topic-${i}`}
          type="radio"
          name="topic"
          value={t.value}
          defaultChecked={i === 0}
          className="peer sr-only"
        />
        <label
          htmlFor={`m-topic-${i}`}
          className={[
            "inline-flex items-center gap-2 cursor-pointer select-none",
            "rounded-full border border-white/20 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition",
            "bg-[var(--color-teal-800)] hover:bg-[var(--color-teal-800)]",
            "peer-checked:bg-[var(--color-gold)] peer-checked:text-black peer-checked:border-[var(--color-gold)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/50",
            "peer-checked:shadow-md peer-checked:-translate-y-[1px]"
          ].join(" ")}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/35 peer-checked:bg-black/70 transition" />
          {t.label}
        </label>
      </div>
    ))}
  </div>
  </div>

                <div>
                  <label className="block text-sm opacity-90 mb-1.5">Message</label>
                  <textarea name="message" rows={6} maxLength={1000} required value={message} onChange={(e) => setMessage(e.target.value)} className={field + " resize-y"} placeholder="What would you like to explore together?" />
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[12px] opacity-70">Helpful to include: goals, org/context, timeline.</p>
                    <span className="text-[12px] opacity-70">{message.length}/1000</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={loading} className={["inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3", "font-semibold uppercase tracking-wide text-sm shadow-md transition", "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50", loading ? "opacity-80 cursor-wait" : ""].join(" ")}>{loading ? "Sending…" : "Send"}</button>
                  <span className="text-xs opacity-80">I read every message personally.</span>
                </div>

                {/* Disclaimer */}
                <p className="text-xs opacity-75 leading-relaxed"><strong>Disclaimer:</strong> This website and all communications through this form are for informational, educational, and wellness purposes only. They do not constitute medical advice, diagnosis, or treatment. If you have medical or mental health concerns, please consult a qualified professional.</p>
              </form>
            )}
          </section>

                 {/* Bottom spacer */}
          <div className="pb-10" />

          {/* FINAL divider above footer — match two-column width, no bleed */}
          <div className="mx-auto max-w-[1400px] px-6">
            <hr className="hidden lg:block max-w-[1400px] border-t border-[var(--color-cream)]/22" />
          </div>

</div> {/* END zoomwrap */}

          <div className="block lg:hidden mx-auto max-w-[1100px] px-3">
            {/* (mobile newsletter + socials unchanged) */}
            {/* ... */}
          </div>

{/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
<div className="block lg:hidden">
  <div className="mx-auto max-w-[1400px] px-6 mb-14 -mt-5">
    <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
  </div>

  <div className="mobile-footer-cap">
    <div className="mx-auto max-w-[1400px] px-3">
      {/* Newsletter card (midnight blue) */}
      <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
        <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
          Science, Soul, and a Bit of Magic — Every Month
        </p>
        <p className="text-sm opacity-85 mb-3">
          Practical wisdom for modern minds — best paired with coffee and curiosity.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
          />
          <button
            type="button"
            className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Jay-style footer block */}
      <div className="mt-6 text-[13px] leading-relaxed">
        <p className="uppercase tracking-[0.18em] text-left opacity-70">
          Follow Dr. Salerno:
        </p>
        <div className="mt-3 flex items-left justify-left gap-8">
          <a href="https://www.tiktok.com/@YOURHANDLE" aria-label="TikTok" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z"/></svg>
          </a>
          <a href="https://www.instagram.com/YOURHANDLE" aria-label="Instagram" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>
          </a>
          <a href="https://www.youtube.com/@YOURHANDLE" aria-label="YouTube" className="opacity-90 hover:opacity-100">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z"/></svg>
          </a>
        </div>

        <p className="mt-5 text-left opacity-85">
          Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
        </p>

        <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>

        <p className="mt-2 mb-5 text-left opacity-85">
          <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
          <span className="mx-2 opacity-50">·</span>
          <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
          <span className="mx-2 opacity-50">·</span>
          <span>All rights reserved</span>
        </p>
      </div>
    </div>
  </div>
</div>

</div>

      {/* ============== DESKTOP (unchanged per your last version) ============== */}
      <div className="hidden lg:block mx-auto max-w-[1200px] px-6 py-20">
       {/* Page header now inside the zoom so it scales crisply */}
<header className="max-w-3xl mx-auto text-center mb-10">
  <div className="flex items-center justify-center gap-3 md:block">
    <h1 className="font-serif text-5xl leading-[1.06] opacity-90">Contact</h1>
    <img
      src="/headshot.jpg"
      alt="Dr. Juan Pablo Salerno"
      className="w-14 h-14 rounded-full object-cover border border-white/15 md:hidden"
    />
  </div>
  <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />
  <p className="text-base opacity-90 mt-6">
    I’m glad you’re here. Share a few details below or email{" "}
    <a
      href="mailto:contact@drjuanpablosalerno.com"
      className="underline underline-offset-4 hover:opacity-80 transition whitespace-nowrap"
    >
      contact@drjuanpablosalerno.com
    </a>.
  </p>
</header>


        {/* Body: form + slim info card */}
        <div className="md:grid md:grid-cols-[1fr_340px] md:gap-10">
          {/* LEFT: friendly single card form (Consulting shell) */}
          <section className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7 shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />

            {sent ? (
              <div role="status" aria-live="polite" className="text-center py-4">
                <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/90 text-black">✓</div>
                <p className="font-semibold opacity-95 text-lg">Got it—thanks for reaching out!</p>
                <p className="opacity-80 mt-1">I’ll follow up shortly.</p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <Link href="/resources" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">Browse Resources</Link>
                  <Link href="/" className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">Return Home</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam */}
                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5">Name</label>
                    <input type="text" name="name" required className={field} placeholder="Your name" />
                    <p className="mt-1 text-[12px] opacity-70">How you’d like to be addressed.</p>
                  </div>
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5">Email</label>
                    <input type="email" name="email" required className={field} placeholder="you@example.com" />
                    <p className="mt-1 text-[12px] opacity-70">I’ll reply here.</p>
                  </div>
                </div>

                {/* Topic chips (radios) */}
<div role="group" aria-labelledby="d-topic-label" className="m-0 p-0 mb-6">
  <p id="d-topic-label" className="block text-sm opacity-90 mb-2">Topic</p>
  <div className="flex flex-wrap gap-2">
    {topics.map((t, i) => (
      <div key={t.value}>
        <input
          id={`d-topic-${i}`}
          type="radio"
          name="topic"
          value={t.value}
          defaultChecked={i === 0}
          className="peer sr-only"
        />
        <label
          htmlFor={`d-topic-${i}`}
          className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 peer-checked:bg-[var(--color-gold)] peer-checked:text-black peer-checked:border-[var(--color-gold)] transition"
        >
          {t.label}
        </label>
      </div>
    ))}
  </div>
</div>


                <div className="mt-6">
                  <label className="block text-sm opacity-90 mb-1.5">Message</label>
                  <textarea name="message" rows={6} maxLength={1000} required value={message} onChange={(e) => setMessage(e.target.value)} className={field + " resize-y"} placeholder="What would you like to explore together?" />
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[12px] opacity-70">Helpful to include: goals, org/context, timeline.</p>
                    <span className="text-[12px] opacity-70">{message.length}/1000</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" disabled={loading} className={["inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3", "font-semibold uppercase tracking-wide text-sm shadow-md transition", "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50", loading ? "opacity-80 cursor-wait" : ""].join(" ")}>{loading ? "Sending…" : "Send"}</button>
                  <span className="text-xs opacity-80">I read every message personally.</span>
                </div>

                {/* Disclaimer */}
                <p className="text-xs opacity-75 leading-relaxed"><strong>Disclaimer:</strong> This website and all communications through this form are for informational, educational, and wellness purposes only. They do not constitute medical advice, diagnosis, or treatment. If you have medical or mental health concerns, please consult a qualified professional.</p>
              </form>
            )}
          </section>

          {/* RIGHT: slim info card (desktop only) — EXACT formatting preserved */}
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl md:backdrop-blur-sm p-5 hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
              {/* Mini header with larger avatar */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/25 shadow-md">
                  <img src="/headshot.jpg" alt="Dr. Juan Pablo Salerno headshot" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm opacity-85 truncate">Thanks for reaching out!</p>
                  <p className="text-xs opacity-70 truncate">I read every note personally.</p>
                </div>
              </div>

              <div className="hidden md:block h-px w-full bg-[var(--color-cream)]/15 my-4" />

              {/* Primary action: email */}
              <a href="mailto:contact@drjuanpablosalerno.com" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-gold)] text-black px-4 py-2.5 font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                  <path d="M3 7l9 6 9-6"></path>
                </svg>
                Email me directly
              </a>

              {/* Quick links */}
              <ul className="mt-4 space-y-2 text-sm relative z-10">
                <li>
                  <Link href="/newsletter" className="underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Subscribe to my newsletter →</Link>
                </li>
                <li>
                  <Link href="/meditations" className="underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Discover meditation →</Link>
                </li>
                <li>
                  <Link href="/resources" className="underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Explore resources →</Link>
                </li>
              </ul>

              <div className="mt-5 rounded-lg bg-white/4 ring-1 ring-white/10 p-3 relative z-10">
                <p className="text-xs leading-relaxed opacity-80">Prefer a short note? One or two sentences is perfect—share your goal and any timeline.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

{/* Global crisp text & iOS guard + mobile-only footer/fieldset tweaks */}
<style jsx global>{`
  @supports (-webkit-touch-callout: none) {
    html, body { background: var(--color-teal-850) !important; }
  }

  .zoomwrap,
  .zoomwrap * {
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

  @media (max-width: 767px) {
    /* Remove default Safari fieldset border/spacing on mobile */
    fieldset { border: 0 !important; padding: 0 !important; }
    fieldset legend { margin: 0; padding: 0; }
  }
`}</style>

                                      {/* Home: section/bookend divider (aligns to 1400px container) */}
<div className="hidden lg:block mx-auto max-w-[1200px] px-6 mt-12">
  <hr className="border-t border-[var(--color-cream)]/22" />
</div>
<NewsletterMeditationPopup delayMs={5000} />
    </main>
  );
}