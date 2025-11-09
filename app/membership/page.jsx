// app/membership/page.jsx
import MembershipClient from "./MembershipClient";
import { FreeSignupButton, LoginButton } from "./MembershipActions";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

export default function Page() {
  // Pass the Free plan id from a PUBLIC env var (set in Vercel → Production)
  const freePlanId = process.env.NEXT_PUBLIC_MS_FREE_PLAN_ID; // e.g., pln_abc123…

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      {/* mounts Memberstack on the client */}
      <MembershipClient />

      <h1 className="text-3xl font-bold">Membership</h1>
      <p className="mt-2 opacity-80">
        Unlock meditation recordings, themed resources, and member-only perks.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* FREE PLAN */}
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-lg font-bold">Free</div>
          <div className="text-4xl font-extrabold my-2">$0</div>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Newsletter</li>
            <li>• 2 sample meditations</li>
            <li>• Limited resources</li>
          </ul>

          <FreeSignupButton
            freePlanId={freePlanId}
            className="mt-4 inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
          >
            Create Free Account
          </FreeSignupButton>
        </div>

        {/* PAID PLAN */}
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <div className="text-lg font-bold">Member</div>
          <div className="text-4xl font-extrabold my-2">$19/mo</div>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Full Meditation Library</li>
            <li>• All themed Resources</li>
            <li>• Discount on custom meditations</li>
          </ul>

          {/* Stripe form POST (kept exactly) */}
          <form method="POST" action="/api/checkout/member" className="mt-4">
            <input type="hidden" name="plan" value="monthly" />
            <button
              type="submit"
              className="inline-flex rounded-full border border-amber-300 bg-amber-300 text-black px-4 py-2 font-semibold active:translate-y-px"
            >
              Continue to Checkout
            </button>
          </form>
        </div>
      </div>

      {/* Sign-in prompt */}
      <div id="signin" className="mt-10">
        <h2 className="text-xl font-semibold">Already a member?</h2>
        <p className="opacity-80">
          <LoginButton className="underline underline-offset-4 hover:opacity-80">
            Sign in here
          </LoginButton>
          .
        </p>
      </div>
    </main>
  );
}
