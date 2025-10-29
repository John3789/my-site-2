"use client";

import { useState } from "react";

export default function FooterSubscribeClient() {
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSubscribed, setNlSubscribed] = useState(false);

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (nlSubmitting || nlSubscribed) return;

    setNlSubmitting(true);
    const form = new FormData(e.currentTarget);
    const email = (form.get("email") || "").toString().trim();

    if (!email || !email.includes("@")) {
      setNlSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setNlSubscribed(true);
      } else {
        console.error("Subscribe failed:", await res.text());
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setNlSubmitting(false);
    }
  }

  return (
    <>
      {nlSubscribed ? (
        <div className="flex gap-2">
          <div className="flex-1 rounded-md border border-[var(--color-gold)]/90 text-[var(--color-gold)]/90 px-3 py-2 font-semibold text-center cursor-default select-none">
            Thank you!
          </div>
        </div>
      ) : (
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          {/* Honeypot for anti-spam */}
          <input
            type="text"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
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
            className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold transition hover:brightness-105 active:translate-y-[1px]"
          >
            {nlSubmitting ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
    </>
  );
}
