// app/page.js — server wrapper (NO "use client")
import HomeClient from "../components/HomeClient";

export const metadata = {
  title: "Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
  openGraph: {
    title: "Dr. Juan Pablo Salerno",
    description:
      "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
    images: ["/hero17.jpg"],
      },
  alternates: {
    canonical: "./",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Juan Pablo Salerno",
    "jobTitle": "Mental Health Scientist, Personal Growth Expert, Author, Professor",
    "description":
      "Award-winning mental health scientist and personal growth expert blending research and practical tools for transformation, purpose, and wellbeing.",
    "url": "https://my-site-2-coral.vercel.app/",
    "image": "https://my-site-2-coral.vercel.app/hero17.jpg",
    "alumniOf": "Columbia University",
    "knowsAbout": [
      "mental health",
      "resilience",
      "wellbeing",
      "personal growth",
      "meditation",
      "evidence-based practice"
    ],
    "sameAs": [
      "https://www.instagram.com/YOURHANDLE",
      "https://www.tiktok.com/@YOURHANDLE",
      "https://www.youtube.com/@YOURHANDLE",
      "https://scholar.google.com/citations?user=YOURID"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
