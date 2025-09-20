// app/about/page.js
export default function AboutPage() {
  return (
    <main
      className="min-h-screen w-full bg-[var(--color-teal-900)] text-[var(--color-cream)]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        {/* Page title */}
        <h1 className="font-serif text-4xl mb-6">About Dr. Salerno</h1>

        {/* Intro */}
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          I am a public health scientist dedicated to advancing mental-health equity and
          empowering communities to thrive. My work blends rigorous research with accessible
          strategies that help people live with greater clarity, resilience, and purpose.
        </p>

        {/* Section: Mission */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-3">My Mission</h2>
          <p className="opacity-90 max-w-2xl">
            To bridge the gap between science and everyday life, offering practical tools rooted
            in evidence while honoring lived experience and cultural context.
          </p>
        </section>

        {/* Section: Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-3">My Approach</h2>
          <p className="opacity-90 max-w-2xl">
            My work integrates neuroscience, behavioral science, and mindfulness practices to
            create strategies that foster sustainable growth. I believe true change happens when
            knowledge meets accessibility, compassion, and action.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
