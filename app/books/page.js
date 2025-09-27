export default function BooksPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">

      {/* Page title (centered across 1400px) */}
      <div className="mx-auto max-w-[1400px] px-6 pt-20">
        <h1 className="font-serif text-5xl opacity-90 mb-15 text-center">
          Books & Publications
        </h1>
      </div>

      {/* Intro + image */}
      <div className="mx-auto max-w-[1400px] px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column */}
        <div className="lg:col-span-7">
          <p className="text-lg opacity-90 max-w-3xl mb-8">
            Here you’ll find my published works, where science and personal growth come together.
            My research explores pathways to mental health, resilience, and wellbeing, with a
            focus on uplifting communities too often overlooked. Each piece reflects my belief
            that science should empower communities, inspire healing, and spark meaningful change.
          </p>

{/* Section: Featured Book */}
<section className="mb-12">
  <h2 className="font-serif text-4xl font-semibold opacity-90 mb-3 text-center">
    Featured Book → <span className="text-[var(--color-gold)]">Coming Soon</span>
  </h2>

  <p className="space-y-6 text-lg opacity-90 max-w-3xl mb-6 mx-auto text-left">
    A powerful blend of science and personal growth wisdom, this forthcoming
    book by Dr. Salerno offers an accessible, inspiring, and transformative
    framework for overcoming mental health struggles and living with greater
    purpose, balance, and fulfillment. Drawing from both rigorous research and
    lived experience, it bridges evidence-based insights with timeless
    practices for growth and healing.
  </p>

  {/* Waitlist link (centered in the left column) */}
  <div className="text-left">
    <a
      href="/waitlist"
      className="inline-block underline underline-offset-4 hover:opacity-80 transition mb-6"
    >
      Join the Waitlist →
    </a>
  </div>

  {/* Gold button (centered in the left column) */}
  <div className="flex justify-center">
    <a
      href="/contact"
      className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition mt-10"
    >
      Contact for Media & Speaking
    </a>
  </div>
</section>
        </div>

        

        {/* Right column image */}
        <div className="lg:col-span-5 flex justify-center mt-3">
          <img
            src="/award1.jpg"
            alt="Book or award"
            className="w-full max-w-md object-cover shadow-2xl square-md"
          />
        </div>
      </div>


      {/* Selected Publications */}
      <div className="mx-auto max-w-[1400px] px-6 pb-20">
        <h2 className="font-serif text-4xl mb-15 text-center">Selected Publications</h2>

        <div className="space-y-10">

    {/* CARD 1 */}
    <article className="w-full bg-white/5 rounded-xl shadow-2xl p-8 lg:p-10 relative">
      <div className="absolute left-0 top-1 h-118 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:w-1/3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-2xl mb-3">
            Advancing Mental Health Equity in Latinx &amp; Communities of Color
          </h3>
          <p className="text-lg opacity-90">
            Research uplifting Latinx communities and other people of color—centered on
            resilience, equity, and wellbeing.
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2024).
              <em> Mental Health Risk and Protection Among First-Generation Latinx Immigrant Youth: A Latent Profile Analysis.</em>
              <span className="italic"> Health Education &amp; Behavior.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2024).
              <em> Effects of Racist Microaggressions and Sexual and Gender Minority Stress on Mental Health Among Latinx LGBTQ+ Young Adults.</em>
              <span className="italic"> Health Education &amp; Behavior.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2023).
              <em> Profiles of Psychosocial Stressors and Buffers Among Latinx Immigrant Youth: Associations with Suicidality.</em>
              <span className="italic"> Psychiatry Research.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2023).
              <em> Impact of Racist Microaggressions and LGBTQ-Related Minority Stressors: Effects on Psychological Distress Among LGBTQ+ Young People of Color.</em>
              <span className="italic"> Preventing Chronic Disease.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2022).
              <em> The Impact of Family Rejection and Racism on Sexual and Gender Minority Stress Among LGBTQ Young People of Color During COVID-19.</em>
              <span className="italic"> Psychological Trauma.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
          </ul>
        </div>
      </div>
    </article>

    {/* CARD 2 */}
    <article className="w-full bg-white/5 rounded-xl shadow-2xl p-8 lg:p-10 relative">
      <div className="absolute left-0 top-1 h-118 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:w-1/3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-2xl mb-3">
            LGBTQ+ Youth: Stress, Resilience &amp; Wellbeing
          </h3>
          <p className="text-lg opacity-90">
            Scholarship on minority stress, coping, and growth among LGBTQ+ young people broadly.
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Colleagues &amp; Salerno (2024).
              <em> Mental Health Impact of Sexually Minoritized &amp; Gender Expansive Stressors Among LGBTQ+ Young Adults: A Latent Class Analysis</em>
              <span className="italic"> Epidemiology &amp; Psychiatric Sciences.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Colleagues &amp; Salerno (2022).
              <em> Associations Between Living Arrangement &amp; Sexual &amp; Gender Minority Stressors Among University Students Since the Onset of COVID-19.</em>
              <span className="italic"> Journal of American College Health.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2022).
              <em> LGBTQ Identity-Related Victimization During COVID-19 is Associaed with Moderate to Severe Psychological Distress Among Young Adults.</em>
              <span className="italic"> LGBT Health.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2021).
              <em> Changes in Mental Health &amp; Wellbeing Are Associated with Parental Living Arrangements During COVID-19 Among Sexual Minority Young Persons.</em>
              <span className="italic"> Psych. of Sexual Orie. &amp; Gender Div.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2021).
              <em> Changes in Alcohol Use Since the Onset of COVID-19 Are Associated With Psychological Distress Among U.S. Sexual &amp; Gender Minority University Students.</em>
              <span className="italic"> Drug &amp; Alcohol Depend.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
          </ul>
        </div>
      </div>
    </article>

    {/* CARD 3 */}
    <article className="w-full bg-white/5 rounded-xl shadow-2xl p-8 lg:p-10 relative">
      <div className="absolute left-0 top-1 h-66 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:w-1/3">
          <p className="text-xs uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-2xl mb-3">
            Prevention, Resilience &amp; Mental Health Promotion
          </h3>
          <p className="text-lg opacity-90">
            Broader work on prevention and pathways that support youth mental health and growth.
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno (2016).
              <em> Effectiveness of Universal School-Based Mental Health Awareness Programs Among Youth in the U.S.: A Systematic Review.</em>
              <span className="italic"> Journal of School Health.</span>
              {" "}
              <a href="#" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
          </ul>
        </div>
      </div>
    </article>

  </div>
</div>

    </main>
  );
}
