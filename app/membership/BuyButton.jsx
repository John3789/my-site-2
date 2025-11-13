// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly:  "prc_89-99-lt9v0nf5",
};

const COUPON_IDS = {
  monthly: "UMJ0pIHr",  // ✔ Your $1 coupon
  yearly: null          // ❌ No yearly coupon
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (!ms?.purchasePlansWithCheckout) {
      console.error("purchasePlansWithCheckout not available");
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence];
    const couponId = COUPON_IDS[cadence] || undefined;  // 👈 Only applies for monthly
    const { origin } = window.location;

    await ms.purchasePlansWithCheckout({
      priceId,
      couponId, // 👈 applies ONLY for monthly
      successUrl: `${origin}/members?status=success`,
      cancelUrl: `${origin}/membership?canceled=1`,
    });
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
