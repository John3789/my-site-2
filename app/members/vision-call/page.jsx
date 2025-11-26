// app/members/vision-call/page.jsx
"use client";

import { useState } from "react";
import MembersHomeLink from "../MembersHomeLink";

export default function MembershipPageClient() {
  const navItems = [
    { id: "pricing", label: "Pricing" },
    { id: "how-it-works", label: "How it works" },
    { id: "who-its-for", label: "Who this is for" },
    { id: "during-hour", label: "During your hour" },
    { id: "what-you-get", label: "What you'll get" },
    { id: "vision-call-request", label: "Book now", isPrimary: true },
  ];

  const [vcFormStatus, setVcFormStatus] = useState("idle");
  const [vcFormError, setVcFormError] = useState("");

  // Smooth scroll helper with offset so headings aren't hidden behind the sticky nav
  const handleJump = (sectionId, offsetOverride) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(sectionId);
    if (!el) return;

    const navOffset = typeof offsetOverride === "number" ? offsetOverride : 110;

    const rect = el.getBoundingClientRect();
    const targetY = rect.top + window.scrollY - navOffset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const handleVisionCallSubmit = async (e) => {
    e.preventDefault();
    if (vcFormStatus === "submitting") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      focus: formData.get("focus")?.toString().trim() || "",
      goals: formData.get("goals")?.toString().trim() || "",
      background: formData.get("background")?.toString().trim() || "",
      availability: formData.get("availability")?.toString().trim() || "",
      preferences: formData.get("preferences")?.toString().trim() || "",
      context: "vision-call-request",
    };

    if (!payload.name || !payload.email || !payload.focus || !payload.goals) {
      setVcFormError("Please include your name, email, what you’d like to talk about, and what you’re hoping to walk away with.");
      setVcFormStatus("error");
      return;
    }

    try {
      setVcFormStatus("submitting");
      setVcFormError("");

      const res = await fetch("/api/vision-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Request failed");
      }

      await fetch("/api/forms/vision-call", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData), // same object you use for the email request
});

      setVcFormStatus("success");
      form.reset();
    } catch (err) {
      console.error("Vision Call request error:", err);
      setVcFormError("Something went wrong. Please try again or email me directly.");
      setVcFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-deep-teal)] text-[var(--color-cream)]">
      <main className="mx-auto max-w-[1100px] px-6 py-10 narrow-landscape-80">
        {/* Top link back to members home */}
        <div className="mb-4 mt-5">
          <MembersHomeLink />
        </div>

        {/* Centered page title + intro */}
        <header className="mx-auto max-w-3xl text-center mt-5">
          <h1 className="font-serif text-3xl md:text-4xl leading-tight">Vision Call with Dr. Salerno</h1>
          <div className="mx-auto mt-3 h-[2px] w-16 rounded bg-[var(--color-gold)]/85" />
          <p className="mt-4 text-sm md:text-base leading-relaxed opacity-85">
            A focused, one-time session for RISE members who want deeper, personalized support — so you can clear the fog, reconnect with your inner strength, and walk away with a grounded plan for your next chapter.
          </p>
          <p className="mt-3 text-xs md:text-sm opacity-70">
            This is separate from the complimentary 30-minute Vision Call that comes with a custom meditation. Think of it as a full, dedicated hour just for you.
          </p>
        </header>

        {/* Sticky section nav */}
        <nav className="sticky top-4 z-30 mt-6">
  <div className="mx-auto max-w-[900px]">
    <div className="rounded-full bg-[var(--color-teal-850)]/85 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-wrap items-center justify-center gap-2 px-3 py-3">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              // bigger offset for the sticky-nav "Book now" so it scrolls lower
              handleJump(item.id, item.isPrimary ? 80 : undefined);
            }}
            className={
              item.isPrimary
                ? "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 md:px-6 py-1.5 text-[11px] md:text-[12px] font-semibold tracking-wide text-black shadow-sm hover:brightness-110 transition min-w-[110px] md:min-w-[130px]"
                : "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 md:px-5 py-1.5 text-[11px] md:text-[12px] font-semibold tracking-wide text-[var(--color-cream)] hover:bg-white/10 transition min-w-[100px] md:min-w-[120px]"
            }
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  </div>
</nav>


        {/* Investment + access card */}
        <section id="pricing" className="mt-8">
          <div className="mx-auto max-w-[900px] rounded-2xl border border-[var(--color-gold)]/55 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent px-5 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] md:px-6 md:py-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Price info */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]/95">Investment</p>
                  <a
                    href="#vision-call-request"
                    onClick={(e) => {
                      e.preventDefault();
                      handleJump("vision-call-request", 80);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-4 py-1.5 text-[11px] font-semibold tracking-wide text-black shadow-sm hover:brightness-110 transition"
                  >
                    Book now
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline justify-start gap-2">
                  <p className="text-xl font-semibold md:text-2xl">
                    $150 <span className="text-sm font-normal opacity-80 md:text-base">USD</span>
                  </p>
                  <span className="text-xs opacity-75 md:text-sm">per 60-minute session</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed opacity-80 md:text-sm">
                  A one-time session designed to feel like a powerful reset, not another recurring obligation.
                </p>
              </div>

              {/* Members-only access */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]/95">Members-only access</p>
                <p className="mt-2 text-xs leading-relaxed opacity-85 md:text-sm">
                  Vision Calls are reserved for active RISE members. You can book up to one Vision Call per month, so these sessions stay intentional, focused, and sustainably paced — not weekly or regularly scheduled calls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS – 4 mini cards */}
        <section id="how-it-works" className="mt-10">
          <div className="mx-auto max-w-[900px] rounded-2xl bg-white/[0.03] px-5 py-6 ring-1 ring-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.5)] md:px-6 md:py-7">
            <h2 className="font-serif text-2xl md:text-3xl opacity-95">How it works</h2>
            <div className="mt-3 h-[2px] w-10 rounded bg-[var(--color-gold)]/80" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {/* Step 1 – Book your session */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 1</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">Book your session</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  You&apos;ll complete your payment and receive an email confirmation with a link to schedule your Vision Call at a time that works for you.
                </p>
              </div>
              {/* Step 2 – Short intake form & schedule your call */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 2</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">Short intake form & schedule your call</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  Before we meet, you&apos;ll fill out a brief form and confirm your time so I can understand what you&apos;re moving through and prepare a tailored plan for our session.
                </p>
              </div>
              {/* Step 3 – 60-minute live session */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 3</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">60-minute live session</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  We meet on Zoom (or your preferred platform) for your Vision Call — a full hour devoted to your clarity, emotions, and next steps.
                </p>
              </div>
              {/* Step 4 – After the call */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 4</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">After the call</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  You&apos;ll leave with your action steps, practices, and mindset tools. If you ever need more support, you can book another Vision Call in a future month or pair this with a custom meditation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section id="who-its-for" className="mt-8">
          <div className="mx-auto max-w-[900px] rounded-2xl bg-white/[0.03] px-5 py-6 ring-1 ring-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.5)] md:px-6 md:py-7">
            <h2 className="font-serif text-2xl md:text-3xl opacity-95">Who this Vision Call is for</h2>
            <div className="mt-3 h-[2px] w-10 rounded bg-[var(--color-gold)]/80" />
            <p className="mt-4 text-sm leading-relaxed opacity-85 md:text-base">
              This session is for a specific kind of RISE member — the one who feels called to more intimate, one-on-one support:
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Personalized support</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      You want more personalized support than you can get from the meditations, resources, and emails alone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Talk it through</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      You&apos;re moving through an especially heavy or confusing season and want a grounded, compassionate space to talk it through.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Reflective perspective</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      You feel it would help to have a thoughtful outside perspective to organize your thoughts, validate what you’re feeling, and reflect back your strengths.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Powerful reset</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      You want a powerful, one-time reset that can shift how you’re feeling right now and help you move forward with more confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE’LL DO IN YOUR HOUR */}
        <section id="during-hour" className="mt-10">
          <div className="mx-auto max-w-[900px] rounded-2xl bg-white/[0.03] px-5 py-6 ring-1 ring-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.55)] md:px-7 md:py-7">
            <h2 className="font-serif text-2xl md:text-3xl opacity-95">What we’ll do in your hour</h2>
            <div className="mt-3 h-[2px] w-10 rounded bg-[var(--color-gold)]/80" />
            <p className="mt-4 text-sm leading-relaxed opacity-85 md:text-base">
              Your Vision Call follows a gentle structure so you feel grounded, heard, and supported — while still leaving room to follow what you most need.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 1</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">Arrival (~5 minutes)</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  Warm welcome, quick check-in, and a shared intention for what you want from our time together.
                </p>
              </div>
              {/* Step 2 */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 2</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">Centering meditation (~5 minutes)</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  A short guided meditation to quiet the noise, help your nervous system settle, and bring you back into your body.
                </p>
              </div>
              {/* Step 3 */}
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 3</p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">Your story (~10 minutes)</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                  You share what you’ve been moving through emotionally, mentally, and spiritually. This is your space to be heard and acknowledged without judgment or pressure to “perform.”
                </p>
              </div>
              {/* Deep personalized guidance */}
              <div className="rounded-2xl bg-[#0f2334] px-4 py-4 ring-1 ring-white/12 shadow-[0_10px_35px_rgba(0,0,0,0.55)] md:col-span-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/90">Step 4</p>
                <h3 className="mt-1 text-base font-semibold opacity-90 md:text-lg">Deep personalized guidance</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-90 md:text-base">
                  This is the heart of your Vision Call — the part you&apos;re really coming for. In the remaining time, we focus on what will genuinely move the needle for you:
                </p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">Identifying patterns & fears</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          We identify the core patterns, beliefs, or fears that are draining your energy or keeping you stuck.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">Softening self-criticism</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          We gently shift you out of harsh self-criticism into more self-compassion, self-respect, and self-worth.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">Concrete next steps</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          We co-create 2–4 clear, doable actions you can start taking right away — this might include small shifts to your routine, boundaries, rest, or daily habits.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">Mindset tools & journaling</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          I offer simple mindset tools, journaling prompts, or reflection questions you can keep using after the call to deepen your clarity.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">Affirmations for self-worth</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          Together we craft a few personalized affirmations or phrases that support your self-confidence, self-love, and trust in your path.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3 ring-1 ring-white/10">
                    <div className="flex items-start gap-2">
                      <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                      <div>
                        <p className="text-sm font-semibold opacity-90 md:text-base">A micro-meditation to return to</p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                          If it feels aligned, we may end with a brief micro-meditation or visualization you can return to whenever you need to reconnect with this version of you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU’LL WALK AWAY WITH */}
        <section id="what-you-get" className="mt-10">
          <div className="mx-auto max-w-[900px] rounded-2xl bg-white/[0.03] px-5 py-6 ring-1 ring-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.5)] md:px-6 md:py-6">
            <h2 className="font-serif text-2xl md:text-3xl opacity-95">What you’ll walk away with</h2>
            <div className="mt-3 h-[2px] w-10 rounded bg-[var(--color-gold)]/80" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">A clearer sense</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      A clearer sense of what you truly want in this season of your life — not just what you “should” want.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Your action plan</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      A simple, personalized action plan you can begin using immediately after the call.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Mindset & journaling support</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      Mindset shifts, journaling prompts, and affirmations you can come back to when you feel stuck or discouraged.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/[0.03] px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-start gap-2">
                  <span className="mt-[-1px] text-[var(--color-gold)]">✔︎</span>
                  <div>
                    <p className="text-sm font-semibold opacity-90 md:text-base">Renewed belief</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90 md:text-sm">
                      A renewed connection to the part of you that still believes in what’s possible for your life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* READY TO SCHEDULE CTA */}
        <section id="book-call" className="mt-10 mb-10">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-gold)]/55 bg-[var(--color-teal-850)]/85 px-6 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
            <h2 className="font-serif text-xl md:text-2xl">Ready to schedule your Vision Call?</h2>
            <p className="mt-3 text-sm leading-relaxed opacity-90 md:text-base">
              Vision Calls are there for you when you need deeper one-on-one support. They&apos;re meant to be occasional, powerful check-ins that help you realign with who you&apos;re becoming — not just more appointments on your calendar.
            </p>
            <a
              href="#vision-call-request"
              onClick={(e) => {
                e.preventDefault();
                handleJump("vision-call-request", 80);
              }}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2.5 text-xs md:text-sm font-semibold tracking-wide text-black shadow-sm hover:brightness-110 transition"
            >
              Request a Vision Call
            </a>
          </div>
        </section>

        {/* VISION CALL REQUEST FORM (bottom of page) */}
        <section id="vision-call-request" className="mt-4 mx-auto max-w-[900px] px-6 py-12 narrow-landscape-80">
          <h2 className="font-serif text-3xl md:text-4xl opacity-95 text-center -mt-3">Vision Call Request Form</h2>
          <div className="h-[2px] w-12 bg-[var(--color-gold)]/80 mt-4 mb-6 rounded mx-auto" />

          <div className="text-center mb-6">
            <p className="text-base md:text-lg opacity-90 leading-relaxed">
              If a Vision Call feels right for you, you can share a bit about what you&apos;re moving through below. Once I receive your form, I&apos;ll review it personally and email you with next steps and a link to complete payment and schedule your call.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-5 md:p-6 shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Request a Vision Call</h3>

            <form className="space-y-4" onSubmit={handleVisionCallSubmit}>
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
                <label className="block text-sm font-medium mb-1">What feels most important to talk about right now?</label>
                <textarea
                  name="focus"
                  className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  rows={3}
                  placeholder="Share anything you feel comfortable sharing about what you’re moving through emotionally, mentally, or spiritually."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">What are you hoping to walk away with from this Vision Call?</label>
                <textarea
                  name="goals"
                  className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  rows={3}
                  placeholder="For example: clearer direction, specific next steps, support with a decision, a mindset shift, renewed motivation, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Anything you’ve already tried to support yourself? (optional)</label>
                <textarea
                  name="background"
                  className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  rows={2}
                  placeholder="Therapy, coaching, journaling, meditation, books, etc. This simply helps me understand what has or hasn’t felt helpful so far."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred days/times for your call</label>
                  <input
                    type="text"
                    name="availability"
                    className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                    placeholder="For example: weekday evenings, Saturdays, your time zone, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Questions, preferences, notes (optional)</label>
                  <textarea
                    name="preferences"
                    className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                    rows={2}
                    placeholder="Language (English/Spanish), spiritual preferences, topics you’d rather not discuss, or anything else I should know."
                  />
                </div>
              </div>

              {vcFormError && <p className="text-sm text-red-300">{vcFormError}</p>}

              {vcFormStatus === "success" && (
                <p className="text-sm text-[var(--color-gold)]">
                  Thank you — your request was received. I&apos;ll review it and email you soon with next steps to complete payment and schedule your Vision Call.
                </p>
              )}

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={vcFormStatus === "submitting"}
                  className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-2.5 text-sm font-semibold uppercase tracking-wide shadow-md hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 disabled:opacity-60"
                >
                  {vcFormStatus === "submitting" ? "Sending…" : "Submit Request"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-base md:text-lg font-semibold text-[var(--color-cream)]">
              Additional questions? Include them in your form or{" "}
              <a href="/contact" className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90">
                contact me directly.
              </a>
              .
            </p>
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
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 2.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.75a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
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
              Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation advisor, author, and professor — credited with more than 30 peer-reviewed publications and over 2,000 citations.
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

        {/* Mobile divider to match contact/members */}
        <div className="lg:hidden mx-auto w-full px-0 mt-8">
          <hr className="border-t border-[var(--color-cream)]/22 mb-0" />
        </div>

        {/* Mobile footer stack */}
        <div className="lg:hidden mx-auto w-full max-w-[900px] px-0 mt-6">
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
              <a href="https://www.youtube.com/drjpsalerno" aria-label="YouTube" className="opacity-90 hover:opacity-100">
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
              Dr. Juan Pablo Salerno is an award-winning mental health science expert and transformation advisor, author, and professor — credited with more than 30 peer-reviewed publications and over 2,000 citations.
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
      </main>
    </div>
  );
}
