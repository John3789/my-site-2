// app/members/MembersIsland.jsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";


export default function MembersIsland() {
  const [signingOut, setSigningOut] = useState(false);

  // Newsletter state (mirrors Contact)
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);

  // Optional: body class hook (kept simple; data-page selector does the heavy lifting)
  useEffect(() => {
    document.body.classList.add("hide-footer-on-members");
    return () => document.body.classList.remove("hide-footer-on-members");
  }, []);

  const handleNewsletterSubmit = useCallback(async (e) => {
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
  }, [nlSubmitting, nlSubscribed]);

  const handleSignOut = useCallback(async (e) => {
    e.preventDefault();
    if (signingOut) return;
    setSigningOut(true);

    const ms = (typeof window !== "undefined" && (window.$memberstack || window.memberstack || window.Memberstack)) || null;

    const msLogout = async () => {
      try {
        if (ms?.logout) return await ms.logout();
        if (ms?.signOut) return await ms.signOut();
      } catch {}
    };

const appSignout = async () => {
  try {
    await fetch("/api/auth/signout", { method: "POST", keepalive: true });
  } catch {}
};

await Promise.allSettled([msLogout(), appSignout()]);

// 🔹 Clear the "already checked member" flag in this tab (optional but tidy)
if (typeof window !== "undefined") {
  window.__salernoMemberOk = false;
}

window.location.href = "/membership";

  }, [signingOut]);

  return (
    <main data-page="members" className="mx-auto max-w-[1100px] px-6 py-10 mt-10">
      {/* HERO */}

      <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 shadow-2xl mt-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)]/5 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">Active Member</div>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">Welcome to RISE ✨</h1>
            <p className="mt-1 text-sm md:text-base opacity-80">Your space to realign and grow.</p>
            <p className="mt-3 text-base md:text-lg opacity-85">Start with the newest RISE meditation, or explore your perks: guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, discounted custom meditations with vision calls, and more.</p>
            <div className="mt-6 flex flex-wrap gap-3">
  <Link
    href="/members/meditations"
    className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
  >
    Start meditation
  </Link>
</div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
<Card
  href="/members/meditations"
  icon="🧘"
  title="Meditation Library"
  desc="Guided sessions for calm, clarity, motivation, compassion, and purpose."
/>
          <Card href="/resources" icon="📚" title="Social Media Inspiration Space" desc="Curated posts and reframes by theme. Find the prompt that shifts your day." />
          <Card href="/members/weekly-wisdom" icon="✉️" title="Weekly Wisdom Collection" desc="Short, uplifting nudges to keep you moving—one each week." />
          <Card href="/members/guides" icon="📄" title="Mental Health & Alignment Guides" desc="A digestible 1–2 page guide with practical insights you can use today." />
          <Card href="/members/live-sessions" icon="📅" title="Monthly Live Inner Growth Sessions" desc="Join the next live reset and Q&A. Recordings available until the next session." />
          <Card href="/members/ai" icon={<img src="/headshot.jpg" alt="Dr. Juan Pablo Salerno" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15 -mt-2" />} title="Dr. Salerno AI Advisor" desc="Seek guidance from my AI self — grounded in my approach, insights, and tools." />
          <Card href="/members/custom-meditation" icon="📿" title="Custom Meditations + Vision Calls" desc="Personalized audio (5, 10, 15 min) + a complimentary 30-minute Vision Call." />
          <Card href="/contact" icon="🛟" title="Support & Contact" desc="Reach out anytime with questions or concerns about your membership or benefits." />
          <Card href="/account" icon="💳" title="Account & Billing" desc="Update payment details, personal info, password, and more." />
        </div>
      </section>

      {/* WHAT'S NEW */}
      <section className="mt-10 rounded-2xl bg-white/[0.06] ring-1 ring-[var(--color-gold)]/50 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <h2 className="text-lg font-bold text-[var(--color-gold)]">What’s new</h2>
        <div className="mt-3 space-y-2">
          <UpdateItem label="New Meditation" title="5-Minute Reset (All Levels)" date="Nov 10, 2025" href="/members/resources#reset" />
          <UpdateItem label="New Weekly Wisdom" title="How to reset on low-energy days" date="Nov 7, 2025" href="/members/resources#wisdom" />
          <UpdateItem label="Upcoming Live Session" title="November session — details posted" date="Nov 5, 2025" href="/members/live" />
        </div>
      </section>

      {/* SIGN OUT */}
      <div className="mt-8">
        <button onClick={handleSignOut} data-ms-action="logout" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-left disabled:opacity-60 opacity-80" disabled={signingOut}>{signingOut ? "🚪 Signing out…" : "🚪 Sign out"}</button>
      </div>

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
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.</p>
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

/* ===== Subcomponents ===== */

function Card({ href, icon, title, desc }) {
  return (
    <Link href={href} aria-label={`${title} — ${desc}`} className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition">
      <div className="text-2xl leading-none">{icon}</div>
      <div className="mt-1 text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm opacity-80">{desc}</div>
      <div className="mt-2 text-sm opacity-70 transition group-hover:translate-x-0.5">Explore →</div>
    </Link>
  );
}

function UpdateItem({ label, title, date, href }) {
  return (
    <Link href={href} className="group relative flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 pl-5 hover:bg-white/[0.08] hover:border-[var(--color-gold)]/40 transition">
      <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-[var(--color-gold)]/60" aria-hidden="true"></span>
      <div className="flex-1">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)]/5 px-2.5 py-0.5 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">{label}</span>
        </div>
        <div className="mt-1 text-sm font-medium text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition">{title}</div>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs opacity-80">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/70"></span>
        {date}
      </div>
    </Link>
  );
}
