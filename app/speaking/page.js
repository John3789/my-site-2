// app/speaking/page.js
export default function SpeakingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      {/* ===== HERO VIDEO (cinematic full-bleed) ===== */}
      <section className="w-full">
        <div className="relative h-[70vh]">
          <video
            playsInline
            muted
            autoPlay
            loop
            poster="/speaking-hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/speaking-hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ===== MAIN CONTENT (premium spacing) ===== */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 space-y-24">
        {/* Title + impact line */}
        <header className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="font-serif text-5xl leading-tight">Speaking</h1>
          <p className="text-xl opacity-90">
            Engaging, science-backed presentations on mental health, personal growth, and wellness—designed
            to inspire behavior change, strengthen resilience, and leave audiences with practical tools they
            can use immediately. My talks blend rigorous research with personal growth wisdom, delivered with
            warmth and real-world relevance.
          </p>
        </header>

        {/* === BAND 1: Popular Topics (text left, sticky image right) === */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Popular Topics</h2>
            <ul className="text-lg leading-relaxed space-y-3 opacity-90">
              <li>Neuroscience of behavior change</li>
              <li>Resilience without burnout</li>
              <li>Creating cultures of psychological safety</li>
              <li>Meditation for focus, clarity, and alignment</li>
              <li>Unlocking hidden potential &amp; higher purpose</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking1.jpg"
                alt="Dr. Salerno presenting on stage"
                className="w-full h-[520px] rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* === BAND 2: Formats (alternate side) === */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking2.jpg"
                alt="Workshop with audience"
                className="w-full h-[520px] rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Formats</h2>
            <ul className="text-lg leading-relaxed space-y-3 opacity-90">
              <li><span className="font-semibold">Keynotes:</span> high-energy, story-driven talks with evidence-based takeaways.</li>
              <li><span className="font-semibold">Workshops:</span> interactive sessions with exercises, tools, and live Q&amp;A.</li>
              <li><span className="font-semibold">Panels &amp; Fireside Chats:</span> conversational and tailored to your audience.</li>
            </ul>
          </div>
        </section>

        {/* === BAND 3: Outcomes === */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Outcomes</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Audiences leave with clarity, confidence, and actionable tools—how to build resilient habits,
              regulate stress, deepen focus with meditation, and align their work and life with higher purpose.
              Every talk is customized for your goals and audience.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking3.jpg"
                alt="Audience engagement"
                className="w-full h-[520px] rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Book Dr. Salerno to Speak
          </a>
        </div>
      </div>
    </main>
  );
}
