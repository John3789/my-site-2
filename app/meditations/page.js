// app/meditations/page.js — SERVER FILE (no "use client")
import MeditationClient from "../../components/MeditationClient";

export const metadata = {
  title: "Meditations — Dr. Juan Pablo Salerno",
  description:
    "Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.",
  openGraph: {
    title: "Meditations — Dr. Juan Pablo Salerno",
    description:
      "Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/meditations" },
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
        "name": "Meditations",
        "item": "https://my-site-2-coral.vercel.app/meditations"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <MeditationClient />
    </>
  );
}
