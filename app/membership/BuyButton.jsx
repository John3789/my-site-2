"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly:  "prc_89-99-lt9v0nf5",
};

// Stripe coupon: $8.99 off ONCE (for monthly)
const MONTHLY_COUPON_ID = "UMJ0pIHr";

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
    const { origin } = window.location;

    // 👉 Only include coupon for monthly
    const checkoutOptions =
      cadence === "monthly"
        ? {
            priceId,
            stripeCouponId: MONTHLY_COUPON_ID, // ✔ coupon only on monthly
            successUrl: `${origin}/members?status=success`,
            cancelUrl: `${origin}/membership?canceled=1`,
          }
        : {
            priceId,
            // ❌ yearly has no coupon
            successUrl: `${origin}/members?status=success`,
            cancelUrl: `${origin}/membership?canceled=1`,
          };

    try {
      console.log("[BuyButton] Starting checkout…", checkoutOptions);
      await ms.purchasePlansWithCheckout(checkoutOptions);
    } catch (err) {
      console.error("[BuyButton] Checkout error:", err);
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
