// app/membership/page.jsx — server shell

import MembershipPageClient from "./MembershipPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// app/membership/page.jsx

export const metadata = {
  title: "RISE Membership Program — Dr. Juan Pablo Salerno",
  description:
    "Reset your mind, strengthen your energy, and rise into your greatest self.",
  alternates: {
    canonical: "/membership",
  },
  openGraph: {
    title: "RISE Membership Program — Dr. Juan Pablo Salerno",
    description:
      "Reset your mind, strengthen your energy, and rise into your greatest self.",
    type: "website",
    url: "https://drjuanpablosalerno.com/membership",
    siteName: "Dr. Juan Pablo Salerno",
    images: [
      {
        url: "https://drjuanpablosalerno.com/hero17.jpg", // update path if needed
        width: 1200,
        height: 630,
        alt: "RISE Membership Program — Dr. Juan Pablo Salerno",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RISE Membership Program — Dr. Juan Pablo Salerno",
    description:
      "Reset your mind, strengthen your energy, and rise into your greatest self.",
    images: ["https://drjuanpablosalerno.com/hero17.jpg"], // same image for Twitter
  },
};

function MembershipBreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://drjuanpablosalerno.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "RISE Membership",
        item: "https://drjuanpablosalerno.com/membership",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Page() {
  return <MembershipPageClient />;
}
