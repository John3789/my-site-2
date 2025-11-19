// app/members/ai/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const initialAssistantMessage =
  "I’m here to support you with stress, mindset, purpose, and alignment. What’s on your mind today?";

export default function MembersAiPage() {
  const [messages, setMessages] = useState([
    { id: "intro", role: "assistant", content: initialAssistantMessage },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

  const endRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isSending || unauthorized) return;

    const userText = input.trim();
    setInput("");
    setError("");
    setIsSending(true);

    const userId = `user-${Date.now()}`;
    const assistantId = `assistant-${Date.now()}`;

    // --- SHORT CONVERSATION HISTORY (20 messages) ---
    const contextMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-20);

    const outboundMessages = [
      ...contextMessages,
      { role: "user", content: userText },
    ];

    // Add to UI immediately
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: userText },
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch("/api/salerno-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: outboundMessages }),
      });

      if (res.status === 401) {
        setUnauthorized(true);
        setError("Your membership session is not active. Please sign in to use Salerno AI.");
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

      while (!done) {
        const result = await reader.read();
        done = result.done;

        const chunk = result.value ? decoder.decode(result.value) : "";

        if (chunk) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        }
      }
    } catch (err) {
      console.error("Salerno AI error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  const quickPrompts = [
    "I feel stuck and unmotivated.",
    "I feel overwhelmed and don’t know how to calm down.",
    "I’m anxious about my future.",
    "I want to feel more aligned with my purpose.",
  ];

  function handleQuickPrompt(prompt) {
    if (isSending || unauthorized) return;
    setInput(prompt);
  }

  return (
    <div className="min-h-screen bg-[var(--color-teal-900)] text-[var(--color-cream)]">
      <div className="mx-auto flex min-h-screen max-w-[900px] flex-col px-4 pb-6 pt-20 md:px-6">
        
        {/* Header */}
        <header className="mb-4 md:mb-6">
          <h1 className="text-lg font-semibold tracking-wide text-[var(--color-gold)] md:text-xl">
            Salerno AI
          </h1>
          <p className="mt-1 text-sm opacity-80 md:text-[15px]">
            A digital version of my guidance to help you with stress, mindset, purpose, and alignment.
            This conversation is supportive and educational, not medical or therapeutic advice.
          </p>
        </header>

        {/* Quick Prompts */}
        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleQuickPrompt(q)}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[var(--color-cream)] hover:bg-white/10 active:translate-y-px"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="relative flex-1 rounded-2xl border border-white/10 bg-white/5/50 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <div className="flex h-full flex-col overflow-hidden">
            
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "max-w-[80%] rounded-2xl bg-[var(--color-gold)] px-3 py-2 text-xs text-black md:text-sm"
                        : "max-w-[80%] rounded-2xl bg-black/30 px-3 py-2 text-xs text-[var(--color-cream)] md:text-sm"
                    }
                  >
                    {msg.content ||
                      (msg.role === "assistant" && isSending ? "..." : msg.content)}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-2 rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="mt-3 flex items-end gap-2">
              <textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending || unauthorized}
                placeholder={
                  unauthorized
                    ? "Please log into your membership to use Salerno AI."
                    : "Tell me what you're experiencing right now…"
                }
                className="max-h-32 flex-1 resize-none rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-xs text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream)]/50 focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] md:text-sm"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim() || unauthorized}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold)] px-3 py-2 text-xs font-semibold text-black shadow-md transition hover:brightness-110 active:translate-y-px md:text-sm"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
