// app/contact/page.js — SERVER FILE (no "use client")
import ContactClient from "../../components/ContactClient";

export const metadata = {
  title: "Contact — Dr. Juan Pablo Salerno",
  description:
   "Reach out to Dr. Juan Pablo Salerno for questions about custom meditations, RISE membership, collaborations, or speaking engagements.",
  openGraph: {
    title: "Contact — Dr. Juan Pablo Salerno",
    description:
   "Reach out to Dr. Juan Pablo Salerno for questions about custom meditations, RISE membership, collaborations, or speaking engagements.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drjuanpablosalerno.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://drjuanpablosalerno.com/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ContactClient />
    </>
  );
}
