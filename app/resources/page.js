export default function ResourcesPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl opacity-90 mb-6">Resources</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          Tools, downloads, and reading lists to support growth between sessions and talks.
        </p>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="font-serif text-xl opacity-90 mb-2">Stress Toolkit (PDF)</h3>
            <p className="opacity-90">Evidence-based techniques you can use in minutes.</p>
          </div>
          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="font-serif text-xl opacity-90 mb-2">Reading List</h3>
            <p className="opacity-90">Handpicked books that blend science and practice.</p>
          </div>
        </section>

        <a
          href="/contact"
          className="mt-10 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Request resource access
        </a>
      </div>
    </main>
  );
}
