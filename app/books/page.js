export default function BooksPage() {
  return (
    <main
      className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Content on the left */}
        <div className="lg:col-span-7">
          {/* Page title */}
          <h1 className="font-serif text-4xl opacity-90 mb-6">Books & Publications</h1>

          {/* Intro */}
          <p className="text-lg opacity-90 max-w-3xl mb-8">
            Explore my published works, where research, practice, and personal growth intersect.
            Each piece reflects my commitment to advancing knowledge and making science accessible.
          </p>

          {/* Section: Featured Book */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl opacity-90 mb-3">Featured Book</h2>
            <p className="opacity-90 max-w-2xl">
              Coming soon: my debut book on single-session mental health interventions and their
              potential to transform care and accessibility.
            </p>
          </section>

          {/* Section: Selected Publications */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl opacity-90 mb-3">Selected Publications</h2>
            <ul className="list-disc pl-6 space-y-2 opacity-90 max-w-2xl">
              <li>Salerno, J.P. (2024). Intersectionality and adolescent mental health. <em>Journal of Adolescent Health</em>.</li>
              <li>Salerno, J.P. (2023). Minority stress and resilience among LGBTQ+ immigrant youth. <em>American Psychologist</em>.</li>
              <li>Salerno, J.P. (2022). Trauma-informed interventions in community contexts. <em>Epidemiology & Psychiatric Sciences</em>.</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="mt-12">
            <a
              href="/contact"
              className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Contact for Media & Speaking
            </a>
          </div>
        </div>

        {/* Image on the right */}
        <div className="lg:col-span-5 flex justify-center mt-12">
          <img
            src="award1.jpg"  // replace with your actual image file in /public
            alt="Book cover or related visual"
            className="w-full max-w-md object-cover shadow-2xl"
          />
        </div>
      </div>
    </main>
  );
}
