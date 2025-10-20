// app/resources/page.js — SERVER FILE (no "use client")
import ResourcesClient from "../../components/ResourcesClient";

export const metadata = {
  title: "Resources — Dr. Juan Pablo Salerno",
  description:
    "A growing library of concise media collections—shaped by science and lived experience—to sharpen your mind and uplift your life.",
  openGraph: {
    title: "Resources — Dr. Juan Pablo Salerno",
    description:
      "A growing library of concise media collections—shaped by science and lived experience—to sharpen your mind and uplift your life.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/resources" },
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
        "name": "Resources",
        "item": "https://my-site-2-coral.vercel.app/resources"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ResourcesClient />
    </>
  );
}
