// app/layout.js
import './globals.css'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SocialFooter from '../components/SocialFooter'
import { Analytics } from '@vercel/analytics/react'
import Header from '../components/Header'
import NewsletterSignup from '../components/NewsletterSignup'
import Script from 'next/script'
import LayoutFooterGate from '../components/LayoutFooterGate'
import FooterSubscribeClient from '../components/FooterSubscribeClient' // ← added
import GA from "../components/GA.jsx"
import MSProvider from "./providers/MemberstackProvider.js";

export const metadata = {
  metadataBase: new URL("https://drjuanpablosalerno.com/"),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 8,
  userScalable: true,
  viewportFit: 'cover',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} zoom-not-ready`}
      style={{ ['--vv']: '1' }} // ✅ SSR default so hydration matches
    >
      <head>
        <Script id="ios-landscape-nudge-lite" strategy="beforeInteractive">
{`
  (function () {
    var isiOS = /iP(hone|od)/.test(navigator.userAgent);
    if (!isiOS) return;

    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) { vp = document.createElement('meta'); vp.name = 'viewport'; document.head.appendChild(vp); }

    var base = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=8, user-scalable=yes, viewport-fit=cover';

    function snapIfWeird() {
      var vv = window.visualViewport;
      var isLandscape = (vv && vv.width > vv.height) || Math.abs(window.orientation) === 90;
      var scale = vv ? vv.scale : 1;
      if (!isLandscape) return;
      if (Math.abs(scale - 1) < 0.03) return;

      vp.setAttribute('content', base + ', maximum-scale=1');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          vp.setAttribute('content', base);
        });
      });
    }

    if (document.readyState !== 'loading') snapIfWeird();
    window.addEventListener('pageshow', snapIfWeird);
    window.addEventListener('orientationchange', function(){ setTimeout(snapIfWeird, 50); });
  })();
`}
        </Script>

        <Script id="ios-edge-lock" strategy="afterInteractive">
{`
  (function () {
    function edgeLock(el) {
      if (!el) return;
      el.addEventListener('touchstart', function () {
        const top = el.scrollTop;
        const max = el.scrollHeight - el.clientHeight;
        if (top <= 0) el.scrollTop = 1;
        else if (top >= max) el.scrollTop = max - 1;
      }, { passive: true });
    }
    function attachAll() {
      document.querySelectorAll('.page-scroll, .scroll-area').forEach(edgeLock);
    }
    attachAll();
    document.addEventListener('DOMContentLoaded', attachAll, { once: true });
  })();
`}
        </Script>

        <Script id="vv-scale-var" strategy="beforeInteractive">
{`
  (function () {
    var root = document.documentElement;
    function setVV() {
      var vv = (window.visualViewport && window.visualViewport.scale) || 1;
      root.style.setProperty('--vv', String(vv));
    }
    setVV();
    var vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', setVV);
      vv.addEventListener('scroll', setVV);
    }
    window.addEventListener('pageshow', setVV);
    window.addEventListener('orientationchange', setVV);
  })();
`}
        </Script>

        {/* 🔒 Inline kill-switch CSS BEFORE first paint (no opacity hiding) */}
        <Script id="zoom-kill-style" strategy="beforeInteractive">
{`(function () {
  var css =
    'html.zoom-not-ready [class*="\\\\[transform:scale(var(--z))\\\\]"],\\n' +
    'html.zoom-not-ready [class*="\\\\[transform:scale(var(--zoomL))\\\\]"]{transform:none !important;}\\n' +
    'html.zoom-not-ready [class*="\\\\[width:calc(100%/var(--z))\\\\]"],\\n' +
    'html.zoom-not-ready [class*="\\\\[width:calc(100%/var(--zoomL))\\\\]"]{width:100% !important;}';
  var style = document.createElement('style');
  style.setAttribute('data-zoom-kill','true');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();`}
        </Script>
      </head>

      {/* single body (no nesting). NOTE: desktop-only min width to avoid mobile auto-zoom */}
      <body className="lg:min-w-[1200px] bg-[#F4F1EA] text-[#0C1415] antialiased [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased]">
                <MSProvider>
        <Header />

        <Script id="ios-blur-active-input" strategy="afterInteractive">
{`
  (function () {
    if (!/iP(hone|od)/.test(navigator.userAgent)) return;
    function blurIfNeeded() {
      var el = document.activeElement;
      if (!el) return;
      if (el.matches && el.matches('[data-allow-autofocus="true"]')) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable) {
        el.blur();
      }
    }
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(blurIfNeeded, 0); }, { once: true });
    window.addEventListener('pageshow', function(){ setTimeout(blurIfNeeded, 0); });
  })();
`}
        </Script>

<GA />

        {children}

        {/* DESKTOP / LARGE-TABLET FOOTER — ORIGINAL LAYOUT RESTORED */}
        <LayoutFooterGate>
          <footer className="hidden lg:block py-10 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
            <div
              className="
                mx-auto w-full max-w-[1680px]
                grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.05fr)]
                gap-y-10 gap-x-24 items-end
              "
            >
              {/* LEFT — Name + Terms + Privacy (unchanged) */}
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

              {/* RIGHT — Newsletter + Socials + Bio */}
              <div className="grid gap-5 text-left pr-4 lg:pr-10 justify-self-end max-w-[750px]">
                {/* Newsletter block (improved version) */}
                <div
                  className="
                    rounded-xl bg-[#0f2334]
                    ring-1 ring-white/10 p-6
                    shadow-[0_10px_30px_rgba(0,0,0,0.55)]
                    hover:bg-[#102a3a] transition
                  "
                >
                  {/* Title + Description */}
                  <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-3">
                    Science, Soul, and a Bit of Magic — Every Month
                  </p>
                  <p className="text-[14px] opacity-95 leading-snug mb-5">
                    Practical wisdom for modern minds — best paired with coffee and curiosity.
                  </p>

                  {/* Email + Subscribe — now client-side */}
                  <FooterSubscribeClient />
                </div>

                {/* Socials */}
                <div className="flex items-center justify-start mt-2">
                  <SocialFooter />
                </div>

                {/* Bio */}
                <p className="text-[13px] leading-relaxed opacity-85 -mt-1 max-w-[750px]">
                  Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
                </p>
              </div>
            </div>
          </footer>
        </LayoutFooterGate>

        <Analytics />
                </MSProvider>
      </body>
    </html>
  )
}
