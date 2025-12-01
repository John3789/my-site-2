// app/members/live-sessions/page.jsx
"use client";

import { useRef } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";
import MembersHomeLink from "../MembersHomeLink";

// 🔧 Update these details each month
const NEXT_SESSION = {
  dateLabel: "Sunday, December 15, 2025",
  timeLabel: "7:00 – 8:15 pm (your local time)",
  duration: "75 minutes",
  registrationUrl: "", // ← paste your Zoom registration link here when ready
};

const THEME_OF_MONTH = {
  title: "Releasing Emotional Noise and Returning to Your Inner Compass",
  description:
    "This month, we’ll gently clear mental clutter, reconnect with your inner wisdom, and reset the emotional patterns that keep you feeling stuck. You’ll leave with practical tools you can use whenever you need to recenter.",
};

// Set this to true once you have a replay ready and add the video embed src.
const HAS_REPLAY = false;

export default function LiveSessionsPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 1.0, landscapeZoom: 1.0 });

  return (
    <div ref={wrapRef}>
      <TopOnMount />
      <main className="mx-auto w-full max-w-[880px] px-6 pb-16 pt-10 space-y-8">
        {/* HEADER */}
<div className="sticky top-0 z-30 flex justify-start">
  <MembersHomeLink
    className="mb-0 mt-9 inline-flex items-center rounded-full border border-[var(--color-gold)] bg-transparent px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.14em] text-[var(--color-gold)] backdrop-blur-sm"
  />
</div>
        <header>
  
          <h1 className="mx-auto text-center font-serif mt-3 text-4xl md:text-5xl font-semibold leading-tight text-[var(--color-cream)]">
            Monthly Live Inner Growth Sessions
          </h1>
                    <div className="mx-auto mt-3 mb-4 h-[2px] w-16 rounded bg-[var(--color-gold)]/85" />

          <p className="mx-auto max-w-[735px] text-center mt-4 text-sm leading-relaxed text-[var(--color-cream)]/80">
            A live reset, Q&amp;A, and guided inner work experience to help you realign, release what is
            weighing you down, and rise with more clarity and strength. Included with your membership.
            Recordings remain available until the next live session.
          </p>
        </header>

        {/* 1. MAIN OVERVIEW CARD — next session + theme + what to expect */}
        <section className="rounded-2xl bg-white/[0.06] ring-1 ring-[var(--color-gold)]/55 p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          {/* Top row: label + date/time + button */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-cream)]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-gold)]">
                Next Live Session
              </div>
              <p className="mt-3 text-sm font-medium text-[var(--color-cream)]">
                {NEXT_SESSION.dateLabel}
              </p>
              <p className="mt-1 text-sm text-[var(--color-cream)]/80">
                {NEXT_SESSION.timeLabel}
              </p>
              <p className="mt-1 text-xs text-[var(--color-cream)]/70">
                Approx. duration: {NEXT_SESSION.duration}
              </p>
            </div>

            <div className="mt-1 w-full max-w-[260px] md:mt-0">
              {NEXT_SESSION.registrationUrl ? (
                <a
                  href={NEXT_SESSION.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-[#f7d77c]"
                >
                  Register for the Session
                </a>
              ) : (
                <div className="rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-xs text-[var(--color-cream)]/75">
                  The Zoom registration link will appear here once the next session is scheduled.
                </div>
              )}
              <p className="mt-3 text-[11px] leading-snug text-[var(--color-cream)]/60">
                After you register, Zoom will email you a personal join link, calendar invite, and reminders.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-6 h-px w-full bg-[var(--color-cream)]/10" />

          {/* Theme + What to Expect */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1.1fr]">
            {/* Theme */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Theme of the Month
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--color-cream)]">
                {THEME_OF_MONTH.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/80">
                {THEME_OF_MONTH.description}
              </p>
            </div>

            {/* What to Expect */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                What to Expect
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/80">
                Each session blends science-informed tools with grounded spiritual practices. You can keep your
                camera off and simply receive, or participate more actively when it feels right.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-cream)]/82">
                <li>• Gentle grounding and nervous system reset</li>
                <li>• Guided inner growth practice or visualization</li>
                <li>• Short teaching around the monthly theme</li>
                <li>• Space for questions and reflections</li>
                <li>• Clear, simple next steps to carry into your week</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. BEFORE THE SESSION */}
        <section className="rounded-2xl bg-[var(--color-teal-850)]/85 ring-1 ring-white/10 p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="md:max-w-[55%]">
              <h2 className="text-lg font-semibold text-[var(--color-cream)]">Before the Session</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/80">
                A few minutes of preparation can completely change how the session lands in your body and mind.
                Think of this as your small ritual to step out of everyday noise and into intentional time with yourself.
              </p>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-[var(--color-cream)]/88 md:max-w-[45%]">
              <li>✓ Choose a quiet, comfortable space where you won&apos;t be interrupted.</li>
              <li>✓ Bring headphones if possible for a more immersive experience.</li>
              <li>✓ Have water or tea nearby.</li>
              <li>✓ Keep a journal and pen within reach.</li>
              <li>✓ Optional: light a candle or incense to mark this as time just for you.</li>
              <li>✓ Take 2–3 deep breaths and set one simple intention for the session.</li>
            </ul>
          </div>
        </section>

        {/* 3. AFTER THE SESSION */}
        <section className="rounded-2xl bg-white/[0.05] ring-1 ring-white/12 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-[var(--color-cream)]">After the Session</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/80">
            The real transformation shows up in how you live with what came up for you. Use these simple steps
            to integrate the work into your day-to-day life.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="space-y-3 text-sm text-[var(--color-cream)]/86">
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-gold)]">1. Ground and Notice</p>
                <p className="mt-1 leading-relaxed">
                  Take a few minutes after the call to sit quietly. Notice how your body feels, what emotions are
                  present, and what feels a little lighter or clearer than before.
                </p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-gold)]">2. Journal Prompts</p>
                <ul className="mt-1 space-y-1">
                  <li>• What stood out to me most from this session?</li>
                  <li>• What am I ready to gently release or soften?</li>
                  <li>• What new belief, habit, or boundary am I choosing to practice this month?</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[var(--color-cream)]/86">
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-gold)]">3. One Tiny Action</p>
                <p className="mt-1 leading-relaxed">
                  Choose one small action you can take in the next 24 hours that aligns with your intention from the
                  session. Keep it simple and doable so your nervous system can say “yes.”
                </p>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-gold)]">4. Revisit the Practice</p>
                <p className="mt-1 leading-relaxed">
                  If a particular part of the session resonated, revisit the replay or repeat the exercise on your own
                  at least once more this week to deepen the shift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. REPLAY ACCESS */}
        <section className="rounded-2xl bg-[var(--color-teal-850)]/85 ring-1 ring-white/12 p-6 md:p-7">
          <h2 className="text-lg font-semibold text-[var(--color-cream)]">Replay Access</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/80">
            If you can&apos;t attend live, you can watch the replay here. Recordings are available until the next
            session is released.
          </p>

          {HAS_REPLAY ? (
            <div className="mt-5 overflow-hidden rounded-xl border border-white/15 bg-black/60">
              {/* Replace the video src below with your private hosting link (Vimeo, Loom, etc.) */}
              <video controls className="aspect-video w-full">
                <source src="https://example.com/your-session-replay.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-white/25 bg-white/5 px-4 py-4 text-sm text-[var(--color-cream)]/75">
              The latest replay will appear here within 24 hours after our next live session.
            </div>
          )}

          <p className="mt-3 text-[11px] leading-snug text-[var(--color-cream)]/60">
            Please keep this replay private. It is shared exclusively for RISE members and should not be downloaded
            or distributed.
          </p>
        </section>

{/* QUESTIONS / CONTACT */}
<div className="mt-4 text-center">
  <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
    Have any questions?{" "}
    <a
      href="/contact"
      className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90"
    >
      Contact Dr. Salerno
    </a>
  </p>
</div>

      {/* Divider ABOVE footer, matching membership/meditations */}
      <div className="mx-auto max-w-[1200px] px-6 mt-12">
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
              href="https://www.youtube.com/drjuanpablosalerno"
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
  );
}
