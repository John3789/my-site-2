// app/speaking/page.js
export default function SpeakingPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-800)]">
   {/* ===== HERO VIDEO with overlay text ===== */}
<section className="relative w-full">
  <div className="relative h-[70vh]">
    <video
      playsInline
      muted
      autoPlay
      loop
      poster="/speaking-hero-poster.jpg"
      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
    >
      <source src="/speaking-hero.mp4" type="video/mp4" />
    </video>

    {/* Overlay headline + subheadline */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/30 pointer-events-none">
      <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">
        Speaking
      </h1>
      <p className="text-lg md:text-xl max-w-3xl drop-shadow-md">
        Science-backed, story-driven talks that spark resilience,
        growth, and lasting change.
      </p>
    </div>
  </div>
</section>



      {/* ===== Intro Blurb ===== */}
      <section className="relative w-full py-16">
        <div className="mx-auto max-w-[900px] px-6 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-wide">
            Engaging. Inspiring. Transformational.
          </h2>

          <div className="space-y-6 text-lg md:text-xl leading-loose">
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
              Presentations typically run about an hour and can be delivered
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
      <div className="mx-auto max-w-[1400px] px-6 py-24 space-y-24" id="topics">
        {/* Popular Topics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:py-6">
            <h2 className="font-serif text-4xl mb-8">Popular Topics</h2>

            <div className="space-y-10">
              {/* Mindset & Growth */}
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  <span className="text-[var(--color-gold)]">Mindset &amp; Growth</span>
                </h3>
                <ul className="text-lg space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Transforming Your Mindset to Achieve Your Goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Building Personal and Professional Resilience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Overcoming Imposter Syndrome and Building Self-Confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Using Visualization and Affirmations to Achieve Your Goals</span>
                  </li>
                </ul>
              </div>

              {/* Science of Wellbeing */}
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  <span className="text-[var(--color-gold)]">Science of Wellbeing</span>
                </h3>
                <ul className="text-lg space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Science of Happiness: Tips for a Fulfilling Life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Science of Gratitude and Its Impact on Mental Health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Science of Self-Compassion: Impact on Mental Health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Science of Altruism to Enhance Your Own Wellbeing</span>
                  </li>
                </ul>
              </div>

              {/* Health & Balance */}
              <div>
                <h3 className="font-serif text-2xl mb-2">
                  <span className="text-[var(--color-gold)]">Health &amp; Balance</span>
                </h3>
                <ul className="text-lg space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Promoting Mental Health Within and Beyond</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Work-Life Balance: Strategies for Success and Fulfillment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>Science-Backed Strategies for Stress and Mental Health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Impact of Nature on Mental Health and Wellbeing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-gold)]">✔</span>
                    <span>The Science of Mindful Technology Use for Mental Health</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <img
              src="/speaking1.jpg"
              alt="Dr. Salerno presenting on stage"
              className="w-full h-[520px] object-cover shadow-2xl mt-15"
            />
          </div>
        </section>

        {/* Dr. Salerno Offers */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex justify-center items-center">
            <img
              src="/speaking2.jpg"
              alt="Workshop with audience"
              className="w-full h-[520px] object-cover shadow-2xl mt-15"
            />
          </div>

          {/* Formats */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:py-6 space-y-8">
            <h2 className="font-serif text-4xl mb-8">Dr. Salerno Offers</h2>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Keynotes</span>
              </h3>
              <p className="text-lg leading-loose">
                High-energy, story-driven talks with evidence-based takeaways.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Workshops</span>
              </h3>
              <p className="text-lg leading-loose">
                Interactive sessions with exercises, tools, and live Q&amp;A.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Panels</span>
              </h3>
              <p className="text-lg leading-loose">
                Multi-speaker discussions designed to bring diverse perspectives to key topics
                in mental health, resilience, and personal growth.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Fireside Chats</span>
              </h3>
              <p className="text-lg leading-loose">
                A relaxed, conversational format with a moderator that blends storytelling
                and audience connection for an intimate, authentic experience.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Moderated Discussions</span>
              </h3>
              <p className="text-lg leading-loose">
                Thoughtful facilitation of complex conversations that spark insight,
                learning, and connection among participants.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl mb-2">
                <span className="text-[var(--color-gold)]">Virtual Talks &amp; Webinars</span>
              </h3>
              <p className="text-lg leading-loose">
                Accessible online sessions that bring science-backed strategies and personal
                growth tools to audiences worldwide—ideal for remote or global teams.
              </p>
            </div>
          </div>
        </section>

        {/* Outcomes (bulleted) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:py-6">
            <h2 className="font-serif text-4xl mb-6">Outcomes</h2>
            <p className="text-lg mb-6">
              Audiences leave with clarity, confidence, and actionable strategies they can
              apply immediately. Key outcomes include:
            </p>
            <ul className="text-lg space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Building resilient habits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Regulating stress effectively</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Deepening focus through meditation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Strengthening relationships and connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)]">✔</span>
                <span>Aligning work and life with higher purpose</span>
              </li>
            </ul>

            <p className="text-lg mt-6">
              Every talk is tailored to your audience’s unique needs and goals, ensuring
              lasting impact both personally and professionally.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <img
                src="/speaking3.jpg"
                alt="Audience engagement"
                className="w-full h-[520px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Book Dr. Salerno to Speak
          </a>
        </div>
      </div>
    </main>
  );
}
