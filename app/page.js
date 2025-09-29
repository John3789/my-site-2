// app/page.js
import Link from 'next/link'
import Image from 'next/image'
// import SocialFooter from "../components/SocialFooter"; // unchanged, optional

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
          alt="Portrait of Dr. Salerno"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 0%' }}
          priority
        />
        {/* original flat overlay (your preferred darker look) */}
        <div className="absolute inset-0 bg-black/28 pointer-events-none" />

        {/* CTA rail pinned at bottom of hero */}
        <div className="absolute inset-x-0 bottom-6 z-20">
          <div className="mx-auto max-w-[1400px] px-6 relative">

            {/* Desktop/tablet: left/right anchored */}
            <Link
              href="speaking"
              className="
                hidden md:inline-flex
                items-center rounded-md bg-[var(--color-gold)] text-black px-7 py-3
                font-medium uppercase tracking-wide text-[13px] shadow-sm
                hover:shadow-md hover:-translate-y-[1px] transition
                focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60
                absolute left-6 lg:left-61 bottom-0
              "
            >
              Book Dr. Salerno to speak
            </Link>

            <Link
              href="consulting"
              className="
                hidden md:inline-flex
                items-center rounded-md !bg-[var(--color-teal-700)] !text-[var(--color-cream)] px-7 py-3
                font-medium uppercase tracking-wide text-[13px] shadow-sm
                hover:shadow-md hover:-translate-y-[1px] transition
                focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60
                absolute right-6 lg:right-34 bottom-0
              "
            >
              Book consulting with Dr. Salerno
            </Link>

            {/* Mobile fallback: centered, stacked */}
            <div className="md:hidden flex flex-col items-center gap-3">
              <Link
                href="speaking"
                className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-7 py-3 font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
              >
                Book Dr. Salerno to speak
              </Link>
              <Link
                href="consulting"
                className="inline-flex items-center rounded-md !bg-[var(--color-teal-700)] !text-[var(--color-cream)] px-7 py-3 font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60"
              >
                Book consulting with Dr. Salerno
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===== PAGE BODY ===== */}
      <main id="main" className="bg-[var(--color-teal-850)] text-[var(--color-cream)]">

        {/* Mission */}
        <section className="w-full">
          <div className="mx-auto max-w-[1400px] px-6 pt-36 pb-12">
            <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Mission</h5>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

            <div className="max-w-4xl mx-auto text-center">
              <p className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">
                “I believe everyone has the power to unlock hidden potential and live with a higher purpose —
                my mission is to blend science and growth wisdom to guide the way.”
              </p>
              <Link href="about" className="mt-8 inline-block link">
                About Dr. Salerno →
              </Link>
            </div>
          </div>
        </section>

        {/* Consulting */}
        <section id="consulting" className="w-full">
          <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
            <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
            <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Consulting</h5>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
              {/* Left: text */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">Purposeful Consulting Solutions</h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl lg:max-w-xl">
                  Through science-backed consulting—grounded in evidence-based interventions,
                  applied research, and program evaluation—Dr. Salerno helps organizations
                  strengthen mental health, build resilience, foster growth, and scale what works.
                </p>
                <Link href="/consulting" className="link">
                  Book Dr. Salerno for consulting →
                </Link>
              </div>

              {/* Right: image */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[780px] aspect-[3/2] shadow-2xl overflow-hidden">
                  <Image
                    src="/plant1.jpg"
                    alt="Consulting collaboration"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speaking */}
        <section className="w-full">
          <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
            <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
            <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Speaking</h5>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

            <div className="max-w-4xl mx-auto text-center">
              <p className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">
                Dr. Salerno is a highly regarded expert and dynamic speaker who has inspired audiences on stages large and small.
                Book him for interactive, science-backed presentations that spark growth, strengthen mental health,
                and promote lasting wellness.
              </p>
              <Link href="/speaking" className="link mt-6 inline-block">
                Book Dr. Salerno to speak →
              </Link>
            </div>
          </div>
        </section>

        {/* Meditations */}
        <section id="meditations" className="w-full">
          <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-12">
            <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
            <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Meditations</h5>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
              {/* Left: image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[780px] aspect-[3/2] shadow-2xl overflow-hidden">
                  <Image
                    src="/beach1.jpg"
                    alt="Meditation practice, calm beach"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 40%' }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>
              {/* Right: text */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">Short Meditations with Dr. Salerno</h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl lg:max-w-xl">
                  Free guided meditations designed by Dr. Salerno for all levels to gently reset your body,
                  calm your mind, and nourish your spirit. Journey inward to awaken your true potential,
                  deepen your sense of peace, and create space for healing and growth.
                </p>
                <Link href="/meditations" className="link">Discover →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Resources (text left, image right) */}
        <section id="resources" className="w-full">
          <div className="mx-auto max-w-[1400px] px-6 pt-40 pb-36">
            <hr className="border-t border-[var(--color-cream)]/22 mb-6" />
            <h5 className="uppercase tracking-[0.18em] text-[11px] font-medium text-center opacity-70">Resources</h5>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/55 mx-auto mt-2 mb-36 rounded" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
              {/* Left: text */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90">Resources for Self-Elevation</h2>
                <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl lg:max-w-xl">
                  Science-backed tools designed or approved by Dr. Salerno to strengthen your mind and empower your life.
                  Explore practices and insights that amplify your potential and guide you toward a more purposeful,
                  abundant way of living.
                </p>
                <Link href="/resources" className="link">Learn more →</Link>
              </div>
              {/* Right: image */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[780px] aspect-[3/2] shadow-2xl overflow-hidden">
                  <Image
                    src="/tree90.jpg"
                    alt="Resources illustration, growth tree"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 30%' }}
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Optional footer */}
        {/* <SocialFooter /> */}
      </main>
    </>
  )
}
