"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [pending, setPending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    // TODO: wire to your real endpoint (Formspree/Resend/API route)
    setTimeout(() => setPending(false), 600);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-auto flex items-stretch gap-2"
      aria-label="Subscribe to newsletter"
    >
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="w-full sm:w-64 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
      />
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold tracking-wide hover:shadow-lg hover:-translate-y-[1px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 disabled:opacity-70"
      >
        {pending ? "Sending…" : "Subscribe"}
      </button>
    </form>
  );
}
