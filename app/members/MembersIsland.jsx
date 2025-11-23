// app/members/MembersIsland.jsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

function getMemberstack() {
  if (typeof window === "undefined") return null;
  return (
    window.$memberstackDom ||
    window.$memberstack ||
    window.memberstack ||
    window.Memberstack ||
    null
  );
}

export default function MembersIsland() {
  const [activeDay, setActiveDay] = useState("1");
  const [openDay, setOpenDay] = useState(null);


  const [signingOut, setSigningOut] = useState(false);

  // Newsletter state (mirrors Contact)
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);

    const handleJump = useCallback((id) => {
    if (typeof document === "undefined") return;

    const el = document.getElementById(id);
    if (!el) return;

    // Base offset for most sections
    let yOffset = -120;

    // Fine-tune for specific sections if needed
    if (id === "everything-rise") {
      yOffset = -120; // scrolls slightly lower so the section sits a bit further down
    }

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop + yOffset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);



  // Optional: body class hook (kept simple; data-page selector does the heavy lifting)
  useEffect(() => {
    document.body.classList.add("hide-footer-on-members");
    return () => document.body.classList.remove("hide-footer-on-members");
  }, []);

  const handleNewsletterSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (nlSubmitting || nlSubscribed) return;

      setNlSubmitting(true);
      const form = new FormData(e.currentTarget);
      const email = (form.get("email") || "").toString().trim();

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email.");
        setNlSubmitting(false);
        return;
      }

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.error("Subscribe failed:", data);
          alert("Something went wrong. Please try again.");
        } else {
          setNlSubscribed(true);
        }
      } catch (err) {
        console.error("Network error:", err);
        alert("Network error. Please try again.");
      } finally {
        setNlSubmitting(false);
      }
    },
    [nlSubmitting, nlSubscribed]
  );

  const handleSignOut = useCallback(
    async (e) => {
      e.preventDefault();
      if (signingOut) return;
      setSigningOut(true);

      const ms =
        (typeof window !== "undefined" &&
          (window.$memberstack || window.memberstack || window.Memberstack)) ||
        null;

      const msLogout = async () => {
        try {
          if (ms?.logout) return await ms.logout();
          if (ms?.signOut) return await ms.signOut();
        } catch {}
      };

      const appSignout = async () => {
        try {
          await fetch("/api/auth/signout", { method: "POST", keepalive: true });
        } catch {}
      };

      await Promise.allSettled([msLogout(), appSignout()]);

      if (typeof window !== "undefined") {
        window.__salernoMemberOk = false;
      }

      window.location.href = "/membership";
    },
    [signingOut]
  );

  const handleAccountBillingClick = async () => {
    const ms = getMemberstack();
    if (!ms) {
      alert("Loading your account… please try again in a moment.");
      return;
    }

    try {
      await ms.openModal("PROFILE", { defaultTab: "account" });
    } catch (err) {
      console.error("Error opening profile modal", err);
      alert("Unable to open your account settings right now.");
    }
  };

  return (
<main data-page="members" className="mx-auto max-w-[1100px] px-6 py-10 mt-10">
  {/* HERO */}
  <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 shadow-2xl mt-10">
    <div className="flex flex-col gap-4">
      {/* Top row: badge + sign out */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)]/5 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">
          Active Member
        </div>

<button
  type="button"
  onClick={handleSignOut}
  disabled={signingOut}
  className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/[0.03] px-3.5 py-1 text-[12px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed active:translate-y-[1px] transition"
>
  <span>🚪</span>
  <span>{signingOut ? "Signing out..." : "Sign out"}</span>
</button>

      </div>

      {/* Heading + copy */}
      <div>
        <h1 className="mt-1 font-serif text-4xl md:text-5xl tracking-tight">
          Welcome to RISE ✨
        </h1>
        <p className="mt-1 text-sm md:text-base opacity-80">
          Your space to realign and grow.
        </p>
        <p className="mt-3 text-base md:text-lg opacity-85">
          Inside RISE, you&apos;ll find guided meditations, weekly wisdom, monthly live sessions,
          members-only AI guidance, alignment guides, and an inspiration library. You can move
          slowly—everything here is designed to support you, not overwhelm you.
        </p>
        <p className="text-base md:text-lg opacity-85">
          Start with the simple 7-day path below, and come back here anytime you need to reset.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#whats-new"
            className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
          >
            News and Updates
          </Link>
        </div>
      </div>
    </div>
  </section>


{/* STICKY QUICK ACTION BAR */}
<section className="sticky top-[2.5rem] z-30 mt-4 mb-4">
  <div className="flex flex-wrap items-center gap-2 md:gap-3 rounded-full bg-[var(--color-teal-850)]/20 ring-1 ring-white/20 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-sm transition">

    {/* Start Here */}
    <button
      type="button"
      onClick={() => handleJump("start-here")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/15 active:translate-y-[1px] transition"
    >
      <span>📘</span>
      <span>Start here</span>
    </button>

    {/* Your rhythm */}
    <button
      type="button"
      onClick={() => handleJump("regular-rhythm")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>🔁</span>
      <span>Your rhythm</span>
    </button>

    {/* Dr. Salerno AI */}
    <button
      type="button"
      onClick={() => handleJump("ai-guide")}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <img
        src="/headshot.jpg"
        alt="Dr. Salerno AI"
        className="h-5 w-5 rounded-full object-cover ring-1 ring-white/25"
      />
      <span>Dr. Salerno AI</span>
    </button>

    {/* Monthly session */}
    <button
      type="button"
      onClick={() => handleJump("monthly-session")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>📅</span>
      <span>Monthly session</span>
    </button>

    {/* Everything in RISE */}
    <button
      type="button"
      onClick={() => handleJump("everything-rise")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>🌐</span>
      <span>Everything in RISE</span>
    </button>

    {/* FAQs */}
    <button
      type="button"
      onClick={() => handleJump("faqs")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>❓</span>
      <span>FAQs</span>
    </button>

    {/* RISE roadmap */}
    <button
      type="button"
      onClick={() => handleJump("roadmap")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>📄</span>
      <span>RISE roadmap</span>
    </button>
  </div>
</section>


{/* Section divider */}
<div className="mt-11 md:mt-13 h-px w-full bg-[var(--color-gold)]/15" />

{/* START HERE – FIRST 7 DAYS (Accordion Cards) */}
<section
id="start-here"
className="mt-10 md:mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
          <p className="text-xs md:text-sm uppercase tracking-[0.16em] opacity-70 mb-1">A gentle place to begin</p>
  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
    Start here — your first 7 days
  </h2>
  <p className="mt-2 text-sm md:text-base opacity-85">
    A simple, calm path to help you ease into RISE without pressure. Take what you need and move at your own pace.
  </p>

  {/* 1 column on mobile, 2-column waterfall on larger screens */}
  <div
    className="mt-5 columns-1 md:columns-2"
    style={{ columnGap: "0.75rem" }}
  >
    {/* DAY CARD COMPONENT */}
    {[
      {
        num: "1",
        title: "Arrive & get oriented",
        content:
          "Watch the welcome video, then skim the RISE roadmap (you’ll find the download further down this page). Notice one idea that makes you feel a bit more hopeful and keep it in your notes app.",
        highlight: true,
      },
      {
        num: "2",
        title: "Your first meditation",
        content:
          "Choose a short meditation that matches how you feel today—stress, low energy, or needing clarity. You don't need to do it perfectly; just press play and stay with it as best you can.",
      },
      {
        num: "3",
        title: "Weekly wisdom reset",
        content:
          "Read your most recent Weekly Wisdom email. If one line really lands, star the email or screenshot it so you can come back to it when you’re having a harder day.",
      },
      {
        num: "4",
        title: "Ask Dr. Salerno AI",
        content:
          "Open Dr. Salerno AI and share what you're moving through. Ask for a grounding exercise, a simple next step, or a new way to look at your situation. Save any response that really helps you.",
      },
      {
        num: "5",
        title: "Get ready for the live session",
        content:
          "Check the date of the next Monthly Inner Growth Session. Read the event description and preparation notes, then add it to your calendar with a reminder so you can come prepared and be fully present.",
      },
      {
        num: "6",
        title: "Explore custom support",
        content:
          "Visit the Custom Meditations + Vision Calls page and read how it works. Notice whether having a personalized meditation and 1:1 call feels like something you might want in this season.",
      },
      {
        num: "7",
        title: "Choose one thing that speaks to you",
        content:
          "Browse the Alignment Guides or Inspiration Library and pick one guide, post, or message that really resonates. Let that be your theme for the week instead of trying to do everything at once.",
      },
      {
        num: "8+",
        title: "Find your ongoing rhythm",
        content:
          "Now that you've tried the core parts of RISE, choose a simple weekly rhythm that works for you. You’ll find suggestions below and in the RISE roadmap—use it as a guide, then adjust based on what feels supportive for you.",
      },
    ].map(({ num, title, content, highlight }) => (
      <details
        key={num}
        className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/10 p-4 cursor-pointer"
      >
<summary className="flex items-center justify-between text-sm font-semibold list-none">
  <div className="flex items-center gap-2">
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold bg-[var(--color-gold)]/90 text-black"
    >
      {num}
    </span>
    <span className="uppercase tracking-[0.14em] opacity-85 text-[11px]">
      {title}
    </span>
  </div>
  <span className="text-xs opacity-70 transition-transform group-open:rotate-90">
    ▶
  </span>
</summary>


        <p className="mt-3 text-xs md:text-sm opacity-80 leading-relaxed pr-1">
          {content}
        </p>
      </details>
    ))}
  </div>

  <p className="mt-4 text-xs md:text-sm opacity-75">
    This path is meant to support you, not pressure you. There is no ‘right’ timeline here — the pace that feels natural to you is the perfect one.
  </p>
</section>


{/* Section divider */}
<div className="mt-10 md:mt-12 h-px w-full bg-[var(--color-gold)]/15" />

       {/* REGULAR RHYTHM */}
<section
  id="regular-rhythm"
  className="mt-10 md:mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7"
>
  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
    Your regular rhythm
  </h2>
  <p className="mt-2 text-sm md:text-base opacity-85">
    A calm structure you can lean on—so you always know how to plug back in, even on low-energy
    weeks. These four anchors hold you daily, weekly, and monthly.
  </p>

  {/* WATERFALL LAYOUT (matching Start Here) */}
  <div
    className="mt-4 columns-1 md:columns-2"
    style={{ columnGap: "0.75rem" }}
  >
    {/* Meditation */}
    <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">✨</span>
          <span className="text-sm font-semibold uppercase tracking-wide opacity-80">
            Meditation as your anchor
          </span>
        </div>
        <span className="ml-3 text-xs opacity-70 transition-transform group-open:rotate-90">
          ▶
        </span>
      </summary>
      <div className="mt-2">
        <p className="text-sm opacity-80">
          On heavy days or in the small in-between moments, a short meditation becomes your reset
          button. Pick a track that matches how you feel and let it bring you back into your body
          and into your day.
        </p>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] opacity-75 font-bold">
          Suggested rhythm: daily, most days, or a few times a week
        </p>
      </div>
    </details>

    {/* Weekly Wisdom */}
    <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">✉️</span>
          <span className="text-sm font-semibold uppercase tracking-wide opacity-80">
            Weekly Wisdom Email
          </span>
        </div>
        <span className="ml-3 text-xs opacity-70 transition-transform group-open:rotate-90">
          ▶
        </span>
      </summary>
      <div className="mt-2">
        <p className="text-sm opacity-80">
          Once a week, a short note lands in your inbox to steady your mind and bring you back to
          what matters. Think of it as a gentle nudge toward possibility right when you’re drifting
          into autopilot.
        </p>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] opacity-75 font-bold">
          Suggested rhythm: read once each week
        </p>
      </div>
    </details>

    {/* Dr. Salerno AI – Softened Footer Blue + Gold Spine */}
    <details className="group mb-3 break-inside-avoid rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-4 shadow-[0_5px_16px_rgba(0,0,0,0.32)]">
      {/* Gold Gradient Spine */}
      <div className="absolute inset-y-0 left-0 w-1.5 rounded-l-xl bg-gradient-to-b from-[var(--color-gold)]/95 via-[var(--color-gold)]/70 to-[var(--color-gold)]/40" />

      <summary className="flex cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/headshot.jpg"
            alt="Dr. Juan Pablo Salerno"
            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/20"
          />
          <span className="text-sm font-semibold uppercase tracking-wide opacity-80">
            Dr. Salerno AI Check-in
          </span>
        </div>
        <span className="ml-3 text-xs opacity-70 transition-transform group-open:rotate-90">
          ▶
        </span>
      </summary>

      <div className="mt-2">
        <p className="text-sm opacity-90">
          Use Dr. Salerno AI when you’re spiraling, stuck, or unsure what’s next. Share what’s
          happening and ask for grounding, a reframe, or a simple plan for the week—so you don’t
          have to carry it all by yourself.
        </p>
        <p className="mt-2 text-[10.4px] uppercase tracking-[0.16em] opacity-75 font-bold">
          Suggested rhythm: anytime you feel stuck or need support
        </p>
      </div>
    </details>

    {/* Monthly Inner Growth Session — Featured */}
    <details className="group mb-3 break-inside-avoid rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-4 shadow-[0_5px_16px_rgba(0,0,0,0.32)]">
      {/* Soft Gold Accent Bar */}
      <div className="absolute inset-y-0 left-0 w-1.5 rounded-l-xl bg-gradient-to-b from-[var(--color-gold)]/95 via-[var(--color-gold)]/70 to-[var(--color-gold)]/40" />

      <summary className="flex cursor-pointer list-none items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📅</span>
          <span className="text-sm font-semibold uppercase tracking-wide opacity-80">
            Monthly Inner Growth Session
          </span>
        </div>
        <span className="ml-3 text-xs opacity-70 transition-transform group-open:rotate-90">
          ▶
        </span>
      </summary>

      <div className="mt-2">
        <p className="text-sm opacity-80">
          Once a month, we gather live for a guided reset—grounding, emotional release, and
          realignment with who you’re becoming. Join live when you can, or lean on the replay when
          you need a deeper, held space.
        </p>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] opacity-75 font-bold">
          Suggested rhythm: join live or watch replay once a month
        </p>
      </div>
    </details>
  </div>

  <p className="mt-3 text-xs md:text-sm opacity-75">
    Always remember: consistency over intensity. Let these four anchors support you in whatever
    rhythm fits your season—there’s no single “right” pace.
  </p>
</section>


{/* Section divider */}
<div className="mt-10 md:mt-12 h-px w-full bg-[var(--color-gold)]/15" />

{/* FEATURED SUPPORT – DR. SALERNO AI + MONTHLY SESSION */}
      <p className="text-center mt-9 text-xs md:text-sm uppercase tracking-[0.16em] opacity-70 mb-1">  Your two most interactive support tools inside RISE
</p>

<div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-2">
  {/* DR. SALERNO AI FEATURE SECTION – DEEP BLUE CARD */}
  <section
    id="ai-guide"
    className="rounded-2xl bg-[#0f2334] ring-1 ring-white/12 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)] h-full"
  >
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-3">
      <img
        src="/headshot.jpg"
        alt="Dr. Juan Pablo Salerno"
        className="h-17 h-17 rounded-full object-cover ring-1 ring-white/25"
      />
      <span>When you feel stuck, talk to Dr. Salerno AI</span>
    </h2>
    <p className="mt-2 text-sm md:text-base opacity-90">
      Instead of carrying everything in your head, use this space to sort through what you&apos;re
      feeling and leave with a kinder next step.
    </p>

    {/* 1 column on mobile, 3-column waterfall on desktop */}
    <div className="mt-4 columns-1 md:columns-3" style={{ columnGap: "0.75rem" }}>
      {/* When to open it */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>When to reach out</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
<ul className="mt-2 text-sm space-y-1">
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Your mind won&apos;t stop spiraling</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>You feel heavy and don&apos;t know why</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>You&apos;re overthinking a decision</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>You want to feel calmer before bed</span>
  </li>
</ul>

      </details>

      {/* What to say */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>What to say to him</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
<ul className="mt-2 text-sm space-y-1">
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>“Here&apos;s what happened today… help me process it.”</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>“I feel anxious and tight in my chest—what can I do right now?”</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>“I&apos;m stuck between two options. Help me think this through.”</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>“Give me a 3-step plan for the next week.”</span>
  </li>
</ul>

      </details>

      {/* What you leave with */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>What you leave with</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
<ul className="mt-2 text-sm space-y-1">
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A clearer way to see your situation</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>1–3 gentle, doable next steps</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A grounding practice you can repeat</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Less “it&apos;s all on me,” more “I&apos;m supported”</span>
  </li>
</ul>

      </details>
    </div>

    <div className="mt-5">
      <Link
        href="/members/ai"
        className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
      >
        Start your conversation
      </Link>
    </div>
  </section>

  {/* MONTHLY INNER GROWTH SESSION SECTION – DEEP BLUE CARD */}
  <section
    id="monthly-session"
    className="rounded-2xl bg-[#0f2334] ring-1 ring-white/12 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)] h-full"
  >
<h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-3">
  <span className="text-[2.5rem] leading-none">📅</span>
  <span>Your monthly reset &amp; inner growth session</span>
</h2>

    <p className="mt-2 text-sm md:text-base opacity-90">
      Once a month, we pause together—so you can release what you&apos;re carrying, realign with
      yourself, and step into the next month feeling clearer.
    </p>

    {/* 1 column on mobile, 2-column waterfall on desktop */}
    <div className="mt-4 columns-1 md:columns-2" style={{ columnGap: "0.75rem" }}>
      {/* In each session */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>In each session, you can expect</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
<ul className="mt-2 text-sm space-y-1">
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Grounding and breath to arrive fully</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Emotional release so you feel lighter</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Guided or active meditation to reset your energy</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Reflection and reframes for what you&apos;re moving through</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>Intention setting for the month ahead</span>
  </li>
</ul>

      </details>

      {/* How it supports your month */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>How it supports your month</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
<ul className="mt-2 text-sm space-y-1">
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A clean emotional slate to start from</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A moment to feel seen and supported</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A clear intention you can return to</span>
  </li>
  <li className="flex gap-2">
    <span className="text-[var(--color-gold)]">•</span>
    <span>A reminder you don&apos;t have to do this alone</span>
  </li>
</ul>

      </details>
    </div>

    <div className="mt-5">
      <Link
        href="/members/live-sessions"
        className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-xs md:text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
      >
        See upcoming sessions &amp; replays
      </Link>
    </div>
  </section>
</div>

{/* Section divider */}
<div className="mt-13 h-px w-full bg-[var(--color-gold)]/15" />

      {/* QUICK ACTIONS / OVERVIEW OF RISE */}
            <section
        id="everything-rise" 
      className="mt-9">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">Everything in your RISE space</h2>
            <p className="mt-1 text-sm md:text-base opacity-80">
              Use these cards to explore all the tools available to you as a member.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/members/meditations"
            icon="🧘"
            title="Meditation Library"
            desc="Guided sessions for calm, clarity, motivation, compassion, and purpose."
          />
          <Card
            href="/resources"
            icon="📚"
            title="Social Media Inspiration Space"
            desc="Curated posts and reframes by theme. Find the prompt that shifts your day."
          />
          <Card
            href="/members/weekly-wisdom"
            icon="✉️"
            title="Weekly Wisdom Collection"
            desc="Short, uplifting nudges to keep you moving—one each week."
          />
          <Card
            href="/members/guides"
            icon="📄"
            title="Mental Health & Alignment Guides"
            desc="Digestible 1–2 page guides with practical insights you can use today."
          />
          <Card
            href="/members/live-sessions"
            icon="📅"
            title="Monthly Live Inner Growth Sessions"
            desc="Join the next live reset and Q&A. Recordings available until the next session."
          />
          <Card
            href="/members/ai"
            icon={
              <img
                src="/headshot.jpg"
                alt="Dr. Juan Pablo Salerno"
                className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15 -mt-2"
              />
            }
            title="Dr. Salerno AI Advisor"
            desc="Seek guidance from my AI self—grounded in my approach, insights, and tools."
          />
          <Card
            href="/members/custom-meditation"
            icon="📿"
            title="Custom Meditations + Vision Calls"
            desc="Personalized audio (5, 10, 15 min) + a complimentary 30-minute Vision Call."
          />
          <Card
            href="/contact"
            icon="🛟"
            title="Support & Contact"
            desc="Reach out anytime with questions or concerns about your membership or benefits."
          />
          <Card
            icon="💳"
            title="Account & Billing"
            desc="Update payment details, personal info, password, and more."
            onClick={handleAccountBillingClick}
          />
        </div>
      </section>

     {/* Section divider */}
<div className="mt-10 md:mt-12 h-px w-full bg-[var(--color-gold)]/15" />

     {/* FAQS – COLLAPSIBLE SECTION */}
<section id="faqs" className="mt-10 md:mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
  <details className="group">
    {/* Header row (closed state) */}
    <summary className="flex cursor-pointer list-none items-center justify-between">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm md:text-base opacity-85">
          A few quick answers to help you feel grounded and clear as you move through RISE.
        </p>
      </div>
      <span className="ml-4 text-sm opacity-70 transition-transform group-open:rotate-90">
        ▶
      </span>
    </summary>

    {/* Inner FAQs */}
    <div className="mt-4 space-y-3">

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>How often should I use the membership?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          There’s no right pace. Some members check in daily, others once a week. Use the rhythms above
          as a guide, then adjust based on what feels supportive in your current season.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>What if I miss the monthly session?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          Replays are always available in the Monthly Inner Growth Sessions area, so you can tune in
          when it fits your life. You won’t “fall behind” — each session is designed to meet you where you are.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>How do I use Dr. Salerno AI?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          Open the AI page and talk to it like you would with me. Share what you&apos;re feeling or facing,
          then ask for grounding, clarity, or a simple plan for the next few days. The more specific you are,
          the more tailored the guidance will feel.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>What if I’ve never been able to meditate before?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          You’re not alone. We keep things simple and approachable. Start with short guided resets,
          let the AI advisor suggest a track for how you&apos;re feeling today, and move at a pace that feels
          doable — even a few minutes counts.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>What if I don&apos;t feel motivated?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          Start with the smallest step: one 5-minute meditation, one Weekly Wisdom email, or one message
          to the AI. RISE is built for real life — low-energy days included — not for perfect motivation.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>What if I fall behind or take a break?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          Nothing breaks. You can always come back to a single meditation, session replay, or AI check-in
          to restart. RISE is designed to meet you where you return, not where you think you “should” be.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>Where do I find replays?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          All replays live inside the Monthly Inner Growth Sessions area. You can revisit them anytime you
          want a guided reset.
        </p>
      </details>

      <details className="group rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm md:text-base font-semibold">
          <span>Can I cancel anytime?</span>
          <span className="ml-3 text-xs opacity-70 group-open:rotate-90 transition-transform">
            ▶
          </span>
        </summary>
        <p className="mt-2 text-sm opacity-80">
          Yes. You&apos;re always in control of your membership. You can manage or cancel your plan anytime
          from the Account &amp; Billing section.
        </p>
      </details>
    </div>
  </details>
</section>


      {/* ROADMAP PDF DOWNLOAD */}
      <section
  id="roadmap"
      className="mt-8 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight">Download your RISE roadmap</h2>
        <p className="mt-2 text-sm md:text-base opacity-85">
          Prefer a single, simple guide you can save or print? The RISE Roadmap PDF includes your first 7
          days, weekly rhythm, monthly flow, and a deeper overview of every tool inside the membership.
        </p>
        <Link
          href="/members/rise-roadmap"
          className="mt-4 inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
        >
          Download the roadmap
        </Link>
      </section>

            {/* SOFT LANDING MESSAGE */}
      <section className="mt-8 max-w-[600px] mx-auto text-center text-xs md:text-sm opacity-80 leading-relaxed">
<p className="mt-17 md:mt-20 text-sm md:text-base opacity-80 text-center">
  Keep moving in the direction that feels right for you. Every small choice toward alignment matters.
</p>

      </section>

      {/* Section divider */}
<div className="mt-15 md:mt-18 h-px w-full bg-[var(--color-gold)]/15" />

{/* WHAT'S NEW — Deep Blue Feature Panel */}
<section
  id="whats-new"
  className="mt-10 md:mt-12 rounded-2xl bg-[#0f2334] ring-1 ring-white/10 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
>
  {/* Celebratory subheading */}
  <p className="text-xs md:text-sm uppercase tracking-[0.16em] opacity-70 mb-1 flex items-center gap-1">
    <span className="text-[var(--color-gold)]">✨</span>
    <span>Your latest updates, all in one place</span>
  </p>

  {/* Upgraded main heading */}
  <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold text-[var(--color-gold)]">
    <span className="text-[1.35rem]">🎉</span>
    <span>What’s New in RISE</span>
  </h2>

  <div className="mt-3 space-y-2">
    <UpdateItem
      label="New Meditation"
      title="5-Minute Reset (All Levels)"
      date="Nov 10, 2025"
      href="/members/resources#reset"
    />
    <UpdateItem
      label="New Weekly Wisdom"
      title="How to reset on low-energy days"
      date="Nov 7, 2025"
      href="/members/resources#wisdom"
    />
    <UpdateItem
      label="Upcoming Live Session"
      title="November session — details posted"
      date="Nov 5, 2025"
      href="/members/live"
    />
  </div>
</section>

      {/* SIGN OUT */}
      <div className="mt-8">
        <button
          onClick={handleSignOut}
          data-ms-action="logout"
          className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-left disabled:opacity-60 opacity-80"
          disabled={signingOut}
        >
          {signingOut ? "🚪 Signing out…" : "🚪 Sign out"}
        </button>
      </div>

      {/* ===== CUSTOM MEMBERS FOOTER (matches Contact) ===== */}

      {/* Divider (mobile/desktop) */}
      <div className="mx-auto w-full px-0 mt-10">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer block (newsletter + socials + bio + legal) */}
      <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-0">
        <div className="mx-auto w-full px-0">
          {/* Newsletter card */}
          <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-6">
            <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
              Science, Soul, and a Bit of Magic — Every Month
            </p>
            <p className="text-sm opacity-85 mb-3">
              Practical wisdom for modern minds — best paired with coffee and curiosity.
            </p>

            {nlSubscribed ? (
              <div className="flex gap-2">
                <div className="flex-1 rounded-md border border-[var(--color-gold)]/90 text-[var(--color-gold)]/90 px-3 py-2 font-semibold text-center cursor-default select-none">
                  Thank you!
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
                  />
                  <button
                    type="submit"
                    disabled={nlSubmitting}
                    className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold"
                  >
                    {nlSubmitting ? "Sending…" : "Subscribe"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Socials + bio + legal (mobile) */}
          <div className="mt-6 text-[13px] leading-relaxed">
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
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/drjpsalerno"
                aria-label="YouTube"
                className="opacity-90 hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
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
              Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation
              advisor, author, and professor—credited with more than 30 peer-reviewed publications and over
              2,000 citations.
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
      </div>

      {/* Desktop footer row (socials + bio / legal) */}
      <div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 text-[13px] leading-relaxed opacity-85">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-4">
            <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">Follow Dr. Salerno:</p>
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
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/drjpsalerno"
              aria-label="YouTube"
              className="opacity-90 hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
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
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation
            advisor, author, and professor—credited with more than 30 peer-reviewed publications and over
            2,000 citations.
          </p>
        </div>

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

      {/* GLOBAL PAGE-SPECIFIC STYLES (hide site footer, tidy spacing) */}
      <style jsx global>{`
        body:has(main[data-page="members"]) :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover {
          -webkit-box-shadow: 0 0 0px 1000px #0d1d2d inset !important;
          -webkit-text-fill-color: var(--color-cream) !important;
          caret-color: var(--color-cream) !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        img,
        video {
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </main>
  );
}

/* ===== Subcomponents ===== */

function Card({ href, icon, title, desc, onClick }) {
  const content = (
    <>
      <div className="text-2xl leading-none">{icon}</div>
      <div className="mt-1 text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm opacity-80">{desc}</div>
      <div className="mt-2 text-sm opacity-70 transition group-hover:translate-x-0.5">
        Explore →
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${title} — ${desc}`}
        className="group w-full text-left rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={`${title} — ${desc}`}
      className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition"
    >
      {content}
    </Link>
  );
}

function UpdateItem({ label, title, date, href }) {
  return (
    <Link
      href={href}
      className="group relative flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 pl-5 hover:bg-white/[0.08] hover:border-[var(--color-gold)]/40 transition"
    >
      <span
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-[var(--color-gold)]/60"
        aria-hidden="true"
      ></span>
      <div className="flex-1">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)]/5 px-2.5 py-0.5 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-[var(--color-gold)]">
            {label}
          </span>
        </div>
        <div className="mt-1 text-sm font-medium text-[var(--color-cream)] group-hover:text-[var(--color-gold)] transition">
          {title}
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs opacity-80">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/70"></span>
        {date}
      </div>
    </Link>
  );
}
