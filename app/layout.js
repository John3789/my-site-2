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
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#F4F1EA] text-[#0C1415] antialiased [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased]">
        <Header />
        {children}

        {/* 👇 Global footer (hidden on "/") */}
        <FooterGate>
          <footer className="relative py-6 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
            <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Centered copyright/legal */}
              <p className="text-center sm:text-left">
                © {new Date().getFullYear()} Dr. Juan Pablo Salerno™. All rights reserved. ·
                <a href="/terms" className="underline ml-2 hover:opacity-80">Terms</a> ·
                <a href="/privacy" className="underline ml-2 hover:opacity-80">Privacy</a>
              </p>

              {/* Social icons aligned inline on the right */}
              <SocialFooter />
            </div>
          </footer>
        </FooterGate>

        <Analytics />
      </body>
    </html>
  )
}
