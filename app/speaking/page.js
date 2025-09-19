export default function SpeakingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Speaking</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          Keynotes and interactive talks that energize audiences and stick—rooted in science,
          delivered with warmth.
        </p>

        <section className="space-y-6">
          <div>
            <h3 className="font-serif text-xl mb-2">Popular Topics</h3>
            <ul className="list-disc pl-6 space-y-1 opacity-90">
              <li>Neuroscience of behavior change</li>
              <li>Resilience without burnout</li>
              <li>Creating cultures of psychological safety</li>
            </ul>
          </div>
        </section>

        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Book me to speak
        </a>
      </div>
    </main>
  );
}
