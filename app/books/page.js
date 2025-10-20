// app/books/page.js — SERVER FILE (no "use client")
import BooksClient from "../../components/BooksClient";

export const metadata = {
  title: "Books & Publications — Dr. Juan Pablo Salerno",
  description:
    "Research led by Dr. Salerno exploring mental health, resilience, and wellbeing, with a focus on uplifting communities.",
  openGraph: {
    title: "Books & Publications — Dr. Juan Pablo Salerno",
    description:
      "Research led by Dr. Salerno exploring mental health, resilience, and wellbeing, with a focus on uplifting communities.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/books" },
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
        "name": "Books & Publications",
        "item": "https://my-site-2-coral.vercel.app/books"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <BooksClient />
    </>
  );
}
