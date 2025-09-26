export default function MeditationsPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)">
      <div className="mx-auto max-w-[1200px] px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: text */}
        <div className="lg:col-span-7">
          <h1 className="font-serif text-4xl opacity-90 mb-6">Meditations</h1>
          <p className="text-lg opacity-90 max-w-3xl mb-8">
            Guided practices to reduce stress and re-center—built for real schedules and real life.
          </p>

          <section className="space-y-6">
            <div>
              <h3 className="font-serif text-xl opacity-90 mb-2">5-Minute Reset</h3>
              <p className="opacity-90 max-w-2xl">A quick grounding practice for busy days.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl opacity-90 mb-2">Breath & Body Scan</h3>
              <p className="opacity-90 max-w-2xl">Release tension and reconnect with presence.</p>
            </div>
            <div>
              <h3 className="font-serif text-xl opacity-90 mb-2">Evening Unwind</h3>
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

{/* Right column: image with overlay */}
<div className="lg:col-span-5 relative shadow-2xl top-10">
  <img
    src="/hero20.jpg" // replace with your image path
    alt="Meditation practice"
    className="w-full h-auto object-cover"
  />
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/5" />
</div>


      </div>
    </main>
  );
}
