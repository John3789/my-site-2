"use client";
import TopOnMount from "../../components/TopOnMount";
import Image from "next/image";
import Link from "next/link";
import NewsletterMeditationPopup from "../../components/NewsletterMeditationPopup";
import { useEffect, useState } from "react";
import HeroImageIphoneAware from "../../components/HeroImageIphoneAware";
import { useRef } from "react";
import { useIosZoomVars } from "../../components/useIosZoom";

export default function AboutPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

  // === About page mobile footer jump helpers (iPhone only) ===
  const ABOUT_SECTIONS = ["about", "mission", "projects", "credentials"]; // <- make sure these exist

  const idxOf = (id) => ABOUT_SECTIONS.indexOf(id);
  const prevOf = (id) =>
    ABOUT_SECTIONS[(idxOf(id) - 1 + ABOUT_SECTIONS.length) % ABOUT_SECTIONS.length];
  const nextOf = (id) => ABOUT_SECTIONS[(idxOf(id) + 1) % ABOUT_SECTIONS.length];

  // Smooth scroll that compensates for the ACTUAL sticky header height
  function jumpAbout(targetId) {
    const el =
      document.getElementById(targetId) ||
      document.querySelector(`[data-anchor="${targetId}"]`);
    if (!el) return;

    const header = document.querySelector("header");
    const HEADER_OFFSET = (header?.offsetHeight || 0) + 8; // small cushion

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function AboutSectionFooter({ baseId }) {
  return (
    <div data-about-nav className="lg:hidden mt-10 mb-30 w-full">
      <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
        <button
          onClick={() => jumpAbout(prevOf(baseId))}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          ← Prev
        </button>
        <button
          onClick={() => jumpAbout("quicknav")}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          All About
        </button>
        <button
          onClick={() => jumpAbout(nextOf(baseId))}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}



  return (
    <TopOnMount>
      <>
        {/* ===== PAGE BODY WRAPPER (same zoom as home) ===== */}
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
          landscape:data-[zoom=on]:[transform:scale(var(--zoomL))] 
          landscape:data-[zoom=on]:[width:calc(100%/var(--zoomL))]
          overflow-visible
        "
        >
          <main
            data-page="about"
            className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-2">
              {/* Page title with kicker + gold bar */}
              <div className="text-center mb-12">
                <h1 className="font-serif text-6xl leading-[1.06] opacity-90 mt-20">
                  About Dr. Salerno
                </h1>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
              </div>

              {/* Invisible anchor for "About" target */}
              <div className="sr-only" />

              {/* Mobile quick-nav (iPhone portrait & landscape only) */}
              <nav id="quicknav" className="block lg:hidden mt-6 mb-8 pointer-events-auto">
                <div className="grid grid-cols-2 gap-2 mx-auto narrow-landscape-70">
                  <a
                    href="#about"
                    className="w-full inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide truncate transition active:scale-95 active:brightness-110 border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)]"
                  >
                    <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
                      1.
                    </span>
                    <span className="truncate">About</span>
                  </a>
                  <a
                    href="#mission"
                    className="w-full inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide truncate transition active:scale-95 active:brightness-110 border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)]"
                  >
                    <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
                      2.
                    </span>
                    <span className="truncate">Mission</span>
                  </a>
                  <a
                    href="#projects"
                    className="w-full inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide truncate transition active:scale-95 active:brightness-110 border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)]"
                  >
                    <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
                      3.
                    </span>
                    <span className="truncate">Projects</span>
                  </a>
                  <a
                    href="#credentials"
                    className="w-full inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-wide truncate transition active:scale-95 active:brightness-110 border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)]"
                  >
                    <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
                      4.
                    </span>
                    <span className="truncate">Credentials</span>
                  </a>
                </div>
              </nav>

              {/* Row 1: first two paragraphs + photo side-by-side */}
              <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
                {/* Left: first two paragraphs */}
                <div data-intro>
                  <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] mb-4 opacity-90 leading-loose narrow-landscape-70">
                    Dr. Juan Pablo Salerno, also known in academic spaces as{" "}
                    <strong>Dr. John P. Salerno</strong>, is an award-winning mental health scientist,
                    personal growth expert, author and professor—credited with more than 30
                    peer-reviewed publications and over 2000 citations in the last decade (2016 -
                    present). He has over 14 years of experience working in top academic institutions,
                    including Columbia University, George Washington University, University of Maryland,
                    and University of Miami. He is committed to sharing his lived experience, wisdom,
                    and expertise to guide others in overcoming mental health struggles, awakening
                    potential, and living abundantly through self-love, fulfillment, and purpose.
                  </p>

                  <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] opacity-90 leading-loose narrow-landscape-70">
                    His research has been published in leading journals such as Psychiatry Research,
                    Psychological Trauma, Epidemiology &amp; Psychiatric Sciences, Drug &amp; Alcohol
                    Dependence, Psychology of Sexual Orientation &amp; Gender Diversity, and Preventing
                    Chronic Disease. In recognition of his contributions, he received the 2024 National
                    Award of Excellence in Research from the National Hispanic Science Network and was an
                    invited main speaker at the 2024 National Institute of Mental Health Workshop on
                    Promoting Mental Health for Sexual and Gender Minority Youth.
                  </p>
                </div>

                {/* Right: photo — optimized only on iPhone */}
                <div className="flex justify-center [transform:none] [width:auto]">
                  <HeroImageIphoneAware
                    src="/heroabout.jpg"
                    alt="Dr. Juan Pablo Salerno"
                    width={3024}
                    height={4032}
                    className="w-full max-w-md h-auto shadow-lg object-cover mt-4"
                    sizes="(max-width: 768px) 95vw, 448px"
                    quality={95}
                    priority
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Row 2+: everything else centered below */}
              <div className="mx-auto max-w-none md:max-w-[1000px] px-2 md:px-6 space-y-12">
                {/* Paragraph 3 */}
                <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] opacity-90 leading-loose narrow-landscape-80">
                  Dr. Salerno’s expertise is rooted in science and shaped by personal transformation.
                  After reaching his lowest point in mental health, he devoted years to therapy and
                  recovery. But remission wasn’t the destination - it was the beginning. Seeking
                  something greater than the absence of suffering, he broadened his path to healing
                  through personal growth practices such as meditation, Feng Shui, and manifestation,
                  learning from some of the most respected experts in the field. Through this journey,
                  he continues to ascend toward his highest self and uncover his deeper purpose.
                </p>

                {/* ===== Section Footer Buttons (mobile-only) ===== */}
                <AboutSectionFooter baseId="about" />

                {/* Mission */}
                <section id="mission">
                  <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                  <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                    Mission
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                  <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] opacity-90 leading-loose narrow-landscape-80">
                    To blend science and personal growth wisdom to help individuals and communities rise
                    above mental health challenges, unlock hidden potential, and live with greater
                    purpose and abundance.
                  </p>
                </section>

                {/* ===== Section Footer Buttons (mobile-only) ===== */}
                <AboutSectionFooter baseId="mission" />

                {/* Projects in the Now */}
                <section id="projects">
                  <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                  <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                    Projects in the Now
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                  <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] opacity-90 leading-loose narrow-landscape-80">
                    Today, Dr. Salerno continues advancing research that bridges scientific discovery
                    with real-world impact on mental health. As a university educator, he mentors the
                    next generation of scholars and practitioners with a focus on purpose, wellbeing, and
                    community. Alongside his academic work, he is building a personal brand that
                    integrates science and soul. His forthcoming book weaves scientific insight and
                    personal growth wisdom to guide others toward balance, purpose, fulfillment, and
                    mental wellness. On this site, you can explore his offerings - including
                    organizational wellness consulting, public speaking, guided meditations,
                    evidence-informed resources for personal growth and mental health, and current
                    publications.
                  </p>
                </section>

                {/* ===== Section Footer Buttons (mobile-only) ===== */}
                <AboutSectionFooter baseId="projects" />

                {/* Credentials */}
                <section id="credentials">
                  <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                  <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                    Credentials
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                  <p className="mx-auto space-y-6 text-[clamp(16px,1.4vw,19px)] opacity-90 leading-loose narrow-landscape-80">
                    Dr. Salerno holds a Ph.D. in Behavioral &amp; Community Health and a Graduate
                    Certificate in Measurement, Statistics, &amp; Evaluation from the University of
                    Maryland. He also earned an M.P.H. in Prevention Science &amp; Community Health and a
                    B.A. in Psychology with a Minor in Sociology from the University of Miami.
                  </p>
                </section>
              </div>

{/* CTA with faint outline + final section footer + divider (kept inside same clamp) */}
<div className="mx-auto max-w-none md:max-w-[1000px] px-2 md:px-6 space-y-10">

  {/* CTA */}
  <div className="mt-8 mb-10 flex justify-center">
    <Link
      href="/contact"
      className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                 font-semibold uppercase tracking-wide text-sm shadow-md transition
                 hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
    >
      Get in Touch
    </Link>
  </div>

  {/* Final mobile section footer (iPhone only) */}
  <AboutSectionFooter baseId="credentials" />

  {/* Bookend divider that matches the same clamp */}
  <div className="hidden lg:block">
    <div className="mx-auto w-[93%] px-0">
      <hr className="border-t border-[var(--color-cream)]/22" />
    </div>
  </div>
</div>
</div>

            {/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
            <div className="block lg:hidden">
              <div className="mx-auto max-w-[750px] px-3">
                <hr className="mx-auto w-[100%] border-t border-[var(--color-cream)]/22 -mt-20 mb-12" />
                <div className="mobile-footer-cap px-6 narrow-landscape-70">
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

                  {/* --- MOBILE Jay-style footer block --- */}
                  <div className="mt-6 text-[13px] leading-relaxed">
                    {/* 1) Heading */}
                    <p className="uppercase tracking-[0.18em] text-left opacity-70">
                      Follow Dr. Salerno:
                    </p>

                    {/* 2) Socials row — centered & evenly spaced */}
                    <div className="mt-3 flex items-left justify-left gap-8">
                      {/* TikTok */}
                      <a
                        href="https://www.tiktok.com/@YOURHANDLE"
                        aria-label="TikTok"
                        className="opacity-90 hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/YOURHANDLE"
                        aria-label="Instagram"
                        className="opacity-90 hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                        </svg>
                      </a>
                      {/* YouTube */}
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

                    {/* 3) Bio line */}
                    <p className="mt-5 text-left opacity-85">
                      Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal
                      growth expert, author and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.
                    </p>

                    {/* 4) Name with © + ™ */}
                    <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>

                    {/* 5) Legal line (centered with dots) */}
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

              {/* removed the contained divider on mobile */}
            </div>

            <style jsx global>{`
/* ABOUT — iPad & iPad mini PORTRAIT (700–920px)
   + iPhone LANDSCAPE (≤950px)
   Tightens section pills, intro text, and footer width. */
@media ((orientation: portrait) and (min-width: 700px) and (max-width: 920px)),
       ((orientation: landscape) and (max-width: 950px)) {
  /* 1️⃣ Local section nav pills (About / Mission / Projects / Credentials) */
  [data-page="about"] nav [class*="rounded-full"],
  [data-page="about"] nav button,
  [data-page="about"] nav a {
    max-width: 78vw;
    margin-left: auto;
    margin-right: auto;
    display: inline-flex;
    justify-content: center;
  }

                /* If your pill group sits in a wrapper, narrow that too */
                [data-page="about"] nav {
                  max-width: 78vw;
                  margin-left: auto;
                  margin-right: auto;
                }

                /* ABOUT — tighten intro paragraphs & image only */
                [data-page="about"] [data-intro] p {
                  max-width: 80ch !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                }

                /* Optional: if your picture follows right after those paragraphs */
                [data-page="about"] [data-intro] + :is(figure, img, .image, .photo) {
                  max-width: 540px !important;
                  margin-left: auto !important;
                  margin-right: auto !important;
                }

                /* 3️⃣ Footer — match home page clamp */
                body:has(main[data-page="about"])
                  :is(
                    footer,
                    .site-footer,
                    .mobile-footer-cap,
                    .home-footer-cap,
                    div[class*="footer"]
                  ) {
                  max-width: 75vw;
                  margin-left: auto;
                  margin-right: auto;
                }

                body:has(main[data-page="about"]) footer hr,
                [data-page="about"] hr {
                  width: 100%;
                  margin-left: auto;
                  margin-right: auto;
                }
              }

              /* iPhone portrait + landscape: make anchors stop below sticky header */
              @media (max-width: 700px) and (orientation: portrait),
                (max-width: 950px) and (orientation: landscape) {
                [data-page="about"] :is(#about, #mission, #projects, #credentials) {
                  scroll-margin-top: 96px; /* tweak if your header differs */
                }
              }

              /* ABOUT — show mobile section footer buttons only on iPhone sizes */
              [data-page="about"] [data-about-nav] {
                display: none !important;
              }
              @media (max-width: 700px) and (orientation: portrait),
                (max-width: 950px) and (orientation: landscape) {
                [data-page="about"] [data-about-nav] {
                  display: block !important;
                }
              }
            `}</style>
          </main>
        </div>
      </>
      <NewsletterMeditationPopup delayMs={15000} />
    </TopOnMount>
  );
}
