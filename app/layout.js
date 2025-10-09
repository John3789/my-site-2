// app/layout.js
import './globals.css'
import FooterGate from '../components/FooterGate'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SocialFooter from '../components/SocialFooter'
import { Analytics } from '@vercel/analytics/react'
import Header from '../components/Header'
import NewsletterSignup from '../components/NewsletterSignup'
import Script from 'next/script';

// Sans font for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Serif font for nameplate/headings
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'], // bold weights
  variable: '--font-serif',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
  {/* Single authoritative viewport */}
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
  />
  {/* iOS bfcache: re-assert viewport on pageshow without a client component */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.addEventListener('pageshow', function () {
          var m = document.querySelector('meta[name="viewport"]');
          if (m) {
            m.setAttribute(
              'content',
              'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover'
            );
          }
        });
      `,
    }}
  />
</head>


      {/* single body (no nesting) */}
 <body className="min-w-[1200px] bg-[#F4F1EA] text-[#0C1415] antialiased [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased]">
        <Header />

<Script id="ios-viewport-nudge-2" strategy="beforeInteractive">
{`
  (function () {
    var isiOS = /iP(hone|ad|od)/.test(navigator.userAgent);
    if (!isiOS) return;

    var base = "width=device-width, initial-scale=1, viewport-fit=cover";
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement("meta"); vp.name = "viewport"; document.head.appendChild(vp); }

    function nudgeOnce() {
      try {
        // Force iOS to recalc at 1.0…
        vp.setAttribute("content", base + ", maximum-scale=1");
        // …then restore zoomability after layout settles (two RAFs)
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            vp.setAttribute("content", base);
          });
        });
      } catch (e) {}
    }

    function run() { setTimeout(nudgeOnce, 0); }

    if (document.readyState === "complete" || document.readyState === "interactive") run();
    else document.addEventListener("DOMContentLoaded", run, { once: true });

    window.addEventListener("load", run, { once: true });
    window.addEventListener("pageshow", run);           // bfcache restore
    window.addEventListener("orientationchange", run);  // rotation
  })();
`}
</Script>

<Script id="ios-blur-active-input" strategy="afterInteractive">
{`
  (function () {
    function blurIfNeeded() {
      var el = document.activeElement;
      if (!el) return;
      // allow opt-out with data-allow-autofocus="true"
      var allow = el.matches && el.matches('[data-allow-autofocus="true"]');
      if (allow) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) el.blur();
    }
    document.addEventListener('DOMContentLoaded', () => setTimeout(blurIfNeeded, 0), { once: true });
    window.addEventListener('pageshow', () => setTimeout(blurIfNeeded, 0));
  })();
`}
</Script>

        {children}

<FooterGate>
 {/* DESKTOP / LARGE-TABLET FOOTER (tight, non-square) */}
{/* DESKTOP / LARGE-TABLET FOOTER (centered card on tablets) */}
<footer className="hidden lg:block py-10 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
  <div
    className="
      mx-auto w-full max-w-[1500px]
      grid
      lg:grid-cols-1 xl:grid-cols-[1fr_minmax(0,640px)]
      gap-y-10 gap-x-14 items-end
      text-center lg:text-center xl:text-left
    "
  >
    {/* LEFT — copyright (hidden on tablet, visible on desktop) */}
    <div className="hidden xl:flex flex-col justify-end">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 opacity-90 text-[13px] leading-relaxed justify-center xl:justify-start">
        <span>© Dr. Juan Pablo Salerno™</span>
        <span className="opacity-50">·</span>
        <span>All rights reserved</span>
        <span className="opacity-50">·</span>
        <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
        <span className="opacity-50">·</span>
        <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
      </div>
    </div>

    {/* RIGHT — Newsletter + Socials + Bio */}
    <div
      className="
        justify-self-center xl:justify-self-end
        w-full max-w-[520px] xl:max-w-[640px]
        grid gap-5 text-center xl:text-left
      "
    >
      {/* Blue newsletter card */}
      <div
        className="
          rounded-xl bg-[#0f2334] ring-1 ring-white/10
          p-4 shadow-[0_6px_20px_rgba(0,0,0,0.45)]
          hover:bg-[#102a3a] transition
        "
      >
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div className="min-w-0">
            <p className="text-[13px] uppercase tracking-[0.18em] opacity-70 mb-1">
              Science, Soul, and a Bit of Magic — Every Month
            </p>
            <p className="text-[14px] opacity-95 leading-snug">
              Practical wisdom for modern minds — best paired with coffee and curiosity.
            </p>
          </div>
          <div className="justify-self-center md:justify-self-end shrink-0">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center justify-center xl:justify-start mt-2">
        <SocialFooter />
      </div>

      {/* Bio line */}
      <p className="text-[13px] leading-relaxed opacity-85 -mt-1 max-w-[520px] mx-auto xl:mx-0">
        Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
      </p>

      {/* Copyright (shows here on tablet) */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 opacity-80 text-[12.5px] mt-2 xl:hidden">
        <span>© Dr. Juan Pablo Salerno™</span>
        <span className="opacity-50">·</span>
        <span>All rights reserved</span>
      </div>
    </div>
  </div>
</footer>


</FooterGate>
        <Analytics />
      </body>
    </html>
  )
}
