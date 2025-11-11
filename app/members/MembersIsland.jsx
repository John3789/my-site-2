// app/members/MembersIsland.jsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function MembersIsland() {
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = useCallback(async (e) => {
    e.preventDefault();
    if (signingOut) return;
    setSigningOut(true);

    const ms = (typeof window !== "undefined" && (window.$memberstack || window.memberstack || window.Memberstack)) || null;

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
    window.location.href = "/membership";
  }, [signingOut]);

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 mt-10">
      {/* HERO */}
      <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold text-[var(--color-gold)]">Active Member</div>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl tracking-tight">Welcome to RISE ✨</h1>
            <p className="mt-1 text-sm md:text-base opacity-80">Your space to realign and grow.</p>
            <p className="mt-3 text-base md:text-lg opacity-85">Start with the newest RISE meditation, or explore your perks: guided meditations, weekly wisdom, monthly live sessions, members-only AI guidance, and discounted custom meditations with a complimentary 30-minute Vision Call.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/members/resources" className="inline-flex items-center rounded-full bg-[var(--color-gold)] text-black px-5 py-3 text-sm font-semibold tracking-wide hover:brightness-110 active:translate-y-[1px]">Start meditation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card href="/members/resources" icon="🧘" title="Meditation Library" desc="Guided sessions for calm, clarity, motivation, compassion, and purpose." />
          <Card href="/members/resources#social" icon="📚" title="Social Media Resources Library" desc="Curated posts and reframes by theme. Find the prompt that shifts your day." />
          <Card href="/members/resources#wisdom" icon="✉️" title="Weekly Wisdom Emails" desc="Short, uplifting nudges to keep you moving—one each week." />
          {/* NEW: Latest Guide (placed right after Weekly Wisdom) */}
          <Card href="/members/resources#guide" icon="📄" title="Mental Health & Growth Guides" desc="A digestible 1–2 page guide with practical insights you can use today." />
          <Card href="/members/live" icon="📅" title="Monthly Live Sessions Online" desc="Join the next live reset and Q&A. Recordings available until the next session." />
          {/* AI card with tiny headshot instead of icon */}
          <Card
            href="/members/ai"
            icon={<img src="/headshot.jpg" alt="Dr. Juan Pablo Salerno" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15 -mt-2" />}
            title="Dr. Juan Pablo Salerno AI"
            desc="Chat with my AI self — a digital version of me that knows my insights, guidance, and tools."
          />
          {/* UPDATED: Discounted Custom Meditations + Complimentary Vision Calls */}
          <Card href="/members/discount" icon="📿" title="Custom Meditations + Vision Calls" desc="Personalized audio (5, 10, 15 min) + a complimentary 30-minute Vision Call." />
          <Card href="/contact" icon="🛟" title="Support & Contact" desc="Reach out with concerns or browse common questions in the FAQ." />
          <Card href="/account" icon="💳" title="Account & Billing" desc="Update payment details, personal info, password, and more." />
        </div>
      </section>

      {/* WHAT'S NEW */}
      <section className="mt-10 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
        <h2 className="text-lg font-bold">What’s new</h2>
        <div className="mt-2 divide-y divide-white/10">
          <UpdateItem label="New Meditation" title="5-Minute Reset (All Levels)" date="Nov 10, 2025" href="/members/resources#reset" />
          <UpdateItem label="New Weekly Wisdom" title="How to reset on low-energy days" date="Nov 7, 2025" href="/members/resources#wisdom" />
          <UpdateItem label="Upcoming Live Session" title="November session — details posted" date="Nov 5, 2025" href="/members/live" />
        </div>
      </section>

      {/* SIGN OUT */}
      <div className="mt-8">
        <button onClick={handleSignOut} data-ms-action="logout" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 text-left disabled:opacity-60 opacity-80" disabled={signingOut}>{signingOut ? "🚪 Signing out…" : "🚪 Sign out"}</button>
      </div>
    </main>
  );
}

/* ===== Subcomponents ===== */

function Card({ href, icon, title, desc }) {
  return (
    <Link href={href} aria-label={`${title} — ${desc}`} className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition">
      <div className="text-2xl leading-none">{icon}</div>
      <div className="mt-1 text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm opacity-80">{desc}</div>
      <div className="mt-2 text-sm opacity-70 transition group-hover:translate-x-0.5">Explore →</div>
    </Link>
  );
}

function UpdateItem({ label, title, date, href }) {
  return (
    <Link href={href} className="flex items-start justify-between gap-4 py-3">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{label}</div>
        <div className="text-sm font-medium">{title}</div>
      </div>
      <div className="text-xs opacity-70">{date}</div>
    </Link>
  );
}
