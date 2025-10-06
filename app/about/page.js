"use client";
import TopOnMount from "../../TopOnMount/TopOnMount";
import Image from "next/image";
import Link from "next/link";


export default function AboutPage() {
  return (
    <TopOnMount>
    <>

      {/* ===== PAGE BODY WRAPPER (same zoom as home) ===== */}
      <div
        style={{ '--z': 3.00, '--zoomL': 1.60 }}
        className="
          md:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none]
          md:[width:100%]
          landscape:[transform:scale(var(--zoomL))]
          landscape:[width:calc(100%/var(--zoomL))]
          overflow-hidden
        "
      >
        <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-[1400px] px-6 py-20">
            {/* Page title with kicker + gold bar */}
            <div className="text-center mb-12">
              <h1 className="font-serif text-6xl leading-[1.06] opacity-90 mt-2">
                About Dr. Salerno
              </h1>
              <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
            </div>

            {/* Row 1: first two paragraphs + photo side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
              {/* Left: first two paragraphs */}
              <div>
                <p className="space-y-6 text-lg mb-4 opacity-90 leading-loose">
                  Dr. Juan Pablo Salerno, also known in academic spaces as{" "}
                  <strong>Dr. John P. Salerno</strong>, is a mental health scientist,
                  personal growth expert, and 30x published scientific peer-reviewed author, cited
                  nearly 2000x in the last decade (2016 - present). He has over 14 years of experience
                  working in top academic institutions, including Columbia University, George Washington
                  University, University of Maryland, and University of Miami. He is committed to sharing
                  his lived experience, wisdom, and expertise to guide others in overcoming mental health
                  struggles, awakening potential, and living abundantly through self-love, fulfillment,
                  and purpose.
                </p>

                <p className="space-y-6 text-lg opacity-90 leading-loose">
                  His research has been published in leading journals such as Psychiatry Research,
                  Psychological Trauma, Epidemiology &amp; Psychiatric Sciences, Drug &amp; Alcohol
                  Dependence, Psychology of Sexual Orientation &amp; Gender Diversity, and Preventing
                  Chronic Disease. In recognition of his contributions, he received the 2024 National
                  Award of Excellence in Research from the National Hispanic Science Network and was an
                  invited main speaker at the 2024 National Institute of Mental Health Workshop on
                  Promoting Mental Health for Sexual and Gender Minority Youth.
                </p>
              </div>

              {/* Right: photo */}
              <div className="flex justify-center">
                <img
                  src="/heroabout.jpg"
                  alt="Dr. Juan Pablo Salerno"
                  className="w-full max-w-md h-full shadow-lg object-cover mt-4"
                />
              </div>
            </div>

            {/* Row 2+: everything else centered below */}
            <div className="mx-auto max-w-[1000px] px-6 space-y-12">
              {/* Paragraph 3 */}
              <p className="space-y-6 text-lg opacity-90 leading-loose">
                Dr. Salerno’s expertise is rooted in science and shaped by personal transformation.
                Having experienced his own lowest point in mental health, he dedicated years to therapy
                and recovery. After achieving remission, he expanded his self-improvement process by
                exploring personal growth practices — including meditation, Feng Shui, and manifestation
                — learning from some of the most well-known experts in the field. Through his journey,
                he continues to transcend into his highest self and uncover his deeper purpose.
              </p>

              {/* Mission */}
              <section id="mission">
                <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                  Mission
                </h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                <p className="space-y-6 text-lg opacity-90 leading-loose">
                  To blend science and personal growth wisdom to help individuals and communities rise
                  above mental health struggle, unlock hidden potential, and live abundant lives with
                  higher purpose.
                </p>
              </section>

              {/* Projects in the Now */}
              <section id="projects">
                <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                  Projects in the Now
                </h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                <p className="space-y-6 text-lg opacity-90 leading-loose">
                  Today, Dr. Salerno continues conducting research with the goal of making scientific
                  discoveries relevant for improving mental health. He also teaches at the university
                  level, where he inspires the next generation of scholars and practitioners. Alongside
                  his academic work, he is pursuing his personal growth journey and is currently working
                  on a forthcoming book that weaves science and personal growth wisdom to guide others
                  toward balance, purpose, fulfillment, and mental wellness. On this site, you can
                  explore his offerings, including publications, consulting, public speaking, guided
                  meditations, and resources for personal growth and mental health.
                </p>
              </section>

              {/* Credentials */}
              <section id="credentials">
                <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
                <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                  Credentials
                </h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
                <p className="space-y-6 text-lg opacity-90 leading-loose">
                  Dr. Salerno holds a Ph.D. in Behavioral &amp; Community Health and a Graduate
                  Certificate in Measurement, Statistics, &amp; Evaluation from the University of
                  Maryland. He also earned an M.P.H. in Prevention Science &amp; Community Health and a
                  B.A. in Psychology with a Minor in Sociology from the University of Miami.
                </p>
              </section>
            </div>

            {/* CTA with faint outline */}
            <div className="mt-16 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition ring-1 ring-black/10"
              >
                Get in Touch
              </Link>
            </div>
          </div>
                    {/* Home: section/bookend divider (aligns to 1400px container) */}
<div className="mx-auto max-w-[1000px] px-6">
  <hr className="border-t border-[var(--color-cream)]/22" />
</div>
        </main>
      </div>
    </>
                </TopOnMount>

  );
}
