// app/contact/page.js
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import HeroImageIphoneAware from "../../components/HeroImageIphoneAware";
import { useIosZoomVars } from "../../components/useIosZoom";

export default function ContactPage() {
  // iOS zoom controller (portrait 3.0, landscape 1.3)
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.00 });

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

    // TODO: wire to real backend
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
    <>
      <div className="mx-auto">
        <main data-page="contact" className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] min-h-screen md:min-h-0 narrow-landscape-70 mt-16">

          

          {/* ============== MOBILE (zoom lives INSIDE here) ============== */}
          <div className="lg:hidden mx-auto max-w-[1400px] px-3 pt-16 pb-0 narrow-landscape-80">
            <div
              ref={wrapRef}
              className={`zoomwrap lg:contents origin-top
                data-[zoom=on]:[transform:scale(var(--z))] data-[zoom=on]:[width:calc(100%/var(--z))]
                mx-auto
                lg:[transform:none] lg:[width:100%]
                landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))]
                landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))]
                overflow-visible`}
            >
              {/* Header */}
              <header className="max-w-3xl mx-auto text-center mb-10">
                <div className="md:hidden">
                  <h1 className="font-serif text-5xl leading-[1.06] opacity-90 text-center">Contact</h1>
                  <span className="w-14 h-14" aria-hidden />
                </div>

                <h1 className="hidden md:block font-serif text-5xl leading-[1.06] opacity-90">Contact</h1>
                <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 md:mt-4 rounded" />
                <p className="text-base opacity-90 mt-6 narrow-landscape-80">
                  I’m glad you’re here. Share a few details below or email{" "}
                  <a
                    href="mailto:contact@drjuanpablosalerno.com"
                    className="underline underline-offset-4 hover:opacity-80 transition whitespace-nowrap"
                  >
                    contact@drjuanpablosalerno.com
                  </a>.
                </p>
              </header>

              {/* SINGLE form card (mobile) — same width as divider + footer below */}
              <div className="mx-auto w-full max-w-[700px] px-3 narrow-landscape-80">
                <section className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />

                  {sent ? (
                    <div role="status" aria-live="polite" className="text-center py-4">
                      <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/90 text-black">
                        ✓
                      </div>
                      <p className="font-semibold opacity-95 text-lg">Got it—thanks for reaching out!</p>
                      <p className="opacity-80 mt-1">I’ll follow up shortly.</p>

                      <div className="mt-6 flex items-center justify-center gap-3">
                        <Link
                          href="/resources"
                          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                        >
                          Browse Resources
                        </Link>
                        <Link
                          href="/"
                          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                        >
                          Return Home
                        </Link>
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

                      {/* Topic chips (radios) — MOBILE */}
                      <div role="group" aria-labelledby="topic-label" className="m-0 p-0">
                        <p id="topic-label" className="block text-sm opacity-90 mb-2 narrow-landscape-80">
                          Topic
                        </p>
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
                                  "peer-checked:shadow-md peer-checked:-translate-y-[1px]",
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
                        <textarea
                          name="message"
                          rows={6}
                          maxLength={1000}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className={field + " resize-y"}
                          placeholder="What would you like to explore together?"
                        />
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-[12px] opacity-70">Helpful to include: goals, org/context, timeline.</p>
                          <span className="text-[12px] opacity-70">{message.length}/1000</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className={[
                            "inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3",
                            "font-semibold uppercase tracking-wide text-sm shadow-md transition",
                            "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50",
                            loading ? "opacity-80 cursor-wait" : "",
                          ].join(" ")}
                        >
                          {loading ? "Sending…" : "Send"}
                        </button>
                        <span className="text-xs opacity-80">I read every message personally.</span>
                      </div>

                      {/* Disclaimer */}
                      <p className="text-xs opacity-75 leading-relaxed">
                        <strong>Disclaimer:</strong> This website and all communications through this form are for informational,
                        educational, and wellness purposes only. They do not constitute medical advice, diagnosis, or treatment. If
                        you have medical or mental health concerns, please consult a qualified professional.
                      </p>
                    </form>
                  )}
                </section>

                {/* spacer */}
                <div className="pb-10" />

<div className="mx-auto w-full px-0 [@media(orientation:portrait)_and_(min-width:700px)_and_(max-width:950px)]:w-[85vw]">
  <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
</div>


                {/* Mobile footer block (same width as form/divider) */}
          <div className="max-w-[900px] mobile-footer-cap narrow-landscape-70 [@media(orientation:portrait)_and_(min-width:700px)_and_(max-width:950px)]:w-[70vw] mx-auto">

                  <div className="mx-auto w-full px-0">
                    {/* Newsletter card */}
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
                      <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
                      <div className="mt-3 flex items-left justify-left gap-8">
                        <a
                          href="https://www.tiktok.com/@YOURHANDLE"
                          aria-label="TikTok"
                          className="opacity-90 hover:opacity-100"
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                            <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/YOURHANDLE"
                          aria-label="Instagram"
                          className="opacity-90 hover:opacity-100"
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.youtube.com/@YOURHANDLE"
                          aria-label="YouTube"
                          className="opacity-90 hover:opacity-100"
                        >
                          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                            <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
                          </svg>
                        </a>
                      </div>

                      <p className="mt-5 text-left opacity-85">
                        Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and
                        professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
                      </p>

                      <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>

                      <p className="mt-2 mb-5 text-left opacity-85">
                        <a href="/terms" className="underline underline-offset-4 hover:opacity-80">
                          Terms
                        </a>
                        <span className="mx-2 opacity-50">·</span>
                        <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
                          Privacy
                        </a>
                        <span className="mx-2 opacity-50">·</span>
                        <span>All rights reserved</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* end mobile zoom content */}
            </div>
          </div>

          {/* ============== DESKTOP (unchanged layout) ============== */}
          <div className="hidden lg:block mx-auto max-w-[1200px] px-6 py-2">
            {/* Page header */}
            <header className="max-w-3xl mx-auto text-center mb-10">
              <div className="flex items-center justify-center gap-3 md:block">
                <h1 className="font-serif text-6xl leading-[1.06] opacity-90">Contact</h1>
                <HeroImageIphoneAware
                  src="/headshot.jpg"
                  alt="Dr. Juan Pablo Salerno"
                  width={800}
                  height={800}
                  className="w-14 h-14 rounded-full object-cover border border-white/15 md:hidden"
                  sizes="56px"
                  priority
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
<div className="md:grid md:grid-cols-[1fr_460px] md:gap-6">
              {/* LEFT: form */}
              <section className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7 shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
                <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />

                {sent ? (
                  <div role="status" aria-live="polite" className="text-center py-4">
                    <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-gold)]/90 text-black">
                      ✓
                    </div>
                    <p className="font-semibold opacity-95 text-lg">Got it—thanks for reaching out!</p>
                    <p className="opacity-80 mt-1">I’ll follow up shortly.</p>

                    <div className="mt-6 flex items-center justify-center gap-3">
                      <Link
                        href="/resources"
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Browse Resources
                      </Link>
                      <Link
                        href="/"
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Return Home
                      </Link>
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

                    {/* Topic chips (radios) — DESKTOP */}
                    <div role="group" aria-labelledby="d-topic-label" className="m-0 p-0 mb-6">
                      <p id="d-topic-label" className="block text-sm opacity-90 mb-2">
                        Topic
                      </p>
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
                      <textarea
                        name="message"
                        rows={6}
                        maxLength={1000}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={field + " resize-y"}
                        placeholder="What would you like to explore together?"
                      />
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-[12px] opacity-70">Helpful to include: goals, org/context, timeline.</p>
                        <span className="text-[12px] opacity-70">{message.length}/1000</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className={[
                          "inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3",
                          "font-semibold uppercase tracking-wide text-sm shadow-md transition",
                          "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50",
                          loading ? "opacity-80 cursor-wait" : "",
                        ].join(" ")}
                      >
                        {loading ? "Sending…" : "Send"}
                      </button>
                      <span className="text-xs opacity-80">I read every message personally.</span>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs opacity-75 leading-relaxed">
                      <strong>Disclaimer:</strong> This website and all communications through this form are for informational,
                      educational, and wellness purposes only. They do not constitute medical advice, diagnosis, or treatment. If
                      you have medical or mental health concerns, please consult a qualified professional.
                    </p>
                  </form>
                )}
              </section>

<aside className="hidden md:block">
  <div className="sticky top-24 space-y-5">
    {/* Popup-style card (wider, sharper image, no socials) */}
    <div className="relative w-full rounded-xl overflow-hidden p-[2px] bg-[#0d1d2d] text-[var(--color-cream)] ring-1 ring-white/10 shadow-[0_6px_25px_rgba(0,0,0,0.45)] hover:bg-[#102438] transition">
      <div className="grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr]">
        {/* Photo (sharper via Next image wrapper) */}
        <div className="h-full w-full bg-black/20">
          <HeroImageIphoneAware src="/bwhero20a.jpg" alt="Dr. Juan Pablo Salerno" width={900} height={1200} className="h-full w-full object-cover object-center rounded-l-xl" sizes="(min-width: 1024px) 190px, 150px" quality={95} loading="lazy" />
        </div>

        {/* Copy + form only */}
        <div className="p-5">
          <p className="text-[14px] md:text-[17px] opacity-90">I’d be honored if you joined my monthly newsletter, <span className="italic">Science, Soul, and a Bit of Magic</span>, for practical wisdom (with a little cheek) to nourish your body, mind, and spirit.</p>
          <div className="mt-4 space-y-3">
            <input type="email" placeholder="you@example.com" className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder-white/60 focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 text-[15px]" />
            <button type="button" className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-4 py-3 font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>

            </div>

{/* Bookend divider (desktop) */}
<div className="hidden lg:block mx-auto max-w-[1200px] px-6 mt-15">
  <hr className="border-t border-[var(--color-cream)]/22" />
</div>

{/* Footer row: left = socials/bio, right = legal */}
<div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 text-[13px] leading-relaxed opacity-85">
  {/* LEFT side — socials + bio */}
  <div className="flex flex-col items-start text-left">
    <div className="flex items-center gap-4">
      <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">Follow Dr. Salerno:</p>
      <a href="https://www.tiktok.com/@YOURHANDLE" aria-label="TikTok" className="opacity-90 hover:opacity-100">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
        </svg>
      </a>
      <a href="https://www.instagram.com/YOURHANDLE" aria-label="Instagram" className="opacity-90 hover:opacity-100">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
        </svg>
      </a>
      <a href="https://www.youtube.com/@YOURHANDLE" aria-label="YouTube" className="opacity-90 hover:opacity-100">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
        </svg>
      </a>
    </div>
    <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed">
      Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited
      with more than 30 peer-reviewed publications and over 2,000 citations.
    </p>
  </div>


  {/* RIGHT side — legal info */}
  <div className="text-left translate-y-[-4px]">
    <p>© Dr. Juan Pablo Salerno™</p>
    <p className="mt-1">
      <span>All rights reserved</span>
      <span className="mx-2 opacity-50">·</span>
      <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
      <span className="mx-2 opacity-50">·</span>
      <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
    </p>
  </div>
</div>







          </div>

          {/* Global crisp text & iOS guard */}
          <style jsx global>{`
            @supports (-webkit-touch-callout: none) {
              html,
              body {
                background: var(--color-teal-850) !important;
              }
            }
            .zoomwrap,
            .zoomwrap * {
              -webkit-font-smoothing: antialiased;
              text-rendering: geometricPrecision;
            }
            @media (max-width: 767px) {
              fieldset {
                border: 0 !important;
                padding: 0 !important;
              }
              fieldset legend {
                margin: 0;
                padding: 0;
              }
}

/* CONTACT — iPad / iPad mini LANDSCAPE: collapse space above the blue card */
@media (orientation: landscape) and (min-width: 1000px) {
  /* 1) Kill the margin stack around the divider wrapper (had mb-14 and -mt-5) */
  [data-page="contact"] .block.lg\:hidden .mx-auto.max-w-\[1000px\].px-6 {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }

  /* 2) Shrink the earlier spacer just before the divider (was pb-10) */
  [data-page="contact"] .lg\:hidden .pb-10 {
    padding-bottom: 0.25rem !important;
  }

  /* 3) Nudge the blue newsletter card up (was mt-10) */
  [data-page="contact"] .mobile-footer-cap .rounded-xl:first-of-type {
    margin-top: 0.5rem !important;
  }

  /* CONTACT — hide the global site footer only on this page */
body:has(main[data-page="contact"]) :is(footer, .site-footer, [role="contentinfo"]) {
  display: none !important;
}
}


          `}</style>
        </main>
      </div>


    </>
  );
}
