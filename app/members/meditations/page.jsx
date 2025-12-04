"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import GuardedPlay from "../../components/GuardedPlay";
import MembersHomeLink from "../MembersHomeLink";

const MEDITATION_THEMES = [
  {
    id: "motivation-mindset",
    label: "Motivation & Mindset",
    description: "Short resets to help you get unstuck, clear your mind, and take aligned action.",
    meditations: [
      {
        id: "morning-reset-5min",
        title: "5-Minute Morning Reset",
        length: "5 min",
        level: "All levels",
        mood: ["energizing", "clarity"],
        language: "EN",
        audioPath: "/audio/morning-reset-5min.mp3",
        comingSoon: false,
        blurb: "A quick reset to clear mental fog and reconnect with your intention for the day.",
      },
    ],
  },
  {
    id: "mental-health-stress",
    label: "Mental Health & Stress Relief",
    description: "Gentle support for anxiety, overwhelm, and calming your nervous system on hard days.",
    meditations: [
      {
        id: "anxiety-soften-7min",
        title: "Soften Anxiety in the Body",
        length: "7 min",
        level: "All levels",
        mood: ["calming"],
        language: "EN",
        audioPath: "/audio/soften-anxiety-7min.mp3",
        comingSoon: true,
        blurb: "A body-based grounding practice to help you move from panic to presence.",
      },
    ],
  },
  {
    id: "confidence-self-worth",
    label: "Confidence & Self-Worth",
    description: "Practices to soften your inner critic, strengthen your self-confidence, self-trust, and sense of enoughness.",
    meditations: [
      {
        id: "inner-friend-8min",
        title: "Speaking to Yourself Like Your Child",
        length: "8 min",
        level: "All levels",
        mood: ["compassion"],
        language: "EN",
        audioPath: "/audio/inner-friend-8min.mp3",
        comingSoon: true,
        blurb: "Shift from harsh self-talk to a kinder, more supportive inner voice.",
      },
    ],
  },
  {
    id: "relationships-connection",
    label: "Relationships & Connection",
    description: "Guided reflections to deepen connection with yourself and the people who matter most.",
    meditations: [],
  },
  {
    id: "lost-finding-way",
    label: "Feeling Lost & Finding Your Way",
    description: "Short sessions that help you understand what’s going on inside, clear the mental fog, and reconnect with a sense of direction—one small step at a time.",
    meditations: [],
  },
  {
    id: "manifestation-intention",
    label: "Manifestation & Intention Setting",
    description: "Practices to align your energy, beliefs, and actions with what you’re calling in.",
    meditations: [],
  },
  {
    id: "rest-sleep-restoration",
    label: "Rest & Sleep Restoration",
    description: "Evening practices to help you unwind, release the day, and settle into deeper, more restorative sleep.",
    meditations: [
      {
        id: "evening-reset-10min",
        title: "Evening Reset for Busy Minds",
        length: "10 min",
        level: "All levels",
        mood: ["relaxing"],
        language: "EN",
        audioPath: "/audio/evening-reset-10min.mp3",
        comingSoon: true,
        blurb: "Gently release the weight of the day and prepare your nervous system for rest.",
      },
    ],
  },
];

export default function MeditationLibraryPage() {
      // Just used for visual feedback on the pill
  const [activeFilter, setActiveFilter] = useState(null);

  // Always show ALL themes; pills just jump
  const visibleThemes = useMemo(() => MEDITATION_THEMES, []);


  // Scrollable nav state (same as Social Media Inspiration Space)
  const navScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateNavScrollState = () => {
    const el = navScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateNavScrollState();
    const el = navScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateNavScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateNavScrollState);
  }, []);

    const handleJump = (id) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const isMobile = window.innerWidth < 768;
    // More negative = section ends up lower on the screen
    const yOffset = isMobile ? -50 : -110;

    const targetY = rect.top + scrollTop + yOffset;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  };


  const lastUpdated = "November 2025";

  return (
    <main data-page="meditations" className="mx-auto max-w-[1100px] px-6 py-10">
      {/* HEADER */}
      <section className="text-center">
        <h1 className="mt-10 font-serif text-5xl md:text-6xl">Meditation Library</h1>
        <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-5 mb-2 rounded" />
        <p className="text-center mx-auto max-w-[720px] mt-5 text-sm md:text-base text-white/80">
          A growing collection of guided sessions to build calm, clarity, motivation, compassion, and purpose – organized by theme so you can find what you need in this exact moment.
        </p>
        <p className="mt-3 text-xs text-white/50">This page will be updated periodically as new sessions are added. Last updated: {lastUpdated}</p>
      </section>

      {/* DESKTOP/TABLET STICKY NAV */}
<section className="mt-8 backdrop-blur-sm border-b border-white/10
  hidden
  min-[999px]:sticky min-[999px]:block min-[999px]:top-10 min-[999px]:z-30
">
        <div className="relative mx-auto max-w-[1100px] px-6 py-3">
          <div ref={navScrollRef} className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth" onScroll={updateNavScrollState}>
            {/* GOLD MEMBERS HOME PILL */}
<MembersHomeLink
  className="flex-shrink-0 inline-flex items-center justify-center rounded-full border-none bg-[var(--color-gold)] text-black px-3.5 py-1 text-xs font-semibold tracking-wide shadow-none transition-all hover:bg-[var(--color-gold)]/90 active:scale-95"
  showArrow={false}  // Hides the arrow
>
  <span className="opacity-100">Members Home</span>
</MembersHomeLink>







            {/* THEME BUTTONS – click → scroll, do NOT filter */}
                  {MEDITATION_THEMES.map((option) => {
  const isActive = activeFilter === option.id;
  return (
    <button
      key={option.id}
      type="button"
      onClick={() => {
        setActiveFilter(option.id);
        handleJump(option.id);
      }}
      className={
        isActive
          ? "flex-shrink-0 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-cream)] transition active:scale-95"
          : "flex-shrink-0 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-cream)]/90 transition hover:bg-white/[0.07] active:scale-95"
      }
    >
      {option.label}
    </button>
  );
})}

          </div>

          {/* Left arrow */}
          <button
            onClick={() => navScrollRef.current?.scrollBy({ left: -240, behavior: "smooth" })}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={["hidden md:flex items-center justify-center absolute left-1 top-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-sm z-20", canScrollLeft ? "border-white/25 bg-white/10 hover:bg-white/20" : "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"].join(" ")}
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            onClick={() => navScrollRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={["hidden md:flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-sm z-20", canScrollRight ? "border-white/25 bg-white/10 hover:bg-white/20" : "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"].join(" ")}
          >
            ›
          </button>
        </div>
      </section>

   {/* MOBILE NAV CHIPS — replicated from Resources page (3-up grid, teal chips) */}
<div id="quicknav" className="lg:hidden mb-8 mt-4 grid grid-cols-3 gap-2 narrow-landscape-70">

  {/* GOLD Members Home pill as FIRST pill using MembersHomeLink */}
  <MembersHomeLink
    showArrow={false}
    className="w-full rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide truncate 
               transition active:scale-95 active:brightness-110 
               bg-[var(--color-gold)] text-black border border-white/20 text-center"
  >
    Members Home
  </MembersHomeLink>

  {/* ORIGINAL TEAL PILLS */}
  {MEDITATION_THEMES.map((t) => {
    const active = activeFilter === t.id;
    return (
      <button
        key={t.id}
        onClick={() => {
          setActiveFilter(t.id);
          handleJump(t.id);
        }}
        aria-current={active ? "true" : "false"}
        className={[
          "w-full rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide truncate transition",
          "active:scale-95 active:brightness-125 bg-[var(--color-teal-800)]",
          "text-[var(--color-cream)] border border-white/12",
        ].join(" ")}
      >
        {t.label}
      </button>
    );
  })}

</div>

{/* Divider under mobile nav — matches Resources */}
<div className="lg:hidden mt-3 -mb-5 px-0">
  <div className="h-px w-[95%] lg:w-full bg-[var(--color-cream)]/15 mx-auto" />
</div>


      {/* THEMES + MEDITATION CARDS */}
      <section className="mt-10 space-y-12">
        {visibleThemes.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} />
        ))}
      </section>

      {/* QUESTIONS / CONTACT */}
      <div className="mt-8 text-center">
        <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
          Have any questions?{" "}
          <a href="/contact" className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90">
            Contact Dr. Salerno
          </a>
        </p>
      </div>

      {/* Divider ABOVE footer, desktop-only */}
      <div className="hidden md:block mx-auto max-w-[1200px] px-6 mt-8">
        <hr className="border-t border-[var(--color-cream)]/22" />
      </div>

      {/* Desktop footer row (socials + bio + legal), matching membership */}
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
            <a href="https://www.youtube.com/@drjuanpablosalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation advisor, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
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

      {/* Mobile + tablet divider */}
      <div className="md:hidden mx-auto w-full px-0 mt-8">
        <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
      </div>

      {/* Mobile footer stack */}
      <div className="lg:hidden w-full max-w-[500px] px-0 mt-6">
        <div className="mt-0 text-[13px] leading-relaxed">
          <p className="uppercase tracking-[0.18em] text-left opacity-70">Follow Dr. Salerno:</p>
          <div className="mt-3 flex items-left justify-left gap-8">
            <a href="https://www.tiktok.com/@drjuanpablosalerno" aria-label="TikTok" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/drjuanpablosalerno/" aria-label="Instagram" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@drjuanpablosalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.6 4.3 12 4.3 12 4.3s-6.6 0-8.2.4A4 4 0 0 0 1 7.5 41 41 0 0 0 .6 12 41 41 0 0 0 1 16.5a4 4 0 0 0 2.8 2.8c1.6.4 8.2.4 8.2.4s6.6 0 8.2-.4A4 4 0 0 0 23 16.5 41 41 0 0 0 23.4 12 41 41 0 0 0 23 7.5zM9.8 15.4V8.6L15.6 12l-5.8 3.4z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582412806274#" aria-label="Facebook" className="opacity-90 hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
          </div>

          <p className="mt-5 text-left opacity-85">
            Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation advisor, author, and professor—credited with more than 30 peer-reviewed publications and over 2,000 citations.
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
      <style>{`body:has(main[data-page="meditations"]) :is(footer, .site-footer, [role="contentinfo"]) { display: none !important; }`}</style>
    </main>
  );
}

function ThemeSection({ theme }) {
  const hasMeditations = theme.meditations && theme.meditations.length > 0;

  return (
    <section id={theme.id}>
      <header className="max-w-[700px]">
        <h2 className="font-serif text-2xl md:text-3xl">{theme.label}</h2>
        <p className="mt-2 text-sm text-white/75">{theme.description}</p>
      </header>

      {hasMeditations ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {theme.meditations.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} themeId={theme.id} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-white/55">
          New guided sessions for this theme are coming soon. Check back here as the library grows.
        </p>
      )}
    </section>
  );
}


function MeditationCard({ meditation, themeId }) {
  const { title, length, level, mood, language, audioPath, comingSoon, blurb } = meditation;

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-white/18 bg-white/[0.035] p-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{friendlyThemeLabel(themeId)}</p>
        <h3 className="mt-1 font-serif text-lg">{title}</h3>

        <div className="tracking-tight mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
          {length && <span className="rounded-full border border-white/20 px-2 py-[2px]">{length}</span>}
          {level && <span className="rounded-full border border-white/20 px-2 py-[2px]">{level}</span>}
          {language && <span className="rounded-full border border-white/20 px-1.5 py-[2px] uppercase">{language}</span>}
          {mood && mood.length > 0 && <span className="text-[11px] text-white/60">{mood.join(" · ")}</span>}
          {comingSoon && (
            <span className="ml-auto rounded-full bg-white/10 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-tight text-[var(--color-gold)]">
              Coming Soon
            </span>
          )}
        </div>

        {blurb && <p className="mt-3 text-sm text-white/80">{blurb}</p>}
      </div>

      <div className="mt-4">
        {comingSoon ? (
          <button type="button" disabled className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold tracking-wide text-white/60">
            Coming soon
          </button>
        ) : (
          <GuardedPlay audioPath={audioPath} label="Start session" className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold tracking-wide text-black shadow-sm transition hover:brightness-110 active:translate-y-[1px]" />
        )}
      </div>
    </article>
  );
}

function friendlyThemeLabel(themeId) {
  const found = MEDITATION_THEMES.find((t) => t.id === themeId);
  return found ? found.label : "Meditation";
}
