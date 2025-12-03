"use client";

import { useEffect, useRef, useState } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";
import MembersHomeLink from "../MembersHomeLink";
import Image from "next/image";

const INITIAL_ASSISTANT_MESSAGE = {
  role: "assistant",
  content: "What’s been moving through your mind, heart, or energy today?",
};

const EXAMPLE_QUESTIONS = [
  "I feel stuck and unmotivated. Can you help me understand why and suggest one or two next steps?",
  "Something that happened today is really bothering me. Can you help me unpack why it's triggering me?",
  "My anxiety is high right now. Can you walk me through a quick grounding reset?",
  "Can you help me reframe this thought in a kinder, more truthful way?",
  "Can you help me realign my mind, body, and spirit with what actually matters to me?",
];

export default function MembersAiPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 1.0, landscapeZoom: 1.0 });

  const [messages, setMessages] = useState([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userText = input.trim();
    setInput("");
    setError("");

    const nextMessages = [
      ...messages,
      { role: "user", content: userText },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setIsSending(true);

    try {
      const res = await fetch("/api/salerno-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 401) {
        setError("Your membership session is not active. Please sign in again to use Salerno AI.");
        setIsSending(false);
        return;
      }

      if (!res.ok || !res.body) {
        setError("There was a problem connecting to Salerno AI. Please try again.");
        setIsSending(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let assistantText = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          assistantText += chunk;

          setMessages((current) => {
            const updated = [...current];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].role === "assistant") {
              updated[lastIndex] = { ...updated[lastIndex], content: assistantText };
            }
            return updated;
          });
        }
      }
    } catch (err) {
      console.error("salerno-ai client error:", err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setIsSending(false);
    }
  }

  function handleResetConversation() {
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    setError("");
    setInput("");
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <>
      <TopOnMount />
      <div ref={wrapRef} className="min-h-[100vh] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-[950px]">
          {/* Sticky Members Home pill */}
          <div className="pl-6 sticky top-0 z-30 flex justify-start">
            <MembersHomeLink className="mb-4 mt-9 inline-flex items-center rounded-full border border-[var(--color-gold)] bg-transparent px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.14em] text-[var(--color-gold)] backdrop-blur-sm" />
          </div>

          {/* HERO HEADER */}
          <div className="mt-4 flex flex-col items-center text-center">
            <div className="relative inline-flex items-start justify-center">
              {/* Avatar off to the left */}
              <span className="pointer-events-none absolute right-full top-[52%] mr-4 inline-flex h-[54px] w-[54px] -translate-y-1/2 items-center justify-center overflow-hidden rounded-full ring-1 ring-[var(--color-gold)]/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)] md:h-[60px] md:w-[60px]">
                <Image src="/headshot.jpg" alt="Dr. Salerno" width={200} height={200} quality={95} className="h-[54px] w-[54px] translate-y-2 scale-[1.25] object-cover md:h-[60px] md:w-[60px]" />
              </span>

              <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-[var(--color-cream)] md:text-5xl opacity-95">Dr. Salerno AI</h1>
                <p className="mt-2 text-lg font-medium text-[var(--color-cream)]/85 md:text-xl">Your Inner Growth Advisor</p>
              </div>
            </div>
          </div>

          {/* WELCOME CARD WITH MINI CARDS */}
          <div className="mx-auto mt-7 max-w-[900px]">
            <div className="rounded-2xl bg-[var(--color-teal-850)]/96 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent)] p-6 text-left ring-1 ring-white/12 md:p-7">
              <h2 className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)]">Welcome to Dr. Salerno AI</h2>

              {/* Vision + Design cards */}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {/* VISION */}
                <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-[var(--color-gold)]/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/75">Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/88">
                    My vision is for this to feel like a living extension of my work with you — grounded, honest, spiritually attuned, and human.
                  </p>
                  <ul className="mt-2 space-y-1 text-[13px] leading-relaxed text-[var(--color-cream)]/85">
                    <li>• A space that holds your inner experience with intention and care.</li>
                    <li>• A companion that helps you reconnect with your strength, intuition, and sense of possibility.</li>
                    <li>• Guidance that weaves science & spirituality into everyday tools.</li>
                  </ul>
                </div>

                {/* DESIGN */}
                <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-[var(--color-gold)]/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/75">Design</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/88">
                    This space is designed to help you navigate your emotions, mindset, and personal growth with three pillars in mind:
                  </p>

                  {/* Three pillar mini-cards */}
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-white/[0.05] p-3 ring-1 ring-[var(--color-gold)]/60">
                      <h4 className="text-[11px] font-semibold text-[var(--color-gold)]">Clarity</h4>
                      <p className="mt-1 text-[11px] leading-snug text-[var(--color-cream)]/85">Clarity about what you&apos;re feeling and why it&apos;s showing up.</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.05] p-3 ring-1 ring-[var(--color-gold)]/60">
                      <h4 className="text-[11px] font-semibold text-[var(--color-gold)]">Compassion</h4>
                      <p className="mt-1 text-[11px] leading-snug text-[var(--color-cream)]/85">Compassion for yourself as you move through it.</p>
                    </div>
                    <div className="rounded-lg bg-white/[0.05] p-3 ring-1 ring-[var(--color-gold)]/60">
                      <h4 className="text-[11px] font-semibold text-[var(--color-gold)]">Guidance</h4>
                      <p className="mt-1 text-[11px] leading-snug text-[var(--color-cream)]/85">Evidence-informed guidance to support your next steps.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing text + signoff */}
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-cream)]/88">
                Thank you for being part of this early chapter. My hope is that this becomes a <span className="font-semibold text-[var(--color-cream)] opacity-92">daily advisor you can turn to whenever you need a reset</span> — a place that gently reminds you of your strength, your worth, and your capacity to grow.
              </p>
              <p className="mt-3 text-sm italic text-[var(--color-cream)]/80">
                With love, <span className="font-semibold">Dr. JP Salerno</span>
              </p>
            </div>
          </div>

          {/* CTA button */}
          <div className="mx-auto mt-6 flex max-w-[760px] justify-center">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("ai-chat-box");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)]/90 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-black shadow-[0_3px_14px_rgba(0,0,0,0.30)] transition-all duration-200 hover:bg-[var(--color-gold)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.38)] active:translate-y-[1px] md:text-[13px]"
            >
              <span>Start your conversation now</span>
              <span aria-hidden="true" className="translate-y-[1px] text-[11px]">
                ↓
              </span>
            </button>
          </div>

          {/* MAIN INFO CARDS */}
          <div className="mx-auto mt-7 grid max-w-[950px] items-start gap-6 md:grid-cols-2">
            {/* Big card: Working with Dr. Salerno AI */}
            <div className="rounded-2xl bg-[var(--color-teal-850)]/96 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent)] p-6 text-left ring-1 ring-white/12">
              <h2 className="text-sm font-semibold text-[var(--color-gold)] opacity-90">Working With Dr. Salerno AI</h2>

              <div className="mt-4 grid gap-7">
                {/* What it can help with */}
                <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-[var(--color-gold)]/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/75">What It Can Help You With</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/85">
                    Dr. Salerno AI is here to help you reconnect with your inner strength, break cycles that keep you stuck, and build healthier internal narratives about who you are and what you&apos;re capable of. It supports you in understanding yourself more deeply so your choices are intentional and not on autopilot.
                  </p>
                </div>

                {/* How to use it */}
                <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-[var(--color-gold)]/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/75">How to Use It</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-cream)]/85">
                    You can talk to it much like you would talk to me in a session. Share what you&apos;re feeling, what happened, what you&apos;re afraid of, or what you want to shift. There&apos;s no need to sound polished — you can show up exactly as you are.
                  </p>
                </div>

                {/* Tips sub-card */}
                <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-[var(--color-gold)]/60">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/75">Tips for Deeper Guidance</h3>
                  <ul className="space-y-1.5 mt-2 list-disc list-inside text-sm leading-relaxed text-[var(--color-cream)]/85">
                    <li>Honesty and specificity equates to more precise guidance.</li>
                    <li>Ask follow-up questions if something doesn&apos;t land at first.</li>
                    <li>Return to the same topic over time to track your growth.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Big card: Examples of questions */}
            <div className="rounded-2xl bg-[var(--color-teal-850)]/96 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent)] p-6 text-left ring-1 ring-white/12">
              <h2 className="text-sm font-semibold text-[var(--color-gold)] opacity-90">Examples of Things You Can Ask</h2>

              <div className="mt-4 grid gap-3">
                {EXAMPLE_QUESTIONS.map((q, idx) => (
                  <div key={idx} className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-[var(--color-gold)]/60">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]/65">{idx + 1}.</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-cream)]/88">“{q}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BETA REMINDER + CHAT SECTION */}
          <div className="mx-auto mt-9 max-w-[950px]">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Beta
                </span>
                <span className="text-[12px] text-[var(--color-cream)]/75">
                  Dr. Salerno AI is in a beta training phase and will keep getting more precise and aligned with my voice over time.
                </span>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold tracking-wide text-[var(--color-cream)] md:text-[17px] opacity-90">Live Conversation</h2>
                <p className="mt-1 text-[10px] text-[var(--color-cream)]/60 md:text-[11px]">
                  Supportive guidance only — not therapy, medical care, or an emergency service.
                </p>
              </div>
              <span className="text-[11px] text-[var(--color-cream)]/60">Powered by Dr. Salerno AI</span>
            </div>

            <div id="ai-chat-box" className="rounded-2xl bg-[#0f2334] px-3 py-4 ring-1 ring-[var(--color-gold)]/60 shadow-[0_20px_70px_rgba(0,0,0,0.8)] md:px-5 md:py-6">
              {/* Messages area */}
              <div
                ref={listRef}
                className="mb-4 max-h-[520px] space-y-3 overflow-y-auto rounded-xl bg-black/20 px-3 py-3 md:px-4 md:py-4"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label="Conversation with Dr. Salerno AI"
              >
                {messages.map((m, index) => (
                  <div key={index} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={
                        m.role === "user"
                          ? "max-w-[80%] rounded-2xl bg-[var(--color-gold)] px-3 py-2 text-sm text-black shadow-md md:text-[15px]"
                          : "max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-[var(--color-cream)] shadow-md md:text-[15px]"
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex justify-start" role="status" aria-live="polite">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs text-[var(--color-cream)]/80">
                      <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]" />
                      <span>Writing a response for you…</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-3 rounded-md bg-red-900/50 px-3 py-2 text-xs text-red-100">
                  {error}
                </div>
              )}

              {/* Input form */}
              <form onSubmit={handleSend} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="block text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)]/70">Ask your question</label>
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                  <textarea
                    ref={inputRef}
                    rows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tell me what’s been showing up for you. I’m here to listen and support you."
                    aria-label="Type your question for Dr. Salerno AI"
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-[var(--color-cream)] outline-none ring-0 placeholder:text-[var(--color-cream)]/45 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  />

                  <div className="flex flex-row items-center gap-2 md:flex-col md:items-end">
                    <button
                      type="submit"
                      disabled={isSending || !input.trim()}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-md transition hover:-translate-y-[1px] hover:bg-[#f1d26a] hover:shadow-lg disabled:cursor-not-allowed disabled:bg-[var(--color-gold)]/60 disabled:hover:translate-y-0 disabled:hover:shadow-none md:mt-0 md:self-end"
                    >
                      {isSending ? "Sending…" : "Send"}
                    </button>

                    <button
                      type="button"
                      onClick={handleResetConversation}
                      className="text-[10px] text-[var(--color-cream)]/60 underline underline-offset-4 hover:text-[var(--color-cream)]/90"
                    >
                      ↺ New conversation
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* SAFETY NOTE FOOTER + PRIVACY */}
            <div className="mt-8 border-t border-[var(--color-cream)]/18 pt-4">
              <p className="text-[11px] leading-relaxed text-[var(--color-cream)]/55">
                Important safety note: Dr. Salerno AI offers emotional support, grounding, and perspective, but it is not therapy, medical care, or an emergency service. If you ever feel unsafe or in crisis, please contact local emergency services, a crisis hotline, or a trusted professional right away.
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-[var(--color-cream)]/55">
                For details on how your data is handled across this site, please see the{" "}
                <a href="/privacy" className="text-[var(--color-gold)] underline underline-offset-4 hover:opacity-90">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
