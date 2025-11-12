// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9_99-hj9j03x8",
  yearly:  "prc_89_99-lt9v0nf5",
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    let ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    // If it's a Promise, await it
    if (ms && typeof ms.then === "function") {
      try { ms = await ms; } catch {}
    }

    if (!ms?.purchasePlansWithCheckout) {
      console.error("[MS] purchasePlansWithCheckout not available", ms);
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;

    try {
      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl: `${origin}/members?status=success`,
        cancelUrl: `${origin}/membership?canceled=1`,
      });
    } catch (err) {
      console.error("DOM checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10"
      }
    >
      {children ?? (cadence === "yearly" ? "Start — Yearly" : "Start — Monthly")}
    </button>
  );
}
