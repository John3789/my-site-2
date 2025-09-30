"use client";

import { useEffect, useRef, useState } from "react";

export default function SpeakingPage() {
  // ---- Video ready/fade-in handling ----
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay, { once: true });

    return () => {
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)]">
      {/* ===== HERO VIDEO with overlay text ===== */}
      <section className="relative w-full">
        {/* black backdrop so there’s never a green flash */}
        <div className="relative h-[70vh] bg-black">
          {/* Poster as an instant background layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url(/speaking-hero-poster.jpg)" }}
          />

    <video
  playsInline
  muted
  autoPlay
  loop
  preload="auto"
  className="absolute inset-0 h-full w-full object-cover object-[50%_38%]"
>
  <source src="/hero40.mp4" type="video/mp4" />
</video>

          {/* Overlay headline + subheadline + vignette */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/45" />
            <div className="relative px-6">
              <h1 className="font-serif text-5xl md:text-6xl opacity-95 drop-shadow-lg">
                Speaking
              </h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/85 mx-auto mt-4 mb-3 rounded" />
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto drop-shadow-md">
                Science-backed, story-driven talks that spark resilience,
                growth, and lasting changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Intro Blurb ===== */}
      <section className="relative w-full py-16">
        {/* subtle hairline divider from hero */}
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-cream)]/15" />
        <div className="mx-auto max-w-[1000px] px-6 text-left space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl opacity-90 text-center font-semibold tracking-wide">
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
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="mx-auto max-w-[1400px] py-14 space-y-24" id="topics">
        <hr className="border-t opacity-70 border-cream mb-8 w-full" />

        {/* Popular Topics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mx-15">
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
                  <span className="text-[var(--color-gold)]">Leveling-Up Mindset &amp; Growth</span>
                </h3>
                <ul className="text-lg opacity-90 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Transforming Your Mindset to Achieve Your Goals</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Strengthening Personal and Professional Resilience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Overcoming Imposter Syndrome and Unlocking Self-Confidence</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Using Visualization and Affirmations to Achieve Your Goals</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Practicing Meditation to Level-Up Your Life</span>
                  </li>
                </ul>
              </div>

              {/* Strengthening Mental Health and Wellbeing */}
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  <span className="text-[var(--color-gold)]">Strengthening Mental Health &amp; Wellbeing</span>
                </h3>
                <ul className="text-lg opacity-90 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Everyday Strategies to Improve Mental Health</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Work-Life Balance: Tools for Success and Fulfillment</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Science-Backed Practices for Stress Reduction</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Burnout Prevention and Recovery: Protect Your Health</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Gratitude, Self-Compassion, and Altruism for Wellbeing</span>
                  </li>
                </ul>
              </div>

              {/* Performance & Potential */}
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  <span className="text-[var(--color-gold)]">Boosting Performance &amp; Potential</span>
                </h3>
                <ul className="text-lg opacity-90 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Harnessing Motivation &amp; Emotional Intelligence for Success</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Unlocking Creativity and Flow States for Excellence</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Energy Management for Peak Performance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Power of Micro-Habits for Lasting Growth</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Building Grit and Perseverance for Long-Term Goals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quotes (left column) */}
          <div className="lg:col-span-7 ml-auto flex flex-col gap-6 max-w-[640px]">
            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-5 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              {/* Decorative quotes (no normal quotes in text) */}
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...an exceptional speaker: he is engaging, well-spoken, and clearly passionate about his work.</p>
                <span aria-hidden className="absolute right-4 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, American Public Health Association Annual Meeting &amp; Expo
              </figcaption>
            </figure>

            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>He communicates with clarity and confidence...leaves a lasting impression.</p>
                <span aria-hidden className="absolute right-24 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
              </figcaption>
            </figure>

            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>Dr. Salerno has a way of blending data with human stories that makes science resonate.</p>
                <span aria-hidden className="absolute right-14 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, National Hispanic Science Network Annual International Conference
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Dr. Salerno Offers */}
        <hr className="border-t opacity-70 border-cream mb-8 w-full" />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-0 mx-15 items-center">
          {/* Quotes (RIGHT column) */}
          <div className="lg:col-span-7 flex flex-col gap-6 max-w-[640px] lg:pr-6">
            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-5 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...gifted speaker whose engaging style &amp; clear communication bring complex ideas to life.</p>
                <span aria-hidden className="absolute right-6 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, Columbia University
              </figcaption>
            </figure>

            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...can communicate with diverse audiences, speaks with heart and dimensionality.</p>
                <span aria-hidden className="absolute right-23 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, Society of Behavioral Medicine Annual Meeting
              </figcaption>
            </figure>

            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...consistently stands out...focused and dynamic...maintains audience attention...</p>
                <span aria-hidden className="absolute right-13 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, Society for Prevention Research Annual Meeting
              </figcaption>
            </figure>
          </div>

          {/* Formats */}
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

        {/* Outcomes (bulleted) */}
        <hr className="border-t opacity-70 border-cream mb-8 w-full" />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mx-15 items-start">
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
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Building resilient habits</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Regulating stress effectively</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Deepening focus through meditation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Strengthening relationships and connection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Aligning work and life with higher purpose</span>
              </li>
            </ul>

            <p className="text-lg opacity-90 mt-6">
              Every talk is tailored to your audience’s unique needs and goals, ensuring
              lasting impact both personally and professionally.
            </p>
          </div>

          {/* Quotes (right column, Outcomes) */}
          <div className="lg:col-span-7 ml-auto flex flex-col gap-6 max-w-[640px]">
            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...engaging, energetic, strong communication skills, proven ability to disseminate science.</p>
                <span aria-hidden className="absolute right-13 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, University of Central Florida
              </figcaption>
            </figure>

            <figure className="relative w-full rounded-xl bg-white/5 p-8 mt-10 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm hover:bg-white/[0.06] transition">
              <span aria-hidden className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/70 rounded-r" />
              <blockquote className="font-serif text-2xl md:text-3xl leading-snug opacity-90 relative">
                <span aria-hidden className="absolute -left-3 -top-1 text-4xl opacity-20 select-none">“</span>
                <p>...a highly engaging, knowledgeable, and skilled speaker...strongly recommended.</p>
                <span aria-hidden className="absolute right-44 bottom-5 text-4xl opacity-20 select-none">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[12px] uppercase tracking-[0.18em] opacity-80">
                — <span className="text-[var(--color-gold)]">Audience member</span>, University of California, Los Angeles
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                       font-semibold uppercase tracking-wide text-sm shadow-md
                       transition will-change-transform
                       hover:shadow-lg hover:-translate-y-[2px]
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
          >
            Book Dr. Salerno to Speak
          </a>
        </div>
      </div>
    </main>
  );
}
