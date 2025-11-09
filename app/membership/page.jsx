// app/membership/page.jsx
import { cookies } from "next/headers";
import MembershipClient from "./MembershipClient.jsx";

export const metadata = { title: "Membership — Dr. Juan Pablo Salerno" };

export default function Page() {
  const isMember = Boolean(cookies().get("stripe_cust")?.value);

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12">
      <h1 className="text-3xl font-bold">Membership</h1>
      <p className="mt-2 opacity-80">
        Weekly newsletters, meditation recordings, member discounts, and themed resources.
      </p>

      {/* Client buttons handle Sign in modal + redirect */}
      <MembershipClient isMember={isMember} />
    </main>
  );
}
