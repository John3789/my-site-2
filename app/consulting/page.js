export default function ConsultingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
      {/* ===== HERO / TITLE ===== */}
      <section className="mx-auto max-w-[1100px] px-6 pt-16 md:pt-20 pb-10 text-center">
        <h1 className="font-serif text-[clamp(34px,4.5vw,52px)] leading-[1.06] opacity-95">
          Consulting with Dr. Salerno
        </h1>
        {/* shorter, centered gold hairline only */}
        <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 rounded" />

        <p className="text-lg md:text-xl opacity-85 max-w-[780px] mx-auto mt-12 leading-relaxed">
          Evidence-based consulting that helps organizations design, evaluate, and scale
          strategies to strengthen mental health, wellbeing, resilience, and growth.
        </p>
</section>

      {/* === LOCAL SUBNAV === */}
      <nav className="sticky top-8 z-20 mx-auto max-w-[1100px] px-6 mt-2 mb-4">
        <ul className="flex flex-wrap gap-3 justify-center text-[12px] uppercase tracking-[0.14em] opacity-85">
          {[
            { href: "#approach", label: "Approach" },
            { href: "#pillars", label: "Services" },
            { href: "#process", label: "Process" },
            { href: "#results", label: "Results" },
            { href: "#who-i-work-with", label: "Who I Work With" },
            { href: "#packages", label: "Ways to Partner" },
            { href: "#contact", label: "Contact" },
            { href: "#testimonials", label: "Testimonials" }, // <-- added

          ].map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/[0.08] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/40"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== APPROACH ===== */}
      <section id="approach" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Philosophy</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95">My Approach</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-6 rounded" />
        <p className="text-lg md:text-lg opacity-90 leading-loose mb-6 max-w-3xl">
          I work with organizations committed to fostering wellbeing and sustainable impact.
          Each partnership is tailored to the unique needs, context, and goals of the people it serves.
        </p>
        <p className="text-base md:text-lg opacity-90 leading-loose max-w-3xl">
          I bridge <span className="font-semibold">science</span> and{" "}
          <span className="font-semibold">growth wisdom</span> to help organizations build
          effective, culturally grounded, and sustainable wellbeing strategies. With expertise
          working with diverse populations, my work centers equity, inclusivity, and
          real-world relevance.
        </p>
      </section>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== SERVICE PILLARS ===== */}
      <section id="pillars" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Services</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95">Service Pillars</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
          {/* Partner in Research */}
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Partner in Research</h3>
            <p className="opacity-90 leading-relaxed mb-3">
              Partner with a federally-funded scientist across all phases of programming and research—bringing credibility and depth to your initiatives.
            </p>
            <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
              Start a research partnership →
            </a>
          </article>

          {/* Design with Science */}
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Design with Science</h3>
            <p className="opacity-90 leading-relaxed mb-3">
              Translate cutting-edge research into programs that resonate with your organization or community.
              Evidence-based, culturally responsive, and operationally practical.
            </p>
            <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
              Co-design a program →
            </a>
          </article>

          {/* Evaluate What Works */}
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Evaluate What Works</h3>
            <p className="opacity-90 leading-relaxed mb-3">
              Build confidence that your program delivers real impact through rigorous
              evaluation and research design, logic models, measurement plans, and advanced analyses
              tied to outcomes.
            </p>
            <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
              Co-construct an evaluation →
            </a>
          </article>

          {/* Scale Resilience */}
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-2xl mb-2">Scale Across Your Organization</h3>
            <p className="opacity-90 leading-relaxed mb-3">
Strengthen and integrate organizational programs that foster mental health, resilience, and wellbeing — from mindfulness and stress management to practices that support sustainable growth.
            </p>
            <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
              Scale wellness and resilience →
            </a>
          </article>
        </div>
      </section>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== PROCESS (FLEXIBLE MODEL) ===== */}
      <section id="process" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Process</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95">How We Work Together</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

        <p className="opacity-85 max-w-3xl mb-10 leading-relaxed">
          Every engagement begins with <span className="font-semibold">Discovery</span>. From there, we co-create a pathway
          that may include program design, implementation, evaluation, and/or scaling—depending on your organization’s priorities.
        </p>

        {/* Discovery anchor */}
        <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm text-center mb-10">
          <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
          <h3 className="font-serif text-2xl mb-2">Discovery</h3>
          <p className="opacity-90 leading-relaxed">
            Understand your goals, challenges, stakeholders, and context—laying the foundation for success.
          </p>
        </article>

        {/* Modular follow-up options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-xl mb-2">Co-Design</h3>
            <p className="opacity-90 leading-relaxed">
              Develop tailored, evidence-based strategies that fit your organization’s unique needs and context.
            </p>
          </article>

          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-xl mb-2">Implementation</h3>
            <p className="opacity-90 leading-relaxed">
              Support program rollout with facilitator toolkits, trainings, and change-management resources.
            </p>
          </article>

          <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-xl mb-2">Evaluation</h3>
            <p className="opacity-90 leading-relaxed">
              Measure program outcomes, refine designs, and assess true organizational-level impact.
            </p>
          </article>
                    <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-xl backdrop-blur-sm hover:bg-white/[0.06] transition">
            <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
            <h3 className="font-serif text-xl mb-2">Scaling</h3>
            <p className="opacity-90 leading-relaxed">
              Expand programming more widely to increase reach and impact across your organization.
            </p>
          </article>
        </div>
      </section>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== RESULTS ===== */}
      <section id="results" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
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

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== WHO I WORK WITH ===== */}
      <section id="who-i-work-with" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
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
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" />
              <span>Organizations that prioritize mental health, resilience, &amp; growth.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" />
              <span>Institutions seeking to build cultures of mindfulness &amp; wellbeing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" />
              <span>Agencies that want to reduce burnout and strengthen connection.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-gold)] shrink-0" />
              <span>Partners interested in blending science with wellness practices.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== WAYS TO PARTNER ===== */}
<section id="packages" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 mb-2">Ways to Partner</p>
  <h2 className="font-serif text-3xl md:text-4xl opacity-95">Choose the Partnership That Fits</h2>
  <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-8 rounded" />

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Short Sprints */}
    <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
      <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
      <h3 className="font-serif text-xl mb-2">Short Sprints</h3>
      <p className="opacity-90 leading-relaxed mb-3">
        2–6 weeks to quickly understand needs, run listening sessions, and surface
        actionable insights—so you can make a confident next step.
      </p>
      <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
        Start a Sprint →
      </a>
    </article>

    {/* Deep Partnerships */}
    <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
      <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
      <h3 className="font-serif text-xl mb-2">Deep Partnerships</h3>
      <p className="opacity-90 leading-relaxed mb-3">
        3–12 months to co-design programs, support implementation, and learn as you go—
        grounding decisions in evidence while staying human-centered.
      </p>
      <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
        Explore a Partnership →
      </a>
    </article>

    {/* Ongoing Support */}
    <article className="relative rounded-xl bg-white/5 ring-1 ring-white/10 p-6 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition">
      <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
      <h3 className="font-serif text-xl mb-2">Ongoing Support</h3>
      <p className="opacity-90 leading-relaxed mb-3">
        Monthly or quarterly check-ins, trainings, and refreshers to sustain momentum,
        reduce burnout, and keep wellbeing practices alive across teams.
      </p>
      <a href="/contact" className="text-sm underline underline-offset-4 decoration-[var(--color-gold)] hover:opacity-80">
        Set Up Support →
      </a>
    </article>
  </div>
</section>

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

      {/* ===== CONTACT / CTA BAND ===== */}
      <section id="contact" className="mx-auto max-w-[1100px] px-6 py-14 md:py-16">
        {/* Heading + hairline + subheading */}
        <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">Contact</p>
        <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">Ready to Talk?</h2>
        <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-4 rounded" />
        <p className="text-base md:text-lg opacity-85 text-center max-w-[800px] mx-auto mb-8 leading-relaxed">
          Book a brief discovery call to discuss goals, scope, and timelines. We’ll identify where science-backed
          strategies can create the greatest impact for your team or community.
        </p>

{/* Clean glass card (no gold tint, lighter look) */}
<div
  className="relative overflow-hidden rounded-2xl
             bg-white/4 ring-1 ring-white/15 p-7 md:p-9 shadow-2xl
             backdrop-blur-sm"
>
  <div className="relative text-center">
    <h3 className="font-serif text-2xl md:text-3xl opacity-95">
      Ready to strengthen your programs with science-backed consulting?
    </h3>
    <p className="opacity-85 mt-2">
      A quick intro call can help us map the right next step.
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

      {/* contained thin divider */}
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="h-px w-full bg-[var(--color-cream)]/15" />
      </div>

  {/* ===== TESTIMONIALS (customizable quotes + duplicate names ok) ===== */}
<section
  id="testimonials"
  className="scroll-mt-24 md:scroll-mt-28 mx-auto max-w-[1100px] px-6 py-14 md:py-16"
>
  <p className="text-[11px] uppercase tracking-[0.18em] opacity-60 text-center mb-2">
    Testimonials
  </p>
  <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">
    What Clients and Partners Say
  </h2>
  <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-8 rounded" />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {[
      {
        q: "I found Dr. Salerno to be very well-versed in the subject matter. He definitely helped us grow and I genuinely appreciated his excellence.",
        a: "Client at New York University",
        // left & right decorative quote positions (Tailwind utility classes)
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
        // duplicate attribution is fine now
        q: "Dr. Salerno is incredibly intelligent and insightful with a deep, nuanced understanding of and appreciation for research.",
        a: "Client at Columbia University", 
        lq: "-left-4 -top-1",
        rq: "right-[8.5rem] bottom-[0.5rem]",
      },
    ].map((t, idx) => (
      <figure
        key={idx} // use index so duplicate 'a' values are allowed
        className="relative w-full rounded-xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition"
      >
        <span
          aria-hidden
          className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r"
        />
        <blockquote className="font-serif text-xl md:text-2xl leading-relaxed opacity-90 relative">
          {/* LEFT DECORATIVE QUOTE — per-item position */}
          <span
            aria-hidden
            className={`absolute text-4xl opacity-20 select-none ${t.lq || "-left-4 -top-1"}`}
          >
            “
          </span>

          <p>{t.q}</p>

          {/* RIGHT DECORATIVE QUOTE — per-item position */}
          <span
            aria-hidden
            className={`absolute text-4xl opacity-20 select-none ${t.rq || "right-[2rem] bottom-[0.5rem]"}`}
          >
            ”
          </span>
        </blockquote>
        <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
          — {t.a}
        </figcaption>
      </figure>
    ))}
  </div>
</section>

      {/* JSON-LD (optional) */}
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
    </main>
  );
}
