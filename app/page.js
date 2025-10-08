"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterMeditationPopup from "../components/NewsletterMeditationPopup";
import NewsletterSignup from "../components/NewsletterSignup";


export default function Home() {
  return (
        <main id="main" className="!bg-[var(--color-teal-850)] text-[var(--color-cream)] text-[17px]">
          
          <NewsletterMeditationPopup
  isMeditationPage={false}
  delayMs={20000}
  freqDays={7}
  formAction="/api/subscribe"
/>
      {/* spacer to clear the fixed header (keep) */}
      <div aria-hidden className="hidden md:block h-8 bg-[var(--color-teal-800)]" />

      {/* DESKTOP/TABLET nameplate — unchanged */}
      <section id="home" className="hidden md:block bg-[var(--color-teal-800)] text-[var(--color-cream)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-0 pb-4">
          <h1 className="text-center font-serif font-semibold uppercase tracking-[0.05em] leading-[1.05]">
            <span className="hidden md:block text-7xl hover:opacity-90 transition">
              DR. JUAN PABLO SALERNO
              <sup className="text-2xl align-super opacity-70">™</sup>
            </span>
          </h1>
        </div>
      </section>

{/* HERO — mobile full-screen; desktop unchanged */}
<section className="relative h-[100dvh] md:h-[88.8svh] overflow-hidden">
  {/* Image layer fills the section */}
  <div className="absolute inset-0">
    <Image
      src="/hero17.jpg?v=25"
      alt="Portrait of Dr. Salerno"
      fill
      priority
      quality={90}
      sizes="(min-width:768px) 100vw, 150vw"
      className="
        object-cover origin-center will-change-transform
        [transform:scaleX(1.00)_scaleY(1.00)]
        md:[transform:none]
        object-[center_0%] md:object-[center_0%]
      "
    />
    {/* 🔒 same overlay on mobile + desktop */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
  </div>

  {/* MOBILE name across the bottom (buttons hidden on mobile) */}
  <div
    className="md:hidden absolute inset-x-0 bottom-0 z-30 px-4 pointer-events-none
        landscape:translate-y-5"

    style={{
      // lift above the Safari URL bar / home indicator
      marginBottom: 'calc(env(safe-area-inset-bottom) + 56px)',
    }}
  >
    <h1
      className="
        font-serif font-semibold uppercase tracking-[0.02em]
        text-[var(--color-cream)] text-center leading-[1.00]
        drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]
        /* Make it span the full width */
        text-[32vw]   /* tweak 8.5–10vw if you want more/less */
            landscape:text-[10vw]   /* shrink text in landscape */
      "
>
  DR. JUAN PABLO SALERNO
  <span className="relative text-[0.40em] opacity-70 ml-1 -top-14 landscape:-top-8">™</span>
</h1>
  </div>

  {/* Desktop buttons only (mobile CTAs are hidden) */}
  <div className="hidden md:block absolute inset-x-0 bottom-6 z-30">
    <div className="mx-auto max-w-[1400px] px-6 relative">
      <Link
        href="speaking"
        className="
          inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-7 py-3
          font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md
          hover:-translate-y-[1px] transition absolute left-6 lg:left-61 bottom-0
        "
      >
        Book Dr. Salerno to speak
      </Link>

      <Link
        href="consulting"
        className="
          inline-flex items-center rounded-md !bg-[var(--color-teal-700)] !text-[var(--color-cream)] px-7 py-3
          font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md
          hover:-translate-y-[1px] transition absolute right-6 lg:right-34 bottom-0
        "
      >
        Book consulting with Dr. Salerno
      </Link>
    </div>
  </div>
</section>



      {/* ===== PAGE BODY WRAPPER ===== */}
      <div
        style={{ '--z': 3.00, '--zoomL': 1.60 }}
        className="
          md:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none]
          md:[width:100%]
          landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
          overflow-visible 
        "
      >


          {/* Mission */}
          <section className="w-full">
            <div className="mx-auto max-w-[1400px] px-6 pt-36 pb-12">
              <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Mission</h5>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />
              <div className="max-w-4xl mx-auto text-center">
                <p className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">
                  “I believe everyone has the power to unlock hidden potential and live with a higher purpose —
                  my mission is to blend science and growth wisdom to guide the way.”
                </p>
                <Link href="about" className="mt-8 inline-block link">
                  About Dr. Salerno →
                </Link>
              </div>
            </div>
          </section>

          {/* Consulting */}
          <section id="consulting" className="w-full">
            <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
              <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
              <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Consulting</h5>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: text */}
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Purposeful Consulting Solutions
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />

                  <ul className="text-base leading-[1.7] opacity-90 mb-6 max-w-xl space-y-3 text-left mx-auto lg:mx-0">
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔︎</span>
                      <span><strong>Partner</strong> — Collaborate with a community-engaged research expert.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔︎</span>
                      <span><strong>Design</strong> — Build powerful, evidence-based programs that truly resonate.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔︎</span>
                      <span><strong>Evaluate</strong> — Measure outcomes that matter and prove impact with data.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔︎</span>
                      <span><strong>Scale</strong> — Strengthen and integrate organizational resilience &amp; wellbeing.</span>
                    </li>
                  </ul>

                  <div className="flex justify-center lg:justify-start">
                    <Link href="/consulting" className="link">Book Dr. Salerno for consulting →</Link>
                  </div>
                </div>

                {/* Right: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
                    <Image
                      src="/plant1.jpg"
                      alt="Consulting collaboration"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 50%' }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Speaking */}
          <section className="w-full">
            <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
              <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
              <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Speaking</h5>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

              <div className="max-w-4xl mx-auto text-center">
                <p className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">
                  Dr. Salerno is a highly regarded expert and dynamic speaker who has inspired audiences on stages large and small.
                  Book him for interactive, science-backed presentations that spark growth, strengthen mental health,
                  and promote lasting wellness.
                </p>
                <Link href="/speaking" className="link mt-6 inline-block">
                  Book Dr. Salerno to speak →
                </Link>
              </div>
            </div>
          </section>

          {/* Meditations */}
          <section id="meditations" className="w-full">
            <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
              <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
              <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Meditations</h5>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
                    <Image
                      src="/beach1.jpg"
                      alt="Meditation practice, calm beach"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 40%' }}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>

                {/* Right: text */}
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Short Meditations with Dr. Salerno
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                  <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl text-left mx-auto lg:mx-0">
                    Pre-recorded and custom-made guided meditations designed by Dr. Salerno for all levels to gently reset your body,
                    calm your mind, and nourish your spirit. Journey inward to awaken your true potential,
                    deepen your sense of peace, and create space for healing and growth.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/meditations" className="link">Discover →</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resources (text left, image right) */}
          <section id="resources" className="w-full">
            <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-36">
              <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
              <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Resources</h5>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: text */}
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Resources for Self-Elevation
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                  <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl text-left mx-auto lg:mx-0">
                    Short media collections curated by Dr. Salerno to strengthen your mind and elevate your life.
                    Discover simple, practical insights you can use today to build clarity, confidence, and momentum.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/resources" className="link">Learn more →</Link>
                  </div>
                </div>

                {/* Right: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
                    <Image
                      src="/tree90.jpg"
                      alt="Resources illustration, growth tree"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 30%' }}
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
{/* PAGE-LEVEL MOBILE FOOTER (portrait + landscape) */}
<div className="block md:hidden">
  {/* --- divider --- */}
  <div className="w-full px-6 mb-14 -mt-5">
    <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
  </div>

  {/* --- blue newsletter card --- */}
  <div className="w-full px-3">
<div className="newsletter-card--portrait-lock rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
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
  </div>

  {/* --- mobile-only “Follow / legal” block --- */}
  {/* ...keep your FOLLOW DR. SALERNO + legal lines here... */}
</div>


  {/* --- MOBILE Jay-style footer block --- */}
<div className="block md:hidden mt-6 text-[13px] leading-relaxed">

  {/* 1) Heading */}
  <p className="uppercase tracking-[0.18em] text-left opacity-70">
    Follow Dr. Salerno:
  </p>

  {/* 2) Socials row — centered & evenly spaced */}
  <div className="mt-3 flex items-left justify-left gap-8">
    {/* TikTok */}
    <a href="https://www.tiktok.com/@YOURHANDLE" aria-label="TikTok" className="opacity-90 hover:opacity-100">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z"/></svg>
    </a>
    {/* Instagram */}
    <a href="https://www.instagram.com/YOURHANDLE" aria-label="Instagram" className="opacity-90 hover:opacity-100">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>
    </a>
    {/* YouTube */}
    <a href="https://www.youtube.com/@YOURHANDLE" aria-label="YouTube" className="opacity-90 hover:opacity-100">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z"/></svg>
    </a>
  </div>

  {/* 3) Bio line */}
  <p className="mt-5 text-left opacity-85">
Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.

  </p>

  {/* 4) Name with © + ™ */}
  <p className="mt-6 text-left opacity-85">
    © Dr. Juan Pablo Salerno™
  </p>

  {/* 5) Legal line (centered with dots) */}
  <p className="mt-2 text-left opacity-85">
    <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
    <span className="mx-2 opacity-50">·</span>
    <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
    <span className="mx-2 opacity-50">·</span>
    <span>All rights reserved</span>
  </p>
</div>




          {/* Home: section/bookend divider (aligns to 1400px container) */}
<div className="mx-auto max-w-[1400px] px-6">
  <hr className="border-t border-[var(--color-cream)]/22" />
</div>
  </section>
      </div>

        </main>
        
  )
}
