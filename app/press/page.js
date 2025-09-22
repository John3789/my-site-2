export default function PressPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Press</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          Media mentions, interviews, and articles featuring Dr. Salerno’s work.
        </p>

        <section className="space-y-6">
          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="font-serif text-xl mb-2">Interview — Coming Soon</h3>
            <p className="opacity-90">Podcast conversation on single-session interventions.</p>
          </div>
          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="font-serif text-xl mb-2">Op-Ed — Coming Soon</h3>
            <p className="opacity-90">On translating research into action for communities.</p>
          </div>
        </section>

        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Media inquiries
        </a>
      </div>
    </main>
  );
}
