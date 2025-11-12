// app/membership/StartFullAccessButton.jsx
"use client";

import { useState, useCallback } from "react";

export default function StartFullAccessButton({ className = "" }) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkout/member", { method: "POST" });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Checkout route failed");
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; // → Stripe Checkout (plan picker)
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
      setLoading(false);
    }
  }, [loading]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-busy={loading ? "true" : "false"}
    >
      {loading ? "Preparing checkout…" : "Start Full Access"}
    </button>
  );
}
