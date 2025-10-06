// app/layout.js
import './globals.css'
import FooterGate from '../components/FooterGate'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SocialFooter from '../components/SocialFooter'
import { Analytics } from '@vercel/analytics/react'
import Header from '../components/Header'
import NewsletterSignup from '../components/NewsletterSignup'

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

        {children}

<FooterGate>
  <footer className="relative isolate py-10 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
    {/* 🔧 Mobile zoom wrapper so footer scales like the rest of the page */}
    <div className="contents [--z:3] [--zoomL:1.6] md:[--z:1] md:[--zoomL:1]">
      <div
        className="
          md:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none]
          md:[width:100%]
          landscape:[transform:scale(var(--zoomL))]
          landscape:[width:calc(100%/var(--zoomL))]
        "
      >
        {/* ⤵️ your existing footer content goes here, unchanged */}
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.1fr)] gap-y-10 gap-x-20 items-end">
          {/* ...LEFT and RIGHT blocks exactly as you have them... */}
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
