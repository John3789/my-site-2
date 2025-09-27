export default function BooksPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">


{/* Page title */}
<div className="mx-auto max-w-[1400px] px-6 pt-20 mb-16">
  <h1 className="font-serif text-5xl opacity-90 text-center">
    Books & Publications
  </h1>
</div>

{/* Intro + image */}
<div className="mx-auto max-w-[1400px] px-6 pb-20">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
    {/* Left column */}
    <div>
      <p className="text-lg opacity-90 mb-8 leading-loose">
        Here you’ll find my published works, where science and personal growth come together. 
        My research explores pathways to mental health, resilience, and wellbeing, 
        with a focus on uplifting communities too often overlooked. Each piece reflects 
        my belief that science should empower communities, inspire healing, 
        and spark meaningful change.
      </p>

      {/* Featured Book */}
      <section className="mb-12">
        <h2 className="font-serif text-4xl font-semibold opacity-90 mb-3">
          Featured Book → <span className="text-[var(--color-gold)]">Coming Soon</span>
        </h2>

        <p className="text-lg opacity-90 max-w-3xl mb-6">
          A powerful blend of science and personal growth wisdom, this forthcoming book by Dr. Salerno offers an accessible, inspiring, and transformative framework for overcoming mental health struggles and living with greater purpose, balance, and fulfillment.
        </p>

        <a
          href="/waitlist"
          className="mt-0 inline-block underline underline-offset-4 hover:opacity-80 transition"
        >
          Join the Waitlist →
        </a>

        {/* Button */}
        <div className="flex justify-center mt-15">
          <a
            href="/contact"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Contact for Media & Speaking
          </a>
        </div>
      </section>
    </div>

    {/* Right column image */}
    <div className="flex justify-center">
      <img
        src="/award1.jpg"
        alt="Book or award"
        className="w-full max-w-md h-full shadow-lg object-cover mt-4"
      />
    </div>
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
          <p className="text-sm uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-3xl mb-3">
            Advancing Mental Health Equity Among Latinx Youth &amp; Other Communities of Color
          </h3>
          <p className="text-lg opacity-90">
            Research focused on mental health among Latinx youth communities and other people of color—centered on
            risk and resilience factors for mental wellbeing. 
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2024).
              <em> Mental Health Risk and Protection Among First-Generation Latinx Immigrant Youth: A Latent Profile Analysis.</em>
              <span className="italic"> Health Education &amp; Behavior.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/385788771_Mental_Health_Risk_and_Protection_Among_First-Generation_Latinx_Immigrant_Youth_A_Latent_Profile_Analysis" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2024).
              <em> Effects of Racist Microaggressions and Sexual and Gender Minority Stress on Mental Health Among Latinx LGBTQ+ Young Adults.</em>
              <span className="italic"> Health Education &amp; Behavior.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/380667864_Effects_of_Racist_Microaggressions_and_Sexual_and_Gender_Minority_Stress_on_Mental_Health_Among_Latinx_Lesbian_Gay_Bisexual_Transgender_and_Queer_or_Questioning_Young_Adults" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2023).
              <em> Profiles of Psychosocial Stressors and Buffers Among Latinx Immigrant Youth: Associations with Suicidality.</em>
              <span className="italic"> Psychiatry Research.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/375071692_Profiles_of_Psychosocial_Stressors_and_Buffers_Among_Latinx_Immigrant_Youth_Associations_with_Suicidal_Ideation" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2023).
              <em> Impact of Racist Microaggressions and LGBTQ-Related Minority Stressors: Effects on Psychological Distress Among LGBTQ+ Young People of Color.</em>
              <span className="italic"> Preventing Chronic Disease.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/372481962_Impact_of_Racist_Microaggressions_and_LGBTQ-Related_Minority_Stressors_Effects_on_Psychological_Distress_Among_LGBTQ_Young_People_of_Color" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2022).
              <em> Impact of Family Rejection and Racism on Sexual and Gender Minority Stress Among LGBTQ Young People of Color During COVID-19.</em>
              <span className="italic"> Psychological Trauma.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/360404871_Impact_of_family_rejection_and_racism_on_sexual_and_gender_minority_stress_among_LGBTQ_young_people_of_color_during_COVID-19" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
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
          <p className="text-sm uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-3xl mb-3">
            Stress &amp; Resilience Among LGBTQ+ Youth: Impact on Mental Wellbeing
          </h3>
          <p className="text-lg opacity-90">
            Research scholarship on minority stress and other risk factors, social determinants, and mental health among LGBTQ+ youth more broadly. 
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Colleagues &amp; Salerno (2024).
              <em> Mental Health Impact of Sexually Minoritized &amp; Gender Expansive Stressors Among LGBTQ+ Young Adults: A Latent Class Analysis</em>
              <span className="italic"> Epidemiology &amp; Psychiatric Sciences.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/379752647_Mental_health_impact_of_multiple_sexually_minoritized_and_gender_expansive_stressors_among_LGBTQ_young_adults_a_latent_class_analysis" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Colleagues &amp; Salerno (2022).
              <em> Associations Between Living Arrangement &amp; Sexual &amp; Gender Minority Stressors Among University Students Since the Onset of COVID-19.</em>
              <span className="italic"> Journal of American College Health.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/361075038_Associations_between_living_arrangement_and_sexual_and_gender_minority_stressors_among_university_students_since_the_start_of_the_COVID-19_pandemic" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2022).
              <em> LGBTQ Identity-Related Victimization During COVID-19 is Associaed with Moderate to Severe Psychological Distress Among Young Adults.</em>
              <span className="italic"> LGBT Health.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/360505666_LGBTQ_Identity-Related_Victimization_During_COVID-19_Is_Associated_with_Moderate_to_Severe_Psychological_Distress_Among_Young_Adults" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2021).
              <em> Changes in Mental Health &amp; Wellbeing Are Associated with Parental Living Arrangements During COVID-19 Among Sexual Minority Young Persons.</em>
              <span className="italic"> Psych. of Sexual Orie. &amp; Gender Div.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/352878843_Changes_in_Mental_Health_and_Wellbeing_Are_Associated_With_Living_Arrangements_With_Parents_During_COVID-19_Among_Sexual_Minority_Young_Persons_in_the_US" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2021).
              <em> Changes in Alcohol Use Since the Onset of COVID-19 Are Associated With Psychological Distress Among U.S. Sexual &amp; Gender Minority University Students.</em>
              <span className="italic"> Drug &amp; Alcohol Depend.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/349479772_Changes_in_Alcohol_Use_Since_the_Onset_of_COVID-19_Are_Associated_With_Psychological_Distress_Among_Sexual_and_Gender_Minority_University_Students_in_the_US" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
          </ul>
        </div>
      </div>
    </article>

    {/* CARD 3 */}
    <article className="w-full bg-white/5 rounded-xl shadow-2xl p-8 lg:p-10 relative">
      <div className="absolute left-0 top-1 h-78 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="lg:w-1/3">
          <p className="text-sm uppercase tracking-wide text-[var(--color-gold)]">Theme</p>
          <div className="h-px w-10 bg-[var(--color-gold)]/30 mt-1 mb-4" />
          <h3 className="font-serif text-3xl mb-3">
            Expert Commentary and Review on Mental Health Prevention For Youth &amp; LGBTQ+ Communities 
          </h3>
          <p className="text-lg opacity-90">
            Broader work on prevention and pathways that support youth mental health and wellbeing.
          </p>
        </div>

        <div className="lg:w-2/3">
          <ul className="list-none space-y-5">
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2020).
              <em> Sexual and Gender Minority Stress Amid the COVID-19 Pandemic: Implications for LGBTQ Young Persons' Mental Health and Well-Being.</em>
              <span className="italic"> Public Health Reports.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/344521757_Sexual_and_Gender_Minority_Stress_Amid_the_COVID-19_Pandemic_Implications_for_LGBTQ_Young_Persons'_Mental_Health_and_Well-Being" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
                        <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno et&nbsp;al. (2020).
              <em> LGBTQ Populations: Psychologically Vulnerable Communities in the COVID-19 Pandemic.</em>
              <span className="italic"> Psychological Trauma: Theory, Research, Practice, &amp; Policy.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/342282937_LGBTQ_Populations_Psychologically_Vulnerable_Communities_in_the_COVID-19_Pandemic" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
            </li>
            <li className="relative pl-7 before:content-[''] before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[var(--color-gold)]">
              Salerno (2016).
              <em> Effectiveness of Universal School-Based Mental Health Awareness Programs Among Youth in the U.S.: A Systematic Review.</em>
              <span className="italic"> Journal of School Health.</span>
              {" "}
              <a href="https://www.researchgate.net/publication/310161801_Effectiveness_of_Universal_School-Based_Mental_Health_Awareness_Programs_Among_Youth_in_the_United_States_A_Systematic_Review" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
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
