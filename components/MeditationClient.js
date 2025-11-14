// app/meditations/page.js
"use client";

import TopOnMount from "../components/TopOnMount";
import PopupIsland from "./PopupIsland";
import HeroImageIphoneAware from "../components/HeroImageIphoneAware";
import { useRef } from "react";
import { useIosZoomVars } from "../components/useIosZoom";
import MobileFooterSubscribeClient from "./MobileFooterSubscribeClient";
import ClientOnly from "./ClientOnly";

// Local copy of the DiscountCard used for pricing
function DiscountCard({ label, memberPrice, regularPrice, savings }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/20 bg-white/5 p-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</div>
        <div className="mt-2 text-2xl font-semibold">{memberPrice}</div>
        <div className="mt-1 text-xs opacity-80">
          <span className="mr-2 line-through opacity-60">{regularPrice}</span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-2 py-0.5 text-[11px] font-semibold">
            Save {savings}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[11px] opacity-80">RISE member pricing.</p>
    </div>
  );
}

// New card for regular (non-member) pricing
function RegularPriceCard({ label, price }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/15 bg-white/5 p-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</div>
        <div className="mt-2 text-2xl font-semibold">{price}</div>
      </div>
      <p className="mt-3 text-[11px] opacity-80">Regular pricing.</p>
    </div>
  );
}

export default function MeditationClient() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

  return (
    <TopOnMount>
      <>
        {/* Mobile zoom wrapper (same pattern as Books/About). Desktop (md+) is unchanged. */}
        <div
          ref={wrapRef}
          className="lg:contents origin-top data-[zoom=on]:[transform:scale(var(--z))] data-[zoom=on]:[width:calc(100%/var(--z))] mx-auto lg:[transform:none] lg:[width:100%] landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))] landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))] overflow-visible"
        >
          <main data-page="meditations" className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
            {/* ===== HERO ===== */}
            <section className="mx-auto max-w-[1200px] px-6 pt-20 md:pt-20 pb-6 text-center">
              <h1 className="font-serif text-6xl leading-[1.06] opacity-95">Meditations</h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
            </section>

            {/* ===== INTRO ===== */}
            <section className="mx-auto max-w-[700px] lg:max-w-[850px] px-6 text-center mb-12 narrow-landscape-80 narrow-landscape-80-ipad">
              <p className="text-lg md:text-xl opacity-90 leading-relaxed narrow-landscape-80 narrow-landscape-80-ipad">
                Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.
              </p>
            </section>

            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

            {/* ===== MAIN HERO ROW — Custom sessions + photo ===== */}
            <section className="mx-auto max-w-[1200px] px-6 py-14 md:py-16">
              <div data-med-grid className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                {/* LEFT COLUMN — Custom sessions content */}
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
                    Custom
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl opacity-95 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
                    Custom-Made Sessions
                  </h2>
                  <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto" />
                  <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl text-left [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
                    I design custom meditations tailored to your goals and challenges — whether it’s cultivating resilience, deepening focus, easing stress, creating space for empowerment and manifestation, or something uniquely yours. Each recording becomes a personalized pathway to growth and wellbeing.{" "}
                    <span className="font-bold">All custom meditation purchases include a complimentary 30-minute vision call.</span> Click below to get started.
                  </p>
                  <a
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto"
                  >
                    Inquire about a custom session
                  </a>
                </div>

                {/* RIGHT COLUMN — iPhone-optimized photo */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[390px] aspect-[3/4] shadow-2xl ring-1 ring-white/10 overflow-hidden">
                    <HeroImageIphoneAware
                      src="/hero20.jpg"
                      alt="Dr. Juan Pablo Salerno"
                      width={2279}
                      height={3021}
                      sizes="(max-width: 768px) 95vw, 390px"
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

{/* ===== MEDITATION LIBRARY DESCRIPTION ===== */}
<section className="mx-auto max-w-[900px] px-6 text-center mt-16 mb-16 narrow-landscape-80">
  <p className="text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2">
    Meditation Library
  </p>

  <h2 className="font-serif text-4xl md:text-5xl opacity-95">
    Guided Meditation Library
  </h2>

  <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto" />

  <p className="text-lg md:text-xl opacity-90 leading-relaxed mx-auto">
    Access a growing collection of guided meditations designed to help you reset, restore,
    and realign — from quick daytime resets and grounding practices to deeper sessions
    focused on release, intention-setting, and evening wind-downs. Every track is created
    to support your body, mind, and spirit.
  </p>

  <p className="mt-4 text-sm opacity-85 mx-auto">
    Gain full access to the entire library when you signup for {" "}
    <a
      href="/membership"
      className="font-bold underline underline-offset-4 text-[var(--color-gold)]"
    >
      RISE Membership
    </a>{" "}
    and receive new meditations as they are released.
  </p>
</section>


            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

            {/* CUSTOM MEDITATIONS PRICING */}
            <section className="mx-auto max-w-[1200px] px-6 py-14 md:py-16 narrow-landscape-80">
              <div className="mx-auto max-w-[925px] rounded-2xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
                {/* Regular / non-member pricing */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">Custom Meditations — Regular Pricing</h3>
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold">
                    Standard rates shown below
                  </span>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <RegularPriceCard label="5 minutes" price="$50" />
                  <RegularPriceCard label="10 minutes" price="$100" />
                  <RegularPriceCard label="15 minutes" price="$150" />
                </div>

                <p className="mt-5 text-sm opacity-85 text-center md:text-left flex flex-col md:flex-row items-center gap-2">
                  <span>Signup for</span>
                  <a
                    href="/membership"
                    className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] brightness-120 relative z-10 !text-black px-3 py-1.5 font-semibold text-xs uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
                  >
                    RISE Membership
                  </a>
                  <span>to unlock member pricing on all custom meditations.</span>
                </p>

                {/* Member pricing */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">Custom Meditations — RISE Member Pricing</h3>
                  <span className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2.5 py-0.5 text-[11px] font-semibold">
                    Member savings highlighted below
                  </span>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <DiscountCard label="5 minutes" memberPrice="$40" regularPrice="$50" savings="20%" />
                  <DiscountCard label="10 minutes" memberPrice="$75" regularPrice="$100" savings="25%" />
                  <DiscountCard label="15 minutes" memberPrice="$100" regularPrice="$150" savings="33%" />
                </div>

                <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
                  <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span> included with <span className="font-semibold">every custom meditation</span> to set your intentions and personalize your journey.
                </div>

                <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">Yearly Membership Perk</div>
                      <div className="mt-1 text-sm opacity-85">
                        One-time free 5-minute custom meditation <span className="whitespace-nowrap">+ vision call</span> ($50 value) included with your yearly membership purchase.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
                >
                  Inquire about a custom session
                </a>
              </div>
            </section>
          

            {/* FINAL divider above footer — match two-column width, no bleed */}
            <div className="mx-auto max-w-[1200px] px-6">
              <hr className="hidden lg:block max-w-[1200px] border-t border-[var(--color-cream)]/22" />
            </div>

            <div className="md:hidden mx-auto max-w-[1200px] px-3">
              {/* (mobile newsletter + socials unchanged) */}
            </div>

            {/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
            <div className="block lg:hidden">
              <div className="mx-auto max-w-[1000px] px-6 mb-14 -mt-5">
                <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
              </div>

              <div className="mobile-footer-cap">
                <div className="mx-auto max-w-[1000px] px-3 narrow-landscape-70">
                  {/* Newsletter card */}
                  <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
                    <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
                      Science, Soul, and a Bit of Magic — Every Month
                    </p>
                    <p className="text-sm opacity-85 mb-3">
                      Practical wisdom for modern minds — best paired with coffee and curiosity.
                    </p>
                    <MobileFooterSubscribeClient />
                  </div>

                  {/* Mobile footer block */}
                  <div className="mt-6 text-[13px] leading-relaxed">
                    <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
                    <div className="mt-3 flex items-left justify-left gap-8">
                      <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/drjuanpablosalerno/" aria-label="Instagram" className="opacity-90 hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1 5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 0 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                        </svg>
                      </a>
                      <a href="https://www.youtube.com/@YOURHANDLE" aria-label="YouTube" className="opacity-90 hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s-6.6 0-8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
                        </svg>
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
                        </svg>
                      </a>
                    </div>

                    <p className="mt-5 text-left opacity-85">
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
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

            {/* removed the contained divider on mobile */}
          </main>

          {/* Global safeguards and crisp text styles */}
          <style jsx global>{`
            /* Meditations — force 1 column on iPhone landscape + iPad portrait only */
            @media (max-width: 950px) and (orientation: landscape), (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
              [data-page="meditations"] [data-med-grid] {
                grid-template-columns: 1fr !important;
              }
            }

            /* Meditations — narrower footer on iPad portrait only (≈820×1180) and ipad mini (744x1024) */
            @media (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
              body:has(main[data-page="meditations"]) :is(footer, .site-footer, .mobile-footer-cap, .home-footer-cap, div[class*="footer"]) {
                max-width: 75vw;
                margin-left: auto;
                margin-right: auto;
              }

              body:has(main[data-page="meditations"]) hr {
                width: 100%;
                margin-left: auto;
                margin-right: auto;
              }
            }
          `}</style>
        </div>

        <ClientOnly>
          <PopupIsland delayMs={20000} />
        </ClientOnly>
      </>
    </TopOnMount>
  );
}

/* ===== LOCAL COMPONENTS ===== */

function Faq({ q, a }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="font-semibold">{q}</div>
      <p className="mt-1 opacity-85 text-sm">{a}</p>
    </div>
  );
}
