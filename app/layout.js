// app/layout.js
import './globals.css'
import FooterGate from '../components/FooterGate'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SocialFooter from "../components/SocialFooter";
import { Analytics } from '@vercel/analytics/react';
import Header from "../components/Header";

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
  // Reset remembered pinch-zoom to 1.0 on each page show (iOS Safari quirk)
useEffect(() => {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) return;

  const base = 'width=device-width, initial-scale=1, viewport-fit=cover';

  // On pageshow (including bfcache returns), briefly toggle the content.
  const reset = () => {
    // Toggle to force a re-parse of scale without killing accessibility.
    meta.setAttribute('content', base);
    // No timeout needed; a single set is typically enough.
  };

  window.addEventListener('pageshow', reset, { passive: true });
  return () => window.removeEventListener('pageshow', reset);
}, []);

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>

      {/* single body (no nesting) */}
      <body className="min-w-[1200px] bg-[#F4F1EA] text-[#0C1415] antialiased [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased]">
        <Header />

        {children}

        <FooterGate>
          <footer className="py-6 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
            <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-y-3">
              <div className="hidden sm:block" />
              <p className="text-center sm:col-start-2">
                © {new Date().getFullYear()} Dr. Juan Pablo Salerno™. All rights reserved. ·
                <a href="/terms" className="underline ml-2 hover:opacity-80">Terms</a> ·
                <a href="/privacy" className="underline ml-2 hover:opacity-80">Privacy</a>
              </p>
              <div className="flex justify-center sm:justify-end sm:col-start-3 sm:pl-6">
                <SocialFooter />
              </div>
            </div>
          </footer>
        </FooterGate>

        <Analytics />
      </body>
    </html>
  )
}
