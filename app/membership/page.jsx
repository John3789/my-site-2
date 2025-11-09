// app/membership/page.jsx
import Link from "next/link";
import { cookies } from "next/headers";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

// Server component: detect member via cookie
export default function MembershipPage() {
  const isMember = Boolean(cookies().get("stripe_cust")?.value);

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12">
      <h1 className="text-3xl font-bold">Membership</h1>
      <p className="mt-2 opacity-80">
        Weekly newsletters, meditation recordings, member discounts, and themed resources.
      </p>

      {isMember ? <MemberPanel /> : <GuestPanel />}
    </main>
  );
}

function GuestPanel() {
  return (
    <section className="mt-8 grid gap-3">
      <Link
        href="/join"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/90 text-white px-5 py-3 font-semibold hover:opacity-90 active:translate-y-px"
      >
        Join the Membership
      </Link>

      {/* Optional: direct members to login (opens Memberstack modal on /login) */}
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Sign in
      </Link>

      <p className="mt-2 text-sm opacity-70">
        New here? Tap <b>Join</b> to become a member. If you’ve already subscribed, use <b>Sign in</b>.
      </p>
    </section>
  );
}

function MemberPanel() {
  return (
    <section className="mt-8 grid gap-3">
      <Link
        href="/members"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Go to Members Area
      </Link>

      <Link
        href="/account"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg黑/5 active:translate-y-px"
      >
        Manage Billing
      </Link>

      <p className="mt-2 text-sm opacity-70">
        You’re signed in on this device. If you don’t see members content elsewhere, sign in again there.
      </p>
    </section>
  );
}
