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
            Rebuild your energy, clarity, and confidence — with the tools to rise every day.
          </p>

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
                      <span className="text-2xl font-semibold ">$97.50</span>
                      <span className="text-[11px] opacity-60 whitespace-nowrap">+ fees</span>
                    </span>
                  </div>
                  <div className="text-[11px] opacity-80 text-center leading-relaxed">
                    save 25% yearly
                  </div>
                  <div className="text-[11px] text-[var(--color-gold)] font-semibold underline decoration-[var(--color-gold)]/50">
                    $8.12/mo · save 51% monthly
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
            Your membership gives you powerful tools you can return to anytime you need a
            reset, a reminder, or a gentle push forward.
          </p>
        </div>

        {/* BIG CARD WRAPPER: BLUE CARDS + GRID */}
        <div className="mt-8 rounded-2xl border border-white/18 bg-white/[0.04] p-6 md:p-7">
          {/* Blue feature cards */}
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Monthly Inner Growth Sessions */}
            <div className="relative rounded-2xl border border-[var(--color-gold)]/70 bg-[rgba(9,22,32,0.96)] p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <div className="inline-flex items-center rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                Live each month
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Monthly Inner Growth Sessions
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Guided live sessions to reset your mind, release emotional heaviness, and
                realign with who you&apos;re becoming.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                You&apos;ll slow down, breathe, and reconnect with the part of you that
                 believes in what&apos;s possible — so you can rise above unhelpful
                patterns and move forward with clarity and purpose.
              </p>
              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-gold)]">
                  Themes we explore
                </div>
                <p className="mt-1 text-xs md:text-sm opacity-90 leading-relaxed">
                  Motivation & Mindset · Stress Relief · Self-Compassion · Healing ·
                  Relationships · Purpose · Alignment · Manifestation · Inner Calm ·
                  Energy Reset
                </p>
              </div>
            </div>

            {/* Dr. Salerno AI Advisor */}
            <div className="relative rounded-2xl border border-[var(--color-gold)]/80 bg-[rgba(10,24,36,0.98)] p-6 md:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.6)]">
              <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">
                24/7 guidance
              </div>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl tracking-tight text-[var(--color-cream)]">
                Your Personal Dr. Salerno AI Advisor
              </h3>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                A members-only guidance companion trained on my approach — available
                anytime your mind feels heavy or your path feels unclear.
              </p>
              <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
                Get grounded, step-by-step support to reconnect with your inner strength
                and move forward feeling aligned, supported, and guided.
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
              href="/meditations"
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
              title="Discounted Custom Meditations"
              href="/meditations"
              desc="Personalized 5/10/15-minute audios with a vision call to help you use them intentionally."
            />
            <BenefitCard
              title="Vision Calls"
              desc="Focused 30-minute sessions to clarify intentions, identify blocks, and map your next chapter."
            />
            <BenefitCard
              title="Mental Health & Alignment Guides"
              desc="Short, practical guides to shift your mindset and take meaningful action today."
            />
          </div>
        </div>
      </section>

      {/* WHO RISE IS FOR */}
      <section className="mt-20">
        <div className="mx-auto max-w-[1100px] grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          {/* LEFT: image */}
          <div className="mx-auto max-w-[320px] overflow-hidden squared-2xl border border-white/12 bg-black/10">
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
        <h2 className="text-center text-2xl md:text-3xl font-bold">Questions</h2>

        <div className="mt-6 space-y-8">
          {/* Group 1: Understanding RISE */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.18em] text-center md:text-left opacity-70">
              Understanding RISE
            </h3>
            <div className="mt-3 space-y-3 md:space-y-0 md:columns-2 md:gap-4">
              <Faq
                q="What exactly is RISE?"
                a="RISE is a guided membership space for inner growth. You get live inner growth sessions, a meditation library, weekly wisdom notes, mental health and alignment guides, and a 24/7 AI advisor trained on my approach — all designed to help you feel more grounded, clear, and connected to yourself."
              />
              <Faq
                q="What do I get inside RISE?"
                a="You get access to the meditation library, social media inspiration space, weekly wisdom collection, monthly live inner growth sessions, the Dr. Salerno AI advisor, discounted custom meditations with vision calls, and mental health & alignment guides."
              />
              <Faq
                q="Is the AI advisor really like talking to Dr. Salerno?"
                a="It’s not a replacement for a human relationship, but it is carefully trained on my tone, my way of explaining things, and the guidance I give my community. It’s there to offer grounded support any time of day, in your pocket."
              />
              <Faq
                q="Is this therapy or medical care?"
                a="No. RISE is for education, personal growth, and emotional support. It does not replace therapy, medical care, or emergency services. You can absolutely pair RISE with therapy if that feels supportive."
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
                a="Yes — many members join RISE during seasons of stress, burnout, or transition. The tools here are meant to help you feel less alone, process what you’re carrying, and move forward gently. If you’re in immediate crisis, you’ll still want professional or emergency support alongside RISE."
              />
              <Faq
                q="Do I need prior meditation experience?"
                a="Not at all. Everything is designed for all levels, including complete beginners. Many members start with short 5-minute resets and grow from there."
              />
              <Faq
                q="What if I don’t have a lot of time?"
                a="RISE is designed for busy people. Most practices are short and powerful — many are 5–15 minutes. You can drop in when you need a reset instead of feeling like you’re “behind” on a program."
              />
              <Faq
                q="What if I’ve never been able to meditate before?"
                a="You’re not alone. We keep it simple and approachable. You can start with short guided resets, use the AI advisor to get personalized suggestions, and move at a pace that feels doable for you."
              />
              <Faq
                q="I’ve already tried other programs. How is RISE different?"
                a="RISE blends science, emotional alignment, and lived experience — without fluff or pressure. Instead of giving you a giant to-do list, it offers small, repeatable tools and a supportive environment to keep coming back to yourself."
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
                a="Yes. You can cancel your membership at any time from your account settings. When you cancel, you’ll keep access through the end of your current billing period — no penalties, no hidden steps."
              />
              <Faq
                q="What’s the difference between monthly and yearly?"
                a="The monthly plan renews every month and is great if you want to try things out. The yearly plan is billed once per year at a discounted rate and includes a free 5-minute custom meditation plus a vision call as a one-time perk."
              />
              <Faq
                q="Do I need to be on camera for live sessions?"
                a="Not at all — you can join however feels best for you."
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
