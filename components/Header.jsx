// components/Header.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent text-[var(--color-cream)]">
            {/* Make this relative so the top-right name can be absolutely positioned */}
      <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-center">
                {/* Centered nav */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-[13px] tracking-wide uppercase">
          <Link href="/about" className="hover:underline underline-offset-4 hover:opacity-90 transition">About</Link>
          <Link href="/books" className="hover:underline underline-offset-4 hover:opacity-90 transition">Books & Publications</Link>
          <Link href="/meditations" className="hover:underline underline-offset-4 hover:opacity-90 transition">Meditations</Link>
          <Link href="/resources" className="hover:underline underline-offset-4 hover:opacity-90 transition">Resources</Link>
          <Link href="/speaking" className="hover:underline underline-offset-4 hover:opacity-90 transition">Speaking</Link>
          <Link href="/consulting" className="hover:underline underline-offset-4 hover:opacity-90 transition">Consulting</Link>
          <Link href="/press" className="hover:underline underline-offset-4 hover:opacity-90 transition">Press</Link>
          <Link href="/contact" className="hover:underline underline-offset-4 hover:opacity-90 transition">Contact</Link>
        </nav>

          {/* Top-left name link (hidden on the homepage) */}
        {!isHome && (
          <Link
            href="/"
            className="absolute right-15 top-15 -translate-y-1/2 font-serif tracking-wide hover:opacity-90 transition"
          >
            <span className="text-lg lg:text-xl">
              DR. JUAN PABLO SALERNO
            </span>
            <sup className="text-lg align-super opacity-70">™</sup>
          </Link>
        )}
      </div>
    </header>
  );
}
