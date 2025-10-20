// app/about/page.js — SERVER FILE (no "use client")
import AboutClient from "../../components/AboutClient";

export const metadata = {
  title: "About — Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
  openGraph: {
    title: "Dr. Juan Pablo Salerno",
    description:
      "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
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
        "item": "https://my-site-2-coral.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://my-site-2-coral.vercel.app/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <AboutClient />
    </>
  );
}
