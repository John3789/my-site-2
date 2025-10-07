"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* =========================
   THEMES DATA
   ========================= */
const THEMES = [
  {
    slug: "motivation-mindset",
    title: "Motivation & Mindset",
    blurb: "Shift perspective and recharge your drive with affirmations and reframes.",
    collections: [
      { slug: "confidence-boost", title: "Confidence Boost", subtitle: "Reframes and tiny actions to move through self-doubt.", tags: ["Motivation", "Confidence"], items: [] },
      { slug: "positive-reframes", title: "Positive Reframes", subtitle: "Gentle perspective shifts that stick.", tags: ["Mindset", "Resilience"], items: [] },
    ],
  },
  {
    slug: "mental-health-stress",
    title: "Mental Health & Stress Relief",
    blurb: "Practical steps for everyday wellbeing and downshifting your nervous system.",
    collections: [
      { slug: "everyday-wellbeing", title: "Everyday Wellbeing", subtitle: "Small habits that compound over time.", tags: ["Wellbeing", "Habits"], items: [] },
      { slug: "calm-in-chaos", title: "Calm in Chaos", subtitle: "Grounding tools for busy environments.", tags: ["Stress relief", "Grounding"], items: [] },
    ],
  },
  {
    slug: "self-compassion-healing",
    title: "Self-Compassion & Healing",
    blurb: "Practices for forgiving, softening, and rebuilding resilience after setbacks.",
    collections: [
      { slug: "compassion-practices", title: "Compassion Practices", subtitle: "Moments to offer yourself kindness.", tags: ["Compassion", "Healing"], items: [] },
      { slug: "healing-habits", title: "Healing Habits", subtitle: "Daily cues that create space to recover.", tags: ["Recovery", "Self-care"], items: [] },
    ],
  },
  {
    slug: "relationships-connection",
    title: "Relationships & Connection",
    blurb: "Build healthier everyday relationships—with friends, family, colleagues, and community.",
    collections: [
      { slug: "everyday-connection", title: "Everyday Connection", subtitle: "Small ways to nurture belonging and support.", tags: ["Connection", "Community"], items: [] },
      { slug: "communication-shifts", title: "Communication Shifts", subtitle: "Gentle ways to express yourself clearly.", tags: ["Communication", "Clarity"], items: [] },
    ],
  },
  {
    slug: "purpose-alignment",
    title: "Purpose & Alignment",
    blurb: "Connect with your deeper why and align your daily actions to it.",
    collections: [
      { slug: "values-check", title: "Values Check", subtitle: "Reflection prompts to guide decisions.", tags: ["Purpose", "Values"], items: [] },
      { slug: "alignment-habits", title: "Alignment Habits", subtitle: "Simple steps to bring goals and life closer.", tags: ["Alignment", "Direction"], items: [] },
    ],
  },
  {
    slug: "manifestation-intentions",
    title: "Manifestation & Intention Setting",
    blurb: "Align actions with vision through clear intentions and consistent micro-moves.",
    collections: [
      { slug: "morning-clarity", title: "Morning Clarity", subtitle: "Orient your day toward purpose.", tags: ["Clarity", "Intention"], items: [] },
      { slug: "get-unstuck", title: "Get Unstuck", subtitle: "From hesitation to first step.", tags: ["Momentum", "Action"], items: [] },
    ],
  },
  {
    slug: "feng-shui-environment",
    title: "Feng Shui & Environment",
    blurb: "Small environmental shifts that support energy, focus, and rest.",
    collections: [
      { slug: "clarity-corners", title: "Clarity Corners", subtitle: "Tidy cues that nudge focus.", tags: ["Focus", "Simplicity"], items: [] },
      { slug: "rest-friendly-bedroom", title: "Rest-Friendly Bedroom", subtitle: "Edit the room, not your willpower.", tags: ["Rest", "Sleep"], items: [] },
    ],
  },
];

export default function ResourcesPage() {
  // 👇 This runs only while the Resources page is mounted
  useEffect(() => {
    document.body.classList.add("hide-footer-on-resources");
    return () => document.body.classList.remove("hide-footer-on-resources");
  }, []);

  const [open, setOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentId, setCurrentId] = useState(THEMES[0].slug);

  // 🟩 FIX: mobile overlap of zoomed header
  const headerZoomRef = useRef(null);
  const mobileSpacerRef = useRef(null);

  useEffect(() => {
    function updateMobileSpacer() {
      if (window.innerWidth >= 768) {
        if (mobileSpacerRef.current) mobileSpacerRef.current.style.height = "0px";
        return;
      }

      const Z = 3.0;
      const ZL = 1.6;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const scale = isLandscape ? ZL : Z;

      const el = headerZoomRef.current;
      if (!el) return;
      const h = el.offsetHeight || 0;
      const extra = Math.max(0, h * (scale - 1));

      if (mobileSpacerRef.current) {
        mobileSpacerRef.current.style.height = `${extra}px`;
      }
    }

    updateMobileSpacer();
    window.addEventListener("resize", updateMobileSpacer);
    window.addEventListener("orientationchange", updateMobileSpacer);
    const t = setTimeout(updateMobileSpacer, 50);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateMobileSpacer);
      window.removeEventListener("orientationchange", updateMobileSpacer);
    };
  }, []);
  // 🟩 END FIX

  /* ========= Sticky pill nav: scroll affordances ========= */
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

  const scrollNavBy = (delta) => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  /* ========= Active section highlight ========= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setCurrentId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.2, 0.5, 0.8] }
    );
    THEMES.forEach((t) => {
      const el = document.getElementById(t.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleJump = (slug) => {
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ========= Desktop sticky nav ========= */
  const Nav = useMemo(() => {
    return (
      <div className="z-30 bg-transparent md:bg-[var(--color-teal-850)]/80">
        <div className="relative mx-auto max-w-[1200px] px-6 py-3">
          <div
            ref={navScrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
            onScroll={updateNavScrollState}
          >
            {THEMES.map((t) => {
              const active = currentId === t.slug;
              return (
                <button
                  key={t.slug}
                  onClick={() => handleJump(t.slug)}
                  aria-current={active ? "true" : "false"}
                  className={[
                    "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-wide transition",
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-black shadow-sm"
                      : "border-white/20 bg-white/5 text-[var(--color-cream)] hover:bg-white/10",
                  ].join(" ")}
                >
                  {t.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="h-px w-full bg-[var(--color-cream)]/15" />
          </div>
        </div>
      </div>
    );
  }, [currentId, canScrollLeft, canScrollRight]);

  return (
    <>
      <main className="relative isolate min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-teal-850)]" />

        {/* 1) ZOOM WRAPPER — Title + Intro + Mobile Nav */}
        <div
          style={{ "--z": 3.0, "--zoomL": 1.60 }}
          className={`
            md:contents
            origin-top
            [transform:scale(var(--z))] [width:calc(100%/var(--z))]
            mx-auto
            md:[transform:none] md:[width:100%]
            landscape:[transform:scale(var(--zoomL))] landscape:[width:calc(100%/var(--zoomL))]
            overflow-visible
          `}
        >
          <div ref={headerZoomRef}>
            {/* Title + Intro */}
            <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-6">
              <h1 className="text-center font-serif text-6xl leading-[1.06] opacity-95 mb-3 mt-3">
                Resources
              </h1>
              <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 mb-6 rounded" />

              <section className="mx-auto max-w-[900px] px-6 text-center mb-6">
                <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                  A growing library of concise collections—shaped by science and lived
                  experience—to sharpen your mind and uplift your life. Each theme is
                  designed to meet you where you are and guide you toward greater
                  confidence, balance, and intentional living.
                </p>
                <p className="mt-5 text-sm opacity-70">
                  This page is under construction and will be updated periodically with
                  new content.
                </p>
              </section>
            </div>

            {/* Mobile nav */}
            <div className="md:hidden mt-4 grid grid-cols-3 gap-2">
              {THEMES.map((t) => {
                const active = currentId === t.slug;
                return (
                  <button
                    key={t.slug}
                    onClick={() => handleJump(t.slug)}
                    aria-current={active ? "true" : "false"}
                    className={[
                      "w-full rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide truncate transition",
                      "active:scale-95 active:brightness-125",
                      "bg-[var(--color-teal-800)] text-[var(--color-cream)] border border-white/12",
                    ].join(" ")}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>

            {/* Divider under nav */}
            <div className="md:hidden">
              <div className="mx-auto max-w-[1200px] px-6 mt-3 -mb-1">
                <div className="h-px w-full bg-[var(--color-cream)]/15" />
              </div>
            </div>
          </div>
        </div>

        {/* 🟩 Spacer dynamically sized for zoomed header on mobile */}
        <div ref={mobileSpacerRef} className="md:hidden" />

        {/* Desktop sticky sub-nav */}
        <div className="hidden md:block sticky top-[64px] z-30 bg-[var(--color-teal-850)]/80">
          {Nav}
        </div>

        {/* 3) ZOOM WRAPPER — Sections */}
        {/* (your entire sections block goes here exactly as-is) */}
        {/* ... */}
      </main>
    </>
  );
}
