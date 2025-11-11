// app/membership/page.jsx — RISE Membership (v8.7 CTA Link style)

import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "RISE Membership — Dr. Juan Pablo Salerno",
  description:
    "Guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "RISE Membership — Dr. Juan Pablo Salerno",
    description:
      "Guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-12">
      {/* HERO */}
      <section className="text-center">
        <h1 className="font-serif text-5xl md:text-5xl tracking-tight pt-10">RISE Membership</h1>


                {/* Top Sign In link (Option 1) */}
        <p className="mt-3 mb-3 text-sm opacity-90">
          Already a member?{" "}
          <a
            data-ms-action="login"
            className="font-semibold text-[var(--color-gold)] hover:underline"
          >
            Sign in →
          </a>
        </p>

        <p className="text-lg md:text-xl opacity-90 leading-relaxed mx-auto max-w-[880px]">
          Feeling emotionally drained or stuck in cycles that hold you back? I’ve been there—and I know
          how hard it is to show up for life when your mind feels off-balance. That’s why I created{" "}
          <span className="font-semibold">RISE</span>—to help you break free from negative patterns, rebuild your
          energy, and activate the mindset that helps you thrive.
          <span className="font-semibold"> Join now to reclaim your power and step into the life you were meant to lead.</span>
        </p>
        <p className="mx-auto mt-6 max-w-[860px] text-xs opacity-75">
          Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor.
        </p>
      </section>

      {/* FULL ACCESS */}
      <section id="pricing" className="mt-12">
        <div className="mx-auto max-w-[750px] rounded-2xl bg-white/5 p-6 ring-1 ring-[var(--color-gold)]/60">
          <div className="relative">
            <div className="absolute -top-3 right-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-3 py-1 text-sm font-bold text-black shadow">
              $1 first 30 days
            </div>
          </div>

          <div className="text-center text-2xl font-bold">Limited Time Offer</div>

          {/* Pricing */}
          <div className="mt-3 flex items-end justify-center gap-10">
            <div>
              <div className="text-3xl font-semibold leading-none">$9.99</div>
              <div className="-mt-0.5 text-xs opacity-80 text-center">per month after trial</div>
            </div>
            <span className="text-2xl mb-3 font-semibold opacity-100">or</span>
            <div>
              <div className="text-3xl font-semibold leading-none">$89.99</div>
              <div className="-mt-0.5 text-xs opacity-80 text-center">per year after trial (≈25% off)</div>
            </div>
          </div>

          {/* Mini CARDS */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <MiniTitleCard title="Meditation Library" />
            <MiniTitleCard title="Social Media Resources Library" />
            <MiniTitleCard title="Weekly Wisdom Emails" />
            <MiniTitleCard title="Monthly Live Sessions Online" />
            <MiniTitleCard title="Dr. Juan Pablo Salerno AI" />
            <MiniTitleCard title="Discounted Custom Meditations" />
            <MiniTitleCard title="Vision Calls" />
            <MiniTitleCard title="Yearly Membership Perks" />
          </div>

          {/* CTA */}
          <div className="mt-8 mb-2 flex justify-center">
            <Link
              href="/api/checkout/member"
              className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                         font-semibold uppercase tracking-wide text-sm shadow-md transition
                         hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
            >
              Start Full Access
            </Link>
          </div>

          {/* Sign in note */}
          <div className="mt-3 text-center text-xs opacity-75">
            Already a member?{" "}
            <a data-ms-action="login" className="underline hover:no-underline">
              Sign in
            </a>
          </div>
          <div className="mt-3 text-center text-xs opacity-70">Manage or cancel anytime from your account.</div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Benefits</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <BenefitCard title="Meditation Library" desc="A growing collection of guided sessions to build calm, clarity, motivation, compassion, purpose, and more—organized by theme and length for easy practice." />
          <BenefitCard title="Social Media Resources Library" desc="My most helpful posts and reframes, curated by theme so you can quickly find the idea or prompt that shifts your day forward." />
          <BenefitCard title="Weekly Wisdom Emails" desc="Short, actionable insights grounded in scientific insight and lived experience. Expect one gentle nudge each week to keep moving." />
          <BenefitCard title="Monthly Live Online Meditation & Personal Growth Sessions" desc="A live members-only class each month to reset your nervous system and deepen your practice. Recording available until the next session." />
          <BenefitCard title="Dr. Juan Pablo Salerno AI" desc="Your members-only guidance companion trained on my approach—ask questions and get step-by-step support in my voice." />
          <BenefitCard title="Discounted Custom Meditations" desc="Personalized audio created for your goals (5/10/15 min) with guidance on how to use it effectively. Includes a free Vision Call." />
          <BenefitCard title="Vision Calls" desc="A focused 30-minute session to clarify intentions, identify blocks, and map the tone and structure of your custom meditation." />
          <BenefitCard title="Yearly Membership Perks" desc="Join annually and receive a free 5-minute custom meditation + Vision Call at signup." />
        </div>
      </section>

      {/* THEMES */}
      <section className="mt-16">
        <div className="mx-auto max-w-[725px] rounded-xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
          <h3 className="text-center font-semibold text-[var(--color-gold)]">Meditation & Social Media Resources Library Themes</h3>
          <p className="mt-2 text-center text-sm opacity-85">
            Motivation & Mindset · Mental Health & Stress Relief · Self-Compassion & Healing · Relationships & Connection · Purpose & Alignment ·
            Manifestation & Intention Setting · Feng Shui & Environment
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
            <DiscountCard label="5 minutes" memberPrice="$42.50" regularPrice="$50" savings="15%" />
            <DiscountCard label="10 minutes" memberPrice="$75" regularPrice="$100" savings="25%" />
            <DiscountCard label="15 minutes" memberPrice="$97.50" regularPrice="$150" savings="35%" />
          </div>

     <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
            <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span> included with
            <span className="font-semibold"> every custom meditation</span> to set your intentions and personalize your journey.
          </div>
          <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">Yearly Membership Perk</div>
                <div className="mt-1 text-sm opacity-85">
                  Free 5-minute custom meditation <span className="whitespace-nowrap">+ Vision Call</span> at signup.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <p className="text-lg opacity-85">Ready to Transform into the Best Version of Yourself?</p>
        <div className="mt-8 mb-12 flex justify-center">
          <Link
            href="/api/checkout/member"
            className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3
                       font-semibold uppercase tracking-wide text-sm shadow-md transition
                       hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
          >
            Start Full Access
          </Link>
        </div>
      </section>

      <div className="hidden lg:block mx-auto max-w-[1200px] px-6">
        <hr className="border-t border-[var(--color-cream)]/22 mt-16 -mb-10" />
      </div>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold">FAQ</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Faq q="Who is this membership for?" a="People ready to align their mental health, mindset, and purpose using practical tools and personal-growth practices in a supportive space." />
          <Faq q="Is it beginner-friendly?" a="Yes. You’ll get simple instructions and short practices designed for all levels." />
          <Faq q="I’ve already done personal growth—will this still help?" a="Yes. The live sessions, themed meditations, and weekly prompts help you consolidate habits and go deeper step by step." />
          <Faq q="How often are the live sessions, and are recordings available?" a="Monthly. You’ll be notified of date/time; recordings are available until replaced by the next month’s session." />
          <Faq q="Is this therapy?" a="No—this is education, coaching, and self-growth. It doesn’t replace medical or clinical care." />
          <Faq q="Can I cancel anytime?" a="Yes—manage or cancel anytime from your account." />
          <Faq q="What if I don’t feel better?" a="We start small and build simple routines that compound. Most members notice shifts in clarity and calm." />
        </div>
        <p className="mt-4 text-center text-xs opacity-70">
          Disclaimer: Content is for educational purposes and does not constitute medical advice. If you’re in crisis, seek professional help or emergency services immediately.
        </p>
      </section>

      <div className="hidden lg:block mx-auto max-w-[1400px] px-6">
        <hr className="border-t border-[var(--color-cream)]/22 mt-16 -mb-10" />
      </div>
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

function BenefitCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="text-center font-semibold text-[var(--color-gold)]">{title}</div>
      <p className="mt-1 text-center text-sm opacity-85">{desc}</p>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="font-semibold">{q}</div>
      <p className="mt-1 opacity-85 text-sm">{a}</p>
    </div>
  );
}
