// app/contact/page.js — SERVER FILE (no "use client")
import ContactClient from "../../components/ContactClient";

export const metadata = {
  title: "Contact — Dr. Juan Pablo Salerno",
  description:
    "Connect for speaking, consulting, media, or collaborations. Share your goals and we’ll explore the best way to work together.",
  openGraph: {
    title: "Contact — Dr. Juan Pablo Salerno",
    description:
      "Connect for speaking, consulting, media, or collaborations. Share your goals and we’ll explore the best way to work together.",
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
        "item": "https://my-site-2-coral.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://my-site-2-coral.vercel.app/contact"
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
