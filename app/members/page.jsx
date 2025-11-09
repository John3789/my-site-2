// app/members/page.jsx
import Link from "next/link";

export const metadata = { title: "Members — Dr. Juan Pablo Salerno" };

export default function MembersHome() {
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

        {/* Sign out (members page only) */}
<form action="/api/auth/signout" method="POST" className="contents">
  <button
    type="submit"
    className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
  >
    🚪 Sign out
  </button>
</form>

      </div>
    </main>
  );
}
