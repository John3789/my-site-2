// app/membership/page.jsx — server shell

import MembershipPageClient from "./MembershipPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "RISE Membership — Dr. Juan Pablo Salerno",
  description:
    "Guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "RISE Membership — Dr. Juan Pablo Salerno",
    description:
      "Guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return <MembershipPageClient />;
}
