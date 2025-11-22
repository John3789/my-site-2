// app/meditations/page.js
"use client";

import TopOnMount from "../components/TopOnMount";
import PopupIsland from "./PopupIsland";
import HeroImageIphoneAware from "../components/HeroImageIphoneAware";
import { useRef, useState } from "react";
import { useIosZoomVars } from "../components/useIosZoom";
import MobileFooterSubscribeClient from "./MobileFooterSubscribeClient";
import ClientOnly from "./ClientOnly";

// Local copy of the DiscountCard used for pricing
function DiscountCard({ label, memberPrice, regularPrice, savings }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/20 bg-white/5 p-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</div>
        <div className="mt-2 text-2xl font-semibold">{memberPrice}</div>
        <div className="mt-1 text-xs opacity-80">
          <span className="mr-2 line-through opacity-60">{regularPrice}</span>
          <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-2 py-0.5 text-[11px] font-semibold">
            Save {savings}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[11px] opacity-80">RISE member pricing.</p>
    </div>
  );
}

// New card for regular (non-member) pricing
function RegularPriceCard({ label, price }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-white/15 bg-white/5 p-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</div>
        <div className="mt-2 text-2xl font-semibold">{price}</div>
      </div>
      <p className="mt-3 text-[11px] opacity-80">Regular pricing.</p>
    </div>
  );
}

export default function MeditationClient() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

const [formStatus, setFormStatus] = useState("idle");
const [formError, setFormError] = useState("");

const handleRequestSubmit = async (e) => {
  e.preventDefault();
  if (formStatus === "submitting") return;

  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    current: formData.get("current")?.toString().trim() || "",
    support: formData.get("support")?.toString().trim() || "",
    length: formData.get("length")?.toString().trim() || "",
    timing: formData.get("timing")?.toString().trim() || "",
    preferences: formData.get("preferences")?.toString().trim() || "",
  };

  // Front-end check to match the route's simple requirement
  if (!payload.name || !payload.email || !payload.support) {
    setFormError(
      "Please fill in your name, email, and what you’d like this meditation to support."
    );
    setFormStatus("error");
    return;
  }

  try {
    setFormStatus("submitting");
    setFormError("");

    const res = await fetch("/api/custom-meditation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Request failed");
    }

    // 2) Add to HoppyCopy as rise-lead (PUBLIC ONLY)
try {
  await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      source: "rise-memberstack",  // or "rise-memberstack" if you *really* want it identical
      member_type: "rise-lead",   // 👈 this is the key to match your segments
    }),
  });
} catch (err) {
  console.warn("HoppyCopy subscribe failed (non-fatal):", err);
}


    setFormStatus("success");
    form.reset();
  } catch (err) {
    console.error("Public custom meditation error:", err);
    setFormError(
      "Something went wrong. Please try again or email me directly."
    );
    setFormStatus("error");
  }
};

  return (
    <TopOnMount>
      <>
        {/* Mobile zoom wrapper (same pattern as Books/About). Desktop (md+) is unchanged. */}
        <div
          ref={wrapRef}
          className="lg:contents origin-top data-[zoom=on]:[transform:scale(var(--z))] data-[zoom=on]:[width:calc(100%/var(--z))] mx-auto lg:[transform:none] lg:[width:100%] landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))] landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))] overflow-visible"
        >
          <main data-page="meditations" className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
            {/* ===== HERO ===== */}
            <section className="mx-auto max-w-[1200px] px-6 pt-20 md:pt-20 pb-6 text-center">
              <h1 className="font-serif text-6xl leading-[1.06] opacity-95">Meditations</h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 rounded" />
            </section>

           {/* ===== INTRO ===== */}
<section className="mx-auto max-w-[700px] lg:max-w-[850px] px-6 text-center mb-12 narrow-landscape-80 narrow-landscape-80-ipad">
  <p className="text-lg md:text-xl opacity-90 leading-relaxed narrow-landscape-80 narrow-landscape-80-ipad">
When your mind feels heavy or overwhelmed, the right meditation can help you come back to center — resetting your body, calming your thoughts, and reconnecting with yourself.  </p>

  
</section>


            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>



{/* ===== MAIN HERO ROW — Custom sessions + photo ===== */}
<section id="custom-meditations" className="mx-auto max-w-[1200px] px-6 py-14 md:py-16">
  <div data-med-grid className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
    {/* LEFT COLUMN — Custom sessions content */}
    <div>
      <p className="-mt-8 text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
        Meditations
      </p>
      <h2 className="font-serif text-4xl md:text-5xl opacity-95 [@media(orientation:portrait)_and_(max-width:920px)]:text-center [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
        Custom Meditations 
      </h2>
      <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-3 mb-5 rounded [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto" />

      <p className="text-base md:text-lg opacity-90 leading-relaxed max-w-2xl text-left [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
        I create custom meditations shaped around your goals and challenges — whether you’re cultivating 
        resilience, deepening focus, easing stress, activating empowerment and manifestation, 
        or working through something uniquely personal. Each recording becomes a guided pathway to growth and wellbeing.
        </p>

      <p className="mt-3 text-base md:text-lg opacity-90 leading-relaxed max-w-2xl text-left [@media(orientation:portrait)_and_(max-width:920px)]:mx-auto">
        Every custom meditation includes a <span className="font-semibold">complimentary 30-minute vision call</span>, 
        where we explore what you need emotionally, mentally, and spiritually so your session feels grounded, 
        supportive, and truly aligned with you.
      </p>



              {/* CTA BUTTONS */}
              <div className="mt-8 flex gap-4">
               <a
  href="#custom-pricing"
    className="inline-flex items-center mx-auto rounded-md bg-[var(--color-gold)] text-black px-5 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
>
  See Custom Meditation Pricing
</a>
    </div>



    </div>

    {/* RIGHT COLUMN — Photo unchanged */}
    <div className="flex justify-center">
      <div className="relative w-full max-w-[320px] md:max-w-[340px] aspect-[3/4] shadow-2xl ring-1 ring-white/10 overflow-hidden">
        <HeroImageIphoneAware
          src="/meditation4.jpg"
          alt="Meditation photo"
          width={1200}
          height={1600}
          sizes="(max-width: 768px) 95vw, 340px"
          className="object-cover"
          quality={95}
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  </div>
</section>

{/* Divider — match two-column container width */}
<div className="mx-auto w-full max-w-[1200px] px-6 mb-10">
  <hr className="border-t border-[var(--color-cream)]/15" />
</div>

{/* CUSTOM MEDITATIONS — HOW IT WORKS / IS IT FOR YOU */}
<section className="mx-auto max-w-[1100px] px-6 pb-12 narrow-landscape-80">
  <div className="grid gap-10 lg:grid-cols-2">
    {/* How it works */}
    <div>
      <h3 className="mt-5 font-serif text-3xl md:text-4xl opacity-95">How It Works</h3>
      <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-8 rounded" />

      <div className="space-y-5">
        <StepCard
          number="1"
          title="Share what you need"
          body="Start by using the short form below to share what you're navigating and what kind of support you’re seeking."
        />
        <StepCard
          number="2"
          title="Vision Call"
          body="We schedule a complimentary 30-minute Vision Call to explore your emotional patterns, goals, and spiritual or mindset themes."
        />
        <StepCard
          number="3"
          title="Receive your custom meditation"
          body="Within 5–7 days, you receive your custom meditation (5, 10, or 15 minutes), plus guidance on how to integrate it into your routine."
        />

    </div>



      </div>

    {/* Is this for you */}
    <div>
      <h3 className="mt-5 font-serif text-3xl md:text-4xl opacity-95">Who This Is For</h3>
      <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded" />

      <p className="text-base md:text-lg opacity-90 leading-relaxed mb-4">
        Custom meditations are especially supportive if you&apos;re:
      </p>

<ul className="space-y-2 text-sm md:text-base opacity-90 leading-relaxed">
  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>Feeling emotionally drained, overwhelmed, or stuck on autopilot</span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>Experiencing burnout or big shifts at work, home, or in relationships</span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>Wanting deeper and more personalized meditations</span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>Ready to build an easy ritual you can return to when life feel heavy</span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>Craving a grounded, affirming reminder of your strength and path</span>
  </li>
</ul>

      <p className="mt-4 text-sm md:text-base opacity-85">
        Custom meditations are available as a one-time purchase starting at{" "}
        <span className="font-semibold">$50</span>. If you signup for {" "}
        <a href="/membership" className="font-bold underline underline-offset-4 text-[var(--color-gold)] brightness-110 hover:brightness-130 transition">
          RISE Membership
        </a>
        , you&apos;ll receive discounted rates (all plans) and a free 5-minute custom meditation (yearly plan).
      </p>
    </div>
  </div>
</section>


            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

{/* MEET YOUR MEDITATION GUIDE */}
<section className="mt-8">
  <div className="mx-auto max-w-[915px] grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">

    {/* LEFT: TEXT */}
    <div>
      <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center md:text-left">
        Meet Your Meditation Guide
      </h2>
      <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto md:mx-0" />

      <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
        Dr. Salerno understands what it feels like to carry a lot and stay strong for everyone, 
        while sensing that something inside you is ready for more. His work blends mental health 
        science with grounded spiritual practice to help you shift out of survival mode and into 
        the highest version of yourself — the person you’re meant to become.
      </p>

      <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
        He creates meditations that meet you exactly where you are — steady, supportive, and 
        designed to help you rise into more clarity, purpose, and inner strength. Not returning 
        to who you were before, but growing into a life that feels more aligned, intentional, 
        and authentic to the real you.
      </p>

      <p className="mt-3 text-sm md:text-base opacity-90 leading-relaxed">
        These practices are here to help you feel clearer, more centered, and more connected to 
        who you’re becoming — one intentional moment at a time.
      </p>
    </div>

    {/* RIGHT: IMAGE */}
   <div className="transform scale-[0.85] md:scale-[0.85] origin-center">
  <div className="overflow-hidden squared-2xl border border-white/15 bg-black/10">
    <img
      src="/heroabout.jpg"
      alt="Dr. Juan Pablo Salerno"
      className="w-full h-full object-cover opacity-95"
    />
  </div>
</div>
</div>

</section>



            {/* Divider — match two-column container width */}
            <div className="mx-auto w-full max-w-[1200px] px-6 mt-7 mb-1">
              <hr className="border-t border-[var(--color-cream)]/15" />
            </div>

<section
  id="custom-pricing"
  className="mx-auto max-w-[1200px] px-6 py-14 md:py-16 narrow-landscape-80"
>
  <div className="mx-auto max-w-[925px] rounded-2xl border border-[var(--color-gold)]/60 bg-white/5 p-6">
    {/* Regular / non-member pricing */}
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-xl font-bold">Custom Meditations — Regular Pricing</h3>
      <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold">
        Standard rates shown below
      </span>
    </div>

    <div className="mt-4 grid gap-4 md:grid-cols-3">
      <RegularPriceCard label="5 minutes" price="$50" />
      <RegularPriceCard label="10 minutes" price="$100" />
      <RegularPriceCard label="15 minutes" price="$150" />
    </div>

    <p className="mt-5 text-sm opacity-85 text-center md:text-left flex flex-col md:flex-row items-center gap-2">
      <span>Signup for</span>
      <a
        href="/membership"
        className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] brightness-120 relative z-10 !text-black px-3 py-1.5 font-semibold text-xs uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
      >
        RISE Membership
      </a>
      <span>to unlock member pricing on all custom meditations.</span>
    </p>

    {/* Member pricing */}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-xl font-bold">Custom Meditations — RISE Member Pricing</h3>
      <span className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2.5 py-0.5 text-[11px] font-semibold">
        Member savings highlighted below
      </span>
    </div>

    <div className="mt-4 grid gap-4 md:grid-cols-3">
      <DiscountCard label="5 minutes" memberPrice="$40" regularPrice="$50" savings="20%" />
      <DiscountCard label="10 minutes" memberPrice="$75" regularPrice="$100" savings="25%" />
      <DiscountCard label="15 minutes" memberPrice="$100" regularPrice="$150" savings="33%" />
    </div>

    {/* Complimentary vision call for EVERY custom meditation */}
    <div className="mt-4 rounded-lg border border-white/15 bg-white/5 p-4 text-sm">
      <span className="font-semibold text-[var(--color-gold)]">Complimentary 30-minute Vision Call</span>{" "}
      included with <span className="font-semibold">every custom meditation</span> to set your intentions
      and personalize your journey emotionally, mentally, and spiritually.
    </div>

    {/* Yearly membership perk in preferred blue card */}
    <div className="mt-4 rounded-xl border border-white/20 bg-[#0f2334] p-4">
      <div className="font-semibold text-[var(--color-gold)]">Yearly Membership Bonus</div>
      <div className="mt-1 text-sm opacity-90">
        Yearly RISE members also receive a{" "}
        <span className="font-semibold">one-time free 5-minute custom meditation</span> (a $50 value) as
        a bonus when you join — created just for you to help you start your membership with clarity and
        intention.
      </div>
    </div>

    {/* CTA BUTTONS */}
    <div className="mt-8 flex flex-col items-center gap-4">
      <a
        href="#custom-request-form"
        className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"
      >
        Request a custom meditation
      </a>
    </div>
  </div>
</section>



            {/* FINAL divider above footer — match two-column width, no bleed */}
            <div className="mx-auto max-w-[1200px] px-6">
              <hr className="hidden lg:block max-w-[1200px] border-t border-[var(--color-cream)]/22" />
            </div>
                        {/* PUBLIC CUSTOM MEDITATION REQUEST FORM */}
            <section
              id="custom-request-form"
              className="mx-auto max-w-[900px] px-6 py-14 md:py-16 narrow-landscape-80"
            >
              <p className="text-[12px] uppercase tracking-[0.18em] opacity-60 mb-2 text-center">
                Request a Custom Meditation
              </p>

              <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">
                Tell Me What You Need Support With
              </h2>

              <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto" />

              <p className="text-base md:text-lg opacity-90 leading-relaxed text-center mb-6">
                Use this form to share what you&apos;re moving through and what you&apos;d like
                your meditation to support. Once I receive your request, I&apos;ll reach out to
                schedule your complimentary 30-minute Vision Call and confirm next steps.
              </p>

              <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6 shadow-2xl">
                <form className="space-y-4" onSubmit={handleRequestSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What are you currently moving through?
                    </label>
                    <textarea
                      name="current"
                      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                      rows={3}
                      placeholder="Share what you’re navigating emotionally, mentally, or spiritually."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What would you like this meditation to support?
                    </label>
                    <textarea
                      name="support"
                      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                      rows={3}
                      placeholder="For example: anxiety, burnout, confidence, clarity, grief, motivation, self-trust, etc."
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Preferred length</label>
                      <select
                        name="length"
                        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="15">15 minutes</option>
                        <option value="unsure">I&apos;m not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        When do you imagine using this meditation?
                      </label>
                      <input
                        type="text"
                        name="timing"
                        className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                        placeholder="Mornings, before bed, between shifts, after work, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Questions, preferences, comments? (optional)
                    </label>
                    <textarea
                      name="preferences"
                      className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                      rows={2}
                      placeholder="For example: English or Spanish, any phrases you resonate with, or anything you'd prefer to avoid."
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-300">{formError}</p>
                  )}

                  {formStatus === "success" && (
                    <p className="text-sm text-[var(--color-gold)]">
                      Thank you — your request was received. I&apos;ll be in touch soon to
                      schedule your Vision Call.
                    </p>
                  )}

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 disabled:opacity-60"
                    >
                      {formStatus === "submitting" ? "Sending…" : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
                    {/* QUESTIONS / CONTACT */}
<div className="mt-8 text-center">
  <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
    Additional questions? Include them in your form or{" "}
    <a
      href="/contact"
      className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90"
    >
      contact Dr. Salerno.
    </a>
  </p>
</div>
            </section>
             {/* Divider — match other section borders */}
          <div className="-mt-6 mx-auto w-full max-w-[1100px] px-6">
            <hr className="border-t border-[var(--color-cream)]/15" />
          </div>

          {/* IMPORTANT NOTES */}
          <section className="-mt-2 mx-auto max-w-[900px] px-6 py-12 narrow-landscape-80">
            <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center">
  Important Notes
</h2>
<div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-4 rounded mx-auto" />

<ul className="space-y-1 text-sm md:text-base opacity-90 leading-relaxed mb-0">

  {/* NEW FIRST BULLET */}
  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[2px]">✔︎</span>
    <span>
      If you prefer guided meditations you can use anytime, my full Meditation Library
      is offered as part of the{" "}
      <a
        href="/membership"
      className="text-[var(--color-gold)] brightness-110 underline underline-offset-[2px]"
      >
        RISE Membership Program
      </a>.
    </span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[3px]">•</span>
    <span>
      Custom meditations are for personal growth and emotional support. They do not
      replace therapy, medical care, or crisis services.
    </span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[3px]">•</span>
    <span>
      If you are in immediate distress or experiencing a crisis, please reach out to
      local emergency services or a crisis hotline before using these tools.
    </span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-[var(--color-gold)] mt-[3px]">•</span>
    <span>
      These meditations are for your personal use only. Please don&apos;t share,
      repost, or resell them.
    </span>
  </li>

</ul>

          </section>

            {/* FINAL divider above footer — match two-column width, no bleed */}
            <div className="mx-auto max-w-[1200px] px-6">
              <hr className="hidden lg:block max-w-[1200px] border-t border-[var(--color-cream)]/22" />
            </div>

            <div className="md:hidden mx-auto max-w-[1200px] px-3">
              {/* (mobile newsletter + socials unchanged) */}
            </div>

            {/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
            <div className="block lg:hidden">
              <div className="mx-auto max-w-[1000px] px-6 mb-14 -mt-5">
                <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
              </div>

              <div className="mobile-footer-cap">
                <div className="mx-auto max-w-[1000px] px-3 narrow-landscape-70">
                  {/* Newsletter card */}
                  <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
                    <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
                      Science, Soul, and a Bit of Magic — Every Month
                    </p>
                    <p className="text-sm opacity-85 mb-3">
                      Practical wisdom for modern minds — best paired with coffee and curiosity.
                    </p>
                    <MobileFooterSubscribeClient />
                  </div>

                  {/* Mobile footer block */}
                  <div className="mt-6 text-[13px] leading-relaxed">
                    <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
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
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.
                    </p>

                    <p className="mt-6 text-left opacity-85">© Dr. Juan Pablo Salerno™</p>

                    <p className="mt-2 mb-5 text-left opacity-85">
                      <a href="/terms" className="underline underline-offset-4 hover:opacity-80">
                        Terms
                      </a>
                      <span className="mx-2 opacity-50">·</span>
                      <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
                        Privacy</a>
                      <span className="mx-2 opacity-50">·</span>
                      <span>All rights reserved</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* removed the contained divider on mobile */}
          </main>

          {/* Global safeguards and crisp text styles */}
          <style jsx global>{`
            /* Meditations — force 1 column on iPhone landscape + iPad portrait only */
            @media (max-width: 950px) and (orientation: landscape), (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
              [data-page="meditations"] [data-med-grid] {
                grid-template-columns: 1fr !important;
              }
            }

            /* Meditations — narrower footer on iPad portrait only (≈820×1180) and ipad mini (744x1024) */
            @media (orientation: portrait) and (min-width: 700px) and (max-width: 920px) {
              body:has(main[data-page="meditations"]) :is(footer, .site-footer, .mobile-footer-cap, .home-footer-cap, div[class*="footer"]) {
                max-width: 75vw;
                margin-left: auto;
                margin-right: auto;
              }

              body:has(main[data-page="meditations"]) hr {
                width: 100%;
                margin-left: auto;
                margin-right: auto;
              }
            }
          `}</style>
        </div>

        <ClientOnly>
          <PopupIsland delayMs={20000} />
        </ClientOnly>
      </>
    </TopOnMount>
  );
}

/* ===== LOCAL COMPONENTS ===== */

function Faq({ q, a }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5">
      <div className="font-semibold">{q}</div>
      <p className="mt-1 opacity-85 text-sm">{a}</p>
    </div>
  );
}

function StepCard({ number, title, body }) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/12 bg-white/5 px-4 py-3">
      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-xs font-semibold">
        {number}
      </div>
      <div>
        <div className="font-semibold mb-1 text-sm md:text-base">{title}</div>
        <p className="text-xs md:text-sm opacity-90 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
