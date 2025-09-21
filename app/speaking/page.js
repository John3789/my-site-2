// app/speaking/page.js
export default function SpeakingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)] text-[var(--color-cream)]">
      {/* ===== HERO VIDEO with overlay text ===== */}
      <section className="relative w-full">
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

          {/* Overlay headline + subheadline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
              Speaking
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-white/90 drop-shadow-md">
              Science-backed, story-driven talks that spark resilience,
              growth, and change.
            </p>
          </div>
        </div>
      </section>

       {/* ===== Intro Blurb ===== */}
      <section className="relative w-full bg-[var(--color-teal-800)] text-[var(--color-cream)] py-16">
        <div className="mx-auto max-w-[900px] px-6 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-wide">
            Engaging. Inspiring. Transformational.
          </h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
            <p>
              Dr. Juan Pablo Salerno is a respected mental health scientist,
              personal growth expert, and engaging speaker whose work bridges
              cutting-edge science with practical tools for personal and
              professional transformation. He has delivered talks and workshops
              for audiences across academic, scientific, governmental, health,
              and nonprofit sectors, with a focus on mental health, resilience,
              and personal growth.
            </p>
            <p>
              His speaking engagements have included national and local
              conferences, federal health organizations, leading universities,
              research institutes, K–12 public schools, community-based mental
              health and healthcare organizations, and county and state
              departments of health.
            </p>
            <p>
              Presentations typically run about an hour and can be delivered
              in-person or virtually. Dr. Salerno’s style is dynamic,
              approachable, and grounded in evidence-based science, leaving
              attendees not only inspired but also equipped with actionable
              strategies to enhance their well-being, leadership, and
              fulfillment—whether in the workplace, at home, or in their
              personal lives. He is also available for panel discussions and
              collaborative speaking engagements.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="mx-auto max-w-[1400px] px-6 py-14 space-y-24" id="topics">
        {/* Popular Topics */}
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
                className="w-full h-[520px] 3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking2.jpg"
                alt="Workshop with audience"
                className="w-full h-[520px] 3xl shadow-2xl object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Formats</h2>
            <ul className="text-lg leading-relaxed space-y-3 opacity-90">
              <li>
                <span className="font-semibold">Keynotes:</span> high-energy, story-driven talks with evidence-based takeaways.
              </li>
              <li>
                <span className="font-semibold">Workshops:</span> interactive sessions with exercises, tools, and live Q&amp;A.
              </li>
              <li>
                <span className="font-semibold">Panels &amp; Fireside Chats:</span> conversational and tailored to your audience.
              </li>
            </ul>
          </div>
        </section>

        {/* Outcomes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Outcomes</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Audiences leave with clarity, confidence, and actionable tools—
              how to build resilient habits, regulate stress, deepen focus with
              meditation, and align their work and life with higher purpose.
              Every talk is customized for your goals and audience.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking3.jpg"
                alt="Audience engagement"
                className="w-full h-[520px] 3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rmd bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Book Dr. Salerno to Speak
          </a>
        </div>
      </div>
    </main>
  );
}
