// app/consulting/page.js
"use client";

import { useEffect, useMemo, useState } from "react";

export default function ConsultingPage() {
  const SECTIONS = useMemo(
    () => [
      { id: "approach", label: "Approach" },
      { id: "pillars", label: "Services" },
      { id: "process", label: "Process" },
      { id: "results", label: "Results" },
      { id: "who-i-work-with", label: "Who I Work With" },
      { id: "packages", label: "Ways to Partner" },
      { id: "contact", label: "Contact" },
      { id: "testimonials", label: "Testimonials" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const jump = (id, opts = {}) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
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

  // Desktop observer (desktop IDs only)
  useEffect(() => {
    const entriesMap = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => entriesMap.set(e.target.id, e));
        let topEntry = null;
        SECTIONS.forEach(({ id }) => {
          const e = entriesMap.get(id);
          if (e?.isIntersecting && (!topEntry || e.intersectionRatio > topEntry.intersectionRatio)) {
            topEntry = e;
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
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (nearBottom) setActiveId("testimonials");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [SECTIONS]);

  // Helpers for mobile (-m IDs)
  const toMobile = (id) => `${id}-m`;
  const idxOf = (id) => SECTIONS.findIndex((s) => s.id === id);
  const prevOf = (id) => SECTIONS[(idxOf(id) - 1 + SECTIONS.length) % SECTIONS.length].id;
  const nextOf = (id) => SECTIONS[(idxOf(id) + 1) % SECTIONS.length].id;

  const MobileSectionFooter = ({ baseId }) => (
    <div className="md:hidden mt-7 pb-2 w-full">
      <div className="mx-auto w-full max-w-[500px] grid grid-cols-[1fr_1.35fr_1fr] gap-4">
        <button
          onClick={() => jump(toMobile(prevOf(baseId)))}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          ← Prev
        </button>
        <button
          onClick={() => jump("quicknav-m", { center: true })}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          All Consulting
        </button>
        <button
          onClick={() => jump(toMobile(nextOf(baseId)))}
          className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-4 py-2.5 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
        >
          Next →
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      {/* ============== MOBILE (uses the exact working zoom wrapper) ============== */}
      <div className="md:hidden" aria-label="Consulting mobile layout">
        <div
          style={{ "--z": 3.0, "--zoomL": 1.60 }}
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
          {/* HERO (inside zoom) */}
          <section className="mx-auto max-w-[1100px] px-6 pt-16 pb-10 text-center" id="hero-m">
            <h1 className="font-serif text-5xl leading-[1.06] opacity-95">
              Consulting with Dr. Salerno
            </h1>
            <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />
            <p className="text-lg opacity-85 max-w-[780px] mx-auto mt-12 leading-relaxed">
              Evidence-based consulting that helps organizations design, evaluate, and scale
              strategies to strengthen mental health, wellbeing, resilience, and growth.
            </p>
          </section>

 {/* ---- MOBILE quick nav (numbered) ---- */}
<div id="quicknav" className="md:hidden mt-6 pointer-events-auto">
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
    "border border-white/15 bg-[var(--color-teal-800)] text-[var(--color-cream)]",
    activeId === s.id && "!bg-[var(--color-gold)] !text-black !border-[var(--color-gold)]"
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

            {/* divider same width as container */}
            <div className="mt-3 h-px w-full bg-[var(--color-cream)]/15" />
          </div>

          {/* ===== MOBILE SECTIONS (no backdrop-blur in this subtree) ===== */}
          <section id={toMobile("approach")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Philosophy</p>
            <h2 className="font-serif text-3xl opacity-95">My Approach</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
            <p className="text-lg opacity-90 leading-loose mb-6 max-w-3xl">
              I work with organizations committed to fostering wellbeing and sustainable impact.
              Each partnership is tailored to the unique needs, context, and goals of the people it serves.
            </p>
            <p className="text-base opacity-90 leading-loose max-w-3xl -mb-3">
              I bridge <span className="font-semibold">science</span> and{" "}
              <span className="font-semibold">growth wisdom</span> to help organizations build
              effective, culturally grounded, and sustainable wellbeing strategies. With expertise
              working with diverse populations, my work centers equity, inclusivity, and
              real-world relevance.
            </p>
            <MobileSectionFooter baseId="approach" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("pillars")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Services</p>
            <h2 className="font-serif text-3xl opacity-95">Service Pillars</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
            <div className="grid grid-cols-1 gap-7">
              {[
                {
                  title: "Partner in Research",
                  text: "Partner with a federally-funded scientist across all phases of programming and research—bringing credibility and depth to your initiatives.",
                  link: "Start a research partnership →",
                },
                {
                  title: "Design with Science",
                  text: "Translate cutting-edge research into programs that resonate with your organization or community. Evidence-based, culturally responsive, and operationally practical.",
                  link: "Co-design a program →",
                },
                {
                  title: "Evaluate What Works",
                  text: "Build confidence that your program delivers real impact through rigorous evaluation and research design, logic models, measurement plans, and advanced analyses tied to outcomes.",
                  link: "Co-construct an evaluation →",
                },
                {
                  title: "Scale Across Your Organization",
                  text: "Strengthen and integrate organizational programs that foster mental health, resilience, and wellbeing — from mindfulness and stress management to practices that support sustainable growth.",
                  link: "Scale wellness and resilience →",
                },
              ].map((card, i) => (
                <article
                  key={i}
                  className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl hover:bg-white/[0.06] transition"
                >
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <h3 className="font-serif text-2xl mb-2">{card.title}</h3>
                  <p className="opacity-90 leading-relaxed mb-3">{card.text}</p>
                  <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
                    {card.link}
                  </a>
                </article>
              ))}
            </div>
            <MobileSectionFooter baseId="pillars" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("process")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Process</p>
            <h2 className="font-serif text-3xl opacity-95">How We Work Together</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
            <p className="opacity-85 max-w-3xl mb-10 leading-relaxed">
              Every engagement begins with <span className="font-semibold">Discovery</span>. From there, we co-create a pathway
              that may include program design, implementation, evaluation, and/or scaling—depending on your organization’s priorities.
            </p>

            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl text-center mb-10">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-2xl mb-2">Discovery</h3>
              <p className="opacity-90 leading-relaxed">
                Understand your goals, challenges, stakeholders, and context—laying the foundation for success.
              </p>
            </article>

            {/* Gold arrow toward Co-Design (mobile only, no animation to avoid blur) */}
<div className="md:hidden flex justify-center -mt-2 mb-6" aria-hidden>
  <svg
    viewBox="0 0 24 24"
    className="h-7 w-7 text-[var(--color-gold)]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v12" />
    <path d="M7 12l5 5 5-5" />
  </svg>
</div>

            <div className="grid grid-cols-1 gap-6">
              {[
                ["Co-Design", "Develop tailored, evidence-based strategies that fit your organization’s unique needs and context."],
                ["Implementation", "Support program rollout with facilitator toolkits, trainings, and change-management resources."],
                ["Evaluation", "Measure program outcomes, refine designs, and assess true organizational-level impact."],
                ["Scaling", "Expand programming more widely to increase reach and impact across your organization."],
              ].map(([title, text]) => (
                <article key={title} className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <h3 className="font-serif text-xl mb-2">{title}</h3>
                  <p className="opacity-90 leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
            <MobileSectionFooter baseId="process" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("results")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Results</p>
            <h2 className="font-serif text-3xl opacity-95">What Partners Will Achieve</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-2 rounded" />
            <ul className="grid grid-cols-1 gap-4 text-lg opacity-90">
              <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔︎</span><span>Higher program engagement and follow-through</span></li>
              <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔︎</span><span>Noticeable and meaningful reductions in stress and burnout</span></li>
              <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔︎</span><span>Stronger cultures of mindfulness, resilience, and wellbeing</span></li>
              <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔︎</span><span>Practical tools that support growth across teams/communities</span></li>
            </ul>
            <MobileSectionFooter baseId="results" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("who-i-work-with")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Who I Work With</p>
            <h2 className="font-serif text-3xl opacity-95">Organization Partnerships</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

            <p className="text-base opacity-85 leading-relaxed max-w-3xl mb-6">
              I collaborate with organizations that want to weave mental health, resilience, and wellbeing
              into the heart of their culture. From small organizations to global institutions, I help teams and
              communities strengthen connection, reduce burnout, and create environments where people can thrive.
            </p>

            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 text-base opacity-90">
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Organizations that prioritize mental health, resilience, &amp; growth.</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Institutions seeking to build cultures of mindfulness &amp; wellbeing.</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Agencies that want to reduce burnout and strengthen connection.</span></li>
                <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Partners interested in blending science with wellness practices.</span></li>
              </ul>
            </div>
            <MobileSectionFooter baseId="who-i-work-with" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("packages")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Ways to Partner</p>
            <h2 className="font-serif text-3xl opacity-95">Choose the Partnership That Fits</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

            <div className="grid grid-cols-1 gap-6">
              {[
                ["Short Sprints", "2–6 weeks to quickly understand needs, run listening sessions, and surface actionable insights—so you can make a confident next step.", "Start a Sprint →"],
                ["Deep Partnerships", "3–12 months to co-design programs, support implementation, and learn as you go— grounding decisions in evidence while staying human-centered.", "Explore a Partnership →"],
                ["Ongoing Support", "Monthly or quarterly check-ins, trainings, and refreshers to sustain momentum, reduce burnout, and keep wellbeing practices alive across teams.", "Set Up Support →"],
              ].map(([title, text, cta], i) => (
                <article key={i} className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl hover:bg-white/[0.06] transition">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <h3 className="font-serif text-xl mb-2">{title}</h3>
                  <p className="opacity-90 leading-relaxed mb-3">{text}</p>
                  <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">{cta}</a>
                </article>
              ))}
            </div>
            <MobileSectionFooter baseId="packages" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          <section id={toMobile("contact")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">Contact</p>
            <h2 className="font-serif text-3xl opacity-95 text-center">Ready to Talk?</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-4 rounded" />
            <p className="text-base opacity-85 text-center max-w-[800px] mx-auto mb-8 leading-relaxed">
              Book a brief discovery call to discuss goals, scope, and timelines. We’ll identify where science-backed
              strategies can create the greatest impact for your team or community.
            </p>

            {/* no backdrop-blur on mobile */}
            <div className="relative overflow-hidden rounded-2xl bg-white/4 ring-1 ring-white/15 p-7 shadow-2xl">
              <div className="relative text-center">
                <h3 className="font-serif text-2xl opacity-95">
                  Ready to strengthen your programs with science-backed consulting?
                </h3>
                <p className="opacity-85 mt-2">A quick intro call can help us map the right next step.</p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
                >
                  Schedule a Discovery Call →
                </a>
              </div>
            </div>
            <MobileSectionFooter baseId="contact" />
          </section>

          <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

          {/* Testimonials (2 + Show All / Show Less) */}
          <section id={toMobile("testimonials")} className="scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">Testimonials</p>
            <h2 className="font-serif text-3xl opacity-95 text-center">What Clients and Partners Say</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />

            <div className="flex flex-col gap-6">
              {[
                {
                  q: "I found Dr. Salerno to be very well-versed in the subject matter. He definitely helped us grow and I genuinely appreciated his excellence.",
                  a: "Client at New York University",
                  lq: "-left-4 -top-1",
                  rq: "right-[2.5rem] bottom-[0.5rem]",
                },
                {
                  q: "Dr. Salerno is an expert in mental health equity research, highly skilled and incorporates attention to community priorities.",
                  a: "Client at University of California, Los Angeles",
                  lq: "-left-4 -top-1",
                  rq: "right-[7rem] bottom-[0.5rem]",
                },
              ].map((t, idx) => (
                <figure key={idx} className="relative w-full rounded-xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
                  <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                  <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                    <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.lq}`}>“</span>
                    <p>{t.q}</p>
                    <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.rq}`}>”</span>
                  </blockquote>
                  <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">— {t.a}</figcaption>
                </figure>
              ))}

              <div className={showAllTestimonials ? "flex flex-col gap-6" : "hidden"}>
                {[
                  {
                    q: "Dr. Salerno has a strong command of various research methods and an undeniable passion for his work in the public health sphere.",
                    a: "Client at Columbia University",
                    lq: "-left-3 -top-2",
                    rq: "right-[6rem] bottom-[0.5rem]",
                  },
                  {
                    q: "Dr. Salerno is incredibly intelligent and insightful with a deep, nuanced understanding of and appreciation for research.",
                    a: "Client at Columbia University",
                    lq: "-left-4 -top-1",
                    rq: "right-[8.5rem] bottom-[0.5rem]",
                  },
                ].map((t, idx) => (
                  <figure key={`more-${idx}`} className="relative w-full rounded-xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
                    <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                    <blockquote className="font-serif text-2xl leading-snug opacity-90 relative">
                      <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.lq}`}>“</span>
                      <p>{t.q}</p>
                      <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.rq}`}>”</span>
                    </blockquote>
                    <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">— {t.a}</figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setShowAllTestimonials((s) => !s)}
                  aria-expanded={showAllTestimonials}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-teal-800 text-[var(--color-cream)] px-5 py-3 text-[14px] font-semibold tracking-wide transition hover:bg-teal-700 active:translate-y-[1px]"
                >
                  {showAllTestimonials ? "Show Less" : "Show All"}
                </button>
              </div>
            </div>

            <MobileSectionFooter baseId="testimonials" />
          </section>
        </div>
      </div>

      {/* ============== DESKTOP (unchanged content & spacing) ============== */}
      <div className="hidden md:block" aria-label="Consulting desktop layout">
        {/* HERO */}
        <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-10 text-center">
          <h1 className="font-serif text-[clamp(34px,4.5vw,52px)] leading-[1.06] opacity-95">
            Consulting with Dr. Salerno
          </h1>
          <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />
          <p className="text-xl opacity-85 max-w-[780px] mx-auto mt-12 leading-relaxed">
            Evidence-based consulting that helps organizations design, evaluate, and scale
            strategies to strengthen mental health, wellbeing, resilience, and growth.
          </p>
        </section>

        {/* DESKTOP NAV (centered; targets desktop IDs only) */}
        <nav className="sticky top-8 z-30">
          <div className="mx-auto max-w-[1100px] px-6">
            <div className="rounded-xl bg-[var(--color-teal-850)]/80 ring-1 ring-white/10">
              <div className="flex flex-wrap items-center justify-center gap-2 px-3 py-3">
                {SECTIONS.map((s) => {
                  const active = activeId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => jump(s.id)}
                      aria-current={active ? "true" : "false"}
                      className={[
                        "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition",
                        active
                          ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-black shadow-sm"
                          : "border-white/20 bg-white/5 text-[var(--color-cream)] hover:bg-white/10",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* contained divider same width as nav */}
            <div className="mt-3 h-px w-full bg-[var(--color-cream)]/15" />
          </div>
        </nav>

        {/* DESKTOP SECTIONS (unchanged) */}
        <section id="approach" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Philosophy</p>
          <h2 className="font-serif text-4xl opacity-95">My Approach</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
          <p className="text-lg opacity-90 leading-loose mb-6 max-w-3xl">
            I work with organizations committed to fostering wellbeing and sustainable impact.
            Each partnership is tailored to the unique needs, context, and goals of the people it serves.
          </p>
          <p className="text-lg opacity-90 leading-loose max-w-3xl">
            I bridge <span className="font-semibold">science</span> and{" "}
            <span className="font-semibold">growth wisdom</span> to help organizations build
            effective, culturally grounded, and sustainable wellbeing strategies. With expertise
            working with diverse populations, my work centers equity, inclusivity, and
            real-world relevance.
          </p>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="pillars" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Services</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95">Service Pillars</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* cards unchanged; include backdrop-blur on desktop only */}
            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-2xl mb-2">Partner in Research</h3>
              <p className="opacity-90 leading-relaxed mb-3">
                Partner with a federally-funded scientist across all phases of programming and research—bringing credibility and depth to your initiatives.
              </p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Start a research partnership →</a>
            </article>

            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-2xl mb-2">Design with Science</h3>
              <p className="opacity-90 leading-relaxed mb-3">
                Translate cutting-edge research into programs that resonate with your organization or community.
                Evidence-based, culturally responsive, and operationally practical.
              </p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Co-design a program →</a>
            </article>

            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-2xl mb-2">Evaluate What Works</h3>
              <p className="opacity-90 leading-relaxed mb-3">
                Build confidence that your program delivers real impact through rigorous
                evaluation and research design, logic models, measurement plans, and advanced analyses
                tied to outcomes.
              </p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Co-construct an evaluation →</a>
            </article>

            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-2xl mb-2">Scale Across Your Organization</h3>
              <p className="opacity-90 leading-relaxed mb-3">
                Strengthen and integrate organizational programs that foster mental health, resilience, and wellbeing — from mindfulness and stress management to practices that support sustainable growth.
              </p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Scale wellness and resilience →</a>
            </article>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="process" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Process</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95">How We Work Together</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
          <p className="opacity-85 max-w-3xl mb-10 leading-relaxed">
            Every engagement begins with <span className="font-semibold">Discovery</span>. From there, we co-create a pathway
            that may include program design, implementation, evaluation, and/or scaling—depending on your organization’s priorities.
          </p>

          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm text-center mb-10">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
            <h3 className="font-serif text-2xl mb-2">Discovery</h3>
            <p className="opacity-90 leading-relaxed">
              Understand your goals, challenges, stakeholders, and context—laying the foundation for success.
            </p>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              ["Co-Design", "Develop tailored, evidence-based strategies that fit your organization’s unique needs and context."],
              ["Implementation", "Support program rollout with facilitator toolkits, trainings, and change-management resources."],
              ["Evaluation", "Measure program outcomes, refine designs, and assess true organizational-level impact."],
              ["Scaling", "Expand programming more widely to increase reach and impact across your organization."],
            ].map(([title, text]) => (
              <article key={title} className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm hover:bg-white/[0.06] transition">
                <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                <h3 className="font-serif text-xl mb-2">{title}</h3>
                <p className="opacity-90 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="results" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Results</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95">What Partners Will Achieve</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg opacity-90">
            <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔</span><span>Higher program engagement and follow-through</span></li>
            <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔</span><span>Noticeable and meaningful reductions in stress and burnout</span></li>
            <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔</span><span>Stronger cultures of mindfulness, resilience, and wellbeing</span></li>
            <li className="flex gap-2"><span className="text-[var(--color-gold)]">✔</span><span>Practical tools that support growth across teams/communities</span></li>
          </ul>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="who-i-work-with" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Who I Work With</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95">Organization Partnerships</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
          <p className="text-base md:text-lg opacity-85 leading-relaxed max-w-3xl mb-6">
            I collaborate with organizations that want to weave mental health, resilience, and wellbeing
            into the heart of their culture. From small organizations to global institutions, I help teams and
            communities strengthen connection, reduce burnout, and create environments where people can thrive.
          </p>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-base opacity-90">
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Organizations that prioritize mental health, resilience, &amp; growth.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Institutions seeking to build cultures of mindfulness &amp; wellbeing.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Agencies that want to reduce burnout and strengthen connection.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" /><span>Partners interested in blending science with wellness practices.</span></li>
            </ul>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="packages" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Ways to Partner</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95">Choose the Partnership That Fits</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-xl mb-2">Short Sprints</h3>
              <p className="opacity-90 leading-relaxed mb-3">2–6 weeks to quickly understand needs, run listening sessions, and surface actionable insights—so you can make a confident next step.</p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Start a Sprint →</a>
            </article>
            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-xl mb-2">Deep Partnerships</h3>
              <p className="opacity-90 leading-relaxed mb-3">3–12 months to co-design programs, support implementation, and learn as you go— grounding decisions in evidence while staying human-centered.</p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Explore a Partnership →</a>
            </article>
            <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:-translate-y-[2px] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
              <h3 className="font-serif text-xl mb-2">Ongoing Support</h3>
              <p className="opacity-90 leading-relaxed mb-3">Monthly or quarterly check-ins, trainings, and refreshers to sustain momentum, reduce burnout, and keep wellbeing practices alive across teams.</p>
              <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">Set Up Support →</a>
            </article>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="contact" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">Contact</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">Ready to Talk?</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-4 rounded" />
          <p className="text-base md:text-lg opacity-85 text-center max-w-[800px] mx-auto mb-8 leading-relaxed">
            Book a brief discovery call to discuss goals, scope, and timelines. We’ll identify where science-backed
            strategies can create the greatest impact for your team or community.
          </p>
          <div className="relative overflow-hidden rounded-2xl bg-white/4 ring-1 ring-white/15 p-9 shadow-2xl backdrop-blur-sm">
            <div className="relative text-center">
              <h3 className="font-serif text-3xl opacity-95">Ready to strengthen your programs with science-backed consulting?</h3>
              <p className="opacity-85 mt-2">A quick intro call can help us map the right next step.</p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:shadow-lg hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
              >
                Schedule a Discovery Call →
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1100px] px-6"><div className="h-px w-full bg-[var(--color-cream)]/15" /></div>

        <section id="testimonials" className="scroll-mt-32 mx-auto max-w-[1100px] px-6 py-16">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">What Clients and Partners Say</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                q: "I found Dr. Salerno to be very well-versed in the subject matter. He definitely helped us grow and I genuinely appreciated his excellence.",
                a: "Client at New York University",
                lq: "-left-4 -top-1",
                rq: "right-[2.5rem] bottom-[0.5rem]",
              },
              {
                q: "Dr. Salerno is an expert in mental health equity research, highly skilled and incorporates attention to community priorities.",
                a: "Client at University of California, Los Angeles",
                lq: "-left-4 -top-1",
                rq: "right-[7rem] bottom-[0.5rem]",
              },
              {
                q: "Dr. Salerno has a strong command of various research methods and an undeniable passion for his work in the public health sphere.",
                a: "Client at Columbia University",
                lq: "-left-3 -top-2",
                rq: "right-[6rem] bottom-[0.5rem]",
              },
              {
                q: "Dr. Salerno is incredibly intelligent and insightful with a deep, nuanced understanding of and appreciation for research.",
                a: "Client at Columbia University",
                lq: "-left-4 -top-1",
                rq: "right-[8.5rem] bottom-[0.5rem]",
              },
            ].map((t, idx) => (
              <figure key={idx} className="relative w-full rounded-xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
                <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-l-2xl" />
                <blockquote className="font-serif text-2xl leading-relaxed opacity-90 relative">
                  <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.lq || "-left-4 -top-1"}`}>“</span>
                  <p>{t.q}</p>
                  <span aria-hidden className={`absolute text-4xl opacity-20 select-none ${t.rq || "right-[2rem] bottom-[0.5rem]"}`}>”</span>
                </blockquote>
                <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">— {t.a}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Consulting with Dr. Juan Pablo Salerno",
            areaServed: "US",
            serviceType: ["Program Evaluation", "Intervention Design", "Workplace Wellbeing"],
            url: "https://your-domain.com/consulting",
          }),
        }}
      />

      {/* Global crisp text & iOS guard (same as your other pages) */}
      <style jsx global>{`
        @supports (-webkit-touch-callout: none) {
          html, body { background: var(--color-teal-850) !important; }
        }
        .zoomwrap,
        .zoomwrap * {
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }
        @media (max-width: 767px) {
          ul li > span:first-child {
            color: var(--color-gold) !important;
            -webkit-text-fill-color: var(--color-gold) !important;
            font-weight: 700;
          }
        }
      `}</style>
    </main>
  );
}
