// app/page.js
import Link from 'next/link'
import Image from 'next/image'
import SocialFooter from "../components/SocialFooter";

export default function Home() {
  return (
    <>
      {/* spacer to clear the fixed header (keep) */}
      <div aria-hidden className="h-8" />

      {/* DESKTOP/TABLET nameplate — unchanged */}
      <section id="home" className="hidden md:block bg-[var(--color-teal-800)] !text-[var(--color-cream)]">
        <div className="mx-auto max-w-[1400px] px-6 pt-0 pb-4">
          <h1 className="text-center font-serif font-semibold uppercase tracking-[0.05em] leading-[1.05]">
            <span className="block text-7xl hover:opacity-90 transition">
              DR. JUAN PABLO SALERNO
              <sup className="text-2xl align-super opacity-70">™</sup>
            </span>
          </h1>
        </div>
      </section>

{/* HERO — mobile full-screen; desktop unchanged */}
<section className="relative h-[100dvh] md:h-[88.8svh] overflow-hidden">
  {/* Image layer fills the section */}
  <div className="absolute inset-0">
    <Image
      src="/hero17.jpg?v=25"
      alt="Portrait of Dr. Salerno"
      fill
      priority
      quality={90}
      sizes="(min-width:768px) 100vw, 150vw"
      className="
        object-cover origin-center will-change-transform
        [transform:scaleX(1.00)_scaleY(1.00)]
        md:[transform:none]
        object-[center_0%] md:object-[center_0%]
      "
    />
    {/* 🔒 same overlay on mobile + desktop */}
    <div className="absolute inset-0 bg-black/28 pointer-events-none" />
  </div>

  {/* MOBILE name across the bottom (buttons hidden on mobile) */}
  <div
    className="md:hidden absolute inset-x-0 bottom-0 z-30 px-4 pointer-events-none"
    style={{
      // lift above the Safari URL bar / home indicator
      marginBottom: 'calc(env(safe-area-inset-bottom) + 70px)',
    }}
  >
    <h1
      className="
        font-serif font-semibold uppercase tracking-[0.02em]
        text-[var(--color-cream)] text-center leading-[0.9]
        drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]
        /* Make it span the full width */
        text-[20vw]   /* tweak 8.5–10vw if you want more/less */
      "
    >
      DR. JUAN PABLO SALERNO
      <sup className="text-[3.2vw] align-super opacity-70">™</sup>
    </h1>
  </div>

  {/* Desktop buttons only (mobile CTAs are hidden) */}
  <div className="hidden md:block absolute inset-x-0 bottom-6 z-30">
    <div className="mx-auto max-w-[1400px] px-6 relative">
      <Link
        href="speaking"
        className="
          inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-7 py-3
          font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md
          hover:-translate-y-[1px] transition absolute left-6 lg:left-61 bottom-0
        "
      >
        Book Dr. Salerno to speak
      </Link>

      <Link
        href="consulting"
        className="
          inline-flex items-center rounded-md !bg-[var(--color-teal-700)] !text-[var(--color-cream)] px-7 py-3
          font-medium uppercase tracking-wide text-[13px] shadow-sm hover:shadow-md
          hover:-translate-y-[1px] transition absolute right-6 lg:right-34 bottom-0
        "
      >
        Book consulting with Dr. Salerno
      </Link>
    </div>
  </div>
</section>



      {/* ===== PAGE BODY WRAPPER ===== */}
      <div
        style={{ '--z': 3.00, '--zoomL': 1.50 }}
        className="
          md:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none]
          md:[width:100%]
          landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
          overflow-hidden
        "
      >
        <main id="main" className="bg-[var(--color-teal-850)] text-[var(--color-cream)] text-[17px]">

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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: text */}
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Purposeful Consulting Solutions
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />

                  <ul className="text-base leading-[1.7] opacity-90 mb-6 max-w-xl space-y-3 text-left mx-auto lg:mx-0">
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔</span>
                      <span><strong>Partner</strong> — Collaborate with a community-engaged research expert.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔</span>
                      <span><strong>Design</strong> — Build powerful, evidence-based programs that truly resonate.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔</span>
                      <span><strong>Evaluate</strong> — Measure outcomes that matter and prove impact with data.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[var(--color-gold)]">✔</span>
                      <span><strong>Scale</strong> — Strengthen and integrate organizational resilience &amp; wellbeing.</span>
                    </li>
                  </ul>

                  <div className="flex justify-center lg:justify-start">
                    <Link href="/consulting" className="link">Book Dr. Salerno for consulting →</Link>
                  </div>
                </div>

                {/* Right: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
                    <Image
                      src="/plant1.jpg"
                      alt="Consulting collaboration"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 50%' }}
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
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
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Short Meditations with Dr. Salerno
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                  <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl text-left mx-auto lg:mx-0">
                    Pre-recorded and custom-made guided meditations designed by Dr. Salerno for all levels to gently reset your body,
                    calm your mind, and nourish your spirit. Journey inward to awaken your true potential,
                    deepen your sense of peace, and create space for healing and growth.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/meditations" className="link">Discover →</Link>
                  </div>
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

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start lg:items-center justify-items-stretch">
                {/* Left: text */}
                <div className="lg:col-span-6 w-full max-w-[680px] mx-auto lg:mx-0">
                  <h2 className="font-serif leading-[1.08] text-[clamp(28px,4.2vw,48px)] opacity-90 text-center lg:text-left">
                    Resources for Self-Elevation
                  </h2>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto lg:mx-0 my-5 rounded" />
                  <p className="text-[17px] leading-[1.7] opacity-90 mb-6 max-w-xl text-left mx-auto lg:mx-0">
                    Short media collections curated by Dr. Salerno to strengthen your mind and elevate your life.
                    Discover simple, practical insights you can use today to build clarity, confidence, and momentum.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Link href="/resources" className="link">Learn more →</Link>
                  </div>
                </div>

                {/* Right: image */}
                <div className="lg:col-span-6 w-full max-w-[680px] lg:max-w-[780px] mx-auto lg:mx-0">
                  <div className="relative w-full aspect-[3/2] shadow-2xl overflow-hidden">
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
        </main>

        {/* ✅ FOOTER INSIDE THE ZOOM WRAPPER (homepage) */}
        <footer className="py-6 px-6 text-sm text-[var(--color-cream)] bg-[var(--color-teal-850)]">
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-y-3">
            {/* left spacer on >=sm keeps legal perfectly centered */}
            <div className="hidden sm:block" />

            {/* centered legal */}
            <p className="text-center sm:col-start-2">
              © {new Date().getFullYear()} Dr. Juan Pablo Salerno™. All rights reserved. ·
              <a href="/terms" className="underline ml-2 hover:opacity-80">Terms</a> ·
              <a href="/privacy" className="underline ml-2 hover:opacity-80">Privacy</a>
            </p>

            {/* socials: centered on mobile, right-aligned on >=sm */}
            <div className="flex justify-center sm:justify-end sm:col-start-3 sm:pl-6">
              <SocialFooter />
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
