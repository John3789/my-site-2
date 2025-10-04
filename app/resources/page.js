"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeakingPage() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay, { once: true });
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  const jump = (id) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* === Dark blue pill exactly like Resources === */
  const btnDark =
    "inline-flex items-center justify-center rounded-full " +
    "bg-[var(--color-teal-800)] text-[var(--color-cream)]/95 " +
    "ring-1 ring-white/15 border border-white/10 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] " +
    "px-6 py-3 text-[14px] font-semibold tracking-wide " +
    "transition hover:bg-[color-mix(in_oklab,var(--color-teal-800)_88%,white)] " +
    "hover:ring-white/25 active:translate-y-[1px] " +
    "whitespace-nowrap min-w-[120px]";

  return (
    <>
      <main className="relative isolate min-h-screen w-full bg-[var(--color-teal-850)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-teal-850)]" />

        {/* ===== HERO ===== */}
        <section className="relative w-full">
          <div className="relative h-[70vh] bg-black">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: "url(/speaking-hero-poster.jpg)" }}
            />
            <video
              playsInline muted autoPlay loop preload="auto" fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
              ref={videoRef}
            >
              <source src="/hero40.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/45" />
              <div className="relative px-6">
                <h1 className="font-serif text-5xl md:text-6xl opacity-95 md:drop-shadow-lg">Speaking</h1>
                <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 mb-3 rounded" />
                <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto md:drop-shadow-md">
                  Science-backed, story-driven talks that spark resilience, growth, and lasting changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Intro (mobile zoom preserved) ===== */}
        <div
          style={{ "--z": 3.0, "--zoomL": 1.6 }}
          className="zoomwrap md:contents origin-top [transform:scale(var(--z))] [width:calc(100%/var(--z))] mx-auto md:[transform:none] md:[width:100%] landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))] overflow-visible"
        >
          <section className="relative w-full py-16" id="intro">
            <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-cream)]/15" />
            <div className="mx-auto max-w-[1000px] px-6 text-left space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl opacity-90 text-center font-semibold tracking-wide">
                &ldquo;Engaging. Inspiring. Transformational.&rdquo;
              </h2>

              <div className="space-y-6 opacity-85 text-lg md:text-xl leading-loose">
                <p>
                  Dr. Juan Pablo Salerno is a respected mental health scientist, personal growth expert, and
                  engaging speaker whose work bridges cutting-edge science with practical tools for transformation.
                </p>
                <p>
                  He has delivered talks and workshops for audiences across academic, scientific, governmental,
                  health, and nonprofit sectors, with a focus on mental health, resilience, and personal growth.
                </p>
                <p>
                  Presentations typically run one to two hours, in person or virtual. Style: dynamic, approachable,
                  and evidence-based—leaving attendees inspired and equipped with actionable strategies.
                </p>
              </div>

              {/* Intro quick nav — dark blue pills */}
              <div className="md:hidden mt-7">
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => jump("programs")} className={btnDark}>Programs</button>
                  <button onClick={() => jump("formats")} className={btnDark}>Formats</button>
                  <button onClick={() => jump("results")} className={btnDark}>Results</button>
                  <button onClick={() => jump("testimonials")} className={btnDark}>Testimonials</button>
                </div>
              </div>
            </div>
          </section>

          {/* ===== MAIN ===== */}
          <div className="mx-auto max-w-[1400px] py-14 space-y-24" id="topics">
            <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />

            {/* Programs (content omitted for brevity; unchanged) */}
            <section id="programs" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mx-15 gap-y-12">
              <div className="lg:col-span-5 lg:py-6">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Programs</p>
                <h2 className="font-serif text-4xl mb-2">Popular Topics</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />
                {/* ... your bullet lists stay as you had them ... */}
              </div>

              {/* MOBILE footer nav — WIDE, SPREAD, NO WRAP */}
              <div className="md:hidden mt-10 px-6">
                <div className="flex gap-8">
                  <button onClick={() => jump("intro")} className={`flex-1 ${btnDark}`}>← Prev</button>
                  <button onClick={() => jump("topics")} className={`flex-1 ${btnDark}`}>All Speaking</button>
                  <button onClick={() => jump("formats")} className={`flex-1 ${btnDark}`}>Next →</button>
                </div>
              </div>
            </section>

            {/* Formats section (content unchanged) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
            <section id="formats" className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-0 mx-15 items-center">
              <div className="lg:col-span-5 order-1 lg:order-2 lg:py-6 space-y-8 lg:pl-6">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Formats</p>
                <h2 className="font-serif text-4xl mb-2">Dr. Salerno Offers</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />
                {/* ... your formats blocks stay as you had them ... */}
              </div>

              {/* MOBILE footer nav — WIDE, SPREAD, NO WRAP */}
              <div className="md:hidden mt-10 px-6 order-2">
                <div className="flex gap-8">
                  <button onClick={() => jump("programs")} className={`flex-1 ${btnDark}`}>← Prev</button>
                  <button onClick={() => jump("topics")} className={`flex-1 ${btnDark}`}>All Speaking</button>
                  <button onClick={() => jump("results")} className={`flex-1 ${btnDark}`}>Next →</button>
                </div>
              </div>
            </section>

            {/* Results section (content unchanged) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
            <section id="results" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-15 items-start gap-y-12">
              <div className="lg:col-span-5 lg:py-6">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Results</p>
                <h2 className="font-serif text-4xl mb-2">Outcomes</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-6 rounded" />
                {/* ... your outcomes list stays ... */}
              </div>

              {/* MOBILE footer nav — WIDE, SPREAD, NO WRAP */}
              <div className="md:hidden mt-10 px-6">
                <div className="flex gap-8">
                  <button onClick={() => jump("formats")} className={`flex-1 ${btnDark}`}>← Prev</button>
                  <button onClick={() => jump("topics")} className={`flex-1 ${btnDark}`}>All Speaking</button>
                  <button onClick={() => jump("testimonials")} className={`flex-1 ${btnDark}`}>Next →</button>
                </div>
              </div>
            </section>

            {/* ===== Testimonials (MOBILE) — NOW POPULATED ===== */}
            <section id="testimonials" className="md:hidden mx-15">
              <hr className="border-t border-[var(--color-cream)]/22 mb-8 w-full" />
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Testimonials</p>
              <h2 className="font-serif text-4xl mb-2">What People Say</h2>
              <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />

              <div className="flex flex-col gap-6 max-w-[640px]">
                {/* From Programs */}
                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...an exceptional speaker: he is engaging, well-spoken, and clearly passionate about his work.</p>
                    <span aria-hidden className="absolute right-4 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, American Public Health Association Annual Meeting &amp; Expo
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>He communicates with clarity and confidence...leaves a lasting impression.</p>
                    <span aria-hidden className="absolute right-24 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" aria-hidden />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>Dr. Salerno has a way of blending data with human stories that makes science resonate.</p>
                    <span className="absolute right-14 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                  </figcaption>
                </figure>

                {/* From Formats */}
                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...gifted speaker whose engaging style &amp; clear communication bring complex ideas to life.</p>
                    <span className="absolute right-6 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Columbia University
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...can communicate with diverse audiences, speaks with heart and dimensionality.</p>
                    <span className="absolute right-23 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Society of Behavioral Medicine Annual Meeting
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" aria-hidden />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...brings a charming intensity and passion that inspires others with his presence and message.</p>
                    <span className="absolute right-0 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                  </figcaption>
                </figure>

                {/* From Results */}
                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...engaging, energetic, strong communication skills, proven ability to disseminate science.</p>
                    <span className="absolute right-13 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, University of Central Florida
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>...a highly engaging, knowledgeable, and skilled speaker...strongly recommended.</p>
                    <span className="absolute right-44 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, University of California, Los Angeles
                  </figcaption>
                </figure>
              </div>

              {/* MOBILE footer nav — WIDE, SPREAD, NO WRAP */}
              <div className="md:hidden mt-10 px-6">
                <div className="flex gap-8">
                  <button onClick={() => jump("results")} className={`flex-1 ${btnDark}`}>← Prev</button>
                  <button onClick={() => jump("topics")} className={`flex-1 ${btnDark}`}>All Speaking</button>
                  <button onClick={() => jump("programs")} className={`flex-1 ${btnDark}`}>Next →</button>
                </div>
              </div>
            </section>

            {/* CTA (unchanged) */}
            <div className="flex justify-center">
              <a
                href="/contact"
                className="inline-flex justify-center items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition md:will-change-transform hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 w-full max-w-xs md:w-auto md:max-w-none"
              >
                Book Dr. Salerno to Speak
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* global crisp text + mobile emoji guard */}
      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          html, body { background: var(--color-teal-850) !important; }
        }
        .zoomwrap, .zoomwrap * { -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
        @media (max-width: 767px) {
          .zoomwrap ul.text-lg li > span:first-child {
            color: var(--color-gold) !important;
            -webkit-text-fill-color: var(--color-gold) !important;
            font-family: "Helvetica Neue", Arial, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif !important;
            font-weight: 700; opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
