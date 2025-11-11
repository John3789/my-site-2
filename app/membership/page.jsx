// app/membership/page.jsx — ALIGN Membership (v8.5-reordered per request)

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "ALIGN Membership — Dr. Juan Pablo Salerno",
  description:
    "Guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "ALIGN Membership — Dr. Juan Pablo Salerno",
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
        <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-6 mb-6 rounded" />
        <p className="text-lg md:text-xl opacity-90 leading-relaxed mx-auto max-w-[880px]">
Feeling emotionally drained or stuck in cycles that hold you back? I’ve been there—and I know 
how hard it is to show up for life when your mind feels off-balance. That’s why I created <span className="font-semibold">RISE</span>—to 
help you break free from negative patterns, rebuild your energy, and activate the mindset that helps you thrive. 
<span className="font-semibold"> Join now to reclaim your power and step into the life you 
    were meant to lead.</span>
        

        </p>
        <p className="mx-auto mt-6 max-w-[860px] text-xs opacity-75">
          Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor.
        </p>
      </section>

      {/* FULL ACCESS — match your screenshot exactly: narrower width, gold ring, inner mini-cards (titles only) */}
      <section id="pricing" className="mt-12">
        <div className="mx-auto max-w-[725px] rounded-2xl bg-white/5 p-6 ring-1 ring-[var(--color-gold)]/60">
          <div className="relative">
            <div className="absolute -top-3 right-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-3 py-1 text-sm font-bold text-black shadow">
              $1 first 30 days
            </div>
          </div>

          <div className="text-center text-2xl font-bold">Limited Time Offer</div>

          {/* Pricing (unchanged) */}
          <div className="mt-3 flex items-end justify-center gap-10">
            <div>
              <div className="text-3xl font-semibold leading-none">$9.99</div>
              <div className="-mt-0.5 text-xs opacity-80 text-center">per month after trial</div>
            </div>

            {/* add this span for the “or” */}
            <span className="text-2xl mb-3 font-semibold opacity-100">or</span>

            <div>
              <div className="text-3xl font-semibold leading-none">$89.99</div>
              <div className="-mt-0.5 text-xs opacity-80 text-center">per year after trial (≈25% off)</div>
            </div>
          </div>

          {/* Mini CARDS inside (titles only; bigger font; more spacing; same shape as screenshot) */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <MiniTitleCard title="Full Meditation Library" />
            <MiniTitleCard title="Social Media Resources Library" />
            <MiniTitleCard title="Weekly Wisdom Emails" />
            <MiniTitleCard title="Monthly Live Sessions Online" />
            <MiniTitleCard title="Dr. Juan Pablo Salerno AI" />
            <MiniTitleCard title="Discounted Custom Meditations" />
            <MiniTitleCard title="Vision Calls" />
            <MiniTitleCard title="Yearly Membership Perks" />
          </div>

          {/* Single CTA (unchanged) */}
          <form method="POST" action="/api/checkout/member" className="mt-7 text-center">
            <input type="hidden" name="plan" value="monthly" />
            <button
              type="submit"
              className="inline-flex rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2.5 text-[15px] font-semibold text-black shadow-sm active:translate-y-px"
            >
              Start Full Access
            </button>
          </form>

          {/* Sign in note (unchanged) */}
          <div className="mt-3 text-center text-xs opacity-75">
            Already a member? <a data-ms-action="login" className="underline hover:no-underline">Sign in</a>
          </div>
          <div className="mt-3 text-center text-xs opacity-70">Manage or cancel anytime from your account.</div>
        </div>
      </section>

      {/* ===== MOVED UP: BENEFITS directly under Full Access ===== */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Benefits</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <BenefitCard
            title="Full Meditation Library"
            desc="A growing collection of guided sessions to build calm, clarity, motivation, compassion, purpose, and more—organized by theme and length for easy practice."
          />
          <BenefitCard
            title="Social Media Resources Library"
            desc="My most helpful posts and reframes, curated by theme so you can quickly find the idea or prompt that shifts your day forward."
          />
          <BenefitCard
            title="Weekly Wisdom Emails"
            desc="Short, actionable insights grounded in scientific insight and lived experience. Expect one gentle nudge each week to keep moving."
          />
          <BenefitCard
            title="Monthly live online meditation & personal growth sessions"
            desc="A live members-only class each month to reset your nervous system and deepen your practice. Recording available until the next session."
          />
          <BenefitCard
            title="Dr. Juan Pablo Salerno AI"
            desc="Your members-only guidance companion trained on my approach—ask questions and get step-by-step support in my voice."
          />
          <BenefitCard
            title="Discounted custom meditations"
            desc="Personalized audio created for your goals (5/10/15 min) with guidance on how to use it effectively. Includes a free Vision Call."
          />
          <BenefitCard
            title="Vision calls"
            desc="A focused 30-minute session to clarify intentions, identify blocks, and map the tone and structure of your custom meditation."
          />
          <BenefitCard
            title="Yearly membership perks"
            desc="Join annually and receive a free 5-minute custom meditation + Vision Call at signup."
          />
        </div>
      </section>

      {/* THEMES (combined) — now under Benefits */}
      <section className="mt-16">
        <div className="mx-auto max-w-[725px] rounded-xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
          <h3 className="text-center font-semibold text-[var(--color-gold)]">Meditation & Social Media Resources Library Themes</h3>
          <p className="mt-2 text-center text-sm opacity-85">
            Motivation & Mindset · Mental Health & Stress Relief · Self-Compassion & Healing · Relationships & Connection · Purpose & Alignment ·
            Manifestation & Intention Setting · Feng Shui & Environment
          </p>
        </div>
      </section>

      {/* CUSTOM MEDITATIONS — Member Pricing (now last before CTA) */}
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

          <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">Yearly Membership Perk</div>
                <div className="mt-1 text-sm opacity-85">Free 5-minute custom meditation <span className="whitespace-nowrap">+ Vision Call</span> at signup.</div>
              </div>
              <div className="hidden" />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
            <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span> is included with
            <span className="font-semibold"> every custom meditation</span> to set your intentions and personalize your journey.
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-16 text-center">
        <p className="text-lg opacity-85">Ready to Transform into the Best Version of Yourself?</p>
        <form method="POST" action="/api/checkout/member" className="mt-4">
          <input type="hidden" name="plan" value="monthly" />
          <button
            type="submit"
            className="inline-flex rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2.5 text-[15px] font-semibold text-black shadow-sm active:translate-y-px"
          >
            Start Full Access
          </button>
        </form>
      </section>
      <div className="hidden lg:block mx-auto max-w-[1200px] px-6">
  <hr className="border-t border-[var(--color-cream)]/22 mt-16 -mb-10" />
</div>
    </main>
  );
}

/* ====== SMALL COMPONENTS ====== */

function MiniTitleCard({ title }) {
  // Same rounded rectangle look as your screenshot; titles only; bigger font.
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="text-center text-[16px] md:text-[18px] font-semibold">{title}</div>
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
