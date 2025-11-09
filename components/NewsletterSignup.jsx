// components/NewsletterSignup.jsx
"use client";

import { useState, useCallback } from "react";
import { safeLocal, safeSession } from "./safeStorage";

export default function NewsletterSignup() {
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const lsKey = "__nl_suppress_until__";
  const ssKey = "__nl_shown_this_session__";
  const freqDays = 7;

  const suppressed = useCallback(() => {
    const raw = safeLocal.get(lsKey);
    if (!raw) return false;
    const until = parseInt(raw, 10);
    return Number.isFinite(until) && Date.now() < until;
  }, []);

  const markSuppressed = useCallback(() => {
    const d = new Date();
    d.setDate(d.getDate() + freqDays);
    safeLocal.set(lsKey, String(d.getTime()));
  }, []);

  const sessionShown = useCallback(() => {
    return safeSession.get(ssKey) === "1";
  }, []);

  const markSessionShown = useCallback(() => {
    safeSession.set(ssKey, "1");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting || subscribed) return;

    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const email = (form.get("email") || "").toString().trim();

    if (!email || !email.includes("@")) {
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        markSuppressed();
        markSessionShown();
      } else {
        console.error("Subscribe failed:", await res.text());
      }
    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return subscribed ? (
    <div className="flex gap-2">
      <div className="flex-1 rounded-md border border-[var(--color-gold)]/90 text-[var(--color-gold)]/90 px-3 py-2 font-semibold text-center cursor-default select-none">
        Thank you!
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
      {/* Honeypot */}
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold transition hover:brightness-105 active:translate-y-[1px]"
      >
        {submitting ? "Sending…" : "Subscribe"}
      </button>
    </form>
  );
}
