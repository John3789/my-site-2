// app/about/page.js
export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Page title */}
        <h1 className="font-serif text-4xl mb-8 text-center">About Dr. Salerno</h1>

        {/* Row 1: first two paragraphs + photo side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Left: first two paragraphs */}
          <div>

<p className="space-y-6 text-lg mb-4 opacity-90 leading loose">

 Dr. Juan Pablo Salerno, also known in academic spaces as  <strong>Dr. John P. Salerno</strong>, is a mental health scientist, personal growth expert, and
  30x scientific peer-reviewed author. He has over 14 years of experience
  working in top academic institutions, including Columbia University,
  George Washington University, University of Maryland, and University
  of Miami. He is committed to sharing his lived experience, wisdom, and
  expertise to empower people to overcome struggles, unlock hidden
  potential, and live lives filled with love, happiness, fulfillment, and
  purpose — free from mental health hardships.
</p>


            <p className="space-y-6 text-lg opacity-90 leading-loose">

              His research has been published in leading journals such as Psychiatry
              Research, Psychological Trauma, Epidemiology &amp; Psychiatric Sciences,
              Drug &amp; Alcohol Dependence, Psychology of Sexual Orientation &amp;
              Gender Diversity, and Preventing Chronic Disease. In recognition of his
              contributions, he received the 2024 National Award of Excellence in
              Research from the National Hispanic Science Network and was an invited
              main speaker at the 2024 National Institute of Mental Health Workshop on
              Promoting Mental Health for Sexual and Gender Minority Youth.
            </p>
          </div>

          {/* Right: photo */}
          <div className="flex justify-center">
            <img
              src="/heroabout.jpg"
              alt="Dr. Juan Pablo Salerno"
              className="w-full max-w-md h-full shadow-lg object-cover mt-10"
            />
          </div>
        </div>

        {/* Row 2+: everything else centered below */}
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Paragraph 3 */}
          <p className="space-y-6 text-lg opacity-90 leading-loose">
            Dr. Salerno’s commitment is personal as well as professional. After 
            hitting his own rock bottom in mental health, he spent years in therapy 
            with psychologists and psychiatrists. After reaching a plateau in his 
            healing process, he began exploring additional practices to complement 
            traditional care — including meditation, Feng Shui, and manifestation 
            — learning from some of the most well-known experts in the field. Through 
            his journey, he achieved full remission from his mental health struggles 
            and uncovered his deeper purpose.
          </p>

          {/* Mission */}
          <section>
            <h2 className="font-serif text-4xl mb-4 text-center">Mission</h2>
            <p className="space-y-6 text-lg opacity-90 leading-loose">
              To blend science and personal growth wisdom to help individuals and
              communities unlock their hidden potential and live full lives with
              higher purpose, free from mental health struggles.
            </p>
          </section>

          {/* Work in the Now */}
          <section>
            <h2 className="font-serif text-4xl mb-4 text-center">Projects in the Now</h2>
            <p className="space-y-6 text-lg opacity-90 leading-loose">
              Today, Dr. Salerno continues conducting research with the goal of
              making scientific discoveries relevant for improving mental health. He
              is also pursuing his personal growth journey and is currently working
              on a forthcoming book that weaves science and personal growth wisdom to
              guide others toward balance, purpose, fulfillment, and mental wellness.
              On this site, you can explore his offerings, including consulting,
              public speaking, guided meditations, and resources for personal growth
              and mental health.
            </p>
          </section>

          {/* Credentials */}
          <section>
            <h2 className="font-serif text-4xl mb-4 text-center">Credentials</h2>
            <p className="space-y-6 text-lg opacity-90 leading-loose">
              Dr. Salerno holds a Ph.D. in Behavioral &amp; Community Health and a
              Graduate Certificate in Measurement, Statistics, &amp; Evaluation from
              the University of Maryland. He also earned an M.P.H. in Prevention
              Science &amp; Community Health and a B.A. in Psychology with a Minor in
              Sociology from the University of Miami.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
