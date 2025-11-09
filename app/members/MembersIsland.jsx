// app/members/MembersIsland.jsx
"use client";

import Link from "next/link";

export default function MembersIsland() {
  async function handleSignOut(e) {
    e.preventDefault();
    try {
      // Log out of Memberstack (if loaded)
      await window.$memberstack?.logout?.();
    } catch {}
    // Clear our cookie on the server (if you have this route)
    try { await fetch("/api/auth/signout", { method: "POST" }); } catch {}
    // Send them to the Membership page (join + login)
    window.location.href = "/membership";
  }

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
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10 text-left"
        >
          🚪 Sign out
        </button>
      </div>
    </main>
  );
}
