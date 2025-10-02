// app/layout.js
import './globals.css'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import SocialFooter from "../components/SocialFooter";
import { Analytics } from '@vercel/analytics/react';
import Header from "../components/Header";

// ⬇️ Viewport export (lets Next.js add <meta name="viewport"> automatically)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,    // optional: prevents zoom scaling on mobile
  viewportFit: 'cover' // good for modern mobile devices with notches
}

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
      <body className="bg-[#F4F1EA] text-[#0C1415] antialiased [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased]">
        <Header />
        {children}
        <footer className="relative py-6 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)] text-center">
          {/* Centered copyright/legal */}
          <p>
            © {new Date().getFullYear()} Dr. Juan Pablo Salerno™. All rights reserved. ·
            <a href="/terms" className="underline ml-2 hover:opacity-80">Terms</a> ·
            <a href="/privacy" className="underline ml-2 hover:opacity-80">Privacy</a>
          </p>

          {/* Absolutely positioned social icons bottom-right */}
          <div className="absolute right-45 bottom-6">
            <SocialFooter />
          </div>
        </footer>
        <Analytics />   {/* ✅ Keeps analytics working */}
      </body>
    </html>
  )
}
