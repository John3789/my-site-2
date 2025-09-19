// components/Header.jsx
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-teal-950)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <nav className="mx-auto flex flex-wrap items-center justify-center gap-6 text-[13px] tracking-wide uppercase">
          <Link href="/about">About</Link>
          <Link href="/books">Books & Publications</Link>
          <Link href="/meditations">Meditations</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/speaking">Speaking</Link>
          <Link href="/consulting">Consulting</Link>
          <Link href="/press">Press</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}