// app/membership/MembershipPageClient.jsx
"use client";

import { useState } from "react";
import SignInButton from "./SignInButton";
import BuyButton from "./BuyButton";
import AutoRedirectIfMember from "./AutoRedirectIfMember";

const STRIPE_COUPON_ID = "QI8eKMjf"; // (currently unused, keeping as in your file)

export default function MembershipPageClient() {
  return (
    <main data-page="membership" className="mx-auto max-w-[1100px] px-6 py-12">
      <AutoRedirectIfMember />

      {/* SUNRISE BANNER (NON FULL-BLEED) */}
      <section className="mt-10 mb-10">
<div className="mx-auto max-w-[1100px] px-0 overflow-hidden rounded-3xl border border-white/10">
  <img
    src="/sunset2.jpg"
    alt="Sunrise over the ocean"
    className="w-full aspect-[32/9] object-cover opacity-80"
    fetchPriority="high"
  />
</div>
      </section>

      {/* HERO SECTION: title + hook + pricing + intro */}
      <section className="mx-auto max-w-[990px] mb-12">
        {/* Title + sign in */}
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl tracking-tight text-[var(--color-cream)]">
            RISE Membership
          </h1>
          <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-5 mb-0 rounded" />
          <p className="mt-3 text-lg md:text-xl font-medium text-[var(--color-cream)] opacity-90">
Reset your mind, strengthen your energy, and rise into your greatest self.         </p>

        </div>

        {/* Single CTA: explore what's inside (gold) */}
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a
            href="#what-you-get"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-2.5 font-semibold tracking-wide text-sm shadow-md transition hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)] hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
          >
            Explore what&apos;s inside
          </a>
        </div>
          <p className="mt-4 text-sm opacity-90 text-center">
            Already a member?{" "}
            <SignInButton className="font-semibold text-[var(--color-gold)] hover:underline mb-5">
              Sign in →
            </SignInButton>
          </p>
        {/* Two-column layout: pricing card (left) + intro (right) */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
          {/* LEFT: PRICING CARD */}
          <div id="membership-pricing" className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[430px] rounded-2xl bg-white/5 p-4 ring-1 ring-[var(--color-gold)]/60">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-transparent px-3 py-0.5 text-[11px] font-semibold text-[var(--color-gold)]">
                Free Custom Meditation (yearly plan)
              </div>

              <div className="mt-4 text-center text-xl font-bold text-[var(--color-cream)]">
                LAUNCHING JANUARY 2026
              </div>
              <div className="text-center text-[10px] uppercase tracking-[0.18em] opacity-60">
                Choose your plan
              </div>

              {/* Pricing row */}
              <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start justify-items-center gap-4">
                {/* Monthly */}
                <div className="flex flex-col items-center gap-1">
                  <div className="pt-12 flex items-baseline justify-center gap-1">
                    <span className="text-xs opacity-60 line-through">$19.99</span>
                    <span className="text-2xl font-semibold">$15.99</span>
                    <span className="text-[11px] opacity-60 whitespace-nowrap">+ fees</span>
                  </div>
                  <div className="text-[11px] opacity-80 text-center">save 20% monthly</div>
                </div>

                {/* OR */}
                <span className="-translate-x-1 self-center text-sm font-semibold opacity-80">or</span>

                {/* Yearly */}
                <div className="flex flex-col items-center gap-1 border border-[var(--color-gold)]/40 rounded-lg px-1.5 py-2">
                  <div className="inline-flex items-center justify-center mt-1 mb-1 px-3 py-1 rounded-full bg-[var(--color-gold)] text-black text-[10px] font-semibold tracking-wide">
                    BEST VALUE
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xs opacity-60 line-through">$129.99</span>
                    <span className="inline-flex items-baseline gap-1">
                      <span className="text-2xl font-semibold ">$99.99</span>
                      <span className="text-[11px] opacity-60 whitespace-nowrap">+ fees</span>
                    </span>
                  </div>
                  <div className="text-[11px] opacity-80 text-center leading-relaxed">
                    save 23% yearly
                  </div>
                  <div className="text-[11px] text-[var(--color-gold)] font-semibold underline decoration-[var(--color-gold)]/50">
                    $8.33/mo · save 52% monthly
                  </div>
                </div>
              </div>

              {/* CTAs under each price */}
              <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start justify-items-center gap-4">
                <div className="flex justify-center">
                  <BuyButton
                    cadence="monthly"
                    className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-5 py-2.5 font-semibold tracking-wide text-xs shadow-md transition hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)] hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
                  >
                    Join RISE Monthly
                  </BuyButton>
                </div>
                <div />
                <div className="flex justify-center">
                  <BuyButton
                    cadence="yearly"
                    className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-5 py-2.5 font-semibold tracking-wide text-xs shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
                  >
                    Join RISE Yearly
                  </BuyButton>
                </div>
              </div>

              <div className="mt-4 text-center text-[11px] opacity-60">
                Already a member?{" "}
                <SignInButton className="underline hover:no-underline">
                  Sign in
                </SignInButton>
              </div>
            </div>
          </div>

          {/* RIGHT: INTRO COPY */}
          <div>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Feeling emotionally drained or stuck in cycles that hold you back? I&apos;ve
              been there — and I know how hard it is to show up for life when your mind
              feels off-balance.
            </p>
            <p className="mt-4 text-lg md:text-xl opacity-90 leading-relaxed">
              That&apos;s why I created <span className="font-semibold">RISE</span>: a space
              to help you break free from negative patterns, rebuild your energy, and
              activate the mindset that helps you thrive.{" "}
              <span className="font-semibold">
                Join now to reclaim your power and step into the life you were meant to
                lead.
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-[860px] text-xs opacity-75">
              Dr. Juan Pablo Salerno is an award-winning mental health science expert and
              transformation advisor, author, and professor — credited with more than 30
              peer-reviewed publications and over 2,000 citations.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[1200px] px-6 mt-4">
        <hr className="border-t border-[var(--color-cream)]/22" />
      </div>

            {/* WHAT YOU GET INSIDE RISE */}
      <section id="what-you-get" className="mt-12">
        <div className="mx-auto max-w-[950px] text-center">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[var(--color-cream)]">
            What You Get Inside RISE
          </h2>
          <div className="mx-auto h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-4 rounded" />

          <p className="mt-3 text-sm md:text-base opacity-80 max-w-[650px] mx-auto">
            Your membership gives you powerful tools you can return to anytime you
            need a reset, a reminder, or a gentle push forward — plus the option
            to add deeper 1:1 support at member-only rates.
          </p>
        </div>

        {/* INCLUDED TOOLS CARD */}
        <div className="mt-8 rounded-2xl border border-white/18 bg-white/[0.04] p-6 md:p-7">
          <h3 className="text-left text-sm md:text-base font-semibold uppercase tracking-[0.16em] opacity-80">
            Tools included in your membership
          </h3>

          {/* Blue feature cards: INCLUDED */}
          <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Monthly Inner Growth Sessions */}
            <div className="relative rounded-2xl border border-white/22 bg-[rgba(9,22,32,0.96)] p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <div className="inline-flex items-center rounded-full border border-white/35 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/80">
                Live each month
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/70">
                Included in your membership
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Monthly Inner Growth Sessions
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Live online sessions to reset your mind, release emotional heaviness, and
                realign yourself through guided practices like active meditation,
                intention setting, and mindset work.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                You&apos;ll slow down, breathe, and reconnect with who you truly are —
                so you can rise above unhelpful patterns and move forward with
                clarity and purpose.
              </p>
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
                  Themes we explore
                </div>
                <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
                  Mindset · Stress · Self-Compassion · Healing · Relationships ·
                  Purpose · Alignment · Manifestation · Energy Reset
                </p>
              </div>
            </div>

            {/* Dr. Salerno AI Advisor */}
            <div className="relative rounded-2xl border border-white/22 bg-[rgba(10,24,36,0.98)] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.6)]">
              <div className="inline-flex items-center rounded-full border border-white/35 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/80">
                24/7 guidance
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/70">
                Included in your membership
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Your Personal Dr. Salerno AI Advisor
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                A members-only guidance companion shaped by my voice and perspective —
                here anytime you need direction, clarity, or a renewed sense of
                strength.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Receive step-by-step guidance to help you reconnect with your inner
                power, move forward with grounded confidence, and rise into the person
                you’re here to become.
              </p>
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
                  You can ask about
                </div>
                <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
                  Motivation · Stress · Relationships · Overthinking · Confidence ·
                  Purpose · Resetting your energy
                </p>
              </div>
            </div>
          </div>

  {/* Benefits grid (trimmed descriptions) */}
  <div className="mt-8 grid gap-4 md:grid-cols-2">

    <BenefitCard
      title="Meditation Library"
      desc="Guided sessions for calm, clarity, and alignment — organized by theme so you always know where to start."
    />

    <BenefitCard
      title="Social Media Inspiration Space"
      desc="Curated posts and reframes by theme — quick prompts to shift your day forward."
    />

    <BenefitCard
      title="Weekly Wisdom Collection"
      desc="One short, grounded insight each week to keep you focused, encouraged, and aligned."
    />

    <BenefitCard
      title="Mental Health & Alignment Guides"
      desc="Short, practical guides to shift your mindset and take meaningful action today."
    />

  </div>
    </div>

        {/* OPTIONAL PREMIUM ADD-ONS CARD */}
        <div className="mt-8 rounded-2xl border border-white/18 bg-white/[0.04] p-6 md:p-7">
          <h3 className="text-left text-sm md:text-base font-semibold uppercase tracking-[0.16em] opacity-80">
            Optional premium add-ons
          </h3>
          <p className="mt-2 text-xs md:text-sm opacity-80 leading-relaxed">
            Available only for active RISE members. These are booked from
            inside your membership and are designed for deeper, personalized support.
          </p>

          {/* Premium blue cards */}
          <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-10">
                        {/* Discounted Custom Meditations */}
            <div className="relative rounded-2xl border border-[var(--color-gold)]/70 bg-[rgba(9,22,32,0.96)] p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between">
  {/* Premium pill — match Vision Call card exactly */}
  <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
    Premium 1:1 support
  </div>


</div> 

              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Discounted Custom Meditations
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                A fully personalized meditation crafted around your goals, challenges,
                and feelings. Every detail is intentional and specific to your
                emotional and spiritual landscape.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Each custom meditation includes a vision call where we set clear
                intentions together, explore what you&apos;re moving through, and shape
                a grounding ritual you can return to.
              </p>
              <p className="mt-3 text-xs opacity-80 leading-relaxed">
                Available as a paid upgrade for RISE members only. Member pricing is listed
                below.
              </p>
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
                  Designed to support
                </div>
                <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
                  Burnout &amp; stress · Emotional heaviness · Confidence &amp;
                  self-worth · Life transitions · Boundaries · Healing · Purpose
                </p>
              </div>
            </div>


            {/* Vision Calls */}
            <div className="relative rounded-2xl border border-[var(--color-gold)]/80 bg-[rgba(10,24,36,0.98)] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.6)]">
              <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                Premium 1:1 support
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Vision Calls with Dr. Salerno
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                A focused session for RISE members who want deeper, personalized
                support — clear the fog, reconnect with your inner strength, and
                uncover tools for your next chapter.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Structured with a short centering meditation, space to share your
                story, deep personalized guidance, and more — so this feels like a
                powerful reset, not another obligation.
              </p>
              <p className="mt-3 text-xs opacity-80 leading-relaxed">
               Available as a paid add-on for RISE members only. Member pricing is listed below.
              </p>
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
                  During your hour we may
                </div>
                <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
                  Identify patterns &amp; fears · Create self-worth affirmations ·
                  Explore mindset &amp; journaling tools · Craft a micro-meditation
                </p>
              </div>
            </div>
          </div>

{/* Member pricing for premium 1:1 support (inside same card) */}
<div className="mt-8 grid gap-8 md:grid-cols-2">

  {/* Custom Meditation Member Pricing */}
<div className="rounded-2xl border border-white/18 bg-white/[0.04] p-5 md:p-6">
  <div className="flex items-center justify-between gap-2">
    <h4 className="font-serif text-xl md:text-2xl tracking-tight text-[var(--color-cream)]">
      Custom Meditation Member Pricing
    </h4>
  </div>

  <p className="mt-2 text-xs md:text-sm opacity-80 leading-relaxed">
    Tiered pricing based on the length of your meditation.
  </p>

  {/* 3-up grid for mini pricing cards */}
<div className="mt-4 grid gap-4 md:grid-cols-3">

  {/* Mini card — 5 min */}
  <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 flex flex-col">
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
      5 minutes
    </span>

    <div className="mt-2">
      <div className="text-2xl font-semibold text-[var(--color-cream)]">$40</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs line-through opacity-50">$50</span>

        <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-2 py-0 text-[10px] font-semibold text-[var(--color-gold)]">
          Save 20%
        </span>
      </div>
    </div>

    <p className="mt-3 text-[11px] opacity-70 leading-relaxed">
      Member pricing
    </p>
  </div>

  {/* Mini card — 10 min */}
  <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 flex flex-col">
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
      10 minutes
    </span>

    <div className="mt-2">
      <div className="text-2xl font-semibold text-[var(--color-cream)]">$75</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs line-through opacity-50">$100</span>

        <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-2 py-0 text-[10px] font-semibold text-[var(--color-gold)]">
          Save 25%
        </span>
      </div>
    </div>

    <p className="mt-3 text-[11px] opacity-70 leading-relaxed">
      Member pricing
    </p>
  </div>

  {/* Mini card — 15 min */}
  <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-4 flex flex-col">
    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
      15 minutes
    </span>

    <div className="mt-2">
      <div className="text-2xl font-semibold text-[var(--color-cream)]">$100</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs line-through opacity-50">$150</span>

        <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-2 py-0 text-[10px] font-semibold text-[var(--color-gold)]">
          Save 33%
        </span>
      </div>
    </div>

    <p className="mt-3 text-[11px] opacity-70 leading-relaxed">
      Member pricing
    </p>
  </div>

</div>


{/* Yearly perk */}
<div className="mt-4 rounded-xl border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/8 p-3">
  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
    Yearly member perk
  </div>
  <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
    Yearly RISE members also receive one free 5-minute custom meditation +  
     a Vision Call to set your intentions.
  </p>
</div>

</div>



  {/* Vision Call pricing summary */}
  <div className="rounded-2xl border border-white/18 bg-white/[0.04] p-5 md:p-6">
    <h4 className="font-serif text-xl md:text-2xl tracking-tight text-[var(--color-cream)]">
      Vision Call Investment
    </h4>

    <div className="mt-4 grid gap-4">

      <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-left">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
          Investment
        </div>
        <p className="mt-0 text-2xl font-semibold">
          $150{" "}
          <span className="text-sm font-normal opacity-80">USD per 60-minute session</span>
        </p>
        <p className="mt-0 text-sm opacity-85 leading-relaxed">
          One intentional hour devoted to clarity, alignment, and meaningful inner growth.
        </p>
      </div>

      <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4 text-left">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
          Members-only access
        </div>
        <p className="mt-2 text-sm opacity-85 leading-relaxed">
          Vision Calls are exclusive to RISE members. Limiting bookings to once per month
          creates a rhythm that supports integration and genuine transformation.
        </p>
      </div>

    </div>
  </div>

</div>

          </div>
      </section>


      {/* WHO RISE IS FOR */}
      <section className="mt-20">
        <div className="mx-auto max-w-[1100px] grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          {/* LEFT: image */}
          <div className="mt-10 mx-auto max-w-[320px] overflow-hidden squared-2xl border border-white/12 bg-black/10">
            <img
              src="/shadow4.jpg"
              alt="Person walking at sunrise"
              className="w-full h-full object-cover opacity-95"
            />
          </div>

          {/* RIGHT: copy about who it's for */}
          <div>
            <h2 className="text-center font-serif text-3xl md:text-4xl tracking-tight text-[var(--color-cream)]">
              Who RISE Is For
            </h2>
                  <div className="mx-auto h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-5 rounded" />

            <p className="mt-3 text-base md:text-lg opacity-90 leading-relaxed">
              RISE is for you if you know you&apos;re meant for more than just pushing
              through your days — and you want a gentler, more grounded way to rise.
            </p>
            <ul className="mt-4 space-y-2 text-sm md:text-base opacity-90 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)] mt-[1px]">✔︎</span>
                <span>You feel emotionally drained, low on motivation, or stuck on autopilot.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)] mt-[1px]">✔︎</span>
                <span>You overthink, carry stress quietly, or feel like you&apos;re falling behind your potential.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)] mt-[1px]">✔︎</span>
                <span>You want to show up with more clarity, confidence, and purpose — at work, in relationships, and with yourself.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)] mt-[1px]">✔︎</span>
                <span>You don&apos;t have hours each week, but you&apos;re willing to use short, powerful tools that actually move you forward.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--color-gold)] mt-[1px]">✔︎</span>
                <span>You&apos;re ready to do the inner work — you just want structure, support, and a guide you can trust.</span>
              </li>
            </ul>
            <p className="mt-4 text-sm md:text-base opacity-90 leading-relaxed">
              If you read this and feel a little seen (in a good way), you&apos;re in the
              right place. RISE was built with you in mind.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO OF YOU + SHORT BIO (above FAQ) */}
      <section className="mt-20">
        <div className="mx-auto max-w-[875px] grid gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center">
          {/* LEFT: text */}
          <div>
            <h2 className="text-center font-serif text-3xl md:text-4xl tracking-tight text-[var(--color-cream)]">
              Meet Your Guide
            </h2>
                              <div className="mx-auto h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-5 rounded" />

                  <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
              Dr. Salerno is a mental health science expert and transformation
              advisor, committed to guiding others on their healing journeys and
              helping individuals awaken their potential and live with greater purpose,
              alignment, and abundance.
            </p>
            <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
              He created RISE to be the space he wished he had during the moments he felt stuck in life — a place where
              your inner world is taken seriously, and where you feel seen, supported, and guided back to 
              your strongest, most aligned self.
            </p>
            <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
              Inside, you&apos;re not just getting content; you&apos;re getting a steady
              companion — live sessions, meditations, weekly wisdom, an AI advisor
              trained on his voice, and more — all designed to help you rise, one step at a time.
            </p>
            <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
              His intention is simple: to help you feel more grounded, more hopeful, and
              more connected to the person you&apos;re here to become.
            </p>
          </div>

          {/* RIGHT: image */}
          <div className="overflow-hidden squared-2xl border border-white/15 bg-black/10">
            <img
              src="/heroabout.jpg"
              alt="Dr. Juan Pablo Salerno"
              className="w-full h-full object-cover opacity-95"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <p className="text-lg opacity-85">
          Ready to transform into the best version of yourself?
        </p>
        <div className="mt-8 mb-2 flex justify-center gap-3 flex-wrap">
          <BuyButton
            cadence="monthly"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold tracking-wide text-sm shadow-md transition hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)] hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
          >
            Join RISE Monthly 
          </BuyButton>
          <BuyButton
            cadence="yearly"
            className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-6 py-3 font-semibold tracking-wide text-sm shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
          >
            Join RISE Yearly 
          </BuyButton>
        </div>
      </section>

{/* FAQ */}
<section className="mt-16">
  <h2 className="mt-5 font-serif text-3xl md:text-4xl opacity-95 text-center">
    Questions
  </h2>
  <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mx-auto mt-4 mb-6 rounded" />

  <div className="mt-6 space-y-8">
    {/* Group 1: Understanding RISE */}
    <div>
      <h3 className="text-sm uppercase tracking-[0.18em] text-left md:text-left opacity-70">
        Understanding RISE
      </h3>
      <div className="mt-3 space-y-3 md:space-y-0 md:columns-2 md:gap-4">
        <Faq
          q="What exactly is RISE?"
          a="RISE is a guided membership space devoted to helping you transform into a more grounded, aligned, and elevated version of yourself. Through live monthly sessions, a meditation library, weekly wisdom notes, an inspiration space, mental health and alignment guides, and a 24/7 AI companion shaped by my approach, you’ll have tools that support clarity, emotional stability, and meaningful inner growth — all in one place."
        />
        <Faq
          q="What do I get inside RISE?"
          a="Inside RISE, you’ll find an experience that supports your mind, energy, and spirit. This includes the meditation library, social media inspiration space, weekly wisdom collection, monthly live inner growth sessions, the Dr. Salerno AI advisor, and mental health & alignment guides. You also receive members-only access to optional premium add-ons like discounted custom meditations and Vision Calls."
        />
        <Faq
          q="Is the AI advisor really like talking to Dr. Salerno?"
          a="It’s not a substitute for a human relationship, but it is intentionally trained on my tone, values, and the way I guide people through their challenges. The AI advisor is there to offer grounded, compassionate support — anytime you need a moment of direction, reassurance, or clarity."
        />
        <Faq
          q="Is this therapy or medical care?"
          a="No. RISE is a space for self-growth, emotional alignment, and practical support. It does not replace therapy, medical treatment, or crisis care. Many members use RISE alongside therapy to deepen the inner work they’re already doing."
        />
      </div>
    </div>

    {/* Group 3: Is this right for me? */}
    <div>
      <h3 className="-mt-2.5 text-sm uppercase tracking-[0.18em] text-center md:text-left opacity-70">
        Is This Right For Me?
      </h3>
      <div className="mt-3 space-y-3 md:space-y-0 md:columns-2 md:gap-4">
        <Faq
          q="I’m going through a lot emotionally. Is this a good fit?"
          a="Yes — many members join RISE during seasons of stress, burnout, heaviness, or transition. The tools here are meant to help you feel supported, less alone, and more resourced as you move into a new chapter. If you’re in immediate crisis, you’ll still want professional or emergency support alongside RISE."
        />
        <Faq
          q="Do I need prior meditation experience?"
          a="Not at all. Everything inside RISE is designed to meet you exactly where you are — whether you’ve never meditated before or have been practicing for years."
        />
        <Faq
          q="What if I don’t have a lot of time?"
          a="RISE is intentionally designed for busy people. Most practices are short, potent, and easy to integrate into everyday life. This isn’t about keeping up with a program — it’s about having accessible support whenever you need it."
        />
        <Faq
          q="What if I’ve never been able to meditate before?"
          a="You’re not alone. Many members have felt that way. You can start with simple guided practices, use the AI advisor for personalized suggestions, and move at a pace that feels natural and doable for you."
        />
        <Faq
          q="I’ve already tried other programs. How is RISE different?"
          a="RISE blends mental health science, emotional alignment, and lived experience — without overwhelming you with tasks or pressure. Instead of a long checklist, it offers small, repeatable practices and a supportive environment to help you step into a stronger, clearer, more aligned version of yourself."
        />
      </div>
    </div>

    {/* Group 2: Logistics & Billing */}
    <div>
      <h3 className="text-sm uppercase tracking-[0.18em] text-center md:text-left opacity-70">
        Logistics & Billing
      </h3>
      <div className="mt-3 space-y-3 md:space-y-0 md:columns-2 md:gap-4">
        <Faq
          q="Can I cancel anytime?"
          a="Yes. You can cancel your membership at any time from your account settings. When you cancel, you’ll keep access through the end of your current billing period — no penalties and no hidden steps."
        />
        <Faq
          q="What’s the difference between monthly and yearly?"
          a="The monthly plan renews every month and is great if you want more flexibility. The yearly plan offers deeper savings and includes a free 5-minute custom meditation plus a Vision Call as a one-time yearly perk."
        />
        <Faq
          q="Do I need to be on camera for live sessions?"
          a="Not at all — you can join however feels best for you. Camera on or off, you’re still welcome and fully included in the experience."
        />
        <Faq
          q="Can I buy premium add-ons without being a member?"
          a="Vision Calls and member-priced Custom Meditations are exclusive to active RISE members. Non-members can purchase custom meditations at regular pricing, but Vision Calls are reserved for those inside the membership."
        />
      </div>
    </div>
  </div>

        <div className="mt-10 text-center">
          <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
            Additional questions?{" "}
            <a
              href="/contact"
              className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90"
            >
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
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">
              Follow Dr. Salerno:
            </p>
                        <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" /></svg>
            </a>
<a
  href="https://www.instagram.com/drjuanpablosalerno/"
  aria-label="Instagram"
  className="opacity-90 hover:opacity-100"
>
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
</a>

            <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" /></svg>
            </a>
          </div>
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and
            transformation advisor, author, and professor — credited with more than 30
            peer-reviewed publications and over 2,000 citations.
          </p>
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
          <p className="uppercase tracking-[0.18em] text-left opacity-70">
            Follow Dr. Salerno:
          </p>
          <div className="mt-3 flex items-left justify-left gap-8">
            <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" /></svg>
            </a>
<a
  href="https://www.instagram.com/drjuanpablosalerno/"
  aria-label="Instagram"
  className="opacity-90 hover:opacity-100"
>
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
  </svg>
</a>

            <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" /></svg>
            </a>
          </div>

          <p className="mt-5 text-left opacity-85">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and
            transformation advisor, author, and professor — credited with more than 30
            peer-reviewed publications and over 2,000 citations.
          </p>

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
      <style>{`body:has(main[data-page="membership"]) :is(footer, .site-footer, [role="contentinfo"]) { display: none !important; }`}</style>
    </main>
  );
}

/* ===== COMPONENTS ===== */

function MiniTitleCard({ title }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden="true" className="text-[var(--color-gold)]">
          ✔︎
        </span>
        <span className="text-[16px] md:text-[18px] font-semibold text-center">
          {title}
        </span>
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
        onClick={() => setOpen(prev => !prev)}
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
