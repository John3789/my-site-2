// app/membership/BuyButton.jsx
"use client";
import { useCallback, useState } from "react";

export default function BuyButton({
  cadence = "monthly", // "monthly" | "yearly"
  className = "",
  children,
}) {
  const [busy, setBusy] = useState(false);

  const handleClick = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/checkout/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cadence }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { /* leave as text */ }

      if (!res.ok || !data?.url) {
        console.error("Checkout create failed:", res.status, data || text);
        const msg =
          (data && (data.error || data.message || data.details)) ||
          "Checkout failed. Please try again.";
        alert(msg);
        return;
      }

      // Go to Stripe (Memberstack-hosted checkout)
      window.location.href = data.url;
    } catch (e) {
      console.error("Checkout error:", e);
      alert(e?.message || "Checkout failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [busy, cadence]);

  return (
    <button onClick={handleClick} disabled={busy} className={className}>
      {busy ? "Starting…" : children || "Start Full Access"}
    </button>
  );
}
