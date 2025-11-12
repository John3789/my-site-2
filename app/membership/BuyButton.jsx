// app/membership/BuyButton.jsx
"use client";
import { useCallback, useState } from "react";

const MONTHLY = "prc_9-99-hj9j03x8";
const YEARLY  = "prc_89-99-lt9v0nf5";

export default function BuyButton({ cadence = "monthly" }) {
  const [busy, setBusy] = useState(false);

  const handleBuy = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const ms =
        (typeof window !== "undefined" &&
          (window.$memberstack || window.memberstack || window.Memberstack)) ||
        null;

      if (!ms?.purchasePlansWithCheckout) throw new Error("Memberstack DOM not ready");

      const priceId = cadence === "yearly" ? YEARLY : MONTHLY;

      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl: `${window.location.origin}/members`,
        cancelUrl: `${window.location.origin}/membership?canceled=1`,
      });
    } catch (e) {
      console.error("[MS checkout] failed:", e);
      alert("Checkout failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }, [busy, cadence]);

  return (
    <button onClick={handleBuy} disabled={busy} className="...">
      {busy ? "Starting…" : "Start Full Access"}
    </button>
  );
}
