// app/layout.js
import './globals.css'
import { Inter, Cormorant_Garamond } from 'next/font/google'

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
      {/* ⬇️ lock layout so it always looks like full screen */}
      <body className="min-w-[1200px] bg-[#F4F1EA] text-[#0C1415] antialiased">
        {children}
      </body>
    </html>
  )
}
