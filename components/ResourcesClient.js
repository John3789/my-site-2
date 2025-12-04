// app/resources/page.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import PopupIsland from "./PopupIsland";
import { useIosZoomVars } from "../components/useIosZoom";
import MobileFooterSubscribeClient from "./MobileFooterSubscribeClient";
import MembersHomeLink from "../app/members/MembersHomeLink";

const BYPASS_RESOURCES_GATE = true; // 👈 set to true while designing


/* =========================
   THEMES DATA
   ========================= */

// ---- Resources mobile jump + wraparound order ----
const RES_SECTIONS = [
  "motivation-mindset",
  "confidence-self-worth",
  "mental-health-stress",
  "self-compassion-healing",
  "relationships-connection",
  "lost-finding-way",
  "manifestation-intention",
]; // first -> last

const idxRes = (id) => RES_SECTIONS.indexOf(id);
const prevRes = (id) =>
  RES_SECTIONS[(idxRes(id) - 1 + RES_SECTIONS.length) % RES_SECTIONS.length];
const nextRes = (id) =>
  RES_SECTIONS[(idxRes(id) + 1) % RES_SECTIONS.length];

// Smooth scroll with iPhone landscape-friendly offset
function jumpRes(targetId, opts = {}) {
  const el =
    document.getElementById(targetId) ||
    document.querySelector(`[data-anchor="${targetId}"]`);
  if (!el) return;

  const isIphoneLandscape = window.matchMedia(
    "(max-width: 950px) and (orientation: landscape)"
  ).matches;

  const HEADER_OFFSET = isIphoneLandscape ? 92 : 0; // tweak if your sticky header is taller/shorter

  if (opts.center) {
    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      HEADER_OFFSET -
      window.innerHeight / 2 +
      el.offsetHeight / 2;
    window.scrollTo({ top: y, behavior: "smooth" });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const THEMES = [
  {
    slug: "motivation-mindset",
    title: "Motivation & Mindset",
    blurb:
      "Reels to shift your mindset, boost motivation, and get you back into motion when you've been feeling stuck, on auto-pilot, or second-guessing yourself.",
    collections: [
      {
        slug: "motivation-reset",
        title: "Motivation Reset",
        subtitle:
          "Short, direct boosts for when you’re procrastinating, stalling, or talking yourself out of what you want.",
        tags: ["Motivation", "Action"],
        items: [],
      },
      {
        slug: "mindset-shifts",
        title: "Mindset Shifts That Stick",
        subtitle:
          "Reframes that challenge all-or-nothing thinking, perfectionism, and fear of failure—without toxic positivity.",
        tags: ["Mindset", "Resilience"],
        items: [],
      },
    ],
  },

  {
    slug: "confidence-self-worth",
    title: "Confidence & Self-Worth",
    blurb:
      "Reels to strengthen self-worth, soften harsh self-criticism, and help you show up with grounded confidence—not fake hype.",
    collections: [
      {
        slug: "inner-worth-reminders",
        title: "Remembering Your Worth",
        subtitle:
          "Go-to reels for the moments you feel behind, not enough, or like everyone else is further ahead than you.",
        tags: ["Self-worth", "Comparison"],
        items: [],
      },
      {
        slug: "self-trust-moments",
        title: "Building Self-Trust",
        subtitle:
          "Stories and prompts that support trusting your decisions, boundaries, and unique timing—especially when others don’t fully get it.",
        tags: ["Self-trust", "Boundaries"],
        items: [],
      },
            {
        slug: "compassion-practices",
        title: "Softening Self-Judgment",
        subtitle:
          "Reframes for when your inner critic is loud, cruel, or stuck in shame—and you need a kinder voice.",
        tags: ["Self-compassion", "Inner critic"],
        items: [],
      },
    ],
  },

  {
    slug: "mental-health-stress",
    title: "Mental Health & Stress Relief",
    blurb:
      "Grounded mental health reels—about anxiety, burnout, and overwhelm—that normalize what you’re feeling and offer practical ways to steady yourself.",
    collections: [
      {
        slug: "everyday-wellbeing",
        title: "Stress & Overwhelm Check-Ins",
        subtitle:
          "Reels that name what you're going through so you can stop blaming yourself and start responding with more care.",
        tags: ["Stress", "Overwhelm"],
        items: [],
      },
      {
        slug: "calm-in-chaos",
        title: "Anxiety, Burnout & Reset",
        subtitle:
          "Tools, scripts, and tiny steps to calm your system without pretending everything is fine when it isn’t.",
        tags: ["Anxiety", "Burnout"],
        items: [],
      },
    ],
  },
  {
    slug: "relationships-connection",
    title: "Relationships & Connection",
    blurb:
      "Reels on the quiet stuff under your relationships: feeling unseen, over-giving, people-pleasing, and craving deeper connection. Guidance for creating relationships that actually feel good to be in.",
    collections: [
      {
        slug: "everyday-connection",
        title: "Everyday Relationship Dynamics",
        subtitle:
          "Guidance for navigating miscommunication, emotional distance, and feeling like you’re ‘too much’ or ‘not enough’ for the people around you.",
        tags: ["Relationships", "Belonging"],
        items: [],
      },
      {
        slug: "communication-shifts",
        title: "Honest Conversations",
        subtitle:
          "On setting boundaries, expressing your needs, or repairing after conflict—without losing yourself.",
        tags: ["Communication", "Boundaries"],
        items: [],
      },
    ],
  },

  {
    slug: "lost-finding-way",
    title: "Feeling Lost & Finding Your Way",
    blurb:
      "Reels for the seasons when life feels confusing, heavy, or directionless. These help you understand what’s happening inside and with taking the right next step instead of staying stuck.",
    collections: [
      {
        slug: "understanding-yourself",
        title: "Understanding What You’re Feeling",
        subtitle:
          "Reels that help you name your what you're navigating, your patterns, and what’s actually underneath the fog—not just ‘I don’t know.’",
        tags: ["Clarity", "Awareness"],
        items: [],
      },
      {
        slug: "finding-direction",
        title: "Finding Your Next Step",
        subtitle:
          "Grounding reminders and prompts for when you feel lost, behind, or unsure where life is heading—but understanding you’re meant for more.",
        tags: ["Direction", "Next steps"],
        items: [],
      },
    ],
  },

  {
    slug: "manifestation-intention",
    title: "Manifestation & Intention Setting",
    blurb:
      "Reels that support you in getting intentional about your life—your choices, your energy, and the direction you’re moving—so what you want becomes something you actively build, not wait for.",
    collections: [
      {
        slug: "morning-clarity",
        title: "Intention in Real Life",
        subtitle:
          "Practical, grounded ways to set intentions for your day, your goals, and your energy—without pressure to be ‘high vibe’ all the time.",
        tags: ["Intention", "Alignment"],
        items: [],
      },
      {
        slug: "get-unstuck",
        title: "Manifesting Through Action",
        subtitle:
          "Reframes and steps that move you from wishing and waiting into small, aligned decisions that actually shift your reality.",
        tags: ["Momentum", "Action"],
        items: [],
      },
    ],
  },
];



export default function ResourcesClient() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.00 });



  useEffect(() => {
    document.body.classList.add("hide-footer-on-resources");
    return () => document.body.classList.remove("hide-footer-on-resources");
  }, []);

    // 🔒 Memberstack gate
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState("checking");

    useEffect(() => {
  let cancelled = false;

  async function checkMembership() {
    // 🔧 Bypass in design mode so you can see the page even if Memberstack is broken
    if (BYPASS_RESOURCES_GATE) {
      setAuthStatus("ready");
      return;
    }

    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack ||
          window.memberstack ||
          window.Memberstack)) ||
      null;

    if (!ms || !ms.getCurrentMember) {
      router.replace("/membership?locked=resources");
      return;
    }

      try {
        const member = await ms.getCurrentMember();

        if (!member || !member.data) {
          router.replace("/membership?locked=resources");
          return;
        }

        const planConnections = member.data.planConnections || [];
        const activePlanIds = planConnections.map((p) => p.planId);

        // 👉 Replace with your real RISE plan IDs
        const ALLOWED_PLAN_IDS = [
          "pln_rise-monthly-plan-y9ao098m",
          "pln_rise-yearly-plan-aw6404a4",
        ];

        const hasAccess = activePlanIds.some((id) =>
          ALLOWED_PLAN_IDS.includes(id)
        );

        if (!hasAccess) {
          router.replace("/membership?locked=resources");
          return;
        }

        if (!cancelled) {
          setAuthStatus("ready");
        }
      } catch (err) {
        router.replace("/membership?locked=resources");
      }
    }

    checkMembership();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const [open, setOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentId, setCurrentId] = useState(THEMES[0].slug);

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
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
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

  const openCollection = (col, themeTitle) => {
    setActiveCollection({ ...col, theme: themeTitle });
    setOpen(true);
  };

  /* ========= Desktop sticky subnav (outside zoom) ========= */
    const Nav = useMemo(() => {
    return (
      <div className="z-30 bg-transparent">
        <div className="relative mx-auto max-w-[1200px] px-6 py-3">
          <div
            ref={navScrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
            onScroll={updateNavScrollState}
          >
            {/* First pill: Members Home (gold) */}
            <a
              href="/members"
              className="whitespace-nowrap rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-black shadow-sm transition active:scale-95"
            >
              Members Home
            </a>

            {/* Theme pills: always green */}
            {THEMES.map((t) => {
              const active = currentId === t.slug;
              return (
                <button
                  key={t.slug}
                  onClick={() => handleJump(t.slug)}
                  aria-current={active ? "true" : "false"}
                  className="whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold tracking-wide text-[var(--color-cream)] transition hover:bg-white/10"
                >
                  {t.title}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => scrollNavBy(-240)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={[
                "absolute left-1 top-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-sm",
                canScrollLeft ? "border-white/25 bg-white/10 hover:bg-white/20" : "border-white/10 bg-white/5 opacity-50 cursor-not-allowed",
              ].join(" ")}
            >
              ‹
            </button>
            <button
              onClick={() => scrollNavBy(240)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={[
                "absolute right-1 top-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-sm",
                canScrollRight ? "border-white/25 bg-white/10 hover:bg-white/20" : "border-white/10 bg-white/5 opacity-50 cursor-not-allowed",
              ].join(" ")}
            >
              ›
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="h-px w-full bg-[var(--color-cream)]/15" />
          </div>
        </div>
      </div>
    );
  }, [currentId, canScrollLeft, canScrollRight]);

    if (authStatus !== "ready") {
    return (
      <main className="mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-6 text-center text-[var(--color-cream)]">
        <p className="text-sm opacity-80">Checking your membership…</p>
      </main>
    );
  }

  return (
    <>
      <main 
        data-page="resources"
  className="relative isolate min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]"
>

        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-teal-850)]" />


        {/* ===== SINGLE MOBILE ZOOM WRAPPER (title + intro + mobile nav + sections + mobile footer) ===== */}
        <div
          ref={wrapRef}
          className={`lg:contents origin-top data-[zoom=on]:[transform:scale(var(--z))] data-[zoom=on]:[width:calc(100%/var(--z))] mx-auto lg:[transform:none] lg:[width:100%] landscape:data-[zoom=on]:[transform:scale(calc(var(--zoomL)/var(--vv,1)))] landscape:data-[zoom=on]:[width:calc(100%/(var(--zoomL)/var(--vv,1)))] overflow-visible`}
        >
          {/* Members home link — placed higher */}
          <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-2">
          </div>

          {/* Title + intro */}
          <div className="mx-auto max-w-[1200px] px-6 pt-4 pb-6">
            <h1 className="text-center font-serif text-5xl md:text-6xl leading-[1.06] opacity-95 mb-3 mt-5">
              Social Media Inspiration Space
            </h1>

            <div className="h-[2px] w-16 bg-[var(--color-gold)]/80 mx-auto mt-4 -mb-1 rounded" />
          </div>



            <section className="mx-auto max-w-[750px] px-6 text-center mb-6 narrow-landscape-80 narrow-landscape-80-ipad [@media(orientation:portrait)_and_(max-width:600px)]:px-3 [@media(orientation:portrait)_and_(max-width:600px)]:max-w-none [@media(orientation:portrait)_and_(max-width:600px)]:w-[92vw]">

              <p className="text-base md:text-md opacity-90 leading-loose">
                A growing space of concise media collections—shaped to sharpen your mind and uplift your life. Designed to meet you where you are and guide you toward greater confidence and balance.
              </p>
              <p className="mt-3 text-sm opacity-70">This page is under construction and will be updated periodically with new content.</p>
            </section>

            {/* Mobile nav chips */}
            <div id="quicknav" className="lg:hidden mb-8 mt-4 grid grid-cols-3 gap-2 narrow-landscape-80">
              {THEMES.map((t) => {
                const active = currentId === t.slug;
                return (
                  <button
                    key={t.slug}
                    onClick={() => handleJump(t.slug)}
                    aria-current={active ? "true" : "false"}
                    className={["w-full rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide truncate transition active:scale-95 active:brightness-125 bg-[var(--color-teal-800)] text-[var(--color-cream)] border border-white/12"].join(" ")}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>

            {/* Divider under mobile nav */}
            <div className="lg:hidden mt-3 -mb-5 px-0"> 
                <div className="h-px w-[95%] lg:w-full bg-[var(--color-cream)]/15 mx-auto" />
            </div>
          </div>

          {/* Desktop sticky subnav — sits right under the intro on desktop */}
<div className="hidden lg:block sticky top-[31px] z-30 bg-[var(--color-teal-850)]/80">
  {Nav}
</div>


          {/* ===== Sections (now inside the same zoom on mobile) ===== */}
          <section className="mx-auto max-w-[1200px] px-6 pt-0 md:pt-2 pb-20 narrow-landscape-80">
            <div className="space-y-8 md:space-y-14">
              {THEMES.map((theme, idx) => (
                <section key={theme.slug} id={theme.slug} className="scroll-mt-28">
                  <header className="mb-4">
                    <h2 className="font-serif text-[clamp(26px,3.3vw,34px)] opacity-95 mt-8 md:mt-12">{theme.title}</h2>
                    <div className="h-[2px] w-12 bg-[var(--color-gold)]/85 rounded mt-0" />
                    <p className="opacity-85 mt-3 max-w-3xl">{theme.blurb}</p>
                  </header>

                  <ul className="grid gap-8 md:grid-cols-2">
                    {theme.collections.map((col) => {
                      const hasItems = !!(col.items && col.items.length > 0);
                      return (
                        <li key={col.slug} className="relative h-full rounded-2xl ring-1 ring-white/10 bg-white/5 p-6 shadow-2xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col">
                          <span className="pointer-events-none absolute left-0 top-1 bottom-1 w-[3px] rounded-l-2xl bg-[var(--color-gold)]/70" />
                          <div>
                            <h3 className="font-serif text-[20px] md:text-[22px] opacity-95">{col.title}</h3>
                            <div className="h-[2px] w-10 bg-[var(--color-gold)]/60 rounded mt-0" />
                            <p className="opacity-85 text-[15px] md:text-[16px] mt-2 min-h-[40px]">{col.subtitle}</p>
                          </div>

                          {col.tags?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2 min-h-[28px]">
                              {col.tags.map((t) => (
                                <span key={t} className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[12px]">{t}</span>
                              ))}
                            </div>
                          ) : (
                            <div className="mt-3 min-h-[28px]" />
                          )}

                          <div className="flex-1" />

                          <div className="mt-5 flex flex-wrap gap-3">
                            {hasItems ? (
                              <button onClick={() => openCollection(col, theme.title)} className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition" aria-label={`Open collection ${col.title}`}>View Collection</button>
                            ) : (
                              <button disabled className="rounded-full border border-white/20 px-4 py-2 opacity-60 cursor-not-allowed" aria-label="Collection coming soon">Coming Soon</button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Mobile section footer nav */}
                  <div className="lg:hidden mt-6 flex items-center justify-center gap-2">
                    {/* Prev — wraps to last section */}
                    <button
                      onClick={() =>
                        handleJump(THEMES[(idx - 1 + THEMES.length) % THEMES.length].slug)
                      }
                      className="rounded-full border border-white/15 bg-[var(--color-teal-800)] px-4 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] active:scale-95 active:brightness-125"
                    >
                      ← Prev
                    </button>

                    {/* All Themes — centers chips with iPhone-landscape offset */}
                    <button
                      onClick={() => jumpRes("quicknav", { center: true })}
                      className="rounded-full border border-white/15 bg-[var(--color-teal-800)] px-4 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] active:scale-95 active:brightness-125"
                    >
                      All Themes
                    </button>

                    {/* Next — wraps to first section */}
                    <button
                      onClick={() =>
                        handleJump(THEMES[(idx + 1) % THEMES.length].slug)
                      }
                      className="rounded-full border border-white/15 bg-[var(--color-teal-800)] px-4 py-2.5 text-[14px] font-semibold text-[var(--color-cream)] active:scale-95 active:brightness-125"
                    >
                      Next →
                    </button>
                  </div>

                  {idx < THEMES.length - 1 && (
                    <div className="mt-12">
                      <div className="h-px w-full bg-[var(--color-cream)]/16" />
                    </div>
                  )}
                </section>
              ))}
            </div> {/* closes: space-y container */}
            {/* QUESTIONS / CONTACT */}
<div className="mt-12 -mb-8 text-center">
  <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
    Have any questions?{" "}
    <a
      href="/contact"
      className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90"
    >
      Contact Dr. Salerno
    </a>
  </p>
</div>
          </section> {/* closes: outer content section (max-w-[1200px]) */}

{/* --- DESKTOP divider above newsletter --- */}
<div className="hidden lg:block mx-auto max-w-[1200px] px-6">
  <hr className="border-t border-[var(--color-cream)]/22 mt-0 mb-0" />
</div>


{/* --- MOBILE divider + footer (inside zoom, after the form) --- */}
<div className="block lg:hidden">
  <div className="mx-auto max-w-[1400px] px-6 mb-7 -mt-5">
    <hr className="w-[98%] mx-auto border-t border-[var(--color-cream)]/22 mb-0" />
  </div>

  <div className="mobile-footer-cap">

    <div className="mx-auto max-w-[1400px] px-3 narrow-landscape-70">
    {/* Newsletter card (midnight blue) — hidden on mobile */}
    {/*
    <div className="rounded-xl bg-[#0f2334] ring-1 ring-white/10 p-5 shadow-2xl mt-10">
      <p className="text-[12px] uppercase tracking-[0.18em] opacity-70 mb-2">
        Science, Soul, and a Bit of Magic — Every Month
      </p>
      <p className="text-sm opacity-85 mb-3">
        Practical wisdom for modern minds — best paired with coffee and curiosity.
      </p>
      <MobileFooterSubscribeClient />
    </div>
    */}

    {/* --- MOBILE Jay-style footer block --- */}
    <div className="mt-6 text-[13px] leading-relaxed">

                    {/* 1) Heading */}
                    <p className="uppercase tracking-[0.18em] text-left opacity-70">
                      Follow Dr. Salerno:
                    </p>

                    {/* 2) Socials row — centered & evenly spaced */}
                    <div className="mt-3 flex items-left justify-left gap-8">
                      {/* TikTok */}
                      <a
                        href="https://www.tiktok.com/@drjuanpablosalerno"
                        aria-label="TikTok"
                        className="opacity-90 hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/drjuanpablosalerno/"
                        aria-label="Instagram"
                        className="opacity-90 hover:opacity-100"
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
                        </svg>
                      </a>
                      {/* YouTube */}
                      <a
                        href="https://www.youtube.com/@drjuanpablosalerno"
                        aria-label="YouTube"
                        className="opacity-90 hover:opacity-100"
                      >
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

      {/* 3) Bio line */}
      <p className="mt-5 text-left opacity-85">
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.      </p>

      {/* 4) Name with © + ™ */}
      <p className="mt-6 text-left opacity-85">
        © Dr. Juan Pablo Salerno™
      </p>

      {/* 5) Legal line (centered with dots) */}
      <p className="mt-2 mb-5 text-left opacity-85">
        <a href="/terms" className="underline underline-offset-4 hover:opacity-80">Terms</a>
        <span className="mx-2 opacity-50">·</span>
        <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">Privacy</a>
        <span className="mx-2 opacity-50">·</span>
        <span>All rights reserved</span>
      </p>
    </div>
  </div>
</div>
</div>

 {/* closes: ZOOM WRAPPER */}

{/* Desktop footer row (socials + bio / legal) */}
<div className="hidden lg:flex items-start justify-between mx-auto max-w-[1200px] px-6 mt-4 mb-10 text-[13px] leading-relaxed opacity-85">
  <div className="flex flex-col items-start text-left">
    <div className="flex items-center gap-4">
      <p className="uppercase tracking-[0.18em] opacity-70 text-[12px] m-0">
        Follow Dr. Salerno:
      </p>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@drjuanpablosalerno"
        aria-label="TikTok"
        className="opacity-90 hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M21 8.5a6.7 6.7 0 0 1-4.3-1.6v6.1a6.9 6.9 0 1 1-6.9-6.9c.4 0 .8 0 1.1.1v3a3.9 3.9 0 1 0 2.8 3.8V2h3a6.7 6.7 0 0 0 4.3 5.3z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/drjuanpablosalerno/"
        aria-label="Instagram"
        className="opacity-90 hover:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
        </svg>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@drjuanpablosalerno"
        aria-label="YouTube"
        className="opacity-90 hover:opacity-100"
      >
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

    <p className="mt-4 max-w-[500px] text-[13px] leading-relaxed">
                      Dr. Juan Pablo Salerno is an award-winning mental health science expert
                      and transformation advisor, author, and professor—credited with more than 30 peer-reviewed
                      publications and over 2,000 citations.
    </p>
  </div>

  <div className="text-left translate-y-[-4px]">
    <p>© Dr. Juan Pablo Salerno™</p>
    <p className="mt-1">
      <span>All rights reserved</span>
      <span className="mx-2 opacity-50">·</span>
      <a
        href="/terms"
        className="underline underline-offset-4 hover:opacity-80"
      >
        Terms
      </a>
      <span className="mx-2 opacity-50">·</span>
      <a
        href="/privacy"
        className="underline underline-offset-4 hover:opacity-80"
      >
        Privacy
      </a>
    </p>
  </div>
</div>


      </main>

      {/* Page-level styles + modal */}

 <style jsx global>{`
  /* Hide the global site footer ONLY on /resources */
  body:has(main[data-page="resources"])
    :is(footer, .site-footer, [role="contentinfo"]) {
    display: none !important;
  }

  /* iPad Mini PORTRAIT (≈744px wide) — narrower mobile footer */
  @media (orientation: portrait) and (min-width: 700px) and (max-width: 799px) {
    .mobile-footer-cap > .mx-auto {
      max-width: 550px !important;
    }
  }

  /* iPad PORTRAIT (≈768–834px wide) — slightly wider than mini */
  @media (orientation: portrait) and (min-width: 800px) and (max-width: 900px) {
    .mobile-footer-cap > .mx-auto {
      max-width: 610px !important;
    }
  }
`}</style>
      <CollectionModal
        open={open}
        onClose={() => setOpen(false)}
        collection={activeCollection}
      />
    </>
  );
} // end ResourcesPage

/* ===== Modal (YouTube-only embed) ===== */
function CollectionModal({ open, onClose, collection }) {
  if (!open || !collection) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button aria-label="Close collection" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative mx-4 max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[var(--color-teal-850)] shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[var(--color-teal-850)]/95 px-5 py-4">
          <div className="min-w-0">
            <div className="text-xs opacity-70 truncate">{collection.theme}</div>
            <h3 className="font-serif text-xl opacity-95 truncate">{collection.title} <span className="text-xs opacity-60 align-middle">(Collection)</span></h3>
            <p className="text-sm opacity-75 truncate">{collection.subtitle}</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-white/20 px-3 py-1.5 hover:bg-white/10">Close</button>
        </header>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5">
          {(!collection.items || collection.items.length === 0) ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="opacity-85">This collection is being assembled. Check back soon for new content.</p>
            </div>
          ) : (
            <ul className="grid gap-5">
              {collection.items.map((it, idx) => (
                <li key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h4 className="font-serif text-lg opacity-95">{it.title}</h4>
                  <p className="text-sm opacity-75">{it.promise}</p>
                  <div className="mt-3 aspect-video overflow-hidden rounded-lg border border-white/10">
                    <iframe
                      className="h-full w-full"
                      src={it.url}
                      title={it.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
