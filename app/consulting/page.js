export default function ConsultingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Consulting</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          Strategy and leadership support grounded in neuroscience and behavior change—practical,
          measurable, and people-centered.
        </p>

        <section className="space-y-6">
          <div>
            <h3 className="font-serif text-xl mb-2">Focus Areas</h3>
            <ul className="list-disc pl-6 space-y-1 opacity-90">
              <li>Behavior change & habit design</li>
              <li>Leadership coaching & team culture</li>
              <li>Mental health program design</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-2">Engagement Formats</h3>
            <ul className="list-disc pl-6 space-y-1 opacity-90">
              <li>Advisory retainers</li>
              <li>Workshops & trainings</li>
              <li>Keynotes + Q&A</li>
            </ul>
          </div>
        </section>

        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-md bg-[var(--color-teal)] text-[var(--color-cream)] px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Book consulting
        </a>
      </div>
    </main>
  );
}
