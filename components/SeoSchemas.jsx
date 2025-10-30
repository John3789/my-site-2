"use client";

export function JsonLd({ json }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export function HomeSchemas({ socials }) {
  const personId = "https://djuanpablosalerno.com/#person";
  const orgId = "https://djuanpablosalerno.com/#org";
  const siteId = "https://djuanpablosalerno.com/#website";
  const sameAs = socials?.filter(Boolean) || [];

  const person = {
    "@context":"https://schema.org",
    "@type":"Person",
    "@id":personId,
    name:"Dr. Juan Pablo Salerno",
    jobTitle:["Author","Professor","Speaker","Consultant"],
    description:"Evidence-informed personal growth and mental health insights.",
    url:"https://djuanpablosalerno.com/",
    image:"https://djuanpablosalerno.com/hero17.jpg",
    alumniOf:{ "@type":"CollegeOrUniversity", "name":"Columbia University" },
    worksFor:{ "@id":orgId },
    hasOccupation:[{ "@type":"Occupation","name":"Author" },{ "@type":"Occupation","name":"Speaker" },{ "@type":"Occupation","name":"Consultant" },{ "@type":"Occupation","name":"Professor" }],
    knowsAbout:["mental health","resilience","wellbeing","personal growth","mindfulness","evidence-based practice","organizational wellness","leadership development"],
    sameAs
  };

  const org = {
    "@context":"https://schema.org",
    "@type":"Organization",
    "@id":orgId,
    name:"Dr. Juan Pablo Salerno Consulting",
    url:"https://djuanpablosalerno.com/",
    logo:{ "@type":"ImageObject", "url":"https://djuanpablosalerno.com/hero17.jpg", "width":2400, "height":1200 },
    description:"Consulting, speaking, and publishing focused on evidence-informed personal growth and organizational wellbeing.",
    sameAs,
    founder:{ "@id":personId },
    contactPoint:[
      { "@type":"ContactPoint", "contactType":"Media Inquiries", "email":"contact@djuanpablosalerno.com", "url":"https://djuanpablosalerno.com/contact" },
      { "@type":"ContactPoint", "contactType":"Speaking Requests", "email":"contact@djuanpablosalerno.com", "url":"https://djuanpablosalerno.com/speaking" }
    ],
    department:[
      { "@type":"Organization","name":"Speaking","description":"Keynotes, programs, and workshops." },
      { "@type":"Organization","name":"Consulting","description":"Strategy, culture, and wellbeing." },
      { "@type":"Organization","name":"Publications","description":"Articles and guides." }
    ]
  };

  const site = {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "@id":siteId,
    url:"https://djuanpablosalerno.com/",
    name:"Dr. Juan Pablo Salerno",
    inLanguage:"en",
    publisher:{ "@id":orgId }
  };

  return (<>
    <JsonLd json={person} />
    <JsonLd json={org} />
    <JsonLd json={site} />
  </>);
}
