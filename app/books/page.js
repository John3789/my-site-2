"use client";

import Link from "next/link";
import TopOnMount from "../../components/TopOnMount";
import NewsletterMeditationPopup from "../../components/NewsletterMeditationPopup";
import Image from "next/image";
import HeroImageIphoneAware from "../../components/HeroImageIphoneAware";
import { useRef } from "react";
import { useIosZoomVars } from "../../components/useIosZoom";

export default function BooksPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.00 });


  return (
    <TopOnMount>
      <>
        {/* ===== PAGE BODY WRAPPER (same zoom as home/about) ===== */}
        <div
          ref={wrapRef}
          className={`
            lg:contents
            origin-top
            data-[zoom=on]:[transform:scale(var(--z))]
            data-[zoom=on]:[width:calc(100%/var(--z))]
            mx-auto
            lg:[transform:none]
            lg:[width:100%]
            landscape:data-[zoom=on]:[transform:scale(var(--zoomL))] 
            landscape:data-[zoom=on]:[width:calc(100%/var(--zoomL))]
            overflow-visible
          `}
        >
          <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)">

            {/* Page title */}
            <div className="mx-auto max-w-[1400px] px-6 pt-20 mb-12 text-center">
              <h1 className="font-serif text-6xl leading-[1.06] opacity-90 mt-2">
                Books &amp; Publications
              </h1>
              <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
            </div>

            {/* Intro + image */}
            <div className="mx-auto max-w-[1000px] px-6 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left column */}
<div className="mx-auto">
                  <p className="text-[clamp(16px,1.4vw,19px)] opacity-90 mb-8 leading-loose">
                    Here you’ll find Dr. Salerno’s published works, where science and personal growth come together.
                    His research explores pathways to mental health, resilience, and wellbeing, with a focus on uplifting
                    communities too often overlooked. Each piece reflects his belief that science should empower communities,
                    inspire healing, and spark meaningful change.
                  </p>

                  {/* Featured Book */}
                  <section className="mb-12">
                    <h2 className="font-serif text-4xl font-semibold opacity-90 mb-2">
                      Featured Book → <span className="text-[var(--color-gold)]">Coming Soon</span>
                    </h2>
                    <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 rounded mb-5" />

                    <p className="text-[clamp(16px,1.4vw,19px)] opacity-90 max-w-3xl mb-6 leading-loose">
                      A powerful blend of science and personal growth wisdom, this forthcoming book by Dr. Salerno
                      offers an accessible, inspiring, and transformative framework for overcoming mental health
                      struggles and living with greater purpose, balance, and fulfillment.
                    </p>


                    {/* Button */}
                    <div className="flex justify-center mt-12">
                      <Link
                        href="/contact"
                        className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                                   font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5
                                   transition ring-1 ring-black/10"
                      >
                        Contact for Media &amp; Speaking
                      </Link>
                    </div>
                  </section>
                </div>

{/* Right column image (plain) - optimized only on iPhone */}
<div className="flex justify-center [transform:none] [width:auto]">
  <HeroImageIphoneAware
    src="/award2.jpg"
    alt="Book or award"
    width={3024}
    height={4032}
    className="w-full max-w-md h-auto shadow-lg object-cover mt-3"
    sizes="(max-width: 768px) 95vw, 448px"
    quality={95}
    priority
    fetchPriority="high"
  />
</div>

              </div>
            </div>

            {/* Selected Publications */}
            <div className="mx-auto max-w-[1400px] px-6 pb-20">
              <hr className="border-t border-[var(--color-cream)]/22 mb-8" />
              <h2 className="font-serif text-[clamp(28px,3.8vw,40px)] leading-[1.08] text-center opacity-90">
                Selected Publications
              </h2>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-3 mb-10 rounded" />

              <div className="space-y-10">

{/* CARD 1 */}
<article className="w-full mx-auto bg-white/5 rounded-xl shadow-2xl p-8 backdrop-blur-0 md:backdrop-blur-sm hover:bg-white/[0.06] transition lg:p-10 relative ring-1 ring-white/10 narrow-landscape-70">
  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
  <div className="flex flex-col lg:flex-row gap-7 sm:gap-8 lg:gap-12">
    <div className="lg:w-1/3">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] opacity-90">Theme</p>
      <div className="h-px w-14 bg-[var(--color-gold)]/30 mt-2 mb-4" />
      <h3 className="font-serif text-3xl mb-3">
        Advancing Mental Health Equity Among Latinx Youth &amp; Other Communities of Color
      </h3>
      <p className="text-[clamp(17px,1.6vw,22px)] opacity-90 leading-relaxed">
        Research focused on mental health among Latinx youth communities and other people of color—centered on
        risk and resilience factors for mental wellbeing.
      </p>
    </div>

    <div className="lg:w-2/3">
      {/* Mobile show more/less (pure CSS via checkbox; desktop always expanded) */}
      <input id="more-c1" type="checkbox" className="peer hidden md:hidden" />

      <ul className="list-none divide-y divide-white/10">
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2024).
            <em> Mental Health Risk and Protection Among First-Generation Latinx Immigrant Youth: A Latent Profile Analysis.</em>
            <span className="italic"> Health Education &amp; Behavior.</span>{" "}
            <a href="https://www.researchgate.net/publication/385788771_Mental_Health_Risk_and_Protection_Among_First-Generation_Latinx_Immigrant_Youth_A_Latent_Profile_Analysis" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2024).
            <em> Effects of Racist Microaggressions and Sexual and Gender Minority Stress on Mental Health Among Latinx LGBTQ+ Young Adults.</em>
            <span className="italic"> Health Education &amp; Behavior.</span>{" "}
            <a href="https://www.researchgate.net/publication/380667864_Effects_of_Racist_Microaggressions_and_Sexual_and_Gender_Minority_Stress_on_Mental_Health_Among_Latinx_Lesbian_Gay_Bisexual_Transgender_and_Queer_or_Questioning_Young_Adults" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2023).
            <em> Profiles of Psychosocial Stressors and Buffers Among Latinx Immigrant Youth: Associations with Suicidal Ideation.</em>
            <span className="italic"> Psychiatry Research.</span>{" "}
            <a href="https://www.researchgate.net/publication/375071692_Profiles_of_Psychosocial_Stressors_and_Buffers_Among_Latinx_Immigrant_Youth_Associations_with_Suicidal_Ideation" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2023).
            <em> Impact of Racist Microaggressions and LGBTQ-Related Minority Stressors: Effects on Psychological Distress Among LGBTQ+ Young People of Color.</em>
            <span className="italic"> Preventing Chronic Disease.</span>{" "}
            <a href="https://www.researchgate.net/publication/372481962_Impact_of_Racist_Microaggressions_and_LGBTQ-Related_Minority_Stressors_Effects_on_Psychological_Distress_Among_LGBTQ_Young_People_of_Color" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2022).
            <em> Impact of Family Rejection and Racism on Sexual and Gender Minority Stress Among LGBTQ Young People of Color During COVID-19.</em>
            <span className="italic"> Psychological Trauma.</span>{" "}
            <a href="https://www.researchgate.net/publication/360404871_Impact_of_family_rejection_and_racism_on_sexual_and_gender_minority_stress_among_LGBTQ_young_people_of_color_during_COVID-19" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
      </ul>

      {/* Toggle buttons (siblings of the checkbox) */}
      <label
        htmlFor="more-c1"
        className="md:hidden mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer peer-checked:hidden"
      >
        Show all
      </label>
      <label
        htmlFor="more-c1"
        className="md:hidden mt-4 hidden peer-checked:inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer"
      >
        Show less
      </label>
    </div>
  </div>
</article>

 {/* CARD 2 */}
<article className="w-full mx-auto bg-white/5 rounded-xl shadow-2xl p-8 backdrop-blur-0 md:backdrop-blur-sm hover:bg-white/[0.06] transition lg:p-10 relative ring-1 ring-white/10 narrow-landscape-70">
  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
  <div className="flex flex-col lg:flex-row gap-7 sm:gap-8 lg:gap-12">
    <div className="lg:w-1/3">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] opacity-90">Theme</p>
      <div className="h-px w-14 bg-[var(--color-gold)]/30 mt-2 mb-4" />
      <h3 className="font-serif text-3xl mb-3">
        Stress &amp; Resilience Among LGBTQ+ Youth: Impact on Mental Wellbeing
      </h3>
      <p className="text-lg opacity-90 leading-relaxed">
        Research scholarship on minority stress and other risk factors, social determinants, and mental health among LGBTQ+ youth more broadly.
      </p>
    </div>

    <div className="lg:w-2/3">
      <input id="more-c2" type="checkbox" className="peer hidden md:hidden" />

      <ul className="list-none divide-y divide-white/10">
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Colleagues &amp; Salerno (2024).
            <em> Mental Health Impact of Sexually Minoritized &amp; Gender Expansive Stressors Among LGBTQ+ Young Adults: A Latent Class Analysis.</em>
            <span className="italic"> Epidemiology &amp; Psychiatric Sciences.</span>{" "}
            <a href="https://www.researchgate.net/publication/379752647_Mental_health_impact_of_multiple_sexually_minoritized_and_gender_expansive_stressors_among_LGBTQ_young_adults_a_latent_class_analysis" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Colleagues &amp; Salerno (2022).
            <em> Associations Between Living Arrangement &amp; Sexual &amp; Gender Minority Stressors Among University Students Since the Onset of COVID-19.</em>
            <span className="italic"> Journal of American College Health.</span>{" "}
            <a href="https://www.researchgate.net/publication/361075038_Associations_between_living_arrangement_and_sexual_and_gender_minority_stressors_among_university_students_since_the_start_of_the_COVID-19_pandemic" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2022).
            <em> LGBTQ Identity-Related Victimization During COVID-19 is Associated with Moderate to Severe Psychological Distress Among Young Adults.</em>
            <span className="italic"> LGBT Health.</span>{" "}
            <a href="https://www.researchgate.net/publication/360505666_LGBTQ_Identity-Related_Victimization_During_COVID-19_Is_Associated_With_Moderate_to_Severe_Psychological_Distress_Among_Young_Adults" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2021).
            <em> Changes in Mental Health &amp; Wellbeing Are Associated with Parental Living Arrangements During COVID-19 Among Sexual Minority Young Persons.</em>
            <span className="italic"> Psych. of Sexual Orie. &amp; Gender Div.</span>{" "}
            <a href="https://www.researchgate.net/publication/352878843_Changes_in_Mental_Health_and_Wellbeing_Are_Associated_With_Living_Arrangements_With_Parents_During_COVID-19_Among_Sexual_Minority_Young_Persons_in_the_US" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2021).
            <em> Changes in Alcohol Use Since the Onset of COVID-19 Are Associated With Psychological Distress Among U.S. Sexual &amp; Gender Minority University Students.</em>
            <span className="italic"> Drug &amp; Alcohol Depend.</span>{" "}
            <a href="https://www.researchgate.net/publication/349479772_Changes_in_Alcohol_Use_Since_the_Onset_of_COVID-19_Are_Associated_With_Psychological_Distress_Among_Sexual_and_Gender_Minority_University_Students_in_the_US" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
      </ul>

      <label
        htmlFor="more-c2"
        className="md:hidden mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer peer-checked:hidden"
      >
        Show all
      </label>
      <label
        htmlFor="more-c2"
        className="md:hidden mt-4 hidden peer-checked:inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer"
      >
        Show less
      </label>
    </div>
  </div>
</article>


 {/* CARD 3 */}
<article className="w-full mx-auto bg-white/5 rounded-xl shadow-2xl p-8 backdrop-blur-0 md:backdrop-blur-sm hover:bg-white/[0.06] transition lg:p-10 relative ring-1 ring-white/10 narrow-landscape-70">
  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--color-gold)]/60 rounded-l-xl" />
  <div className="flex flex-col lg:flex-row gap-7 sm:gap-8 lg:gap-12">
    <div className="lg:w-1/3">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] opacity-90">Theme</p>
      <div className="h-px w-14 bg-[var(--color-gold)]/30 mt-2 mb-4" />
      <h3 className="font-serif text-3xl mb-3">
        Expert Commentary and Review on Mental Health Prevention For Youth &amp; LGBTQ+ Communities
      </h3>
      <p className="text-lg opacity-90 leading-relaxed">
        Broader work on prevention and pathways that support youth mental health and wellbeing.
      </p>
    </div>

    <div className="lg:w-2/3">
      <input id="more-c3" type="checkbox" className="peer hidden md:hidden" />

      <ul className="list-none divide-y divide-white/10">
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2020).
            <em> Sexual and Gender Minority Stress Amid the COVID-19 Pandemic: Implications for LGBTQ Young Persons’ Mental Health and Well-Being.</em>
            <span className="italic"> Public Health Reports.</span>{" "}
            <a href="https://www.researchgate.net/publication/344521757_Sexual_and_Gender_Minority_Stress_Amid_the_COVID-19_Pandemic_Implications_for_LGBTQ_Young_Persons'_Mental_Health_and_Well-Being" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno et&nbsp;al. (2020).
            <em> LGBTQ Populations: Psychologically Vulnerable Communities in the COVID-19 Pandemic.</em>
            <span className="italic"> Psychological Trauma: Theory, Research, Practice, &amp; Policy.</span>{" "}
            <a href="https://www.researchgate.net/publication/342282937_LGBTQ_Populations_Psychologically_Vulnerable_Communities_in_the_COVID-19_Pandemic" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
        <li className="flex gap-3 py-4 md:py-4 first:pt-0 md:first:pt-4">
          <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)] shrink-0" />
          <div>
            Salerno (2016).
            <em> Effectiveness of Universal School-Based Mental Health Awareness Programs Among Youth in the United States: A Systematic Review.</em>
            <span className="italic"> Journal of School Health.</span>{" "}
            <a href="https://www.researchgate.net/publication/310161801_Effectiveness_of_Universal_School-Based_Mental_Health_Awareness_Programs_Among_Youth_in_the_United_States_A_Systematic_Review" target="_blank" rel="noreferrer" className="underline decoration-[var(--color-gold)] underline-offset-2 hover:opacity-80">Read Here →</a>
          </div>
        </li>
      </ul>

      <label
        htmlFor="more-c3"
        className="md:hidden mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer peer-checked:hidden"
      >
        Show all
      </label>
      <label
        htmlFor="more-c3"
        className="md:hidden mt-4 hidden peer-checked:inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[12px] font-semibold tracking-wide hover:bg-white/10 active:translate-y-[1px] cursor-pointer"
      >
        Show less
      </label>
    </div>
  </div>
</article>
</div>

      
            </div>

          {/* Bottom spacer */}
            <div className="pb-10" />
            
          {/* FINAL divider above footer — match two-column width, no bleed */}
<div className="mx-auto max-w-[1400px] px-6">
  <hr className="hidden lg:block max-w-[1400px] border-t border-[var(--color-cream)]/22" />
</div>


            <div className="md:hidden mx-auto max-w-[1100px] px-3">
              {/* (mobile newsletter + socials unchanged) */}
              {/* ... */}
            </div>
            
{/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
<div className="block lg:hidden">
  <div className="mx-auto max-w-[1400px] px-6 mb-14 -mt-5">
    <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
  </div>

  <div className="mobile-footer-cap">

  <div className="mx-auto max-w-[1400px] px-3 narrow-landscape-70">
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
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 0 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>
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
        <span className="mx-2 opacity-50">·</span>
        <span>All rights reserved</span>
      </p>
    </div>
  </div>
</div>



        {/* removed the contained divider on mobile */}
      </div>


          </main>
        </div>

<style jsx global>{`
  /* === Show All / Show Less visibility rules === */

  /* Default: hide everywhere */
  [data-page="books"] [data-books-cta] {
    display: none !important;
  }

  /* iPhone portrait + landscape */
  @media (max-width: 700px) and (orientation: portrait),
         (max-width: 950px) and (orientation: landscape) {
    [data-page="books"] [data-books-cta] {
      display: flex !important;
    }
  }

  /* iPad mini portrait (≈744px wide) */
  @media (orientation: portrait) and (min-width: 700px) and (max-width: 799px) {
    [data-page="books"] [data-books-cta] {
      display: flex !important;
    }
  }

  /* iPad portrait (≈820–920px wide) */
  @media (orientation: portrait) and (min-width: 800px) and (max-width: 920px) {
    [data-page="books"] [data-books-cta] {
      display: flex !important;
    }
  }
`}</style>

      </>
<NewsletterMeditationPopup delayMs={10000} />
    </TopOnMount>
  );
}
