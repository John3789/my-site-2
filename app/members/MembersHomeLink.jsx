"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MembersHomeLink({ className = "", textColor = "var(--color-gold)", showArrow = true }) {
  const pathname = usePathname();

  // Don't show this link on the Members home page itself
  if (!pathname || pathname === "/members") {
    return null;
  }

  return (
    <div className={className}>
      <Link
        href="/members"
        className={`inline-flex items-center gap-2 font-semibold ${textColor} tracking-wide active:scale-95 transition hover:bg-[var(--color-transparent)]`} // Removed underline
      >
        {showArrow && <span aria-hidden="true">←</span>}  {/* Conditionally render the arrow */}
        <span>Members Home</span>
      </Link>
    </div>
  );
}
