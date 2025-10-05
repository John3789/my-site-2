// app/contact/page.js
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      {/* ===== MOBILE ZOOM WRAPPER (mirrors your other pages) ===== */}
      <div
        style={{ "--z": 3.0, "--zoomL": 1.60 }}
        className={`
          zoomwrap
          md:contents
          origin-top
          [transform:scale(var(--z))] [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none] md:[width:100%]
          landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
          overflow-visible
        `}
      >
        {/* Header / Intro */}
        <header className="mx-auto max-w-[1200px] px-6 pt-16 pb-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            {/* Headshot avatar */}
            <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/20 shadow">
              <img
                src="/images/your-headshot.jpg" // ← set your real path
                alt="Dr. Juan Pablo Salerno headshot"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl leading-[1.06] opacity-90">
              Contact
            </h1>
          </div>

          <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mt-4 rounded md:ml-[3.25rem]" />

          <p className="text-lg opacity-90 max-w-3xl mt-6">
            For consulting, meditations, speaking, media, and collaborations, please share a few
            details below or email{" "}
            <a
              href="mailto:contact@drjuanpablosalerno.com"
              className="underline underline-offset-4 hover:opacity-80 transition whitespace-nowrap"
            >
              contact@drjuanpablosalerno.com
            </a>.
          </p>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-[1200px] px-6 pb-20">
          {/* Keep single-column; breathe on desktop with max-w */}
          <div className="w-full md:max-w-[820px]">
            {sent ? (
              <div
                className="rounded-md bg-black/20 border border-white/10 p-6"
                role="status"
                aria-live="polite"
              >
                <p className="font-semibold opacity-90">
                  Thanks! Your message was received and I’ll follow up soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="company"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60
                                 focus:ring-2 focus:ring-[var(--color-gold)]/35 focus:border-[var(--color-gold)]/60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm opacity-90 mb-1.5" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60
                                 focus:ring-2 focus:ring-[var(--color-gold)]/35 focus:border-[var(--color-gold)]/60"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm opacity-90 mb-1.5" htmlFor="topic">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none
                               focus:ring-2 focus:ring-[var(--color-gold)]/35 focus:border-[var(--color-gold)]/60"
                    defaultValue="Consulting"
                  >
                    <option className="bg-[var(--color-teal-900)]" value="Consulting">
                      Consulting
                    </option>
                    <option className="bg-[var(--color-teal-900)]" value="Speaking">
                      Speaking
                    </option>
                    <option className="bg-[var(--color-teal-900)]" value="Meditations">
                      Meditations
                    </option>
                    <option className="bg-[var(--color-teal-900)]" value="Media">
                      Media / Press
                    </option>
                    <option className="bg-[var(--color-teal-900)]" value="Collaborations">
                      Collaborations
                    </option>
                    <option className="bg-[var(--color-teal-900)]" value="Other">
                      Another Inquiry
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm opacity-90 mb-1.5" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60
                               focus:ring-2 focus:ring-[var(--color-gold)]/35 focus:border-[var(--color-gold)]/60"
                    placeholder="How can I help?"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                             font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
                >
                  Send
                </button>

                {/* Friendly, compact disclaimer */}
                <p className="text-xs opacity-80 mt-4 max-w-xl leading-relaxed">
                  <strong>Disclaimer:</strong> This site and messages sent here are for informational
                  and wellness purposes only and do not constitute medical advice. If you have medical
                  or mental health concerns, please consult a qualified professional.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Global crisp text & iOS background guard (same pattern as other pages) */}
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
      `}</style>
    </main>
  );
}
