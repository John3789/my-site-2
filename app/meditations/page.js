export default function MeditationsPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-900)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Meditations</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          Guided practices to reduce stress and re-center—built for real schedules and real life.
        </p>

        <section className="space-y-6">
          <div>
            <h3 className="font-serif text-xl mb-2">5-Minute Reset</h3>
            <p className="opacity-90 max-w-2xl">A quick grounding practice for busy days.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-2">Breath & Body Scan</h3>
            <p className="opacity-90 max-w-2xl">Release tension and reconnect with presence.</p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-2">Evening Unwind</h3>
            <p className="opacity-90 max-w-2xl">Transition from “doing” to “resting.”</p>
          </div>
        </section>

        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Inquire about custom sessions
        </a>
      </div>
    </main>
  );
}
