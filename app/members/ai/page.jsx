"use client";

import { useEffect, useRef, useState } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";
import MembersHomeLink from "../MembersHomeLink";
import Image from "next/image";


export default function MembersAiPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 1.0, landscapeZoom: 1.0 });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "What’s been moving through your mind, heart, or energy today?",
    },
  ]);
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
          messages: nextMessages
            .slice(-20) // keep last 20 for context
            .map((m) => ({ role: m.role, content: m.content })),
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

  return (
    <>
      <TopOnMount />
      <div ref={wrapRef} className="min-h-[100vh] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-[950px]">
          <MembersHomeLink />

          {/* HERO HEADER + INTRO */}
          <div className="mt-8 text-center">
<h1 className="text-[24px] md:text-[28px] font-bold tracking-wide text-[var(--color-cream)] flex items-center justify-center gap-3">
  <span className="relative inline-flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full ring-1 ring-[var(--color-gold)]/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
    <Image
      src="/headshot.jpg"
      alt="Dr. Salerno"
      width={200}    // ← higher resolution input
      height={200}
      quality={95}
      className="
        h-[60px] w-[60px]
        object-cover
        scale-[1.25]
        translate-y-2
      "
    />
  </span>
  Dr. Salerno AI — Your Inner Growth Advisor
</h1>



            <p className="leading-loose mt-3 text-sm md:text-[15px] text-[var(--color-cream)]/85">
              Welcome to Dr. Salerno AI. My vision is for this to feel like a living extension of my work with you: grounded, honest, spiritually
              attuned, and deeply human. Dr. Salerno AI is a supportive space designed to help you navigate your
              emotions, mindset, and personal growth with clarity, compassion, and evidence-informed guidance.
            </p>
            <p className="leading-loose mt-3 text-sm md:text-[15px] text-[var(--color-cream)]/85">
              Thank you for being part of this early chapter. My hope is that this becomes a daily advisor you can
              turn to whenever you need a reset, reflection, or moment of truth — a place that gently reminds you of
              your strength, your worth, and your capacity to grow.
            </p>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("ai-chat-box");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)]/90 px-5 py-2 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.15em] text-black shadow-[0_3px_14px_rgba(0,0,0,0.30)] transition-all duration-200 hover:bg-[var(--color-gold)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.38)] active:translate-y-[1px]"
            >
              Start your conversation now
            </button>
          </div>

          {/* MAIN INFO: WHAT IT CAN HELP WITH + HOW TO USE + EXAMPLES */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* What it can help with + How to use it (combined) */}
            <div className="rounded-2xl bg-[var(--color-teal-850)]/95 p-6 text-left ring-1 ring-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              <h2 className="text-sm font-semibold text-[var(--color-gold)]">
                🌿 What Dr. Salerno AI Can Help You With & How to Use It
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/85">
                Dr. Salerno AI is here to help you reconnect with your inner strength, break cycles that keep you stuck,
                and build healthier internal narratives about who you are and what you&apos;re capable of. It supports
                you in understanding yourself more deeply so your choices come from intention rather than old autopilot
                patterns.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-cream)]/85">
                You can talk to it much like you would talk to me in a session. Share what you&apos;re feeling, what
                happened, what you&apos;re afraid of, or what you want to shift. There&apos;s no need to sound polished
                — you can show up exactly as you are. The more honest and specific you are, the more precise,
                compassionate, and aligned the guidance will be in return.
              </p>
            </div>

            {/* Examples of things you can ask — short numbered list */}
            <div className="rounded-2xl bg-[var(--color-teal-850)]/95 p-6 text-center ring-1 ring-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              <h2 className="text-sm font-semibold text-[var(--color-gold)]">✨ Examples of Things You Can Ask</h2>
<ol className="mt-3 list-decimal list-inside space-y-2 text-left text-sm leading-[1.25] *:leading-[1.65] text-[var(--color-cream)]/85">
                <li>
                  “I feel stuck and unmotivated. Can you help me understand why and suggest one or two next steps?”
                </li>
                <li>
                  “Something that happened today is really bothering me. Can you help me unpack why it&apos;s triggering
                  me?”
                </li>
                <li>“My anxiety is high right now. Can you walk me through a quick grounding reset?”</li>
                <li>“Can you help me reframe this thought in a kinder, more truthful way?”</li>
                <li>“Can you help me realign with what actually matters to me this week?”</li>
              </ol>
            </div>
          </div>

          {/* BETA REMINDER + CHAT SECTION */}
          <div className="mx-auto mt-10 max-w-[950px]">
            {/* Gentle reminder as beta footer above chat */}
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Beta
                </span>
                <span className="text-[12px] text-[var(--color-cream)]/75">
                  Dr. Salerno AI is in a beta training phase and will keep getting more precise and aligned with my
                  voice over time.
                </span>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] md:text-[17px] font-semibold tracking-wide text-[var(--color-cream)]">
                Live Conversation
              </h2>
              <span className="text-[11px] text-[var(--color-cream)]/60">Powered by Dr. Salerno AI</span>
            </div>

            <div
              id="ai-chat-box"
              className="rounded-2xl bg-[#0f2334] px-3 py-4 ring-1 ring-[var(--color-gold)]/60 shadow-[0_20px_70px_rgba(0,0,0,0.8)] md:px-5 md:py-6"
            >
              {/* Messages area */}
              <div
                ref={listRef}
                className="mb-4 max-h-[520px] space-y-3 overflow-y-auto rounded-xl bg-black/20 px-3 py-3 md:px-4 md:py-4"
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
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs text-[var(--color-cream)]/80">
                      <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-gold)]"></span>
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
              <form onSubmit={handleSend} className="flex flex-col gap-2 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)]/70">
                    Ask your question
                  </label>
                </div>

               <textarea
  ref={inputRef}
  rows={5}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Tell me what’s been showing up for you. I’m here to listen and support you."
  className="w-full resize-none rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-[var(--color-cream)] outline-none ring-0 placeholder:text-[var(--color-cream)]/45 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
/>

                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black shadow-md transition hover:bg-[#f1d26a] hover:shadow-lg hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:bg-[var(--color-gold)]/60 disabled:hover:translate-y-0 disabled:hover:shadow-none md:mt-0 md:self-end"
                >
                  {isSending ? "Sending…" : "Send"}
                </button>
              </form>
            </div>

            {/* SAFETY NOTE FOOTER */}
            <div className="mt-8 border-t border-[var(--color-cream)]/18 pt-4">
              <p className="text-[11px] leading-relaxed text-[var(--color-cream)]/55">
                Important safety note: Dr. Salerno AI offers emotional support, grounding, and perspective, but it is not therapy,
                medical care, or an emergency service. If you ever feel unsafe or in crisis, please contact local emergency
                services, a crisis hotline, or a trusted professional right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
