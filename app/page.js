// app/page.js
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Header />

{/* Nameplate bar (teal) */}
<section id="home" className="!bg-[var(--color-teal-950)] !text-[var(--color-cream)]">
  <div className="mx-auto max-w-[1200px] px-6 pt-0 pb-4">
    <h1 className="text-center font-serif font-semibold uppercase tracking-[0.05em] leading-[1.05]">
      <a href="#home">
<span className="block text-7xl hover:opacity-90 transition">
  DR. JUAN PABLO SALERNO
  <sup className="text-lg align-super opacity-70">™</sup>
</span>
      </a>
    </h1>
  </div>
</section>


      {/* Hero with background photo */}
      <section className="relative h-[87.5svh] overflow-hidden">
        <Image
          src="/hero4.jpg?v=10"
          alt="Portrait"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 0%' }}
          priority
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* CTA rail pinned at bottom of viewport */}
        <div className="absolute inset-x-0 bottom-6 z-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex items-center justify-center gap-100">

 <Link
  href="speaking"
  className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-7 py-3 font-medium uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition ml-27"
>
  Book Dr. Salerno to speak
  </Link>
 
 <Link
  href="consulting"
  className="inline-flex items-center rounded-md !bg-[var(--color-teal-700)] !text-[var(--color-cream)] px-7 py-3 font-medium uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
>
  Book consulting with Dr. Salerno
 </Link>

            </div>
          </div>
        </div>
      </section>

            {/* Rest of page */}
      <main>

{/* Mission Quote Section */}
<section className="w-full bg-[var(--color-teal-900)] text-[var(--color-cream)] flex items-center justify-center min-h-[60vh] px-6">
  <div className="max-w-4xl text-center">
    {/* Small heading */}
    <h3 className="uppercase tracking-wide text-sm mb-6 opacity-80">Mission</h3>

    {/* Main quote */}
    <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-snug">
      “I believe everyone has the power to unlock hidden potential and live with a higher purpose — 
      my mission is to blend science and growth wisdom to guide that journey.”
    </p>

    {/* Optional link below */}
     <Link href="about"
      className="mt-8 inline-block underline underline-offset-4 hover:opacity-80 transition"
    >
      About Dr. Salerno →
    </Link>
  </div>
</section>

        {/* Meditations */}
        <section
          id="meditations"
          className="w-full min-h-[60vh] snap-start bg-[var(--color-teal-700)] text-[var(--color-cream)]"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-20">
            <h2 className="font-serif text-3xl mb-3">Short Meditations with Dr. Salerno</h2>
            <p className="max-w-2xl">
              Guided meditations to restore body, mind, and spiritual alignment.
            </p>
            
            <Link href="/meditations"
              className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
                Learn more →
              </Link>
          </div>
        </section>


  {/* Resources */}
  <section
    id="resources"
    className="w-full min-h-[60vh] bg-[var(--color-teal-900)] text-[var(--color-cream)]"
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <h2 className="font-serif text-3xl mb-3">Resources for Self-Elevation</h2>
      <p className="max-w-2xl">Practical tools to strengthen your mental health, nurture your growth, and expand your learning.</p>
      <Link href="/resources" className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
        Explore →
      </Link>
    </div>
  </section>

  {/* Speaking */}
  <section
    id="speaking"
    className="w-full min-h-[60vh] bg-[var(--color-teal-800)] text-[var(--color-cream)]"
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <h2 className="font-serif text-3xl mb-3">Speaking that Transforms</h2>
      <p className="max-w-2xl">Book Dr. Salerno for engaging, interactive, and science-backed presentations that inspire growth, strengthen mental health, and promote wellness.</p>
      <Link href="/speaking" className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
        Book Dr. Salerno to speak →
      </Link>
    </div>
  </section>

   {/* Consulting */}
  <section
    id="consulting"
    className="w-full min-h-[60vh] bg-[var(--color-teal-900)] text-[var(--color-cream)]"
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <h2 className="font-serif text-3xl mb-3">Purposeful Consulting Solutions </h2>
      <p className="max-w-2xl">Expert consulting in mental health research, data analysis, and program evaluation — paired with applied experience in personal growth methods and tools.</p>
     <Link href="/consulting" className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
        Book Dr. Salerno for consulting →
      </Link>
    </div>
  </section>

</main>
    </>
  )
}
