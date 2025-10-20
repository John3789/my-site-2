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
// === PERSON SCHEMA (with @id and link to org) ===
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://my-site-2-coral.vercel.app/#person",
  "name": "Dr. Juan Pablo Salerno",
  "jobTitle": "Mental Health Scientist, Personal Growth Expert, Author, Professor, Speaker, Consultant",
  "description":
    "Award-winning mental health scientist, author, and personal growth expert blending research and practical tools for transformation, purpose, and wellbeing.",
  "url": "https://my-site-2-coral.vercel.app/",
  "image": "https://my-site-2-coral.vercel.app/hero17.jpg",
  "alumniOf": "Columbia University",
  "worksFor": { "@id": "https://my-site-2-coral.vercel.app/#org" },
  "hasOccupation": [
    { "@type": "Occupation", "name": "Author" },
    { "@type": "Occupation", "name": "Speaker" },
    { "@type": "Occupation", "name": "Consultant" },
    { "@type": "Occupation", "name": "Professor" }
  ],
  "knowsAbout": [
    "mental health","resilience","wellbeing","personal growth",
    "mindfulness","evidence-based practice","organizational wellness","leadership development"
  ],
  "sameAs": [
    "https://www.instagram.com/YOURHANDLE",
    "https://www.tiktok.com/@YOURHANDLE",
    "https://www.youtube.com/@YOURHANDLE",
    "https://scholar.google.com/citations?user=YOURID",
    "https://www.linkedin.com/in/YOURHANDLE"
  ]
};

// === ORGANIZATION SCHEMA (with @id, ImageObject logo, founder link) ===
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://my-site-2-coral.vercel.app/#org",
  "name": "Dr. Juan Pablo Salerno Consulting",
  "url": "https://my-site-2-coral.vercel.app/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://my-site-2-coral.vercel.app/hero17.jpg",
    "width": 1200,
    "height": 630
  },
  "description":
    "Consulting, speaking, and publishing practice led by Dr. Juan Pablo Salerno—bridging science and growth wisdom to strengthen resilience, wellbeing, and purpose.",
  "sameAs": [
    "https://www.instagram.com/YOURHANDLE",
    "https://www.tiktok.com/@YOURHANDLE",
    "https://www.youtube.com/@YOURHANDLE",
    "https://scholar.google.com/citations?user=YOURID",
    "https://www.linkedin.com/in/YOURHANDLE"
  ],
  "founder": { "@id": "https://my-site-2-coral.vercel.app/#person" },
  "department": [
    { "@type": "Organization", "name": "Speaking",
      "description": "Keynotes, workshops, and panels on mental health, resilience, and personal growth." },
    { "@type": "Organization", "name": "Consulting",
      "description": "Evidence-based consulting helping organizations scale strategies that strengthen wellbeing and growth." },
    { "@type": "Organization", "name": "Publications",
      "description": "Books and written works on mental health, purpose, and transformation." }
  ]
};


  return (
    <>
      {/* PERSON SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />

      {/* ORGANIZATION SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />

      <HomeClient />
    </>
  );
}
