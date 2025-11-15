// app/members/MembersHomeLink.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MembersHomeLink({ className = "" }) {
  const pathname = usePathname();

  // Don't show this link on the Members home page itself
  if (!pathname || pathname === "/members") {
    return null;
  }

  return (
    <div className={className}>
      <Link
        href="/members"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] hover:underline"
      >
        <span aria-hidden="true">←</span>
        <span>Members Home</span>
      </Link>
    </div>
  );
}
