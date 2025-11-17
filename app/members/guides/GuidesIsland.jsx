// app/members/guides/GuidesIsland.jsx
"use client";

import { useEffect, useState, useCallback } from "react";
import MembersHomeLink from "../MembersHomeLink";

const THEMES = [
  {
    id: "motivation-mindset",
    label: "Motivation & Mindset",
    blurb: "Tools to restart your drive, rebuild confidence, and shift limiting beliefs.",
  },
  {
    id: "mental-health-stress",
    label: "Mental Health & Stress Relief",
    blurb: "Evidence-based strategies to calm your nervous system and reduce overwhelm.",
  },
  {
    id: "self-compassion-healing",
    label: "Self-Compassion & Healing",
    blurb: "Guides to soften self-criticism and support emotional healing.",
  },
  {
    id: "relationships-connection",
    label: "Relationships & Connection",
    blurb: "Support for boundaries, communication, and feeling less alone.",
  },
  {
    id: "purpose-alignment",
    label: "Purpose & Alignment",
    blurb: "Reflections and exercises for finding direction and living in alignment.",
  },
  {
    id: "manifestation-intention",
    label: "Manifestation & Intention Setting",
    blurb: "Grounded, values-based approaches to creating change in your life.",
  },
  {
    id: "fengshui-environment",
    label: "Feng Shui & Environment",
    blurb: "How your physical space can support your mental and emotional wellbeing.",
  },
];

export default function GuidesIsland() {
  // mirror MembersIsland footer behavior
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);

  useEffect(() => {
    document.body.classList.add("hide-footer-on-members");
    return () =>
      document.body.classList.remove("hide-footer-on-members");
  }, []);

  const handleNewsletterSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (nlSubmitting || nlSubscribed) return;

      setNlSubmitting(true);
      const form = new FormData(e.currentTarget);
      const email = (form.get("email") || "").toString().trim();

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email.");
        setNlSubmitting(false);
        return;
      }

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Subscribe failed:", data);
          alert("Something went wrong. Please try again.");
        } else {
          setNlSubscribed(true);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("Network error. Please try again.");
      } finally {
        setNlSubmitting(false);
      }
    },
    [nlSubmitting, nlSubscribed]
  );

  return (
     <main
      data-page="members"
      className="mx-auto max-w-[1100px] px-6 py-10 mt-10"
    >
      <MembersHomeLink className="mb-6" />

      {/* HEADER */}
      <section className="mb-10">
        <h1 className="mt-2 font-serif text-4xl md:text-5xl text-[var(--color-cream)]">
          Mental Health & Alignment Guides
        </h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-[var(--color-cream)]/80">
          In-depth guides that you can return to anytime. Start with the latest guide below,
          or explore by theme to find the support that fits what you&apos;re moving through right now.
        </p>
      </section>

      {/* FEATURED LATEST GUIDE */}
      <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
              <span>Latest Guide</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl text-[var(--color-cream)]">
              Integrating Personal Growth Practices to Improve Your Mental Health
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--color-cream)]/85">
              A practical, approachable guide to weaving personal growth tools into your everyday life
              so they actually support your mental health, instead of becoming another thing on your
              to-do list. Designed to be revisited whenever you feel off-center or stuck.
            </p>
            <p className="mt-3 text-xs md:text-[13px] text-[var(--color-cream)]/70">
              Estimated time: 10–15 minutes • Format: Interactive guide
            </p>
          </div>

<div className="flex-1">
  <a
    href="https://integrating-personal-gro-bj4hbn8.gamma.site/"
    target="_blank"
    rel="noopener noreferrer"
    className="group block h-full"
    aria-label="Open the full Integrating Personal Growth Practices guide in a new tab"
  >
    <div className="flex h-full flex-col justify-between rounded-xl bg-[var(--color-cream)] text-slate-900 shadow-[0_10px_35px_rgba(0,0,0,0.55)] border border-white/40 px-5 py-6">
      <div>
        {/* Top pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600" />
          <span>Interactive Guide</span>
        </div>

        {/* Faux page preview */}
        <div className="mt-4 rounded-lg bg-white/80 border border-slate-200 px-4 py-3 shadow-inner">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Preview
          </p>
          <p className="mt-2 text-sm font-serif leading-snug text-slate-900">
            Integrating Personal Growth Practices
          </p>
          <p className="text-sm font-serif leading-snug text-slate-900">
            to Improve Your Mental Health
          </p>

          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-11/12 rounded-full bg-slate-200" />
            <div className="h-1.5 w-10/12 rounded-full bg-slate-200" />
            <div className="h-1.5 w-9/12 rounded-full bg-slate-200" />
            <div className="h-1.5 w-7/12 rounded-full bg-slate-200" />
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>5–10 min • Interactive</span>
            <span className="inline-flex items-center gap-1">
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA row */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-[11px] md:text-xs text-slate-600">
          Click to open the full-screen guide in a new tab.
        </span>
        <span className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-3 py-1 text-[11px] md:text-xs font-semibold tracking-wide group-hover:brightness-110 group-active:translate-y-[1px]">
          View full guide →
        </span>
      </div>
    </div>
  </a>
</div>




        </div>
      </section>

      {/* ALL GUIDES BY THEME */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/70">
          All Guides by Theme
        </h3>
        <p className="mt-2 mb-5 text-sm md:text-base text-[var(--color-cream)]/75">
          As the library grows, you&apos;ll find all guides organized into the same themes as your
          meditation and social media resource libraries. For now, you can start with the latest guide
          above—more deep dives are on the way.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {THEMES.map((theme) => (
            <article
              key={theme.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
            >
              <div>
                <h4 className="font-semibold text-[var(--color-cream)]">
                  {theme.label}
                </h4>
                <p className="mt-2 text-xs md:text-sm text-[var(--color-cream)]/75">
                  {theme.blurb}
                </p>
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)]/55">
                Additional guides coming soon
              </p>
            </article>
          ))}
        </div>
      </section>

            {/* ===== CUSTOM MEMBERS FOOTER (matches Contact) ===== */}

      {/* Divider (mobile/desktop) */}
      <div className="mx-auto w-full px-0 mt-10">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer block (newsletter + socials + bio + legal) */}
      <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-0">
        <div className="mx-auto w-full px-0">
          {/* Newsletter card */}
          <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-6">
            <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">Science, Soul, and a Bit of Magic — Every Month</p>
            <p className="text-sm opacity-85 mb-3">Practical wisdom for modern minds — best paired with coffee and curiosity.</p>

            {nlSubscribed ? (
              <div className="flex gap-2">
                <div className="flex-1 rounded-md border border-[var(--color-gold)]/90 text-[var(--color-gold)]/90 px-3 py-2 font-semibold text-center cursor-default select-none">Thank you!</div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="flex gap-2">
                  <input type="email" name="email" required placeholder="you@example.com" className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50" />
                  <button type="submit" disabled={nlSubmitting} className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold">{nlSubmitting ? "Sending…" : "Subscribe"}</button>
                </div>
              </form>
            )}
          </div>

          {/* Socials + bio + legal (mobile) */}
          <div className="mt-6 text-[13px] leading-relaxed">
            <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
            <div className="mt-3 flex items-left justify-left gap-8">
              <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" /></svg>
              </a>
       <a
  href="https://www.instagram.com/drjuanpablosalerno/"
  aria-label="Instagram"
  className="opacity-90 hover:opacity-100"
>
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
</a>

              <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" /></svg>
              </a>
            </div>

            <p className="mt-5 text-left opacity-85">                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.</p>

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


      {/* Desktop footer row (socials + bio / legal) */}
      <div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 text-[13px] leading-relaxed opacity-85">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-4">
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">Follow Dr. Salerno:</p>
            <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" /></svg>
            </a>
<a
  href="https://www.instagram.com/drjuanpablosalerno/"
  aria-label="Instagram"
  className="opacity-90 hover:opacity-100"
>
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
</a>

            <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" /></svg>
            </a>
          </div>
          <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed">Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.</p>
        </div>

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

      {/* GLOBAL PAGE-SPECIFIC STYLES (hide site footer, tidy spacing) */}
      <style jsx global>{`
        /* Hide the global site footer ONLY on /members */
        body:has(main[data-page="members"]) :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
        /* Prevent autofill white background on email field (newsletter input) */
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover {
          -webkit-box-shadow: 0 0 0px 1000px #0d1d2d inset !important;
          -webkit-text-fill-color: var(--color-cream) !important;
          caret-color: var(--color-cream) !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        /* iOS Safari flicker fix for media */
        img, video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </main>
  );
}
