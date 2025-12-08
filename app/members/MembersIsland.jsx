// app/members/MembersIsland.jsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import MembersSurveyBanner from "../../components/MembersSurveyBanner"; // adjust path as needed


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

  // Detect mobile (portrait + landscape)
  const isMobile = window.innerWidth <= 999;

  // Base offsets
  let yOffsetDesktop = -120;   // your original desktop behavior
  let yOffsetMobile = -20;     // scrolls lower on mobile — adjust to taste

  // Set default offset based on device
  let yOffset = isMobile ? yOffsetMobile : yOffsetDesktop;

  // --- Fine-tune for specific sections ---
  if (id === "everything-rise") {
    yOffset = isMobile ? -40 : -120;  // mobile scrolls lower, desktop unchanged
  }

  if (id === "ai-guide") {
    yOffset = isMobile ? -100 : -200; // mobile scrolls lower, desktop unchanged
  }

  // --- Perform scroll ---
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
          RISE Members Area ✨
        </h1>
        <p className="mt-1 text-sm md:text-base opacity-80">
          Your space to realign and grow.
        </p>
        <p className="mt-3 text-base md:text-lg opacity-85">
          Inside RISE, you&apos;ll find guided meditations, weekly wisdom, monthly live sessions,
          members-only AI guidance, alignment guides, and a media inspiration space. You can move
          slowly—everything here is designed to support you at your pace.
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


{/* QUICK ACTION BAR – mobile = regular card, desktop = sticky oval */}
<section className="mt-4 mb-4 min-[1000px]:sticky min-[1000px]:top-[2.5rem] min-[1000px]:z-30">

  {/* MOBILE (0–999px) */}
  <div className="max-[999px]:block min-[1000px]:hidden rounded-2xl bg-[var(--color-teal-850)]/45 ring-1 ring-white/18 px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
    <p className="text-[11px] uppercase tracking-[0.18em] opacity-75 text-center mb-3">
      RISE Shortcuts
    </p>

<div className="grid grid-cols-2 min-[600px]:grid-cols-3 min-[750px]:grid-cols-4 gap-2">
      <button
        type="button"
        onClick={() => handleJump("welcome")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/15 active:translate-y-[1px] transition"
      >
        <span>🙏</span>
        <span>Welcome</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("start-here")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/15 active:translate-y-[1px] transition"
      >
        <span>🎬</span>
        <span>Start here</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("regular-rhythm")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <span>🔁</span>
        <span>Your rhythm</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("ai-guide")}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <img
          src="/headshot.jpg"
          alt="Dr. Salerno AI"
          className="h-5 w-5 rounded-full object-cover ring-1 ring-white/25"
        />
        <span>Core tools</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("everything-rise")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <span>🌐</span>
        <span>All tools</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("faqs")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <span>❓</span>
        <span>FAQs</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("roadmap")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <span>🗺️</span>
        <span>Roadmap</span>
      </button>

      <button
        type="button"
        onClick={() => handleJump("account-billing")}
        className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
      >
        <span>💳</span>
        <span>Account &amp; Billing</span>
      </button>
    </div>
  </div>

  {/* DESKTOP (≥ 1000px) */}
  <div className="hidden min-[1000px]:flex flex-wrap items-center gap-2.75 rounded-full bg-[var(--color-teal-850)]/20 ring-1 ring-white/20 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-sm transition">
    {/* Welcome */}
    <button
      type="button"
      onClick={() => handleJump("welcome")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/15 active:translate-y-[1px] transition"
    >
      <span>🙏</span>
      <span>Welcome</span>
    </button>

    {/* Start Here */}
    <button
      type="button"
      onClick={() => handleJump("start-here")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/15 active:translate-y-[1px] transition"
    >
      <span>🎬</span>
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
      <span>Core tools</span>
    </button>

    {/* Everything in RISE */}
    <button
      type="button"
      onClick={() => handleJump("everything-rise")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>🌐</span>
      <span>All tools</span>
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
      <span>🗺️</span>
      <span>Roadmap</span>
    </button>

    {/* Account & Billing */}
    <button
      type="button"
      onClick={() => handleJump("account-billing")}
      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/12 active:translate-y-[1px] transition"
    >
      <span>💳</span>
      <span>Account &amp; Billing</span>
    </button>
  </div>
</section>


      <MembersSurveyBanner />


{/* Section divider */}
<div className="mt-11 md:mt-13 h-px w-full bg-[var(--color-gold)]/15" />

<section
  id="welcome"
  className="mt-10 md:mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7"
>
  <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-4">
    {/* RIGHT COLUMN ON DESKTOP / FIRST ON MOBILE – TEXT */}
    <div className="order-1 md:order-2 flex flex-col items-center text-center max-w-[420px] mx-auto md:mx-0">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-[var(--color-cream)]">
        Welcome to RISE
      </h2>

      <div className="w-14 h-px bg-[var(--color-gold)] mt-5 mb-3"></div>

      <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.16em] opacity-70">
        A personal welcome from Dr. JP Salerno, your transformation advisor
      </p>
    </div>

    {/* LEFT COLUMN ON DESKTOP / SECOND ON MOBILE – VIDEO */}
    <div className="order-2 md:order-1 flex justify-center md:justify-start md:ml-15 mt-6 md:mt-0">
      <iframe
        className="rounded-xl"
        width="320"
        height="568"
        src="https://www.youtube.com/embed/5fwSA9YxsGA"
        title="Welcome Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>









{/* Section divider */}
<div className="mt-11 md:mt-13 h-px w-full bg-[var(--color-gold)]/15" />

{/* START HERE – FIRST 7 DAYS (Accordion Cards) */}
<section
  id="start-here"
  className="mt-10 md:mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7"
>
  <p className="text-xs md:text-sm uppercase tracking-[0.16em] opacity-70 mb-1">
    A gentle place to begin
  </p>
  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
    Start here — your first 7 days
  </h2>
  <p className="mt-2 text-sm md:text-base opacity-85">
    A simple, calm path to help you ease into RISE without pressure. Take what you need and move at
    your own pace.
  </p>

      {/* 1 column on mobile; 2 fixed columns on desktop — Safari-safe */}
  <div className="mt-5 grid md:grid-cols-2 md:gap-x-3">
    {/* Left column: 1–4 */}
    <div className="flex flex-col">
      {[
        {
          num: "1",
          title: "Arrive & get oriented",
          content:
            "Watch the welcome video, then skim the RISE roadmap (you’ll find the download further down this page). Notice one idea that makes you feel a bit more hopeful and keep it in your notes app.",
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
            "Open Dr. Salerno AI and share what you're moving through. Ask for a grounding exercise, a simple next step, or a new way to look at your situation. Save or write down any response that really helps you.",
        },
      ].map(({ num, title, content }) => (
        <details
          key={num}
          className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/10 p-4 cursor-pointer"
        >
          <summary className="flex items-center justify-between text-sm font-semibold list-none">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold bg-[var(--color-gold)]/90 text-black">
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

    {/* Right column: 5–8 */}
    <div className="flex flex-col mt-3 md:mt-0">
      {[
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
            "Visit the Custom Meditations + Transformation Calls pages and read how they work. Notice whether having a personalized meditation or 1:1 call feels like something you might benefit from presently.",
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
      ].map(({ num, title, content }) => (
        <details
          key={num}
          className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/10 p-4 cursor-pointer"
        >
          <summary className="flex items-center justify-between text-sm font-semibold list-none">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold bg-[var(--color-gold)]/90 text-black">
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
  </div>



  <p className="mt-4 text-xs md:text-sm opacity-75">
    This path is meant to support you, not pressure you. There is no ‘right’ timeline here — the
    pace that feels natural to you is the perfect one.
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
            Guided Meditations
          </span>
        </div>
        <span className="ml-3 text-xs opacity-70 transition-transform group-open:rotate-90">
          ▶
        </span>
      </summary>
      <div className="mt-2">
        <p className="text-sm opacity-80">
          On heavy days or in the small in-between moments, a short meditation becomes your reset
          button. Pick a track that matches how you feel and let it bring you back to center
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
    <details className="group mb-2.5 break-inside-avoid rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-4 shadow-[0_5px_16px_rgba(0,0,0,0.32)]">
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
          Use Dr. Salerno AI when you’re stuck or unsure what’s next. Share what’s
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
          you need a more private space.
        </p>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em] opacity-75 font-bold">
          Suggested rhythm: join live or watch replay once a month
        </p>
      </div>
    </details>
  </div>

  <p className="mt-3 text-xs md:text-sm opacity-75">
    Always remember: consistency over intensity. Let these four anchors support you in whatever
    rhythm works for you—there’s no single “right” pace.
  </p>
</section>


{/* Section divider */}
<div className="mt-10 md:mt-12 h-px w-full bg-[var(--color-gold)]/15" />

{/* FEATURED SUPPORT – DR. SALERNO AI + MONTHLY SESSION */}
<p className="text-center mt-9 text-xs md:text-sm uppercase tracking-[0.16em] opacity-70 mb-1">
  Your core tools and deeper support inside RISE
</p>

<div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-2">


  {/* DR. SALERNO AI FEATURE SECTION – DEEP BLUE CARD */}
 <section id="ai-guide" className="mb-6 break-inside-avoid rounded-2xl bg-[#0f2334] ring-1 ring-white/12 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">

    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)]/70 mb-2">
      Everyday support
    </p>
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-3">
      <img
        src="/headshot.jpg"
        alt="Dr. Juan Pablo Salerno"
        className="h-17 h-17 rounded-full object-cover ring-1 ring-white/25"
      />
<span>
  When you feel stuck, connect with Dr. Salerno AI
</span>    </h2>
    <p className="mt-2 text-sm md:text-base opacity-90 max-w-[33rem]">
    Reach out when you want thoughtful guidance, emotional clarity, or a trusted perspective.
      Dr. Salerno AI helps you understand your feelings, see things more clearly, and choose your next step.
    </p>

    {/* 1 column on mobile, 3-column waterfall on desktop */}
    <div className="mt-4 columns-1 md:columns-3" style={{ columnGap: "0.75rem" }}>
      {/* When to open it */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>When to connect</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Your mind won&apos;t stop negative thinking</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>You feel heavy and don&apos;t know why</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>You&apos;re overthinking a decision or next step</span>
          </li>
        </ul>
      </details>

      {/* What to say */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>What to bring up </span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>“Here&apos;s what happened today… help me process it.”</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>“I feel anxious in my body—what can I do right now?”</span>
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
          <span>What you receive</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>A calmer, clearer way to see your situation</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>1–3 gentle, doable next steps</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>A grounding practice you can repeat anytime</span>
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
  <section id="monthly-session" className="mb-6 break-inside-avoid rounded-2xl bg-[#0f2334] ring-1 ring-white/12 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">

    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)]/70 mb-2">
      Monthly live session
    </p>
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">📅</span>
      <span className="leading-tight">
<span className="block">Realign by attending your monthly live inner growth session</span>
  </span>
    </h2>

    <p className="mt-2 text-sm md:text-base opacity-90">
      Once a month, we pause together so you can release what you&apos;re carrying and realign with who you&apos;re becoming.{" "}
      <span className="font-semibold">You'll feel clearer, lighter, grounded, and ready for the month ahead.</span>
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
            <span>A clear intention you can return to all month</span>
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

  {/* FEATURED – CUSTOM MEDITATIONS – PREMIUM 1:1 */}
  <section id="custom-meditations" className="relative mb-6 break-inside-avoid rounded-2xl bg-[#0f2334] ring-1 ring-white/12 border border-[var(--color-gold)]/40 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">

    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]/85 mb-2">
      Premium 1:1 support
    </p>
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">🎧</span>
      <span className="leading-tight">
        <span className="block">When you need a powerful reset, consider a Custom Meditation</span>
      </span>
    </h2>

    <p className="mt-2 text-sm md:text-base opacity-90">
      A meditation created just for your energy, season of life, and goals.{" "}
      <span className="font-semibold">You&apos;ll be guided through a complimentary 30-minute Vision Call to set your intentions</span> and
      receive member-only discounted pricing on your customized meditation.
    </p>

    {/* Waterfall layout (matching others) */}
    <div className="mt-4 columns-1 md:columns-2" style={{ columnGap: "0.75rem" }}>
      {/* What you can personalize */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg:white/5 ring-1 ring-white/12 p-4 cursor-pointer bg-white/5">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>What you can personalize</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>

        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Your current emotional landscape and what you&apos;re moving through</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Your focus (clarity, grounding, confidence, healing)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Your preferred length and pace</span>
          </li>
        </ul>
      </details>

      {/* What you receive */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>What&apos;s included in your package</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>

        <ul className="mt-2 text-sm space-y-1">
                    <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Member-only discounted pricing on your meditation</span>
          </li>
                    <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>A Vision Call where you feel deeply seen and supported</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>A meditation recorded specifically for you</span>
          </li>
              <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>A specific integration plan so you know your next steps</span>
          </li>
        </ul>
      </details>
    </div>

    <div className="mt-5">
      <Link
        href="/members/custom-meditation"
        className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-xs md:text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
      >
        Create your custom meditation
      </Link>
    </div>
  </section>

  {/* FEATURED – TRANSFORMATION CALLS – PREMIUM 1:1 */}
  <section id="vision-call" className="relative mb-6 break-inside-avoid rounded-2xl bg-[#0f2334] ring-1 ring-white/12 border border-[var(--color-gold)]/40 p-6 md:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">

    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)]/85 mb-2">
      Premium 1:1 support
    </p>
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight flex items-center gap-2">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl">🧭</span>
      <span className="leading-tight">
        <span className="block">Get deeper support on a Transformation Call with Dr. Salerno</span>
      </span>
    </h2>

    <p className="mt-2 text-sm md:text-base opacity-90">
      A 60-minute session where we slow down, ground your energy, and focus fully on you.{" "}
      <span className="font-semibold">Most of the hour is spent in deep, personalized guidance</span> so you leave with practical tools
      and a clearer sense of your next chapter.
    </p>

    {/* Waterfall layout */}
    <div className="mt-4 columns-1 md:columns-2" style={{ columnGap: "0.75rem" }}>
      {/* When this is helpful */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>Examples of when a call could help</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>You&apos;re experiencing a heavy or confusing time and feel stuck</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>You want support that goes deeper than other RISE resources</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>You&apos;d benefit from a one-time reset, not weekly sessions</span>
          </li>
        </ul>
      </details>

      {/* During your hour */}
      <details className="group mb-3 break-inside-avoid rounded-xl bg-white/5 ring-1 ring-white/12 p-4 cursor-pointer">
        <summary className="flex items-center justify-between text-sm font-semibold list-none">
          <span>Examples of on the call activities</span>
          <span className="ml-2 text-xs opacity-70 transition-transform group-open:rotate-90">▶</span>
        </summary>
        <ul className="mt-2 text-sm space-y-1">
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Begin with a short grounding meditation to arrive fully</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Identify patterns and fears that keep you stuck</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Create self-worth affirmations you can return to whenever you need</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-gold)]">•</span>
            <span>Explore mindset and journaling tools tailored to your experiences</span>
          </li>
        </ul>
      </details>
    </div>

    <div className="mt-5">
      <Link
        href="/members/vision-call"
        className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-xs md:text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
      >
        Book a transformation call
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
    href="/members/resources"
    icon="📚"
    title="Social Media Inspiration Space"
    desc="Curated posts and reframes by theme. Find the prompt that shifts your day."
  />

  <Card
    href="/members/weekly-wisdom"
    icon="✉️"
    title="Weekly Wisdom Collection"
    desc="Concise, uplifting nudges to keep you moving—one each week."
  />

  <Card
    href="/members/guides"
    icon="📄"
    title="Mental Health & Alignment Guides"
    desc="Easy-to-read guides with practical insights you can use today."
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

  {/* Custom Meditations – Gold Featured */}
  <Card
    href="/members/custom-meditation"
    icon="📿"
    title="Custom Meditations"
    desc="Personalized guided meditation audio + a complimentary 30-minute Vision Call."
    classNameExtra="
      ring-[var(--color-gold)]/55
      before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl
      before:border before:border-[var(--color-gold)]/40
      after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl
      after:shadow-[inset_0_0_8px_rgba(255,215,130,0.08)]
    "
  />

  {/* New Vision Calls card — Same featured styling */}
  <Card
    href="/members/vision-call"
    icon="🧭"
    title="Transformation Call with Dr. Salerno"
    desc="A focused 60-minute session to reset, get clarity, and move forward with confidence."
    classNameExtra="
      ring-[var(--color-gold)]/55
      before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl
      before:border before:border-[var(--color-gold)]/40
      after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl
      after:shadow-[inset_0_0_8px_rgba(255,215,130,0.08)]
    "
  />

  {/* Support & Contact moved to final slot */}
  <Card
    href="/contact"
    icon="🛟"
    title="Support & Contact"
    desc="I am here to support you every step of the way. Reach out anytime with questions or concerns."
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
          as a guide, then adjust based on what feels most supportive for you.
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
          Replays are available until the next session in the Monthly Inner Growth Sessions area, so you can tune in
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
          Open the AI page for guidance. Talk to Dr. Salerno AI like you would with me. Share what you&apos;re feeling or facing,
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
          You can't fall behind and there's nothing wrong with taking a break. You can always come back to a single meditation, session replay, or AI check-in
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
          Replays live inside the Monthly Inner Growth Sessions area. You can revisit them until the next session whenever you
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


{/* ROADMAP PDF + BROWSER VIEW */}
<section
  id="roadmap"
  className="mt-8 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7"
>
  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">RISE roadmap</h2>

  <p className="mt-2 text-sm md:text-base opacity-85">
    Prefer a clean, guided overview of how to move through RISE? Access the full roadmap below—
    view it in your browser or download the PDF version.
  </p>

  {/* CTAs */}
  <div className="mt-5 flex flex-wrap gap-3">

    {/* OPEN IN BROWSER — Gamma full-view */}
    <a
      href="https://gamma.app/embed/rgasoco648olpx2?mode=fullscreen"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
    >
      Open in browser
    </a>

    {/* OPEN PDF — Opens in browser tab */}
    <a
      href="/RISE_by_DrSalerno.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-full border border-[var(--color-gold)]/70 bg-transparent px-5 py-3 text-sm font-semibold tracking-wide text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 active:translate-y-[1px]"
    >
      Download PDF
    </a>

  </div>
</section>


      {/* ACCOUNT & BILLING SECTION */}
<section
  id="account-billing"
  className="mt-8 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7"
>
  <h2 className="font-serif text-2xl md:text-3xl tracking-tight">Account & Billing</h2>
  <p className="mt-2 text-sm md:text-base opacity-85">
    Update your payment method, personal information, password, and manage your active plan.
  </p>

  <button
    onClick={handleAccountBillingClick}
    className="mt-4 inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]"
  >
    Manage account & billing
  </button>
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
      <div className="lg:hidden w-full max-w-[500px] px-0 mt-0">
        <div className="w-full px-0">
          {/* Newsletter card */}
{/* Newsletter card – hidden on mobile (≤ 999px) */}
<div className="max-[999px]:hidden min-[1000px]:block rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-6">
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
                href="https://www.youtube.com/@drjuanpablosalerno"
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
              href="https://www.youtube.com/@drjuanpablosalerno"
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

/* ===== Subcomponents ===== */

function Card({ href, icon, title, desc, onClick, classNameExtra = "" }) {
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

  const baseClasses =
    "group relative rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${title} — ${desc}`}
        className={`w-full text-left ${baseClasses} ${classNameExtra}`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={`${title} — ${desc}`}
      className={`${baseClasses} ${classNameExtra}`}
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
