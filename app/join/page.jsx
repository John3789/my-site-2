// app/join/page.jsx
import Link from "next/link";

function PlanCard({ name, price, features, cta }) {
  return (
    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
      <div className="text-lg font-bold">{name}</div>
      <div className="text-4xl font-extrabold my-2">{price}</div>
      <ul className="text-sm space-y-1 opacity-90">{features.map((f) => <li key={f}>• {f}</li>)}</ul>
      <div className="mt-4">{cta}</div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Join the Membership</h1>
      <p className="mt-2 opacity-80">Unlock the Meditation Library, themed Resources, and member discounts.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <PlanCard
          name="Free"
          price="$0"
          features={["Newsletter", "2 sample meditations", "Limited resources"]}
          cta={<Link className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold" href="#signup">Create free account</Link>}
        />
        <PlanCard
          name="Member"
          price="$19/mo"
          features={["Full Meditation Library", "All themed Resources", "Member discount on custom meditation"]}
          cta={<Link className="inline-flex rounded-full border border-amber-300 bg-amber-300 text-black px-4 py-2 font-semibold" href="/api/checkout/member">Continue to Checkout</Link>}
        />
      </div>
      <div id="signup" className="mt-10">
        <h2 className="text-xl font-semibold">Already a member?</h2>
        <p className="opacity-80">Sign in via the Memberstack modal from any protected page prompt.</p>
      </div>
    </main>
  );
}
