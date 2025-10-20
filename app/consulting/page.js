// app/consulting/page.js — SERVER FILE (no "use client")
import ConsultingClient from "../../components/ConsultingClient";

export const metadata = {
  title: "Organizational Wellness Consulting — Dr. Juan Pablo Salerno",
  description:
    "Evidence-based consulting that helps organizations scale strategies to strengthen mental health, wellbeing, resilience, and growth.",
  openGraph: {
    title: "Organizational Wellness Consulting — Dr. Juan Pablo Salerno",
    description:
      "Evidence-based consulting that helps organizations scale strategies to strengthen mental health, wellbeing, resilience, and growth.",
    images: ["/hero17.jpg"], // resolved by metadataBase in layout
  },
  alternates: { canonical: "/consulting" },
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
        "name": "Consulting",
        "item": "https://my-site-2-coral.vercel.app/consulting"
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
      <ConsultingClient />
    </>
  );
}
