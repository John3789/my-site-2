// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

// ⬅️ PUT YOUR REAL MEMBERSTACK COUPON ID HERE
const COUPON_IDS = {
  monthly: "UMJ0pIHr", // e.g. "coup_rise-50-off-monthly"
  yearly: null, // no coupon on yearly
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (!ms?.purchasePlansWithCheckout) {
      console.error("purchasePlansWithCheckout not available", ms);
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const couponId = COUPON_IDS[cadence] || null;
    const { origin } = window.location;

    try {
      const payload = {
        priceId,
        successUrl: `${origin}/members?status=success`,
        cancelUrl: `${origin}/membership?canceled=1`,
      };

      // ✅ Only attach coupon for monthly
      if (couponId) {
        payload.couponId = couponId;
      }

      await ms.purchasePlansWithCheckout(payload);
    } catch (err) {
      console.error("[BuyButton] checkout error", err);
      alert("Checkout failed. Please try again or contact support.");
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
