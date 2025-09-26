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
  <div className="mx-auto max-w-[1400px] px-6 pt-0 pb-4">
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
          <div className="mx-auto max-w-[1400px] px-6">
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
<section className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] flex items-center justify-center min-h-[75vh] px-6">
  <div className="max-w-4xl text-center mt-25">
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
  className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]"
>
  <div className="mx-auto max-w-[1400px] px-6 py-28">
    {/* TOP BORDER (keep) */}
    <hr className="border-t opacity-70 border-cream mb-40 w-full" />

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
      {/* Left: text */}
      <div className="lg:col-span-6 text-center lg:text-left mx-auto">
        <h2 className="font-serif text-4xl opacity-90 mb-3 mt-15">
          Purposeful Consulting Solutions
        </h2>
        <p className="text-lg opacity-90 mb-6 max-w-md lg:max-w-lg">
          Through science-backed consulting—grounded in evidence-based interventions, 
          applied research, and program evaluation—Dr. Salerno helps organizations 
          strengthen mental health, build resilience, foster growth, and scale what works.
        </p>
        <Link
          href="/consulting"
          className="inline-block underline underline-offset-4 hover:opacity-80 transition"
        >
          Book Dr. Salerno for consulting →
        </Link>
      </div>

<div className="lg:col-span-6 flex justify-center lg:justify-end mt-15">
  <div className="relative w-full max-w-[720px] aspect-[3/2] square-md shadow-2xl overflow-hidden">
    <Image
      src="/plant1.jpg"   // make sure this is in /public/
      alt="Consulting collaboration"
      fill
      className="object-cover"
      priority={false}
    />
       {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/15" />
  </div>
</div>
    </div>
  </div>
</section>

{/* Speaking */}
<section className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] min-h-[75vh] px-6 flex flex-col">
  {/* Top bar (same width as other sections; no extra vertical padding) */}
  <div className="mx-auto max-w-[1400px] w-full px-6 mt-27">
    <hr className="border-t opacity-70 border-cream mb-30 w-full" />
  </div>

  {/* Content centered like Mission */}
  <div className="flex-grow flex items-center justify-center">
    <div className="mx-auto max-w-4xl text-center mt-15">
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
                  className="inline-block underline underline-offset-4 hover:opacity-80 transition mt-6"
      >
        Book Dr. Salerno to speak →
      </Link>
    </div>
  </div>
</section>

{/* Meditations */}
<section
  id="meditations"
  className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]"
>
    <div className="mx-auto max-w-[1400px] px-6 py-45">
    {/* TOP BORDER (keep) */}
    <hr className="border-t opacity-70 border-cream mb-30 w-full" />

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
      {/* Left: image with dim overlay */}
<div className="lg:col-span-6 flex justify-center lg:justify-center mt-25 mb-11">
  <div className="relative w-full max-w-[720px] aspect-[3/2] square-md shadow-2xl overflow-hidden">
          <Image
            src="/beach1.jpg"   // ensure this exists in /public
            alt="Meditation practice"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
        </div>


      {/* Right: text */}
      <div className="lg:col-span-6 text-center lg:text-left mx-auto">
        <h2 className="font-serif text-4xl opacity-90 mb-3 mt-15">
          Short Meditations with Dr. Salerno
     </h2>
<p className="text-lg opacity-90 mb-6 max-w-md lg:max-w-lg">
Free guided meditations designed by Dr. Salerno for all levels to 
gently reset your body, calm your mind, and nourish your spirit. 
Journey inward to awaken your true potential, deepen your sense of 
peace, and create space for healing and growth.      </p>
        <Link
          href="/meditations"
className="inline-block underline underline-offset-4 hover:opacity-80 transition"
        >
          Discover →
        </Link>
      </div>
    </div>
  </div>
</section>

{/* Resources */}
<section
  id="resources"
  className="w-full bg-[var(--color-teal-850)] text-[var(--color-cream)] min-h-[75vh]"
>
  <div className="mx-auto max-w-[1400px] px-6">
    {/* TOP BORDER (keep) */}
    <hr className="border-t opacity-70 border-cream mb-23 w-full" />

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
      {/* Left: text */}
      <div className="lg:col-span-6 text-center lg:text-left mx-auto">
        <h2 className="font-serif text-4xl opacity-90 mb-3 mt-30">
          Resources for Self-Elevation
        </h2>
        <p className="text-lg opacity-90 mb-6 max-w-md lg:max-w-lg">
          Science-backed tools designed or approved by Dr. Salerno to 
          strengthen your mind and empower your life. Explore practices 
          and insights that amplify your potential and guide you 
          toward a more purposeful and abundant way of living.
        </p>
        <Link
          href="/resources"
          className="inline-block underline underline-offset-4 hover:opacity-80 transition"
        >
          Learn more →
        </Link>
      </div>

      {/* Right: image */}
      <div className="lg:col-span-6 flex justify-center lg:justify-center mt-30">
        <div className="relative w-full max-w-[720px] aspect-[3/2] shadow-2xl overflow-hidden">
          <Image
            src="/tree1.jpg"
            alt="Resources illustration"
            fill
            className="object-cover"
            priority={false}
          />
          {/* Dimming overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
    </div>

    {/* BOTTOM BORDER (new) */}
    <hr className="border-t opacity-70 border-cream mt-55 w-full" />
  </div>
</section>


</main>

    </>
  )
}

