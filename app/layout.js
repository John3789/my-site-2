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
          {/* DESKTOP-ONLY FOOTER (kept intentionally) */}
  <footer className="hidden md:block py-10 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
    <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.05fr)] gap-y-10 gap-x-24 items-end">

      {/* LEFT — Name + Terms + Privacy (perfect, unchanged) */}
      <div className="flex flex-col justify-end pl-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 opacity-90 text-[13px] leading-relaxed">
<span>© Dr. Juan Pablo Salerno™</span>
          <span className="opacity-50">·</span>
          <span>All rights reserved</span>
          <span className="opacity-50">·</span>
          <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
          <span className="opacity-50">·</span>
          <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
        </div>
      </div>

      {/* RIGHT — Newsletter + Socials + Bio (same placement, slightly narrower) */}
      <div className="grid gap-5 text-left pr-4 md:pr-10 justify-self-end max-w-[750px]">
        {/* Newsletter block */}
<div className="rounded-xl bg-[#081F2C] ring-1 ring-white/10 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.55)] hover:bg-[#0C2634] transition">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[13px] uppercase tracking-[0.18em] opacity-70 mb-1">
                Science, Soul, and a Bit of Magic — Every Month
              </p>
              <p className="text-base md:text-[15px] opacity-95">
        Practical wisdom for modern minds — best paired with coffee and curiosity.
                
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center justify-start mt-2">
          <SocialFooter />
        </div>

        {/* One-line bio */}
        <p className="text-[13px] leading-relaxed opacity-85 -mt-1 max-w-[750px]">
Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
        </p>
      </div>
    </div>
  </footer>
</FooterGate>
        <Analytics />
      </body>
    </html>
  )
}
