// app/membership/page.jsx — RISE Membership (v8.7 – anchor pricing 50%)

export const dynamic = "force-dynamic";
export const revalidate = 0;

import SignInButton from "./SignInButton";
import BuyButton from "./BuyButton"; // <-- NEW (replaces StartFullAccessButton import)
import AutoContinueAfterSignup from "./AutoContinueAfterSignup";
const STRIPE_COUPON_ID = "QI8eKMjf";  // ⬅️ put your real Stripe coupon/promo ID


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
    <main
      data-page="membership"
      className="mx-auto max-w-[1100px] px-6 py-12"
    >
      {/* Keep this firing early */}
      <AutoContinueAfterSignup />

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
          {/* LEFT: description */}
          <div>
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
          Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader,
          author, and professor.
        </p>


          </div>

          {/* RIGHT: image (sunset hand) */}
          <div> 
<div className="mt-5 mx-auto max-w-[1100px] overflow-hidden squared-2xl">
  <img
    src="/sunset2.jpg"
    alt="Hand reaching toward the sun over the water at sunset"
    className="block w-full h-auto opacity-90"
      priority
      fetchPriority="high"
  />
</div>
            
          </div>
        </div>
      </section>





 

      {/* FULL ACCESS */}
      <section id="pricing" className="mt-18">
        <div className="mx-auto max-w-[750px] rounded-2xl bg-white/5 p-6 ring-1 ring-[var(--color-gold)]/60">
<div className="relative">
  {/* LEFT — Monthly Trial Badge (gold) */}
  <div className="absolute -top-3 left-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-3 py-1 text-xs font-bold text-black shadow">
    $1 first 30 days (monthly)
  </div>

  {/* RIGHT — Yearly Perks Badge (transparent + gold border, matches yearly CTA baseline) */}
  <div className="absolute -top-3 right-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-transparent px-3 py-1 text-xs font-semibold text-[var(--color-gold)] shadow-md">
    Free Custom Meditation (yearly)
  </div>
</div>


          <div className="mt-8 text-center text-2xl font-bold">Limited Time Offer</div>

          {/* Pricing */}
          <div className="mt-6 flex items-end justify-center gap-10">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-md opacity-60 line-through">$19.99</span>
                <span className="text-3xl font-semibold leading-none">$9.99</span>
              </div>
              <div className="mt-0 text-xs opacity-80 text-center">per month after $1 trial · save 50%</div>
            </div>
            <span className="text-2xl mb-3 font-semibold opacity-100">or</span>
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-md opacity-60 line-through">$179.99</span>
                <span className="text-3xl font-semibold leading-none">$89.99</span>
              </div>
              <div className="mt-0 text-xs opacity-80 text-center">per year · save 50%</div>
            </div>
          </div>

          {/* Mini CARDS */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <MiniTitleCard title="Meditation Library" />
            <MiniTitleCard title="Social Media Resources Library" />
            <MiniTitleCard title="Weekly Wisdom Emails" />
            <MiniTitleCard title="Monthly Live Online Sessions" />
            <MiniTitleCard title="Dr. Salerno AI" />
            <MiniTitleCard title="Discounted Custom Meditations" />
            <MiniTitleCard title="Vision Calls" />
            <MiniTitleCard title="Mental Health & Growth Guides" />
          </div>

          {/* CTA — DOM checkout (two explicit price choices) */}
<div className="mt-8 mb-2 flex justify-center gap-3 flex-wrap">
<BuyButton
  cadence="monthly"
className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition
            hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)]
            hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
>

    Join — Monthly (save 50%)
  </BuyButton>

  <BuyButton
    cadence="yearly"
    className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
  >
    Join — Yearly (save 50%)
  </BuyButton>
</div>

          {/* Sign in note (client component) */}
          <div className="mt-6 text-center text-xs opacity-75">
            Already a member?{" "}
            <SignInButton className="underline hover:no-underline">Sign in</SignInButton>
          </div>
 
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold">Benefits</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <BenefitCard title="Meditation Library" desc="A growing collection of guided sessions to build calm, clarity, motivation, compassion, and purpose—organized by theme for easy practice." />
          <BenefitCard title="Social Media Resources Library" desc="My most helpful posts and reframes, curated by theme so you can quickly find the idea or prompt that shifts your day forward." />
          <BenefitCard title="Weekly Wisdom Emails" desc="Short, actionable insights grounded in scientific insight and lived experience. Expect one gentle nudge each week to keep you grounded and aligned." />
          <BenefitCard title="Monthly Live Online Meditation & Personal Growth Sessions" desc="A live members-only session each month to reset your mind and deepen your practice. Recording available until the next session." />
          <BenefitCard title="Dr. Salerno AI" desc="Your members-only guidance companion trained on my approach—ask questions and get step-by-step support in my voice." />
          <BenefitCard title="Discounted Custom Meditations" desc="Personalized audio created for your goals (5/10/15 min) with guidance on how to use it effectively. Includes a free Vision Call." />
          <BenefitCard title="Vision Calls" desc="Focused 30-minute sessions to clarify intentions, identify blocks, and map the tone and structure of your custom meditation." />
          <BenefitCard title="Mental Health & Growth Guides" desc="Short, powerful guides curated to help you shift your mindset and take meaningful action today." />
        </div>
      </section>

      {/* THEMES */}
      <section className="mt-16">
        <div className="mx-auto max-w-[725px] rounded-xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
          <h3 className="text-center font-semibold text-[var(--color-gold)]">
            Meditation & Social Media Resources Library Themes
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
            <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span> included with <span className="font-semibold">every custom meditation</span> to set your intentions and personalize your journey.
          </div>
          <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">Yearly Membership Perk</div>
                <div className="mt-1 text-sm opacity-85">
                  One-time free 5-minute custom meditation <span className="whitespace-nowrap">+ vision call</span> ($50 value) included with your yearly membership purchase.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <p className="text-lg opacity-85">Ready to Transform into the Best Version of Yourself?</p>
        {/* CTA — DOM checkout (two explicit price choices) */}
<div className="mt-8 mb-2 flex justify-center gap-3 flex-wrap">
<BuyButton
  cadence="monthly"
className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition
            hover:bg-transparent hover:text-[var(--color-gold)] hover:border hover:border-[var(--color-gold)]
            hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
>

    Join — Monthly (save 50%)
  </BuyButton>

  <BuyButton
    cadence="yearly"
    className="inline-flex items-center rounded-md bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)] px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:bg-[var(--color-gold)] hover:text-black hover:-translate-y-0.5 ring-1 ring-[var(--color-gold)]/40"
  >
    Join — Yearly (save 50%)
  </BuyButton>
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
          <p className="mt-4 max-w-[520px] text-[13px] leading-relaxed">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
          </p>
        </div>

        {/* RIGHT: legal */}
        <div className="text-left translate-y-[-4px]">
          <p>© Dr. Juan Pablo Salerno™</p>
          <p className="mt-1">
            <span>All rights reserved</span>
            <span className="mx-2 opacity-50">·</span>
            <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
            <span className="mx-2 opacity-50">·</span>
            <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
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
            <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" /></svg></a>
            <a href="https://www.instagram.com/drjuanpablosalerno/" aria-label="Instagram" className="opacity-90 hover:opacity-100"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1 5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 0 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" /></svg></a>
            <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s-6.6 0-8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" /></svg></a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" /></svg></a>
          </div>

          <p className="mt-5 text-left opacity-85">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and thought leader, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
          </p>

          <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>
          <p className="mt-2 mb-5 text-left opacity-85">
            <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
            <span className="mx-2 opacity-50">·</span>
            <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
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
          <div className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2 py-0.5 text-[11px] font-semibold">Save {savings}</div>
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
