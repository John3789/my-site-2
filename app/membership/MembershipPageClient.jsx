// app/membership/MembershipPageClient.jsx
"use client";

import { useState } from "react";
import SignInButton from "./SignInButton";
import BuyButton from "./BuyButton";
import AutoRedirectIfMember from "./AutoRedirectIfMember";

const STRIPE_COUPON_ID = "QI8eKMjf"; // (currently unused, keeping as in your file)

export default function MembershipPageClient() {
  return (
    <main
      data-page="membership"
      className="mx-auto max-w-[1100px] px-6 py-12"
    >
      <AutoRedirectIfMember />

      {/* HERO SECTION: title + copy + image (like About page) */}
      <section className="mx-auto max-w-[1100px] mt-10 mb-10">
        {/* Title + sign in */}
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-[var(--color-cream)]">
            RISE Membership
          </h1>
          <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-5 mb-0 rounded" />

          <p className="mt-1 text-sm opacity-90">
            Already a member?{" "}
            <SignInButton className="font-semibold text-[var(--color-gold)] hover:underline mb-5">
              Sign in →
            </SignInButton>
          </p>
        </div>

                {/* Two-column layout: description + image */}
        <div className="mt-5 grid gap-10 md:grid-cols-2 md:items-center">
          {/* RIGHT on desktop: description */}
          <div className="md:order-2">
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Feeling emotionally drained or stuck in cycles that hold you back? I’ve been there—
              and I know how hard it is to show up for life when your mind feels off-balance.
              That’s why I created <span className="font-semibold">RISE</span>—to help you break
              free from negative patterns, rebuild your energy, and activate the mindset that helps
              you thrive.
              <span className="font-semibold">
                {" "}
                Join now to reclaim your power and step into the life you were meant to lead.
              </span>
            </p>

            <p className="mx-auto mt-6 max-w-[860px] text-xs opacity-75">
              Dr. Juan Pablo Salerno is an award-winning mental health science expert
              and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
              publications and over 2,000 citations.
            </p>
          </div>

          {/* LEFT on desktop: image (sunset hand) */}
          <div className="md:order-1">
            <div className="mt-5 mx-auto max-w-[1100px] overflow-hidden squared-2xl">
              <img
                src="/sunset2.jpg"
                alt="Hand reaching toward the sun over the water at sunset"
                className="block w-full h-auto opacity-90"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

      </section>

      {/* Divider ABOVE footer, like Contact/Members */}
      <div className="mx-auto max-w-[1200px] px-6 mt-12">
        <hr className="border-t border-[var(--color-cream)]/22" />
      </div>

   {/* OVERVIEW + HIGHLIGHTS + BENEFITS */}
      <section className="mt-20">
        {/* Inside RISE text + PRICING CARD side by side */}
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
            {/* LEFT: heading + text */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[var(--color-cream)] text-left md:text-left text-center">
                Inside RISE: Where Your Next Chapter Begins
              </h2>
              <p className="mt-4 text-base md:text-lg opacity-90 leading-relaxed">
                RISE is where you strengthen your mindset, elevate your energy, and transform into the greatest version of yourself. It&apos;s where you reconnect with the part of you that knows you&apos;re meant for more than feeling drained, overwhelmed, or lost in the motions of your days. Inside, you&apos;ll find grounded guidance that helps you quiet the noise, rebuild your inner strength, and access the version of you who leads with power, purpose, and intention. RISE gives you the support and tools to break through what&apos;s been weighing you down and step boldly into your next chapter—the one where you feel aligned, energized, and fully connected to the life you&apos;re here to create.
              </p>
            </div>

            {/* RIGHT: smaller, more symmetrical PRICING CARD */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-[450px] rounded-2xl bg-white/5 p-4 ring-1 ring-[var(--color-gold)]/60">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-transparent px-3 py-0.5 text-[11px] font-semibold text-[var(--color-gold)]">
                  Free Custom Meditation (yearly plan)
                </div>

                <div className="mt-4 text-center text-xl font-bold text-[var(--color-cream)]">
                  LAUNCHING JANUARY 2026
                </div>
                <div className="text-center text-[10px] uppercase tracking-[0.18em] opacity-60">
                  Choose your plan
                </div>

                {/* Pricing row — aligned prices */}
                <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start justify-items-center gap-4">
                  {/* Monthly */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="pt-12 flex items-baseline justify-center gap-2">
                      <span className="text-xs opacity-60 line-through">$19.99</span>
                      <span className="text-2xl font-semibold leading-none">$15.99</span>
                      <span className="text-[11px] opacity-60 leading-none">+ fees</span>
                    </div>
                    <div className="text-[11px] opacity-80 text-center">save 20% monthly</div>
                  </div>

                  {/* OR */}
                  <span className="self-center text-sm font-semibold opacity-80">or</span>

                  {/* Yearly */}
<div className="flex flex-col items-center gap-1 border border-[var(--color-gold)]/40 rounded-lg px-3 py-2">
  <div className="inline-flex items-center justify-center mt-1 mb-1 px-3 py-1 rounded-full bg-[var(--color-gold)] text-black text-[10px] font-semibold tracking-wide">
    BEST VALUE
  </div>
  <div className="flex items-baseline justify-center gap-1">
    <span className="text-xs opacity-60 line-through">$129.99</span>


    {/* group 97.50 + fees so they stay together */}
    <span className="inline-flex items-baseline gap-1">
      <span className="text-2xl font-semibold">$97.50</span>
      <span className="text-[11px] opacity-60 whitespace-nowrap">+ fees</span>
    </span>
  </div>


  <div className="text-[11px] opacity-80 text-center leading-relaxed">save 25% yearly</div>
  <div className="text-[11px] text-[var(--color-gold)] font-semibold underline decoration-[var(--color-gold)]/50">
    $8.12/mo · save 51% monthly
  </div>
</div>

                </div>

 {/* CTAs — placed under each price column */}
<div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start justify-items-center gap-4">

  {/* CTA under MONTHLY */}
  <div className="flex justify-center">
    <BuyButton
      cadence="monthly"
      className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-5 py-2.5 font-semibold tracking-wide text-xs shadow-md transition hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)] hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
    >
      Join Monthly
    </BuyButton>
  </div>

  {/* empty spacer where "or" is */}
  <div></div>

  {/* CTA under YEARLY */}
  <div className="flex justify-center">
    <BuyButton
      cadence="yearly"
      className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-5 py-2.5 font-semibold tracking-wide text-xs shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
    >
      Join Yearly
    </BuyButton>
  </div>

</div>


                <div className="mt-4 text-center text-[11px] opacity-60">
                  Already a member?{" "}
                  <SignInButton className="underline hover:no-underline">Sign in</SignInButton>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* WIDE WRAPPER for blue cards (ONLY this section widens) */}
<div className="mt-20">
  {/* Full-bleed strip that can exceed the main 1100px container */}
  <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen px-6">
    <div className="mx-auto max-w-[1350px]">

      {/* TWO BLUE CARDS SIDE BY SIDE */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-10 mx-auto max-w-[1305px]">

        {/* Monthly Inner Growth Sessions — CARD ONLY */}
        <div className="relative rounded-2xl border border-[var(--color-gold)]/70 bg-[rgba(9,22,32,0.96)] p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
          <div className="inline-flex items-center rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
            Live each month
          </div>

          <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
            Monthly Inner Growth Sessions
          </h3>

          <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
Once a month, we gather live to help you reset your mind, release emotional heaviness, 
and realign with who you’re becoming. Through grounding practices, meditation, and 
intention work, you’ll leave feeling restored and realigned.
          </p>

          <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
You’ll be invited to slow down, breathe, and reconnect with the part of you that 
believes in what’s possible—so you can rise above old patterns, tap into your 
inner strength, and move forward with clarity and purpose.
          </p>

          {/* THEMES LIST */}
          <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
              Themes we explore
            </div>
            <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
              Motivation & Mindset · Stress Relief · Self-Compassion · Healing · 
              Relationships · Purpose · Alignment · Manifestation · Inner Calm · Energy Reset
            </p>
          </div>
        </div>

        {/* Dr. Salerno AI Advisor — CARD ONLY */}
        <div className="relative rounded-2xl border border-[var(--color-gold)]/80 bg-[rgba(10,24,36,0.98)] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.6)]">
          <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
            24/7 guidance 
          </div>

          <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
            Your Personal Dr. Salerno AI Advisor
          </h3>

          <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
Imagine having me in your corner anytime your mind feels heavy or your path feels 
unclear—steady, grounded guidance that helps you rise above self-doubt and step back into your power.
          </p>

          <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
Dr. Salerno AI helps you see what’s truly possible for your life, reconnect with your inner strength, 
and move forward feeling aligned, grounded, and guided toward the version of you you’re meant to become.
          </p>

          {/* ASK ABOUT LIST */}
          <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
              You can ask about
            </div>
            <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
              Motivation · Stress · Relationships · Overthinking · Purpose · Confidence · Resetting your energy
            </p>
          </div>
        </div>

      </div>

      {/* IMAGE UNDER BOTH CARDS */}
      <div className="mt-20 mx-auto max-w-[600px] overflow-hidden squared-2xl border border-white/10">
        <img
          src="/hands2.jpg"
          alt="Dr. Salerno AI Advisor"
          className="w-full h-auto object-cover opacity-95"
        />
      </div>

    </div>
  </div>
</div>


        {/* BENEFITS HEADING */}
        <div className="mt-16 text-center">
          <h3 className="font-serif text-3xl md:text-4xl text-[var(--color-cream)] tracking-tight">
            And So Much More Inside RISE
          </h3>
          <p className="mt-3 text-sm md:text-base opacity-80 max-w-[650px] mx-auto">
            Beyond the live sessions and AI support, your membership gives you powerful tools you can return to anytime you need a reset, a reminder, or a gentle push forward.
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BenefitCard
            title="Meditation Library"
            href="/meditations"
            desc="A growing resource of guided sessions to build calm, clarity, motivation, compassion, and purpose—organized by theme for easy practice."
          />
          <BenefitCard
            title="Social Media Inspiration Space"
            desc="My most helpful posts and reframes, curated by theme so you can quickly find the idea or prompt that shifts your day forward."
          />
          <BenefitCard
            title="Weekly Wisdom Collection"
            desc="Short, actionable insights grounded in scientific insight and lived experience. Expect one gentle nudge each week to keep you grounded and aligned."
          />
          <BenefitCard
            title="Monthly Live Online Inner Growth Sessions"
            desc="A members-only live session each month designed to reset your mind and deepen your practice through active and guided meditation."
          />
          <BenefitCard
            title="Dr. Salerno AI Advisor"
            desc="Your members-only guidance companion trained on my approach—ask questions and get step-by-step support in my voice."
          />
          <BenefitCard
            title="Discounted Custom Meditations"
            href="/meditations"
            desc="Personalized audio created for your goals (5/10/15 min) with guidance on how to use it effectively. Includes a free vision call."
          />
          <BenefitCard
            title="Vision Calls"
            desc="Focused 30-minute sessions to clarify intentions, identify blocks, and map the tone and structure of your custom meditation."
          />
          <BenefitCard
            title="Mental Health & Alignment Guides"
            desc="Short, powerful guides curated to help you shift your mindset and take meaningful action today."
          />
        </div>
      </section>


      {/* THEMES */}
      <section className="mt-16">
        <div className="mx-auto max-w-[725px] rounded-xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
          <h3 className="text-center font-semibold text-[var(--color-gold)]">
            Meditation Library & Social Media Inspiration Space Themes
          </h3>
          <p className="mt-2 text-center text-sm opacity-85">
            Motivation & Mindset · Mental Health & Stress Relief · Self-Compassion & Healing · Relationships & Connection · Purpose & Alignment · Manifestation & Intention Setting · Feng Shui & Environment
          </p>
        </div>
      </section>

      

      {/* CUSTOM MEDITATIONS */}
      <section className="mt-16">
        <div className="mx-auto max-w-[925px] rounded-2xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold">Custom Meditations — Member Pricing</h3>
            <span className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2.5 py-0.5 text-[11px] font-semibold">
              Member savings highlighted below
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <DiscountCard label="5 minutes" memberPrice="$40" regularPrice="$50" savings="20%" />
            <DiscountCard label="10 minutes" memberPrice="$75" regularPrice="$100" savings="25%" />
            <DiscountCard label="15 minutes" memberPrice="$100" regularPrice="$150" savings="33%" />
          </div>

          <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
            <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span>{" "}
            included with <span className="font-semibold">every custom meditation</span> to set your intentions and personalize your journey.
          </div>
          <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">Yearly Membership Perk</div>
                <div className="mt-1 text-sm opacity-85">
                  One-time free 5-minute custom meditation <span className="whitespace-nowrap">+ vision call</span>{" "}
                  ($50 value) included with your yearly membership purchase.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <p className="text-lg opacity-85">Ready to transform into the best version of yourself?</p>
        {/* CTA — DOM checkout (two explicit price choices) */}
        <div className="mt-8 mb-2 flex justify-center gap-3 flex-wrap">
          <BuyButton
            cadence="monthly"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold tracking-wide text-sm shadow-md transition hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)] hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
          >
            Monthly — $15.99/mo (Save 20%)
          </BuyButton>

          <BuyButton
            cadence="yearly"
            className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-6 py-3 font-semibold tracking-wide text-sm shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
          >
            Yearly — $97.50/yr (Best Value)
          </BuyButton>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Questions</h2>
        <div className="mt-4 space-y-3 md:space-y-0 md:columns-2 md:gap-4">
          <Faq
            q="What do I get inside RISE?"
            a="You get access to the meditation library, social media resources space, weekly wisdom collection, monthly live online inner growth sessions, Dr. Salerno AI advisor, discounted custom meditations with vision calls, and mental health & alignment guides."
          />
          <Faq q="Can I cancel anytime?" a="Yes. You can cancel your membership at any time. When you cancel, you’ll keep access through the end of your current billing period." />
          <Faq q="What’s the difference between monthly and yearly?" a="The monthly plan renews every month. The yearly plan is billed once per year at a discounted rate and includes an additional 5-minute custom meditation plus a vision call as a perk." />
          <Faq q="Is this therapy or medical care?" a="No. RISE is for education and personal growth. It does not replace therapy, medical care, or emergency services." />
          <Faq q="Do I need prior meditation experience?" a="No. All meditations and resources are designed for all levels, including complete beginners." />
          <Faq q="What if I've never been able to meditate before?" a="Start with short 5-minute resets and gradually move into deeper practices. Custom meditations can help too." />
          <Faq q="What if I don’t have a lot of time?" a="RISE is designed for busy people. Most practices are short and powerful." />
          <Faq q="Is the AI advisor really like talking to Dr. Salerno?" a="Yes — it’s trained on his guidance, tone, and teaching style." />
          <Faq q="Do I need to be on camera for live sessions?" a="No — you can join however feels best." />
          <Faq q="I’m going through a lot emotionally. Is this a good fit?" a="Yes — RISE supports you through stress, low motivation, and emotional heaviness." />
          <Faq q="Do I get extra perks if I choose the yearly plan?" a="Yes — a free 30-minute vision call and a free 5-minute custom meditation." />
          <Faq q="I've already tried other programs. How is RISE different?" a="It blends science, alignment, mindset, spirituality, and lived experience." />
        </div>

        <div className="mt-8 text-center">
          <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
            Additional Questions?{" "}
            <a href="/contact" className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90">
              Contact Dr. Salerno
            </a>
          </p>
        </div>
      </section>

      {/* Divider ABOVE footer, like Contact/Members */}
      <div className="mx-auto max-w-[1200px] px-6 mt-12">
        <hr className="border-t border-[var(--color-cream)]/22" />
      </div>

      {/* Desktop footer row */}
      <div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 text-[13px] leading-relaxed opacity-85">
        {/* LEFT: socials + bio */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-4">
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">Follow Dr. Salerno:</p>
            <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/drjuanpablosalerno/" aria-label="Instagram" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61582412806274#"
              aria-label="Facebook"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.          </p>
        </div>

        {/* RIGHT: legal */}
        <div className="text-left translate-y-[-4px]">
          <p>© Dr. Juan Pablo Salerno™</p>
          <p className="mt-1">
            <span>All rights reserved</span>
            <span className="mx-2 opacity-50">·</span>
            <a href="/terms" className="underline underline-offset-4 hover:opacity-80">
              Terms
            </a>
            <span className="mx-2 opacity-50">·</span>
            <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
              Privacy
            </a>
          </p>
        </div>
      </div>

      {/* Mobile divider to match contact/members */}
      <div className="lg:hidden mx-auto w-full px-0 mt-8">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer stack */}
      <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-6">
        <div className="mt-0 text-[13px] leading-relaxed">
          <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
          <div className="mt-3 flex items-left justify-left gap-8">
            <a
              href="https://www.tiktok.com/@drjuanpablosalerno"
              aria-label="TikTok"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/drjuanpablosalerno/"
              aria-label="Instagram"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 0 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/drjpsalerno"
              aria-label="YouTube"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s-6.6 0-8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61582412806274#"
              aria-label="Facebook"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>

          <p className="mt-5 text-left opacity-85">
          Dr. Juan Pablo Salerno is an award-winning mental health science expert 
          and transformation advisor, author, and professor—credited with more than 
          30 peer-reviewed publications and over 2,000 citations.</p>

          <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>
          <p className="mt-2 mb-5 text-left opacity-85">
            <a href="/terms" className="underline underline-offset-4 hover:opacity-80">
              Terms
            </a>
            <span className="mx-2 opacity-50">·</span>
            <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
              Privacy
            </a>
            <span className="mx-2 opacity-50">·</span>
            <span>All rights reserved</span>
          </p>
        </div>
      </div>

      {/* Hide global site footer ONLY on this page */}
      <style>{`
        body:has(main[data-page="membership"]) :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
      `}</style>
    </main>
  );
}

/* ===== COMPONENTS ===== */
function MiniTitleCard({ title }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden="true" className="text-[var(--color-gold)]">✔︎</span>
        <span className="text-[16px] md:text-[18px] font-semibold text-center">{title}</span>
      </div>
    </div>
  );
}

function DiscountCard({ label, memberPrice, regularPrice, savings }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{label}</div>
          <div className="mt-1 text-2xl font-extrabold">{memberPrice}</div>
          <div className="text-xs opacity-75">Member price</div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2 py-0.5 text-[11px] font-semibold">
            Save {savings}
          </div>
          <div className="mt-1 text-xs opacity-75">Reg. {regularPrice}</div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ title, desc, href }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      {href ? (
        <a
          href={href}
          className="block text-center font-semibold text-[var(--color-gold)] underline underline-offset-4 decoration-[var(--color-gold)] cursor-pointer hover:opacity-90"
        >
          {title}
        </a>
      ) : (
        <div className="text-center font-semibold text-[var(--color-gold)]">
          {title}
        </div>
      )}
      <p className="mt-1 text-center text-sm opacity-85">{desc}</p>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3 break-inside-avoid rounded-xl border border-white/15 bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold">{q}</span>
        <span className="ml-4 text-xs font-semibold tracking-[0.18em] text-[var(--color-gold)]">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="mt-1 opacity-85 text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}
