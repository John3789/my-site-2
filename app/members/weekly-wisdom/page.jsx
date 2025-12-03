// app/members/weekly-wisdom/page.jsx
import Link from "next/link";
import { weeklyWisdomEmails } from "./weeklyWisdomData";
import MembersHomeLink from "../MembersHomeLink";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function WeeklyWisdomPage() {
  const hasEmails = weeklyWisdomEmails.length > 0;
  const featured = hasEmails ? weeklyWisdomEmails[0] : null;
  const recent = hasEmails ? weeklyWisdomEmails.slice(1, 11) : [];

  return (
    <main
      data-page="members"
      className="mx-auto max-w-[1100px] px-6 py-12 mt-7"
    >
          {/* Sticky Members Home button */}
<div className="ml-8 sticky top-8 z-30 flex justify-start">
  <MembersHomeLink
    className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-transparent px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.14em] text-[var(--color-gold)] backdrop-blur-sm"
  />
</div>
   {/* PAGE HEADER */}
  <header>

    <h1 className="mx-auto mt-5 font-serif text-5xl md:text-6xl tracking-tight leading-tight text-[var(--color-cream)] text-center">
      {hasEmails ? "Weekly Wisdom Collection" : "Weekly Wisdom"}
    </h1>
          <div className="mx-auto text-center mt-4 mb-6 h-[2px] w-16 rounded bg-[var(--color-gold)]/85" />

    {hasEmails ? (
      <p className="mx-auto text-center mt-3 max-w-[720px] text-sm md:text-base text-[var(--color-cream)]/80">
        Concise reflections by Dr. Salerno you can return to anytime. Start with the this week's wisdom
        below, or browse notes from previous weeks for the one that fits what you&apos;re moving through
        right now.
      </p>
    ) : (
      <p className="mt-3 max-w-[650px] text-sm md:text-base text-[var(--color-cream)]/80">
        Your Weekly Wisdom writings will appear here once they’re published.
      </p>
    )}
  </header>

{/* HOW TO USE THIS WEEK'S WISDOM */}
<section className="mx-auto mt-8 md:mt-10 max-w-[1100px] px-6">
  <div className="rounded-2xl bg-white/[0.07] ring-1 ring-white/10 p-6 md:p-8">
    {/* Heading */}
    <h2 className="font-serif text-2xl md:text-[26px] mb-3">
      How to use this week’s wisdom
    </h2>

    {/* Intro line */}
    <p className="text-sm md:text-[15px] opacity-85 max-w-3xl">
      Each Weekly Wisdom includes a short reflection, a journal prompt, and an affirmation. Use them as a simple 5–10 minute weekly ritual to stay grounded and moving forward.
    </p>

    {/* 4 x 1 grid of smaller cards */}
    <div className="mt-6 grid gap-4 md:grid-cols-4">
      {/* Step 1 */}
      <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 flex flex-col gap-2 hover:bg-white/[0.07]">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-90">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-gold)]/95 text-[11px] font-bold text-black">
            1
          </span>
          <span>Read</span>
        </div>
        <p className="text-[13px] opacity-85">
          Read the letter slowly and notice which lines land the most.
        </p>
      </div>

      {/* Step 2 */}
      <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 flex flex-col gap-2 hover:bg-white/[0.07]">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-90">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-gold)]/95 text-[11px] font-bold text-black">
            2
          </span>
          <span>Journal</span>
        </div>
        <p className="text-[13px] opacity-85">
          Spend a few minutes reflecting & answering the journal prompt.
        </p>
      </div>

      {/* Step 3 */}
      <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 flex flex-col gap-2 hover:bg-white/[0.07]">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-90">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-gold)]/95 text-[11px] font-bold text-black">
            3
          </span>
          <span>Affirm</span>
        </div>
        <p className="text-[13px] opacity-85">
          Eyes closed, breathe, & repeat the affirmation with intention.
        </p>
      </div>

      {/* Step 4 */}
      <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 flex flex-col gap-2 hover:bg-white/[0.07]">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-90">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-gold)]/95 text-[11px] font-bold text-black">
            4
          </span>
          <span>Act</span>
        </div>
        <p className="text-[13px] opacity-85">
          Practice one small action aligned with what came up.
        </p>
      </div>
    </div>

    {/* Closing line */}
    <p className="mt-6 text-[13px] md:text-[14px] opacity-80 max-w-3xl">
      You don’t have to do this perfectly. Come back to the same wisdom as often as you need throughout the week.
    </p>
  </div>
</section>



            {/* FEATURED EMAIL — LATEST WEEKLY WISDOM (styled like Guides) */}
      {hasEmails && featured && (
        <section className="mt-8 mb-12 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* LEFT: text block */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                <span>Latest Weekly Wisdom</span>
              </div>

              <h2 className="mt-3 font-serif text-2xl md:text-3xl text-[var(--color-cream)]">
                {featured.title}
              </h2>

              <p className="mt-3 text-sm md:text-base text-[var(--color-cream)]/85">
                {featured.teaser}
              </p>

              <p className="mt-3 text-xs md:text-[13px] text-[var(--color-cream)]/70">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                  {featured.displayDate}
                </span>
                <span className="mx-2 opacity-60">•</span>
                <span>Sent weekly</span>
                <span className="mx-2 opacity-60">•</span>
                <span>Approx. 3–5 min read</span>
              </p>
            </div>

            {/* RIGHT: preview card (copied style from Guides) */}
            <div className="flex-1">
              <Link
                href={`/members/weekly-wisdom/${featured.slug}`}
                className="group block h-full"
                aria-label="Open this Weekly Wisdom email in a full view"
              >
                <div className="flex h-full flex-col justify-between rounded-xl bg-[var(--color-cream)] text-slate-900 shadow-[0_10px_35px_rgba(0,0,0,0.55)] border border-white/40 px-5 py-6">
                  <div>
                    {/* Top pill */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600" />
                      <span>Weekly Wisdom</span>
                    </div>

                    {/* Faux email preview */}
                    <div className="mt-4 rounded-lg bg-white/80 border border-slate-200 px-4 py-3 shadow-inner">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Preview
                      </p>
                      <p className="mt-2 text-sm font-serif leading-snug text-slate-900">
                        {featured.title}
                      </p>

                      <div className="mt-3 space-y-1.5">
                        <div className="h-1.5 w-11/12 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-10/12 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-9/12 rounded-full bg-slate-200" />
                      </div>

                      <div className="mt-3 text-[11px] text-slate-500">
                        <p className="line-clamp-3">
                          {featured.teaser}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA row */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-[11px] md:text-xs text-slate-600">
                      Click to open the full Weekly Wisdom in a new view.
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-3 py-1 text-[11px] md:text-xs font-semibold tracking-wide group-hover:brightness-110 group-active:translate-y-[1px]">
                      View full entry →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* RECENT EMAILS — MINI GRID CARDS */}
      {hasEmails && recent.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]/80 opacity-98">
              Recent Weekly Wisdom
            </h2>
            <p className="text-[11px] text-[var(--color-cream)]/60">
              Showing the last {recent.length} emails
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((item) => (
              <Link
                key={item.slug}
                href={`/members/weekly-wisdom/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 shadow-sm transition hover:-translate-y-[2px] hover:bg-white/[0.08] hover:ring-[var(--color-gold)]/60 hover:shadow-[0_14px_45px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-medium text-[var(--color-cream)]/80">
                    {item.displayDate}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif text-base leading-snug text-[var(--color-cream)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13px] text-[var(--color-cream)]/75">
                    {item.teaser}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[12px] font-semibold text-[var(--color-gold)]">
                  <span>Read this email</span>
                  <span
                    aria-hidden="true"
                    className="text-xs transition group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* QUESTIONS / CONTACT */}
<div className="mt-8 text-center">
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
        </section>
      )}

      {/* ===== CUSTOM MEMBERS FOOTER (matches Contact/Guides visually) ===== */}

      {/* Divider (mobile/desktop) */}
      <div className="mx-auto w-full px-0 mt-10">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer block (newsletter + socials + bio + legal) */}
      <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-0">
        <div className="mx-auto w-full px-0">
          {/* Newsletter card – simple server form */}
          <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-6">
            <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
              Science, Soul, and a Bit of Magic — Every Month
            </p>
            <p className="text-sm opacity-85 mb-3">
              Practical wisdom for modern minds — best paired with coffee and curiosity.
            </p>

            <form action="/api/subscribe" method="POST" className="mt-4 space-y-3">
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Socials + bio + legal (mobile) */}
          <div className="mt-6 text-[13px] leading-relaxed">
            <p className="uppercase tracking-[0.18em] text-left opacity-70">
              Follow Dr. Salerno:
            </p>
            <div className="mt-3 flex items-left justify-left gap-8">
              <a
                href="https://www.tiktok.com/@drjuanpablosalerno"
                aria-label="TikTok"
                className="opacity-90 hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/drjuanpablosalerno/"
                aria-label="Instagram"
                className="opacity-90 hover:opacity-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@drjuanpablosalerno"
                aria-label="YouTube"
                className="opacity-90 hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
                </svg>
              </a>
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

            <p className="mt-5 text-left opacity-85">
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.
            </p>

            <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>
            <p className="mt-2 mb-5 text-left opacity-85">
              <a
                href="/terms"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Terms
              </a>
              <span className="mx-2 opacity-50">·</span>
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Privacy
              </a>
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
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">
              Follow Dr. Salerno:
            </p>
            <a
              href="https://www.tiktok.com/@drjuanpablosalerno"
              aria-label="TikTok"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/drjuanpablosalerno/"
              aria-label="Instagram"
              className="opacity-90 hover:opacity-100"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@drjuanpablosalerno"
              aria-label="YouTube"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>
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
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.
          </p>
        </div>

        <div className="text-left translate-y-[-4px]">
          <p>© Dr. Juan Pablo Salerno™</p>
          <p className="mt-1">
            <span>All rights reserved</span>
            <span className="mx-2 opacity-50">·</span>
            <a
              href="/terms"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Terms
            </a>
            <span className="mx-2 opacity-50">·</span>
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Privacy
            </a>
          </p>
        </div>
      </div>
            {/* Hide global site footer on this members page */}
      <style>{`
        body :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
      `}</style>
    </main>
  );
}
