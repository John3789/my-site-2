// app/members/MembersIsland.jsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function MembersIsland() {
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = useCallback(async (e) => {
    e.preventDefault();
    if (signingOut) return;
    setSigningOut(true);

    // Try Memberstack DOM SDK if present
    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    const msLogout = async () => {
      try {
        if (ms?.logout) return await ms.logout();
        if (ms?.signOut) return await ms.signOut();
      } catch {}
    };

    const appSignout = async () => {
      try {
        await fetch("/api/auth/signout", { method: "POST", keepalive: true });
      } catch {}
    };

    // Kick both off; don’t let either block the redirect
    await Promise.allSettled([msLogout(), appSignout()]);

    // Send them to Membership (login + plans)
    window.location.href = "/membership";
  }, [signingOut]);

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Welcome, Member ✨</h1>
      <p className="mt-2 opacity-80">
        You now have access to members-only resources. Use the links below.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
          href="/members/resources"
        >
          📚 Members Resources
        </Link>

        <Link
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
          href="/members/discount"
        >
          🎧 Discounted Custom Meditation + Discovery Call
        </Link>

        <Link
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
          href="/account"
        >
          💳 Manage Billing (Stripe Portal)
        </Link>

        <Link
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
          href="/resources"
        >
          🔎 Public Resources (site-wide)
        </Link>

        <button
          onClick={handleSignOut}
          data-ms-action="logout"      // lets Memberstack intercept if loaded
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10 text-left disabled:opacity-60"
          disabled={signingOut}
        >
          {signingOut ? "🚪 Signing out…" : "🚪 Sign out"}
        </button>
      </div>
    </main>
  );
}
