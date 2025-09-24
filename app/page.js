// app/page.js
import Link from 'next/link'
import Image from 'next/image'
import SocialFooter from "../components/SocialFooter";

export default function Home() {
  return (
    <>
          {/* spacer to clear the fixed header (must match h-8) */}
      <div aria-hidden className="h-8" />

{/* Nameplate bar (teal) */}
<section id="home" className="bg-[var(--color-teal-800)] !text-[var(--color-cream)]">
  <div className="mx-auto max-w-[1200px] px-6 pt-0 pb-4">
    <h1 className="text-center font-serif font-semibold uppercase tracking-[0.05em] leading-[1.05]">
<span className="block text-7xl hover:opacity-90 transition">
  DR. JUAN PABLO SALERNO
  <sup className="text-2xl align-super opacity-70">™</sup>
</span>
    </h1>
  </div>
</section>


      {/* Hero with background photo */}
      <section className="relative h-[88.8svh] overflow-hidden">
        <Image
          src="/hero17.jpg?v=25"
          alt="Portrait"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 0%' }}
          priority
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

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
<section className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] flex items-center justify-center min-h-[60vh] px-6">
  <div className="max-w-4xl text-center mt-15">
    {/* Small heading */}
    <h3 className="uppercase tracking-wide text-sm mb-6 opacity-80">Mission</h3>

    {/* Main quote */}
    <p className="font-serif text-2xl opacity-90 sm:text-3xl lg:text-4xl leading-snug">
      “I believe everyone has the power to unlock hidden potential and live with a higher purpose — 
      my mission is to blend science and growth wisdom to guide the way.”
    </p>

    {/* Optional link below */}
     <Link href="about"
      className="mt-8 inline-block underline underline-offset-4 hover:opacity-80 transition"
    >
      About Dr. Salerno →
    </Link>
  </div>
</section>

   {/* Consulting */}
  <section
    id="consulting"
    className="w-full min-h-[60vh] bg-[var(--color-teal-850)] text-[var(--color-cream)]"
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <hr className="border-t opacity-70 border-cream mb-8 w-full"/>
      <h2 className="font-serif text-3xl opacity-90 mb-3">Purposeful Consulting Solutions </h2>
      <p className="max-w-md opacity-90">Through science-backed consulting—grounded in evidence-based interventions, applied research, and program evaluation—Dr. Salerno helps organizations strengthen mental health, build resilience, and scale what works. </p>
     <Link href="/consulting" className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
        Book Dr. Salerno for consulting →
      </Link>
    </div>
  </section>

{/* Speaking */}
<section className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] min-h-[60vh] px-6 flex flex-col">
  {/* Top bar (same width as other sections; no extra vertical padding) */}
  <div className="mx-auto max-w-[1200px] w-full px-6">
    <hr className="border-t opacity-70 border-cream mb-8 w-full" />
  </div>

  {/* Content centered like Mission */}
  <div className="flex-grow flex items-center justify-center">
    <div className="mx-auto max-w-4xl text-center">
      <h3 className="uppercase tracking-wide text-sm mb-6 opacity-80">
        Speaking that Transforms
      </h3>

      <p className="font-serif text-2xl opacity-90 sm:text-3xl lg:text-4xl leading-snug">
        Dr. Salerno is a highly regarded expert and dynamic speaker who has inspired audiences on stages large and small.
        Book him for interactive, science-backed presentations that spark growth, strengthen mental health,
        and promote lasting wellness.
      </p>

      <Link
        href="/speaking"
        className="mt-8 inline-block underline underline-offset-4 hover:opacity-80 transition"
      >
        Book Dr. Salerno to speak →
      </Link>
    </div>
  </div>
</section>

        {/* Meditations */}
        <section
          id="meditations"
          className="w-full min-h-[60vh] snap-start bg-[var(--color-teal-850)] text-[var(--color-cream)]"
        >
          <div className="mx-auto max-w-[1200px] px-6 py-20">
            <hr className="border-t opacity-70 border-cream mb-8 w-full"/>
            <h2 className="font-serif text-3xl opacity-90 mb-3">Short Meditations with Dr. Salerno</h2>
            <p className="max-w-md opacity-90">
              Free guided meditations to reset your body, mind, and spirit.
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
    className="w-full min-h-[60vh] bg-[var(--color-teal-850)] text-[var(--color-cream)]"
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20">
      <hr className="border-t opacity-70 border-cream mb-8 w-full"/>
      <h2 className="font-serif text-3xl opacity-90 mb-3">Resources for Self-Elevation</h2>
      <p className="max-w-md opacity-90">Science-backed tools to strengthen your mind and empower your life.</p>
      <Link href="/resources" className="mt-6 inline-block underline underline-offset-4 hover:opacity-80 transition">
        Explore →
      </Link>
    </div>
  </section>

</main>

    </>
  )
}

