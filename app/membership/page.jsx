// app/membership/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MembershipClient from "./MembershipClient";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

export default function Page() {
  const isMember = Boolean(cookies().get("stripe_cust")?.value);

  // If already logged in, skip this page and go to members area
  if (isMember) {
    redirect("/members");
  }

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12 space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold">Membership</h1>
        <p className="mt-2 opacity-80">
          Weekly newsletters, meditation recordings, member discounts, and themed resources.
        </p>
      </header>

      {/* Sign in / Log in Component */}
      <section>
        <MembershipClient />
      </section>

      {/* Join / Pricing / Benefits — paste your /join content here */}
      <section className="pt-4">
        {/* 🔽 INSERT your former /join content here (pricing, features, etc.) */}
        <p className="opacity-70 italic">
          (Plans, benefits, and pricing UI go here — we will migrate this next)
        </p>
      </section>
    </main>
  );
}
