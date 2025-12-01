// app/page.js — server wrapper (NO "use client")
import HomeClient from "../components/HomeClient";

export const metadata = {
  title: "Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health science expert and thought leader, author, and professor— inspiring transformation, purpose, and healing.",
  openGraph: {
    title: "Dr. Juan Pablo Salerno",
    description:
    "Dr. Juan Pablo Salerno, award-winning mental health science expert and thought leader, author, and professor— inspiring transformation, purpose, and healing.",
    images: ["/hero17.jpg"],
      },
  alternates: { canonical: "/" },
};

export default function Page() {
// === PERSON SCHEMA (with @id and link to org) ===
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://drjuanpablosalerno.com/#person",
  "name": "Dr. Juan Pablo Salerno",
  "jobTitle": "Mental Health Science Expert, Author, Professor, Speaker",
  "description":
    "Award-winning mental health science expert and transformation advisor, author, and professor blending research and practical tools for transformation, purpose, and wellbeing.",
  "url": "https://drjuanpablosalerno.com/",
  "image": "https://drjuanpablosalerno.com/hero17.jpg",
"alumniOf": { "@type": "CollegeOrUniversity", "name": "Columbia University" },
  "worksFor": { "@id": "https://drjuanpablosalerno.com/#org" },
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
    "https://www.instagram.com/drjuanpablosalerno",
    "https://www.tiktok.com/@drjuanpablosalerno",
    "https://www.youtube.com/drjuanpablosalerno",
    "https://scholar.google.com/citations?user=qAVSpGYAAAAJ&hl=en",
    "https://www.linkedin.com/in/drjuanpablosalerno",
    "https://www.facebook.com/profile.php?id=61582412806274"
  ]
};

// === ORGANIZATION SCHEMA (with @id, ImageObject logo, founder link) ===
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://drjuanpablosalerno.com/#org",
  "name": "Dr. Juan Pablo Salerno Consulting",
  "url": "https://drjuanpablosalerno.com/",
"logo": {
  "@type": "ImageObject",
  "url": "https://drjuanpablosalerno.com/hero17.jpg",
  "width": 2400,
  "height": 1200
},
"description":
    "Consulting, speaking, and publishing practice led by Dr. Juan Pablo Salerno—bridging science and growth wisdom to strengthen resilience, wellbeing, and purpose.",
  "sameAs": [
    "https://www.instagram.com/drjuanpablosalerno",
    "https://www.tiktok.com/@drjuanpablosalerno",
    "https://www.youtube.com/drjuanpablosalerno",
    "https://scholar.google.com/citations?user=qAVSpGYAAAAJ&hl=en",
    "https://www.linkedin.com/in/drjuanpablosalerno",
    "https://www.facebook.com/profile.php?id=61582412806274"
  ],

  "contactPoint": [
  {
    "@type": "ContactPoint",
    "contactType": "Media Inquiries",
    "email": "contact@drjuanpablosalerno.com",
    "url": "https://drjuanpablosalerno.com/contact"
  },
  {
    "@type": "ContactPoint",
    "contactType": "Speaking Requests",
    "email": "contact@drjuanpablosalerno.com",
    "url": "https://drjuanpablosalerno.com/speaking"
  }
],

  "founder": { "@id": "https://drjuanpablosalerno.com/#person" },
  "department": [
    { "@type": "Organization", "name": "Speaking",
      "description": "Keynotes, workshops, and panels on mental health, resilience, and personal growth." },
    { "@type": "Organization", "name": "Consulting",
      "description": "Evidence-based consulting helping organizations scale strategies that strengthen wellbeing and growth." },
    { "@type": "Organization", "name": "Publications",
      "description": "Books and written works on mental health, purpose, and transformation." }
  ]
};

const jsonLdSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://drjuanpablosalerno.com/#website",
  "url": "https://drjuanpablosalerno.com/",
  "name": "Dr. Juan Pablo Salerno",
  "publisher": { "@id": "https://drjuanpablosalerno.com/#org" },
  "inLanguage": "en",
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }} />

      <HomeClient />
    </>
  );
}
