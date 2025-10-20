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
// === PERSON SCHEMA ===
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Juan Pablo Salerno",
  "jobTitle": "Mental Health Scientist, Personal Growth Expert, Author, Professor, Speaker, Consultant",
  "description":
    "Award-winning mental health scientist, author, and personal growth expert blending research and practical tools for transformation, purpose, and wellbeing.",
  "url": "https://my-site-2-coral.vercel.app/",
  "image": "https://my-site-2-coral.vercel.app/hero17.jpg",
  "alumniOf": "Columbia University",
  "worksFor": {
    "@type": "Organization",
    "name": "Dr. Juan Pablo Salerno Consulting",
    "url": "https://my-site-2-coral.vercel.app/"
  },
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Author",
      "description": "Writer and speaker on topics of mental health, resilience, and personal growth."
    },
    {
      "@type": "Occupation",
      "name": "Speaker",
      "description": "Delivers keynote talks and workshops on resilience, purpose, and wellbeing."
    },
    {
      "@type": "Occupation",
      "name": "Consultant",
      "description": "Provides evidence-based consulting services to organizations to strengthen mental health, resilience, and wellbeing."
    },
    {
      "@type": "Occupation",
      "name": "Professor",
      "description": "University faculty and researcher focused on population mental health."
    }
  ],
  "knowsAbout": [
    "mental health",
    "resilience",
    "wellbeing",
    "personal growth",
    "mindfulness",
    "evidence-based practice",
    "organizational wellness",
    "leadership development"
  ],
  "sameAs": [
    "https://www.instagram.com/YOURHANDLE",
    "https://www.tiktok.com/@YOURHANDLE",
    "https://www.youtube.com/@YOURHANDLE",
    "https://scholar.google.com/citations?user=YOURID",
    "https://www.linkedin.com/in/YOURHANDLE"
  ]
};

// === ORGANIZATION SCHEMA ===
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dr. Juan Pablo Salerno Consulting",
  "url": "https://my-site-2-coral.vercel.app/",
  "logo": "https://my-site-2-coral.vercel.app/hero17.jpg",
  "description":
    "Consulting, speaking, and publishing practice led by Dr. Juan Pablo Salerno—bridging science and growth wisdom to strengthen resilience, wellbeing, and purpose.",
  "sameAs": [
    "https://www.instagram.com/YOURHANDLE",
    "https://www.tiktok.com/@YOURHANDLE",
    "https://www.youtube.com/@YOURHANDLE",
    "https://scholar.google.com/citations?user=YOURID",
    "https://www.linkedin.com/in/YOURHANDLE"
  ],
  "founder": {
    "@type": "Person",
    "name": "Dr. Juan Pablo Salerno",
    "url": "https://my-site-2-coral.vercel.app/"
  },
  "department": [
    {
      "@type": "Organization",
      "name": "Speaking",
      "description": "Keynotes, workshops, and panels on mental health, resilience, and personal growth."
    },
    {
      "@type": "Organization",
      "name": "Consulting",
      "description": "Evidence-based consulting helping organizations scale strategies that strengthen wellbeing and growth."
    },
    {
      "@type": "Organization",
      "name": "Publications",
      "description": "Books and written works on mental health, purpose, and transformation."
    }
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
