// app/meditations/page.js
"use client";

import TopOnMount from "../components/TopOnMount";
import NewsletterMeditationPopup from "../components/NewsletterMeditationPopup";
import HeroImageIphoneAware from "../components/HeroImageIphoneAware";
import { useRef } from "react";
import { useIosZoomVars } from "../components/useIosZoom";
import MobileFooterSubscribeClient from "./MobileFooterSubscribeClient";





export default function MeditationClient() {
const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.00 });



  return (
    <TopOnMount>
      <>
        {/* Mobile zoom wrapper (same pattern as Books/About). Desktop (md+) is unchanged. */}
        <div
          ref={wrapRef}
          className="
            lg:contents
            origin-top
            data-[zoom=on]:[transform:scale(var(--z))]
            data-[zoom=on]:[width:calc(100%/var(--z))]
            mx-auto
            lg:[transform:none]
            lg:[width:100%]
            landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))]
            landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))]
            overflow-visible
          "
        >
          <main data-page="meditations" className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
            {/* ===== HERO ===== */}
            <section className="mx-auto max-w-[1200px] px-6 pt-20 md:pt-20 pb-6 text-center">
              <h1 className="font-serif text-6xl leading-[1.06] opacity-95">
                Meditations
              </h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
            </section>

            {/* ===== INTRO (moved out of card, like Consulting) ===== */}
            <section className="mx-auto max-w-[700px] lg:max-w-[850px] px-6 text-center mb-12 narrow-landscape-80 narrow-landscape-80-ipad">
              <p className="text-lg md:text-xl opacity-90 leading-relaxed narrow-landscape-80 narrow-landscape-80-ipad">
                Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.
              </p>
              <p className="mt-5 text-sm opacity-70">
                This page is a work in progress. I’ll be adding new tracks periodically.
              </p>
            </section>

            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

            {/* ===== FEATURED (5-Minute Reset) — now 2 columns ===== */}
            <section className="mx-auto max-w-[1200px] px-6 py-14 md:py-16 narrow-landscape-80">
              <div data-med-grid className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                {/* LEFT COLUMN — existing content */}
                <div>
<p className="text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">Featured</p>
<h2 className="font-serif text-4xl md:text-5xl opacity-95 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">5-Minute Reset (Free)</h2>
<div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto" />
<p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl text-left [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
  A gentle, all-levels 5-minute meditation to ground, align, and re-center. Morning
  clarity, afternoon reset, evening calm — a simple practice always within reach.
  Bookmark this page for moments when you need to recharge.
</p>

                  <article
                    className="mt-6 relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7 shadow-2xl hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition backdrop-blur-none md:backdrop-blur-sm"
                  >
                    {/* Gold spine (dimmed) */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/60 rounded-l-2xl"
                    />
                    <div className="flex flex-wrap items-center gap-3 text-sm opacity-85">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="opacity-90">
                          <path
                            fill="currentColor"
                            d="M12 8a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8zm0-6a1 1 0 0 1 1 1v2.07A8.001 8.001 0 0 1 20.93 11H23a1 1 0 1 1 0 2h-2.07A8.001 8.001 0 0 1 13 20.93V23a1 1 0 1 1-2 0v-2.07A8.001 8.001 0 0 1 3.07 13H1a1 1 0 1 1 0-2h2.07A8.001 8.001 0 0 1 11 3.07V1a1 1 0 0 1 1-1Z"
                          />
                        </svg>
                        ~5 min
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                        Grounding
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                        Beginner-friendly
                      </span>
                    </div>

                    <p className="opacity-90 leading-relaxed mt-4">
                      Press play, follow the cues, and relax.
                    </p>

                    {/* Faux player controls (wire to real audio later) */}
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        type="button"
                        aria-label="Play 5-Minute Reset"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-gold)] text-black shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50">
                        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                          <path fill="currentColor" d="M8 5.14v14l11-7z" />
                        </svg>
                      </button>
                      <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="absolute left-0 top-0 h-full w-1/6 bg-[var(--color-gold)]/80" />
                      </div>
                      <span className="text-sm opacity-80 tabular-nums">00:45 / 05:00</span>
                    </div>
                  </article>
                </div>

{/* RIGHT COLUMN — iPhone-optimized photo */}
<div className="flex justify-center">
  <div className="relative w-full max-w-md aspect-[3/4] shadow-2xl ring-1 ring-white/10 overflow-hidden">
    <HeroImageIphoneAware
      src="/hero20.jpg"
      alt="Dr. Juan Pablo Salerno"
      width={2279}
      height={3021}
      sizes="(max-width: 768px) 95vw, 448px"
      className="object-cover"
      quality={95}
      priority
      fetchPriority="high"

    />
  </div>
  </div>
</div>
            </section>

            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

            {/* ===== CUSTOM SESSIONS ===== */}
            <section className="mx-auto max-w-[1200px] px-6 py-14 md:py-16 narrow-landscape-80"> 
              <p className=" flex justify-center text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2">Custom</p>
              <h2 className="flex justify-center font-serif text-4xl md:text-5xl opacity-95">Custom-Made Sessions</h2>
              <div className="mx-auto h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
              <p className="mx-auto flex justify-center text-lg md:text-xl opacity-90 max-w-4xl leading-relaxed">
                I design custom meditations tailored to your goals and challenges — whether it’s
                cultivating resilience, deepening focus, easing stress, creating space for empowerment
                and manifestation, or something uniquely yours. Each recording becomes a personalized
                pathway to growth and wellbeing. Click below to get started.
              </p>
              <a
                href="/contact"
                className="mx-auto -mb-6 mt-8 block w-fit rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50">
                Inquire about custom sessions
              </a>
            </section>


            {/* Bottom spacer */}
            <div className="pb-10" />
            
          {/* FINAL divider above footer — match two-column width, no bleed */}
<div className="mx-auto max-w-[1200px] px-6">
  <hr className="hidden lg:block max-w-[1200px] border-t border-[var(--color-cream)]/22" />
</div>

            <div className="md:hidden mx-auto max-w-[1200px] px-3">
              {/* (mobile newsletter + socials unchanged) */}
              {/* ... */}
            </div>

{/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
<div className="block lg:hidden">
  <div className="mx-auto max-w-[1000px] px-6 mb-14 -mt-5">
    <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
  </div>

  <div className="mobile-footer-cap">

  <div className="mx-auto max-w-[1000px] px-3 narrow-landscape-70">
    {/* Newsletter card (midnight blue) */}
    <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
      <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
        Science, Soul, and a Bit of Magic — Every Month
      </p>
      <p className="text-sm opacity-85 mb-3">
        Practical wisdom for modern minds — best paired with coffee and curiosity.
      </p>
                        <MobileFooterSubscribeClient />
      
    </div>

    {/* --- MOBILE Jay-style footer block --- */}
    <div className="mt-6 text-[13px] leading-relaxed">
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
        Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
      </p>

      {/* 4) Name with © + ™ */}
      <p className="mt-6 text-left opacity-85">
        © Dr. Juan Pablo Salerno™
      </p>

      {/* 5) Legal line (centered with dots) */}
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



        {/* removed the contained divider on mobile */}
      </div>
  {/* Global safeguards and crisp text styles */}
      <style jsx global>{`

      /* Meditations — force 1 column on iPhone landscape + iPad portrait only */
@media (max-width: 950px) and (orientation: landscape),
       (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
  [data-page="meditations"] [data-med-grid] {
    grid-template-columns: 1fr !important; /* defeats md:grid-cols-2 only here */
  }

/* Meditations — narrower footer on iPad portrait only (≈820×1180) and ipad mini (744x1024) */
@media (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
  /* Clamp any footer-y containers on this page */
  body:has(main[data-page="meditations"])
    :is(footer, .site-footer, .mobile-footer-cap, .home-footer-cap, div[class*="footer"]) {
    max-width: 75vw;
    margin-left: auto;
    margin-right: auto;
  }

  /* Make the divider match the clamped width */
  body:has(main[data-page="meditations"]) hr {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
}


      `}</style>

          </main>


        </div>
      </>
<NewsletterMeditationPopup delayMs={20000} />
    </TopOnMount>
  );
}
