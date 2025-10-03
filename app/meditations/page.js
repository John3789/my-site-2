// app/meditations/page.js
export default function MeditationsPage() {
  return (
    <>
      {/* ===== PAGE BODY WRAPPER (same zoom as books/about) ===== */}
      <div
        style={{ '--z': 3.0, '--zoomL': 1.6 }}
        className="
          md:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          md:[transform:none]
          md:[width:100%]
          landscape:[transform:scale(var(--zoomL))]
          landscape:[width:calc(100%/var(--zoomL))]
          overflow-hidden
          will-change-transform
          transform-gpu
        "
      >
        <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
          {/* ===== HERO ===== */}
          <section className="mx-auto max-w-[1100px] px-6 pt-16 md:pt-20 pb-10 text-center">
            <h1 className="font-serif text-[clamp(36px,4.8vw,56px)] leading-[1.06] opacity-95">
              Meditations
            </h1>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
          </section>

          {/* ===== INTRO (footnote inside the same card) ===== */}
          <section className="mx-auto max-w-[900px] px-6 mb-8 mt-5">
            <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10">
              {/* Gold spine on the left */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/60 rounded-l-2xl"
              />
              <div className="p-5 md:p-6">
                <p className="text-lg md:text-xl opacity-90 leading-relaxed text-center">
                  Practices designed to help reset your body, calm your mind, and uplift your
                  spirit — guiding you through the day with clarity and ease.
                </p>

                {/* Footnote */}
                <div className="mt-4 pt-3 text-center text-xs opacity-70 border-t border-[var(--color-cream)]/15">
                  This page is a work in progress. I’ll be adding new tracks periodically.
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-3/4 md:w-3/5 mx-auto bg-[var(--color-cream)]/15" />

          {/* ===== FEATURED (5-Minute Reset) ===== */}
          <section className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Featured</p>
            <h2 className="font-serif text-3xl md:text-4xl opacity-95">5-Minute Reset (Free)</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
            <p className="opacity-90 leading-relaxed max-w-2xl">
              A gentle, all-levels 5-minute meditation to ground, align, and re-center. Morning
              clarity, afternoon reset, evening calm — a simple practice always within reach.
              Bookmark this page for moments when you need to recharge.
            </p>

            <article
              className="
                mt-6 relative rounded-2xl
                bg-white/8 ring-1 ring-white/15
                p-6 md:p-7 shadow-2xl
                md:backdrop-blur-sm                /* blur only on md+ to avoid mobile softness */
                hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                transition
              "
            >
              {/* Gold spine (dimmed) */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/60 rounded-l-2xl"
              />
              <div className="flex flex-wrap items-center gap-3 text-sm opacity-85">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="opacity-90">
                    <path
                      fill="currentColor"
                      d="M12 8a4 4 0 1 0 .001 8.001A4 4 0 0 0 12 8zm0-6a1 1 0 0 1 1 1v2.07A8.001 8.001 0 0 1 20.93 11H23a1 1 0 1 1 0 2h-2.07A8.001 8.001 0 0 1 13 20.93V23a1 1 0 1 1-2 0v-2.07A8.001 8.001 0 0 1 3.07 13H1a1 1 0 1 1 0-2h2.07A8.001 8.001 0 0 1 11 3.07V1a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                  ~5 min
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  Grounding
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  Beginner-friendly
                </span>
              </div>

              <p className="opacity-90 leading-relaxed mt-4">
                Press play, follow the cues, and relax.
              </p>

              {/* Faux player controls (wire to real audio later) */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Play 5-Minute Reset"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-gold)] text-black shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d="M8 5.14v14l11-7z" />
                  </svg>
                </button>
                <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/6 bg-[var(--color-gold)]/80" />
                </div>
                <span className="text-sm opacity-80 tabular-nums">00:45 / 05:00</span>
              </div>
            </article>
          </section>

          {/* Divider */}
          <div className="h-px w-3/4 md:w-3/5 mx-auto bg-[var(--color-cream)]/15" />

          {/* ===== CUSTOM SESSIONS ===== */}
          <section className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Custom</p>
            <h2 className="font-serif text-3xl md:text-4xl opacity-95">Custom-Made Sessions</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
            <p className="text-lg opacity-90 max-w-3xl leading-relaxed">
              I design custom meditations tailored to your goals and challenges — whether it’s
              cultivating resilience, deepening focus, easing stress, creating space for empowerment
              and manifestation, or something uniquely yours. Each recording becomes a personalized
              pathway to growth and wellbeing. Click below to get started.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                         font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px]
                         transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
            >
              Inquire about custom sessions
            </a>
          </section>

          {/* Bottom spacer */}
          <div className="pb-10" />
        </main>
      </div>
    </>
  );
}
