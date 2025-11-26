// app/about/page.js — SERVER FILE (no "use client")
import AboutClient from "../../components/AboutClient";

export const metadata = {
  title: "About — Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health science expert and transformation advisor, author and professor— inspiring purpose, healing, and growth.",
  openGraph: {
    title: "Dr. Juan Pablo Salerno",
    description:
    "Dr. Juan Pablo Salerno, award-winning mental health science expert and transformation advisor, author and professor— inspiring purpose, healing, and growth.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/about" },
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
        "name": "About",
        "item": "https://drjuanpablosalerno.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <AboutClient />
    </>
  );
}
