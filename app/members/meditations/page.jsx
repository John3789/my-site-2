"use client";

import { useState, useMemo } from "react";
// Adjust this import path to match where GuardedPlay lives in your project
import GuardedPlay from "../../components/GuardedPlay";

const MEDITATION_THEMES = [
  {
    id: "motivation-mindset",
    label: "Motivation & Mindset",
    description: "Short resets to help you get unstuck, refocus, and take aligned action.",
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
        blurb: "A quick reset to clear mental fog and reconnect with your intention for the day."
      },
      {
        id: "evening-reset-10min",
        title: "Evening Reset for Busy Minds",
        length: "10 min",
        level: "All levels",
        mood: ["grounding", "unwinding"],
        language: "EN",
        audioPath: "/audio/evening-reset-10min.mp3",
        comingSoon: true,
        blurb: "Gently release the weight of the day and prepare your nervous system for rest."
      }
    ]
  },
  {
    id: "mental-health-stress",
    label: "Mental Health & Stress Relief",
    description: "Support for anxiety, overwhelm, and emotional regulation on hard days.",
    meditations: [
      {
        id: "anxiety-soften-7min",
        title: "Soften Anxiety in the Body",
        length: "7 min",
        level: "All levels",
        mood: ["calming", "regulation"],
        language: "EN",
        audioPath: "/audio/soften-anxiety-7min.mp3",
        comingSoon: true,
        blurb: "A body-based grounding practice to help you move from panic to presence."
      }
    ]
  },
  {
    id: "self-compassion-healing",
    label: "Self-Compassion & Healing",
    description: "Practices to quiet the inner critic and meet yourself with more gentleness.",
    meditations: [
      {
        id: "inner-friend-8min",
        title: "Speaking to Yourself Like a Friend",
        length: "8 min",
        level: "All levels",
        mood: ["soft", "heart-opening"],
        language: "EN",
        audioPath: "/audio/inner-friend-8min.mp3",
        comingSoon: true,
        blurb: "Shift from harsh self-talk to a kinder, more supportive inner voice."
      }
    ]
  },
  {
    id: "relationships-connection",
    label: "Relationships & Connection",
    description: "Guided reflections to deepen connection with yourself and others.",
    meditations: []
  },
  {
    id: "purpose-alignment",
    label: "Purpose & Alignment",
    description: "Come back to your values, vision, and the bigger “why” behind your life.",
    meditations: []
  },
  {
    id: "manifestation-intention",
    label: "Manifestation & Intention Setting",
    description: "Align your energy, beliefs, and actions with what you’re calling in.",
    meditations: []
  },
  {
    id: "fengshui-environment",
    label: "Feng Shui & Environment",
    description: "Support for clearing, grounding, and energizing the spaces you live in.",
    meditations: []
  }
];

const ALL_FILTER_OPTION = { id: "all", label: "All themes" };

export default function MeditationLibraryPage() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER_OPTION.id);

  const visibleThemes = useMemo(() => {
    if (activeFilter === ALL_FILTER_OPTION.id) return MEDITATION_THEMES;
    return MEDITATION_THEMES.filter((theme) => theme.id === activeFilter);
  }, [activeFilter]);

  const lastUpdated = "November 2025"; // Update this as you add recordings

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      {/* HEADER */}
      <section className="text-center">

        <h1 className="mt-15 font-serif text-5xl md:text-6xl">
          Meditation Library
        </h1>
                  <div className="h-[2px] w-20 bg-[var(--color-gold)]/80 mx-auto mt-5 mb-0 rounded" />

        <p className="mt-4 text-sm md:text-base text-white/80">
          A growing collection of guided sessions to build calm, clarity, motivation,
          compassion, and purpose – organized by theme so you can find what you need
          in this exact moment.
        </p>
        <p className="mt-3 text-xs text-white/50">
          Last updated: {lastUpdated}
        </p>
      </section>

     

      {/* FILTER BAR */}
      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[ALL_FILTER_OPTION, ...MEDITATION_THEMES].map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setActiveFilter(option.id)}
                className={
                  isActive
                    ? "inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-black shadow-sm transition active:scale-95"
                    : "inline-flex items-center rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-cream)] transition hover:bg-white/[0.07] active:scale-95"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* THEMES + MEDITATION CARDS */}
      <section className="mt-10 space-y-12">
        {visibleThemes.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} />
        ))}
      </section>
    </main>
  );
}

function ThemeSection({ theme }) {
  const hasMeditations = theme.meditations && theme.meditations.length > 0;

  return (
    <section id={theme.id}>
      <header className="max-w-[700px]">
        <h2 className="font-serif text-2xl md:text-3xl">
          {theme.label}
        </h2>
        <p className="mt-2 text-sm text-white/75">
          {theme.description}
        </p>
      </header>

      {hasMeditations ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {theme.meditations.map((meditation) => (
            <MeditationCard key={meditation.id} meditation={meditation} themeId={theme.id} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-white/55">
          New guided sessions for this theme are coming soon. Check back here as the
          library grows.
        </p>
      )}
    </section>
  );
}

function MeditationCard({ meditation, themeId }) {
  const {
    title,
    length,
    level,
    mood,
    language,
    audioPath,
    comingSoon,
    blurb
  } = meditation;

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-white/18 bg-white/[0.035] p-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          {friendlyThemeLabel(themeId)}
        </p>
        <h3 className="mt-1 font-serif text-lg">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-white/70">
          {length && (
            <span className="rounded-full border border-white/20 px-2 py-[2px]">
              {length}
            </span>
          )}
          {level && (
            <span className="rounded-full border border-white/20 px-2 py-[2px]">
              {level}
            </span>
          )}
          {language && (
            <span className="rounded-full border border-white/20 px-2 py-[2px] uppercase">
              {language}
            </span>
          )}
          {mood && mood.length > 0 && (
            <span className="text-[11px] text-white/60">
              {mood.join(" · ")}
            </span>
          )}
          {comingSoon && (
            <span className="ml-auto rounded-full bg-white/10 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
              Coming Soon
            </span>
          )}
        </div>

        {blurb && (
          <p className="mt-3 text-sm text-white/80">
            {blurb}
          </p>
        )}
      </div>

      <div className="mt-4">
        {comingSoon ? (
          <button
            type="button"
            disabled
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold tracking-wide text-white/60"
          >
            Coming soon
          </button>
        ) : (
          <GuardedPlay
            audioPath={audioPath}
            label="Start session"
            className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold tracking-wide text-black shadow-sm transition hover:brightness-110 active:translate-y-[1px]"
          />
        )}
      </div>
    </article>
  );
}

function friendlyThemeLabel(themeId) {
  const found = MEDITATION_THEMES.find((t) => t.id === themeId);
  return found ? found.label : "Meditation";
}
