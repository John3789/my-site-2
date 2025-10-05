"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function SpeakingPage() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  // ---- Mobile quick nav sections (for numbered pills) ----
  const SECTIONS = useMemo(
    () => [
      { id: "programs", label: "Programs" },
      { id: "formats", label: "Formats" },
      { id: "results", label: "Results" },
      { id: "testimonials", label: "Testimonials" },
    ],
    []
  );
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const ensurePlay = () => {
      if (document.visibilityState !== "visible") return;
      if (v.paused || v.ended) {
        v.muted = true;
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    };

    const onCanPlay = () => ensurePlay();
    const onEnded = () => {
      v.currentTime = 0.01;
      ensurePlay();
    };
    const onPause = () => ensurePlay();
    const onStalled = () => ensurePlay();
    const onSuspend = () => ensurePlay();
    const onVisibility = () => ensurePlay();

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("ended", onEnded);
    v.addEventListener("pause", onPause);
    v.addEventListener("stalled", onStalled);
    v.addEventListener("suspend", onSuspend);
    document.addEventListener("visibilitychange", onVisibility);

    ensurePlay();

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("stalled", onStalled);
      v.removeEventListener("suspend", onSuspend);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // ---- Active tracking for mobile quick nav (Consulting/Resources style) ----
  useEffect(() => {
    const entriesMap = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => entriesMap.set(e.target.id, e));
        let topEntry = null;
        SECTIONS.forEach(({ id }) => {
          const e = entriesMap.get(id);
          if (!e) return;
          if (e.isIntersecting) {
            if (!topEntry || e.intersectionRatio > topEntry.intersectionRatio) {
              topEntry = e;
            }
          }
        });
        if (topEntry?.target?.id) setActiveId(topEntry.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.35, 0.6, 0.9] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (nearBottom) setActiveId("testimonials");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [SECTIONS]);

  // ---- Mobile jump helper (center support for "All Speaking") ----
  const jump = (id, opts = {}) => {
    const el =
      typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;

    if (opts.center) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        el.offsetHeight / 2;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <main
        data-page="speaking"
        className="relative isolate min-h-screen w-full bg-[var(--color-teal-850)]"
      >
        {/* background guard to prevent mobile overlay artifact */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-teal-850)]"
        />

        {/* ===== HERO VIDEO with overlay text ===== */}
        <section className="relative w-full">
          {/* black backdrop so there’s never a green flash */}
          <div className="relative h-[70vh] bg-black">
            {/* Poster as an instant image (paints immediately) */}
            <img
              aria-hidden="true"
              src="/speaking-hero-poster.jpg"
              alt=""
              decoding="async"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
            />

            <video
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
              fetchPriority="high"
              poster="/speaking-hero-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
              ref={videoRef}
            >
              <source src="/hero40.mp4" type="video/mp4" />
            </video>

            {/* Overlay headline + subheadline + vignette */}
            <div className="hero-overlay absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/45" />
              <div className="relative px-6 s-hero">
                <h1 className="hero-title font-serif opacity-95 md:drop-shadow-lg md:text-6xl">
                  Speaking
                </h1>
                <div className="hero-hr h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 mb-3 rounded" />
                {/* Mobile-only shorter subheadline */}
                <p className="hero-sub md:hidden opacity-90 max-w-3xl mx-auto md:drop-shadow-md md:text-xl">
                  Talks that spark resilience, growth, and lasting change.
                </p>

                {/* Desktop/tablet original subheadline (unchanged) */}
                <p className="hero-sub hidden md:block opacity-90 max-w-3xl mx-auto md:drop-shadow-md md:text-xl">
                  Science-backed, story-driven talks that spark resilience, growth, and
                  lasting change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Intro + Main (zoomed for mobile only) ===== */}
        <div
          style={{ "--z": 3.0, "--zoomL": 1.6 }}
          className={`
            zoomwrap
            md:contents
            origin-top
            [transform:scale(var(--z))] [width:calc(100%/var(--z))]
            mx-auto
            md:[transform:none] md:[width:100%]
            landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
            overflow-visible
          `}
        >
          {/* ===== Intro Blurb ===== */}
          <section className="relative w-full py-16" id="intro">
            {/* subtle hairline divider from hero */}
            <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-cream)]/15" />
            <div className="mx-auto max-w-[1000px] px-6 text-left space-y-8">
              <h2 className="font-serif text-2xl md:text-4xl opacity-90 text-center font-semibold tracking-wide">
                &ldquo;Engaging. Inspiring. Transformational.&rdquo;
              </h2>

              <div className="space-y-6 opacity-85 text-lg md:text-xl leading-loose">
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
                  Presentations typically run between one to two hours and can be delivered
                  in-person or virtually. Dr. Salerno’s style is dynamic,
                  approachable, and grounded in evidence-based science, leaving
                  attendees not only inspired but also equipped with actionable
                  strategies to enhance their well-being, leadership, and
                  fulfillment—whether in the workplace, at home, or in their
                  personal lives. He is also available for panel discussions and
                  collaborative speaking engagements.
                </p>
              </div>

              {/* CTA under intro, above the quick nav */}
              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  className="inline-flex justify-center items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition md:will-change-transform hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 w-full max-w-xs md:w-auto md:max-w-none md:relative md:top-8"
                >
                  Book Dr. Salerno to Speak
                </a>
              </div>

              {/* ---- MOBILE quick nav (numbered, Consulting pattern) ---- */}
              <div id="quicknav" className="md:hidden mt-2 pointer-events-auto">
                <div className="grid grid-cols-2 landscape:grid-cols-3 gap-2">
                  {SECTIONS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => jump(s.id)}
                      aria-current={activeId === s.id ? "true" : "false"}
                      className={[
                        "w-full inline-flex items-center gap-1 rounded-full px-3.5 py-1.5",
                        "text-[12px] font-semibold tracking-wide truncate transition",
                        "active:scale-95 active:brightness-125",
                        "border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)]",
                        activeId === s.id &&
                          "!bg-[var(--color-gold)] !text-black !border-[var(--color-gold)]",
                      ].join(" ")}
                    >
                      {/* Fixed-width numeric block ensures perfect alignment */}
                      <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
                        {idx + 1}.
                      </span>
                      <span className="truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* ---- /mobile quick nav ---- */}
            </div>
          </section>

          {/* ===== MAIN CONTENT ===== */}
          <div className="mx-auto max-w-[1400px] pb-6 md:py-6 space-y-16 md:space-y-24" id="topics">
            <hr className="border-t border-[var(--color-cream)]/22 md:mb-8 w-full" />

            {/* Popular Topics (Programs) */}
            <section
              id="programs"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mx-15 gap-y-12"
            >
              <div className="lg:col-span-5 lg:py-6">
                {/* Overline (slightly dimmer) */}
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">
                  Programs
                </p>
                <h2 className="font-serif text-4xl mb-2">Popular Topics</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />

                <div className="space-y-10">
                  {/* Leveling-Up Your Mindset & Growth */}
                  <div>
                    <h3 className="font-serif text-2xl mb-2">
                      <span className="text-[var(--color-gold)]">
                        Leveling-Up Mindset &amp; Growth
                      </span>
                    </h3>
                    <ul className="text-lg opacity-90 space-y-3">
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Transforming Your Mindset to Achieve Your Goals</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Strengthening Personal and Professional Resilience</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Overcoming Imposter Syndrome and Unlocking Self-Confidence</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Using Visualization and Affirmations to Achieve Your Goals</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Practicing Meditation to Level-Up Your Life</span>
                      </li>
                    </ul>
                  </div>

                  {/* Strengthening Mental Health and Wellbeing */}
                  <div>
                    <h3 className="font-serif text-2xl mb-2">
                      <span className="text-[var(--color-gold)]">
                        Strengthening Mental Health &amp; Wellbeing
                      </span>
                    </h3>
                    <ul className="text-lg opacity-90 space-y-3">
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Everyday Strategies to Improve Mental Health</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Work-Life Balance: Tools for Success and Fulfillment</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Science-Backed Practices for Stress Reduction</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Burnout Prevention and Recovery: Protect Your Health</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Gratitude, Self-Compassion, and Altruism for Wellbeing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Performance & Potential */}
                  <div>
                    <h3 className="font-serif text-2xl mb-2">
                      <span className="text-[var(--color-gold)]">
                        Boosting Performance &amp; Potential
                      </span>
                    </h3>
                    <ul className="text-lg opacity-90 space-y-3">
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Harnessing Motivation &amp; Emotional Intelligence for Success</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Unlocking Creativity and Flow States for Excellence</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Energy Management for Peak Performance</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>The Power of Micro-Habits for Lasting Growth</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[var(--color-gold)]">✔︎</span>
                        <span>Building Grit and Perseverance for Long-Term Goals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quotes (left column) — desktop only */}
              <div className="lg:col-span-7 ml-auto hidden md:flex flex-col gap-6 max-w-[640px]">
                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  {/* Decorative quotes (no normal quotes in text) */}
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...an exceptional speaker: he is engaging, well-spoken, and clearly
                      passionate about his work.
                    </p>
                    <span aria-hidden className="absolute right-4 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, American Public Health Association Annual Meeting &amp; Expo
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>He communicates with clarity and confidence...leaves a lasting impression.</p>
                    <span className="absolute right-24 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>Dr. Salerno has a way of blending data with human stories that makes science resonate.</p>
                    <span className="absolute right-14 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Programs footer buttons (mobile only) */}
<div className="md:hidden mt-2 w-full">
  <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
    <button
      onClick={() => jump("intro")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      ← Prev
    </button>
    <button
      onClick={() => jump("quicknav", { center: true })}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      All Speaking
    </button>
    <button
      onClick={() => jump("formats")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      Next →
    </button>
  </div>
</div>


            {/* Dr. Salerno Offers (Formats) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-16 md:mb-8 w-full" />
            <section
              id="formats"
              className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-0 mx-15 items-center"
            >
              {/* Quotes (RIGHT column) — desktop only */}
              <div className="lg:col-span-7 hidden md:flex flex-col gap-6 max-w-[640px] lg:pr-6">
                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...gifted speaker whose engaging style &amp; clear communication bring
                      complex ideas to life.
                    </p>
                    <span className="absolute right-6 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Columbia University
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" aria-hidden />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...can communicate with diverse audiences, speaks with heart and
                      dimensionality.
                    </p>
                    <span className="absolute right-23 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Society of Behavioral Medicine Annual Meeting
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" aria-hidden />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...brings a charming intensity and passion that inspires others with his
                      presence and message.
                    </p>
                    <span className="absolute right-0 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                  </figcaption>
                </figure>
              </div>

              {/* Formats list */}
              <div className="lg:col-span-5 order-1 lg:order-2 lg:py-6 space-y-8 lg:pl-6">
                {/* Overline added */}
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">
                  Formats
                </p>
                <h2 className="font-serif text-4xl mb-2">Dr. Salerno Offers</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Keynotes</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    High-energy, story-driven talks with evidence-based takeaways.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Workshops</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    Interactive sessions with exercises, tools, and live Q&amp;A.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Panels</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    Multi-speaker discussions designed to bring diverse perspectives to key topics
                    in mental health, resilience, and personal growth.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Fireside Chats</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    A relaxed, conversational format with a moderator that blends storytelling
                    and audience connection for an intimate, authentic experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Moderated Discussions</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    Thoughtful facilitation of complex conversations that spark insight,
                    learning, and connection among participants.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-2xl mb-2">
                    <span className="text-[var(--color-gold)]">Virtual Talks &amp; Webinars</span>
                  </h3>
                  <p className="text-lg opacity-90">
                    Accessible online sessions that bring science-backed strategies and personal
                    growth tools to audiences worldwide—ideal for remote or global teams.
                  </p>
                </div>
              </div>
            </section>

            {/* Formats footer buttons (mobile only) — AFTER the section */}
<div className="md:hidden mt-2 w-full">
  <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
    <button
      onClick={() => jump("programs")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      ← Prev
    </button>
    <button
      onClick={() => jump("quicknav", { center: true })}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      All Speaking
    </button>
    <button
      onClick={() => jump("results")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      Next →
    </button>
  </div>
</div>


            {/* Outcomes (Results) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-16 md:mb-8 w-full" />
            <section
              id="results"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-15 items-start gap-y-12"
            >
              <div className="lg:col-span-5 lg:py-6">
                {/* Overline added */}
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">
                  Results
                </p>
                <h2 className="font-serif text-4xl mb-2">Outcomes</h2>
                <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-6 rounded" />

                <p className="text-lg opacity-90 mb-6">
                  Audiences leave with clarity, confidence, and actionable strategies they can
                  apply immediately. Key outcomes include:
                </p>
                <ul className="text-lg opacity-90 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔︎</span>
                    <span>Building resilient habits</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔︎</span>
                    <span>Regulating stress effectively</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔︎</span>
                    <span>Deepening focus through meditation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔︎</span>
                    <span>Strengthening relationships and connection</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔︎</span>
                    <span>Aligning work and life with higher purpose</span>
                  </li>
                </ul>

                <p className="text-lg opacity-90 mt-6">
                  Every talk is tailored to your audience’s unique needs and goals, ensuring
                  lasting impact both personally and professionally.
                </p>
              </div>

              {/* Quotes (right column, Results) — desktop only */}
              <div className="lg:col-span-7 ml-auto hidden md:flex flex-col gap-6 max-w-[640px]">
                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...engaging, energetic, strong communication skills, proven ability to
                      disseminate science.
                    </p>
                    <span className="absolute right-13 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, University of Central Florida
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 md:ring-1 md:ring-white/10 md:shadow-2xl md:backdrop-blur-sm hover:bg-white/[0.06] transition">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" aria-hidden />
                  <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                    <span className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                    <p>
                      ...a highly engaging, knowledgeable, and skilled speaker...strongly
                      recommended.
                    </p>
                    <span className="absolute right-44 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, University of California, Los Angeles
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Results footer buttons (mobile only) */}
<div className="md:hidden mt-2 w-full">
  <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
    <button
      onClick={() => jump("formats")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      ← Prev
    </button>
    <button
      onClick={() => jump("quicknav", { center: true })}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      All Speaking
    </button>
    <button
      onClick={() => jump("testimonials")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      Next →
    </button>
  </div>
</div>


            {/* ===== Testimonials (mobile-only; now collapsible) ===== */}
            {/* Full-bleed divider above Testimonials (mobile only) */}
            <hr className="md:hidden w-screen relative left-1/2 -translate-x-1/2 border-t border-[var(--color-cream)]/22 mb-6" />
            <section id="testimonials" className="md:hidden mx-15">
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">
                Testimonials
              </p>
              <h2 className="font-serif text-4xl mb-2">What People Say</h2>
              <div className="h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded" />

              <div className="flex flex-col gap-6 max-w-[640px]">
                {/* Always-visible: first two cards */}
                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                  />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                      “
                    </span>
                    <p>
                      ...an exceptional speaker: he is engaging, well-spoken, and clearly
                      passionate about his work.
                    </p>
                    <span className="absolute right-13 bottom-4 text-4xl opacity-20 select-none">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, American Public Health Association Annual Meeting &amp; Expo
                  </figcaption>
                </figure>

                <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                  <span
                    className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                    aria-hidden
                  />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                      “
                    </span>
                    <p>
                      He communicates with clarity and confidence...leaves a lasting impression.
                    </p>
                    <span className="absolute right-6 bottom-4 text-4xl opacity-20 select-none">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
                  </figcaption>
                </figure>

                {/* Collapsible group: the rest of the cards */}
                <div className={showAllTestimonials ? "flex flex-col gap-6" : "hidden"}>
                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                      aria-hidden
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        Dr. Salerno has a way of blending data with human stories that makes science resonate.
                      </p>
                      <span className="absolute right-29 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                    </figcaption>
                  </figure>

                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        ...gifted speaker whose engaging style &amp; clear communication bring complex ideas to life.
                      </p>
                      <span className="absolute right-0 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, Columbia University
                    </figcaption>
                  </figure>

                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        ...can communicate with diverse audiences, speaks with heart and dimensionality.
                      </p>
                      <span className="absolute right-14 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, Society of Behavioral Medicine Annual Meeting
                    </figcaption>
                  </figure>

                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                      aria-hidden
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        ...brings a charming intensity and passion that inspires others with his presence and message.
                      </p>
                      <span className="absolute right-30 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                    </figcaption>
                  </figure>

                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        ...engaging, energetic, strong communication skills, proven ability to disseminate science.
                      </p>
                      <span className="absolute right-3 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, University of Central Florida
                    </figcaption>
                  </figure>

                  <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl"
                    />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">
                        “
                      </span>
                      <p>
                        ...a highly engaging, knowledgeable, and skilled speaker...strongly recommended.
                      </p>
                      <span className="absolute right-15 bottom-4 text-4xl opacity-20 select-none">
                        ”
                      </span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                      — <span className="text-[var(--color-gold)]">Audience member</span>, University of California, Los Angeles
                    </figcaption>
                  </figure>
                </div>

                {/* Toggle button */}
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={() => setShowAllTestimonials((s) => !s)}
                    aria-expanded={showAllTestimonials}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition hover:bg-[var(--color-teal-700)] active:translate-y-[1px]"
                  >
                    {showAllTestimonials ? "Show Less" : "Show All"}
                  </button>
                </div>
              </div>
              </section>

            {/* Testimonials footer buttons (mobile only) — centered & tight */}
<div className="md:hidden mt-2 w-full">
  <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
    <button
      onClick={() => jump("results")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      ← Prev
    </button>
    <button
      onClick={() => jump("quicknav", { center: true })}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      All Speaking
    </button>
    <button
      onClick={() => jump("programs")}
      className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
    >
      Next →
    </button>
  </div>
</div>


     


            {/* CTA (unchanged) */}
            <div className="flex justify-center translate-y-[-28px] md:translate-y-0">
              <a
                href="/contact"
                className="inline-flex justify-center items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition md:will-change-transform hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 w-full max-w-xs md:w-auto md:max-w-none md:translate-y-[-45px]"
              >
                Book Dr. Salerno to Speak
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Global safeguards and crisp text styles */}
      <style jsx global>{`
        /* Prevent background peeking through on iOS Safari */
        @supports (-webkit-touch-callout: none) {
          html,
          body {
            background: var(--color-teal-850) !important;
          }
        }

        /* Ensure crisp text inside zoomed containers */
        .zoomwrap,
        .zoomwrap * {
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        /* Mobile-only: force the checkmark span to render as gold text (not emoji) */
        @media (max-width: 767px) {
          .zoomwrap ul.text-lg li > span:first-child {
            color: var(--color-gold) !important;
            -webkit-text-fill-color: var(--color-gold) !important;
            font-family: "Helvetica Neue", Arial, ui-sans-serif, system-ui,
              -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif !important;
            font-weight: 700;
            opacity: 1 !important;
          }
        }

        /* MOBILE ONLY: hide footers on Speaking, show on desktop */
        @media (max-width: 767px) {
          body:has([data-page="speaking"]) footer,
          body:has([data-page="speaking"]) .site-footer,
          body:has([data-page="speaking"]) .home-footer,
          body:has([data-page="speaking"]) .social-footer,
          body:has([data-page="speaking"]) [data-role="social-footer"],
          body:has([data-page="speaking"]) [data-component="footer"] {
            display: none !important;
          }

          /* Safety net if a footer is injected inside this page */
          [data-page="speaking"]
            :is(footer, .social-footer, [data-role="social-footer"], [data-component="footer"]) {
            display: none !important;
          }
        }

        /* SPEAKING — mobile PORTRAIT: much larger */
        @media (max-width: 767px) and (orientation: portrait) {
          [data-page="speaking"] .s-hero .hero-title {
            font-size: clamp(156px, 36vw, 300px) !important;
            line-height: 1.02;
            letter-spacing: -0.015em;
          }
          [data-page="speaking"] .s-hero .hero-sub {
            font-size: clamp(52px, 12.5vw, 82px) !important;
            line-height: 1.24;
          }
          [data-page="speaking"] .s-hero .hero-hr {
            width: clamp(260px, 64vw, 460px) !important;
            height: 6px !important;
          }
        }

        /* SPEAKING — mobile LANDSCAPE: a bit smaller */
        @media (max-width: 767px) and (orientation: landscape) {
          [data-page="speaking"] .s-hero .hero-title {
            font-size: clamp(56px, 13.5vw, 96px) !important;
            line-height: 1.06;
            letter-spacing: -0.01em;
          }
          [data-page="speaking"] .s-hero .hero-sub {
            font-size: clamp(18px, 5.2vw, 24px) !important;
            line-height: 1.25;
          }
          [data-page="speaking"] .s-hero .hero-hr {
            width: clamp(100px, 26vw, 160px) !important;
            height: 3px !important;
          }
        }

        @media (min-width: 768px) {
          [data-page="speaking"] .s-hero .hero-hr {
            width: 4rem !important; /* w-16 */
            height: 2px !important; /* h-[2px] */
          }
        }
      `}</style>
    </>
  );
}
