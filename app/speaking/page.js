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

        {/* ===== HERO IMAGE with overlay text ===== */}
        <section className="relative w-full">
          {/* black backdrop so there’s never a green flash */}
          <div className="relative h-[70vh] bg-black">
            {/* Background image */}
            <img
              aria-hidden="true"
              src="/bwspeaking1.jpg"
              alt=""
              decoding="async"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
            />

            {/* Solid overlay (no gradient) */}
<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

            {/* Overlay headline + subheadline */}
            <div className="hero-overlay absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
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
          style={{ "--z": 3.0, "--zoomL": 1.3 }}
          className={`
            zoomwrap
            lg:contents
            origin-top
            [transform:scale(var(--z))] [width:calc(100%/var(--z))]
            mx-auto
            lg:[transform:none] lg:[width:100%]
            landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
            overflow-visible
          `}
        >
          {/* ===== Intro Blurb ===== */}
          <section className="relative w-full pt-16 pb-9 md:py-16" id="intro">
            {/* subtle hairline divider from hero */}
            <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-cream)]/15" />
            <div className="mx-auto max-w-[1000px] px-6 text-left space-y-8">
              <h2 className="font-serif text-2xl md:text-4xl opacity-90 text-center font-semibold tracking-wide">
                &ldquo;Engaging. Inspiring. Transformational.&rdquo;
              </h2>

<div
  className="space-y-6 opacity-85 text-lg md:text-xl leading-loose mx-auto max-w-none landscape:max-w-[700px] lg:landscape:max-w-none"
>
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
                  departments of health, among others.
                </p>
                <p>
                  Presentations typically run between one to two hours and can be delivered
                  in-person or virtually. Dr. Salerno’s style is dynamic,
                  approachable, and grounded in evidence-based science, leaving
                  attendees not only inspired but also equipped with actionable
                  strategies to enhance their well-being, leadership, and
                  fulfillment—whether in the workplace, at home, or in their
                  personal lives. He is also available for workshops, panel discussions, and
                  collaborative speaking engagements (see details below).
                </p>
              </div>

              {/* CTA under intro, above the quick nav */}
              <div className="mt-8 flex justify-center">
                <a
                  href="/contact"
                  className="inline-flex justify-center items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition md:will-change-transform hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 w-full max-w-xs lg:w-auto lg:max-w-none lg:relative lg:top-8"
                >
                  Book Dr. Salerno to Speak
                </a>
              </div>

{/* ---- MOBILE quick nav (numbered, Consulting pattern) ---- */}
<div id="quicknav" className="lg:hidden mt-4 landscape:mt-3 landscape:mb-2">
  {/* cap width + center only in landscape */}
  <div className="w-full landscape:max-w-[520px] mx-auto">
    <div className="grid grid-cols-2 gap-2 landscape:gap-1">
      {SECTIONS.map((s, idx) => (
        <button
          key={s.id}
          type="button"
          onClick={() => jump(s.id)}
          aria-current={activeId === s.id ? "true" : "false"}
          className={[
            "w-full rounded-full inline-flex items-center gap-1",
            "px-3.5 py-1.5 landscape:px-3",           // slightly narrower in landscape
            "text-[13px] landscape:text-[11px] font-semibold tracking-wide truncate transition",
            "active:scale-95 active:brightness-125",
            "border border-white/18 bg-[var(--color-teal-800)] text-[var(--color-cream)]",
            activeId === s.id &&
              "!bg-[var(--color-gold)] !text-black !border-[var(--color-gold)]",
          ].join(" ")}
        >
          <span className="inline-block w-[3ch] text-left tabular-nums leading-none">
            {idx + 1}.
          </span>
          <span className="truncate">{s.label}</span>
        </button>
      ))}
    </div>
  </div>
</div>
{/* ---- /mobile quick nav ---- */}

            </div>
          </section>

          {/* ===== MAIN CONTENT ===== */}
          <div className="mx-auto max-w-[1400px] md:py-6 space-y-16 md:space-y-24" id="topics">
            <hr className="border-t border-[var(--color-cream)]/22 md:mb-8 w-full mx-auto w-[93%] landscape:mt-2 landscape:mb-4" />

            {/* Popular Topics (Programs) */}
            <section
              id="programs"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mx-15 gap-y-12"
              
            >
              <div className="md:col-span-5 md:py-6">
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
<div className="md:col-span-7 ml-auto hidden md:flex flex-col gap-6 max-w-[640px] quote-col">
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
                    <span aria-hidden className="absolute right-14 bottom-5 text-4xl opacity-20 select-none">”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                    — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Programs footer buttons (mobile only) — tighter */}
            <div className="lg:hidden -mt-12 mb-15 w-full">
              <div className="w-full flex justify-center">
                <div className="max-w-[540px] w-full grid grid-cols-[1fr_1.35fr_1fr] gap-3">
                  <button
                    onClick={() => jump("intro")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => jump("quicknav", { center: true })}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    All Speaking
                  </button>
                  <button
                    onClick={() => jump("formats")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Dr. Salerno Offers (Formats) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-16 md:mb-8 w-full mx-auto w-[93%]" />
            <section
              id="formats"
              className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 md:gap-x-0 mx-15 items-center"
            >
              {/* Quotes (RIGHT column) — desktop only */}
                <div className="md:col-span-7 hidden md:flex flex-col gap-6 max-w-[640px] md:pr-6 quote-col">
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
              <div className="md:col-span-5 order-1 md:order-2 md:py-6 space-y-8 md:pl-6">
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

            {/* Formats footer buttons (mobile only) — slimmer + same spacing as Service Pillars */}
            <div className="lg:hidden -mt-12 mb-15 w-full">
              <div className="w-full flex justify-center">
                <div className="max-w-[540px] w-full grid grid-cols-[1fr_1.35fr_1fr] gap-3">
                  <button
                    onClick={() => jump("programs")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => jump("quicknav", { center: true })}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    All Speaking
                  </button>
                  <button
                    onClick={() => jump("results")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Outcomes (Results) */}
            <hr className="border-t border-[var(--color-cream)]/22 mb-16 md:mb-8 mx-auto w-[93%]" />
            <section
              id="results"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-15 items-start gap-y-12"
            >
              <div className="md:col-span-5 md:py-6">
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
<div className="md:col-span-7 ml-auto hidden md:flex flex-col gap-6 max-w-[640px] quote-col">
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

            {/* Results footer buttons (mobile only) — slimmer + same spacing as Service Pillars */}
            <div className="lg:hidden -mt-12 mb-15 w-full">
              <div className="w-full flex justify-center">
                <div className="max-w-[540px] w-full grid grid-cols-[1fr_1.35fr_1fr] gap-3">
                  <button
                    onClick={() => jump("formats")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => jump("quicknav", { center: true })}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    All Speaking
                  </button>
                  <button
                    onClick={() => jump("testimonials")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* ===== Testimonials (mobile-only; now collapsible) ===== */}
<hr className="lg:hidden mx-auto w-[93%] relative left-1/2 -translate-x-1/2 border-t border-[var(--color-cream)]/22 mb-6" />

<section id="testimonials" className="lg:hidden">
  {/* Centered container for everything in this section */}
  <div className="mx-auto w-full max-w-[640px] px-6">
    <p className="text-center text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Testimonials</p>
    <h2 className="text-center font-serif text-4xl mb-2">What People Say</h2>
    <div className="items-center h-[2px] w-12 bg-[var(--color-gold)]/75 mb-8 rounded mx-auto" />

    {/* Cards */}
    <div className="flex flex-col gap-6 w-full">
      {/* Always-visible: first two cards */}
      <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
        <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
        <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
          <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">“</span>
          <p>...an exceptional speaker: he is engaging, well-spoken, and clearly passionate about his work.</p>
          <span className="absolute right-13 bottom-4 text-4xl opacity-20 select-none">”</span>
        </blockquote>
        <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
          — <span className="text-[var(--color-gold)]">Audience member</span>, American Public Health Association Annual Meeting &amp; Expo
        </figcaption>
      </figure>

      <figure className="relative w-full rounded-xl bg-white/5 p-8 hover:bg-white/[0.06] transition">
        <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" aria-hidden />
        <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
          <span className="absolute -left-4 -top-1 text-4xl opacity-20 select-none">“</span>
          <p>He communicates with clarity and confidence...leaves a lasting impression.</p>
          <span className="absolute right-6 bottom-4 text-4xl opacity-20 select-none">”</span>
        </blockquote>
        <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
          — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
        </figcaption>
      </figure>

                {/* Collapsible group: the rest of the cards */}
                <div className={showAllTestimonials ? "flex flex-col gap-6 w-full" : "hidden"}>
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
                <div className="mt-2">
                  <button
                    onClick={() => setShowAllTestimonials((s) => !s)}
                    aria-expanded={showAllTestimonials}
                    className="items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition hover:bg-[var(--color-teal-700)] active:translate-y-[1px]"
                  >
                    {showAllTestimonials ? "Show Less" : "Show All"}
                  </button>
                </div>
              </div>
                            </div>

            </section>
            

            {/* Testimonials footer buttons (mobile only) — slimmer + centered + tight spacing */}
            <div className="lg:hidden -mt-7 mb-17  w-full">
              <div className="w-full flex justify-center">
                <div className="max-w-[540px] w-full grid grid-cols-[1fr_1.35fr_1fr] gap-3">
                  <button
                    onClick={() => jump("results")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => jump("quicknav", { center: true })}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    All Speaking
                  </button>
                  <button
                    onClick={() => jump("programs")}
                    className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition active:translate-y-[1px]"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* CTA (unchanged) */}
            <div className="flex justify-center translate-y-[-28px] lg:translate-y-0">
              <a
                href="/contact"
                className="inline-flex justify-center items-center rounded-md bg-[var(--color-gold)] text-black -mb-2 px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition md:will-change-transform hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 w-full max-w-xs lg:w-auto lg:max-w-none lg:translate-y-[-45px]"
              >
                Book Dr. Salerno to Speak
              </a>
            </div>
          </div>



            {/* Bottom spacer */}
            <div className="pb-10" />
            
          {/* FINAL divider above footer — match two-column width, no bleed */}
<div className="mx-auto max-w-[1400px] px-6">
  <hr className="hidden lg:block max-w-[1400px] border-t border-[var(--color-cream)]/22" />
</div>




{/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
<div className="block lg:hidden">
  <div className="mx-auto max-w-[1400px] px-6 mb-14 -mt-5">
    <hr className="border-t border-[var(--color-cream)]/22 mb-0 mx-auto w-[93%]" />
  </div>

  <div className="mobile-footer-cap">

  <div className="mx-auto max-w-[1400px] px-3">
    {/* Newsletter card (midnight blue) */}
    <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
      <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
        Science, Soul, and a Bit of Magic — Every Month
      </p>
      <p className="text-sm opacity-85 mb-3">
        Practical wisdom for modern minds — best paired with coffee and curiosity.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
        />
        <button
          type="button"
          className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold"
        >
          Subscribe
        </button>
      </div>
    </div>

    {/* --- MOBILE Jay-style footer block --- */}
    <div className="mt-6 text-[13px] leading-relaxed">
      {/* 1) Heading */}
      <p className="uppercase tracking-[0.18em] text-left opacity-70">
        Follow Dr. Salerno:
      </p>

      {/* 2) Socials row — centered & evenly spaced */}
      <div className="mt-3 flex items-left justify-left gap-8">
        {/* TikTok */}
        <a href="https://www.tiktok.com/@YOURHANDLE" aria-label="TikTok" className="opacity-90 hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z"/></svg>
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/YOURHANDLE" aria-label="Instagram" className="opacity-90 hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>
        </a>
        {/* YouTube */}
        <a href="https://www.youtube.com/@YOURHANDLE" aria-label="YouTube" className="opacity-90 hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z"/></svg>
        </a>
      </div>

      {/* 3) Bio line */}
      <p className="mt-5 text-left opacity-85">
        Dr. Juan Pablo Salerno is an award-winning mental health scientist, personal growth expert, author and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
      </p>

      {/* 4) Name with © + ™ */}
      <p className="mt-6 text-left opacity-85">
        © Dr. Juan Pablo Salerno™
      </p>

      {/* 5) Legal line (centered with dots) */}
      <p className="mt-2 mb-5 text-left opacity-85">
        <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
        <span className="mx-2 opacity-50">·</span>
        <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
        <span className="mb-8 mx-2 opacity-50">·</span>
        <span>All rights reserved</span>
      </p>
    </div>
  </div>
</div>


        {/* removed the contained divider on mobile */}
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

        /* SPEAKING — Mobile Portrait: shorten horizontal rules (borders) */
@media (max-width: 767px) and (orientation: portrait) {
  [data-page="speaking"] hr {
    margin-left: auto !important;
    margin-right: auto !important;
    width: 88% !important; /* pulls in from full-bleed */
  }
}

@media (hover: none) and (orientation: landscape) and (max-width: 1368px) {
  .quote-col {
    display: none !important;
  }
}


      `}</style>
    </>
  );
}
