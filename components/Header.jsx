"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Header background logic (exactly what you wanted)
  const headerClass = isHome
    ? "fixed inset-x-0 top-0 z-[9999] !bg-transparent text-[var(--color-cream)] pointer-events-auto"
    : "fixed inset-x-0 top-0 z-[9999] !bg-transparent text-[var(--color-cream)] pointer-events-auto";

  return (
    <>
      {/* Header bar */}
      <header className={headerClass}>
        <div className="mx-auto max-w-7xl px-6 h-10 flex items-center">
          {/* Desktop / tablet nav (unchanged) */}
          <nav className="hidden md:flex w-full items-center justify-center gap-6 text-[13px] tracking-wide uppercase">
            <Link href="/about" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/about") ? "nav-active" : ""}`}>About</Link>
            <Link href="/books" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/books") ? "nav-active" : ""}`}>Books & Publications</Link>
            <Link href="/meditations" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/meditations") ? "nav-active" : ""}`}>Meditations</Link>
            <Link href="/resources" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/resources") ? "nav-active" : ""}`}>Resources</Link>
            <Link href="/speaking" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/speaking") ? "nav-active" : ""}`}>Speaking</Link>
            <Link href="/consulting" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/consulting") ? "nav-active" : ""}`}>Consulting</Link>
            <Link href="/contact" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname.startsWith("/contact") ? "nav-active" : ""}`}>Contact</Link>
          </nav>

          {/* Mobile hamburger — moved to LEFT and bigger (portrait), smaller (landscape) */}
<button
  type="button"
  aria-label="Open menu"
  onClick={() => setOpen(true)}
  className="md:hidden mr-auto -ml-1 p-3 translate-y-14"
>
  {/* 3-line icon (cream) */}
  <svg
    className="w-[75px] h-[75px] landscape:w-[44px] landscape:h-[44px]"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="var(--color-cream)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
</button>
        </div>
      </header>

{/* Desktop top-right home link (non-home pages only) */}
{!isHome && (
  <Link
    href="/"
    className="
      hidden md:block absolute
       top-9 right-15
      z-[201] pt-1 pr-3
      font-serif uppercase tracking-wide
      text-[var(--color-cream)] hover:opacity-90 transition
      leading-none
    "
  >
    <span className="text-lg lg:text-xl">DR. JUAN PABLO SALERNO</span>
    <sup className="text-lg align-super opacity-70">™</sup>
  </Link>
)}



      {/* Mobile full-screen menu (slides over, cream on teal) */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[10000] bg-black/40"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <aside className="fixed inset-y-0 left-0 z-[10001] w-[80vw] max-w-[420px] bg-[var(--color-teal-800)] text-[var(--color-cream)] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-12">
              <span className="font-serif text-base">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-3 -mr-2"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="px-6 py-4 space-y-4 uppercase tracking-wide text-[14px]">
              <MobileLink href="/" onClick={() => setOpen(false)} active={pathname === "/"}>Home</MobileLink>
              <MobileLink href="/about" onClick={() => setOpen(false)} active={pathname.startsWith("/about")}>About</MobileLink>
              <MobileLink href="/books" onClick={() => setOpen(false)} active={pathname.startsWith("/books")}>Books & Publications</MobileLink>
              <MobileLink href="/meditations" onClick={() => setOpen(false)} active={pathname.startsWith("/meditations")}>Meditations</MobileLink>
              <MobileLink href="/resources" onClick={() => setOpen(false)} active={pathname.startsWith("/resources")}>Resources</MobileLink>
              <MobileLink href="/speaking" onClick={() => setOpen(false)} active={pathname.startsWith("/speaking")}>Speaking</MobileLink>
              <MobileLink href="/consulting" onClick={() => setOpen(false)} active={pathname.startsWith("/consulting")}>Consulting</MobileLink>
              <MobileLink href="/contact" onClick={() => setOpen(false)} active={pathname.startsWith("/contact")}>Contact</MobileLink>
            </nav>

            <div className="mt-auto px-6 pb-[calc(env(safe-area-inset-bottom)+12px)] text-xs opacity-80">
              © {new Date().getFullYear()} Dr. Juan Pablo Salerno™
            </div>
          </aside>
        </>
      )}
    </>
  );
}

/* Small helper for active state on mobile links */
function MobileLink({ href, children, onClick, active }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-2 ${active ? "font-semibold underline underline-offset-4" : "opacity-95 hover:opacity-100"}`}
    >
      {children}
    </Link>
  );
}
