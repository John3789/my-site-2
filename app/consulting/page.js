export default function ConsultingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      {/* ===== HERO / TITLE ===== */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16 md:pt-20 pb-10 text-center">
        <h1 className="font-serif text-[clamp(34px,4.5vw,52px)] leading-[1.06] opacity-95">
          Consulting with Dr. Juan Pablo Salerno
          <sup className="text-base align-super opacity-80">™</sup>
        </h1>
        <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />

        <p className="text-lg md:text-xl opacity-90 max-w-[880px] mx-auto mt-6">
          Evidence-based consulting for mental health, resilience, and growth—designed to deliver
          measurable outcomes and lasting impact.
        </p>

        <p className="text-base md:text-lg opacity-85 max-w-[880px] mx-auto mt-3">
          Partnering with nonprofits, schools, healthcare systems, and companies to design, evaluate,
          and scale wellbeing strategies that work in the real world.
        </p>
      </section>

      {/* subtle divider */}
      <div className="h-px w-full bg-[var(--color-cream)]/15" />

      {/* ===== SERVICE PILLARS ===== */}
      <section className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Services</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95">Service Pillars</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
          {/* Card */}
           <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Partner in Research</h3>
            <p className="opacity-90 leading-relaxed">
              Work with an NIH-funded scientist to co-create studies, publish findings, and unlock
              funding opportunities—bringing credibility and depth to your initiatives.
            </p>
          </article>
                    <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Design with Science</h3>
            <p className="opacity-90 leading-relaxed">
              Translate cutting-edge research into interventions that resonate with your community.
              Evidence-based, culturally responsive, and operationally practical.
            </p>
          </article>
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Evaluate What Works</h3>
            <p className="opacity-90 leading-relaxed">
              Build confidence that your mental health program delivers real impact through rigorous
              evaluation and research design—logic models, measurement plans, and advanced analyses
              tied to outcomes that matter.
            </p>
          </article>
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Scale Resilience</h3>
            <p className="opacity-90 leading-relaxed">
              Strengthen organizations through strategies that improve wellbeing and reduce burnout:
              mindfulness, resilience training, habit design, and manager toolkits aligned to KPIs.
            </p>
          </article>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="mx-auto max-w-[1100px] px-6 pb-6 md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl opacity-95">My Approach</h2>
            <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
            <p className="text-lg opacity-90 leading-loose">
              I bridge <span className="font-semibold">science</span> and{" "}
              <span className="font-semibold">growth wisdom</span> to help organizations build
              effective, culturally grounded, and sustainable wellbeing strategies. With expertise
              working with diverse populations, my work centers equity, inclusivity, and
              real-world relevance.
            </p>
          </div>

          {/* Who I work with (simple “logos” row you can replace later) */}
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Who I Work With</p>
            <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5 shadow-2xl">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm opacity-85">
                <li>Universities</li>
                <li>School Districts</li>
                <li>Hospitals/Health Systems</li>
                <li>Public Health Depts</li>
                <li>Nonprofits</li>
                <li>Foundations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* subtle divider */}
      <div className="h-px w-full bg-[var(--color-cream)]/15" />

      {/* ===== PROCESS (TIMELINE) ===== */}
      <section className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Process</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95">How We Work</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

        <ol className="relative grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* vertical line on mobile / hidden on md+ */}
          <span aria-hidden className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-[var(--color-cream)]/20" />
          {[
            {
              n: 1,
              t: "Discovery",
              d: "Understand your goals, challenges, stakeholders, and context.",
            },
            {
              n: 2,
              t: "Co-Design",
              d: "Develop tailored, evidence-based strategies with your team.",
            },
            {
              n: 3,
              t: "Implementation",
              d: "Support rollout with tools, trainings, and evaluation plans.",
            },
            {
              n: 4,
              t: "Evaluation & Scaling",
              d: "Measure outcomes, refine programs, and expand what works.",
            },
          ].map((step) => (
            <li
              key={step.n}
              className="relative rounded-xl bg-white/4 ring-1 ring-white/10 p-5 md:p-6 shadow-xl"
            >
              {/* number badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-black font-semibold">
                  {step.n}
                </span>
                <h3 className="font-serif text-xl md:text-2xl">{step.t}</h3>
              </div>
              <p className="opacity-90 leading-relaxed mt-3">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="mx-auto max-w-[1100px] px-6 pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[var(--color-teal-800)] ring-1 ring-white/10 p-7 md:p-9 shadow-2xl">
          <span aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-gold)]/0 blur-2xl" />
          <div className="relative">
            <h3 className="font-serif text-2xl md:text-3xl opacity-95">
              Ready to strengthen your programs with science-backed consulting?
            </h3>
            <p className="opacity-85 mt-2">
              Book a brief discovery call to discuss goals, scope, and timelines.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                         font-semibold uppercase tracking-wide text-sm shadow-md
                         transition will-change-transform
                         hover:shadow-lg hover:-translate-y-[2px]
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
            >
              Schedule a Discovery Call →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
