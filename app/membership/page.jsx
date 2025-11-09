// app/membership/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MembershipClient from "./MembershipClient";

// OPTIONAL: reuse your existing /join page content so you don't duplicate it.
// If your /join page default-exports a component, you can import it:
import JoinPage from "../join/page";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

export default function Page() {
  const isMember = Boolean(cookies().get("stripe_cust")?.value);
  if (isMember) {
    redirect("/members");
  }

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12">
      <h1 className="text-3xl font-bold">Membership</h1>
      <p className="mt-2 opacity-80">
        Weekly newsletters, meditation recordings, member discounts, and themed resources.
      </p>

      {/* Sign-in button that opens Memberstack and then sends to /members */}
      <MembershipClient />

      {/* Your current /join content (plans, pricing, features) */}
      <div className="mt-10">
        <JoinPage />
      </div>
    </main>
  );
}
