"use client";

import { useState } from "react";

export default function MobileFooterSubscribeClient() {
  const [status, setStatus] = useState(null); // "success" | "error" | "loading"

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const email = form.email.value.trim();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Subscribe failed:", data);
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          disabled={status === "loading"}
          className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>

      {/* Inline Feedback */}
      {status === "success" && (
        <p className="text-[13px] text-[var(--color-gold)] mt-1">
          You’re now subscribed. ✨
        </p>
      )}
      {status === "error" && (
        <p className="text-[13px] text-red-400 mt-1">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
