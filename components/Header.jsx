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
          <nav className="hidden lg:flex w-full items-center justify-center gap-6 text-[13px] tracking-wide uppercase">
            {!isHome && (
            <Link href="/" className={`hover:underline underline-offset-4 hover:opacity-90 transition ${pathname === "/" ? "nav-active" : ""}`}>Home</Link>)}
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
  className="lg:hidden mr-auto -mr-1 -ml-1 p-3 translate-y-14 zoom-exempt"
>
  {/* 3-line icon (cream) */}
  <svg
 className="w-[56px] h-[56px] landscape:w-[48px] landscape:h-[48px]"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="var(--color-cream)"
      strokeWidth="3.0"
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
  hidden lg:block absolute
  top-9 lg:[right:0rem] xl:[right:1rem] xxl:[right:3.75rem]
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

    {/* FULL-SCREEN PANEL */}
    <aside
      className="
        fixed inset-0 z-[10001]
        !bg-[var(--color-teal-850)] text-[var(--color-cream)]
        flex flex-col
        min-h-[100svh]   /* fills viewport; stable on iOS */
        overflow-y-auto   /* scroll if long */
        overscroll-contain
      "
    >
      <div className="flex items-center justify-between px-6 h-16 pr-25">
  {/* Bigger Menu label with landscape adjustment */}
  <span className="font-serif 
                  text-[13vw] landscape:text-[4vw]">
    Menu
  </span>

  {/* Close button */}
  <button
    type="button"
    aria-label="Close menu"
    onClick={() => setOpen(false)}
    className="p-3 -mr-2 ml-8 landscape:ml-0"
  >
    <svg 
      width="20vw" height="20vw"  /* scales in portrait */
      className="landscape:w-[6vw] landscape:h-[6vw]"  /* smaller in landscape */
      viewBox="0 0 24 24" fill="none" aria-hidden="true"
    >
      <path 
        d="M6 6l12 12M18 6l-12 12" 
        stroke="var(--color-cream)" 
        strokeWidth="3" strokeLinecap="round"
      />
    </svg>
  </button>
</div>

      {/* Bigger, responsive options; shrink in landscape so nothing gets cut off */}
      <nav
        className="px-6 py-6 space-y-6 uppercase tracking-wide
                   text-[14vw] landscape:text-[4vw]"
      >
        <MobileLink href="/" onClick={() => setOpen(false)} active={pathname === "/"}>Home</MobileLink>
        <MobileLink href="/about" onClick={() => setOpen(false)} active={pathname.startsWith("/about")}>About</MobileLink>
        <MobileLink href="/books" onClick={() => setOpen(false)} active={pathname.startsWith("/books")}>Books & Publications</MobileLink>
        <MobileLink href="/meditations" onClick={() => setOpen(false)} active={pathname.startsWith("/meditations")}>Meditations</MobileLink>
        <MobileLink href="/resources" onClick={() => setOpen(false)} active={pathname.startsWith("/resources")}>Resources</MobileLink>
        <MobileLink href="/speaking" onClick={() => setOpen(false)} active={pathname.startsWith("/speaking")}>Speaking</MobileLink>
        <MobileLink href="/consulting" onClick={() => setOpen(false)} active={pathname.startsWith("/consulting")}>Consulting</MobileLink>
        <MobileLink href="/contact" onClick={() => setOpen(false)} active={pathname.startsWith("/contact")}>Contact</MobileLink>
      </nav>

      <div className="mt-auto px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] text-xs opacity-80">
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
