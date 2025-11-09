// app/membership/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MembershipClient from "./MembershipClient";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

export default function Page() {
  const isMember = Boolean(cookies().get("stripe_cust")?.value);
  if (isMember) redirect("/members");

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Membership</h1>
        <p className="mt-2 opacity-80">Weekly newsletters, meditation recordings, member discounts, and themed resources.</p>
      </header>

      {/* Sign-in (existing members) */}
      <section>
        <MembershipClient />
      </section>

      {/* JOIN CONTENT — this is your “Join page” now, living on /membership */}
      <JoinSection />
    </main>
  );
}

// ---- Inline Join section (benefits + pricing + checkout) ----
function JoinSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Join the Membership</h2>

      {/* Benefits */}
      <ul className="grid gap-2 text-[15px] leading-relaxed">
        <li>✔︎ Weekly newsletter</li>
        <li>✔︎ Access to meditation recordings</li>
        <li>✔︎ Discounted custom meditations + discovery call</li>
        <li>✔︎ Monthly live online event</li>
        <li>✔︎ Curated resources by theme (mental health, relationships, etc.)</li>
      </ul>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly */}
        <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Monthly</h3>
          <p className="mt-1 opacity-80">Full access, billed monthly. Cancel anytime.</p>
          <a href="/api/checkout/member?plan=monthly" className="mt-4 inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/90 px-5 py-3 font-semibold text-white hover:opacity-90 active:translate-y-px">Join — Monthly</a>
        </div>

        {/* Yearly */}
        <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">Yearly</h3>
          <p className="mt-1 opacity-80">Best value. Billed annually.</p>
          <a href="/api/checkout/member?plan=yearly" className="mt-4 inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/90 px-5 py-3 font-semibold text-white hover:opacity-90 active:translate-y-px">Join — Yearly</a>
        </div>
      </div>

      <p className="text-sm opacity-70">Already a member? Use the Sign in button above.</p>
    </section>
  );
}
