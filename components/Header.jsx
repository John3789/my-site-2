"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Force transparency on the homepage, mobile only.
  // On md+ the header goes back to teal. Other routes keep teal on all sizes.
  const headerClass = isHome
    ? "fixed inset-x-0 top-0 z-[9999] !bg-transparent md:!bg-[var(--color-teal-800)] text-[var(--color-cream)] pointer-events-auto"
    : "fixed inset-x-0 top-0 z-[9999] !bg-[var(--color-teal-800)] text-[var(--color-cream)] pointer-events-auto";

  return (
    <>
      <header className={headerClass} style={isHome ? { backgroundColor: "transparent" } : undefined}>
        <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-center">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[13px] tracking-wide uppercase bg-transparent">
            <Link
              href="/about"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/about") ? "nav-active" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/books"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/books") ? "nav-active" : ""
              }`}
            >
              Books & Publications
            </Link>
            <Link
              href="/meditations"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/meditations") ? "nav-active" : ""
              }`}
            >
              Meditations
            </Link>
            <Link
              href="/resources"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/resources") ? "nav-active" : ""
              }`}
            >
              Resources
            </Link>
            <Link
              href="/speaking"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/speaking") ? "nav-active" : ""
              }`}
            >
              Speaking
            </Link>
            <Link
              href="/consulting"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/consulting") ? "nav-active" : ""
              }`}
            >
              Consulting
            </Link>
            <Link
              href="/contact"
              className={`hover:underline underline-offset-4 hover:opacity-90 transition ${
                pathname.startsWith("/contact") ? "nav-active" : ""
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Keep the top-right name badge on non-home routes */}
      {!isHome && (
        <Link
          href="/"
          className="fixed top-9 right-15 z-[201] pt-1 pr-3 font-serif tracking-wide hover:opacity-90 transition leading-none"
        >
          <span className="text-lg lg:text-xl">DR. JUAN PABLO SALERNO</span>
          <sup className="text-lg align-super opacity-70">™</sup>
        </Link>
      )}
    </>
  );
}
