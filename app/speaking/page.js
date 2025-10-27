// app/speaking/page.js — SERVER FILE (no "use client")
import SpeakingClient from "../../components/SpeakingClient";

export const metadata = {
  title: "Speaking — Dr. Juan Pablo Salerno",
  description:
    "Evidence-based talks and workshops that empower transformation, resilience, wellbeing, and personal growth through science, story, and purpose.",
  openGraph: {
    title: "Speaking — Dr. Juan Pablo Salerno",
    description:
      "Evidence-based talks and workshops that empower transformation, resilience, wellbeing, and personal growth through science, story, and purpose.",
    images: ["/hero17.jpg"],
  },
  alternates: { canonical: "/speaking" },
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
        "name": "Speaking",
        "item": "https://drjuanpablosalerno.com/speaking"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <SpeakingClient />
    </>
  );
}
