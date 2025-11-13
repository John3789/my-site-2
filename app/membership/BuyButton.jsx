// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

// Only MONTHLY has a coupon
const MONTHLY_COUPON = "UMJ0pIHr";

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const ms =
      window.$memberstackDom ||
      window.$memberstack ||
      window.memberstack ||
      window.Memberstack;

    if (!ms || !ms.checkout) {
      console.error("❌ Memberstack checkout() missing", ms);
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence];
    const options = { priceId };

    // Apply discount ONLY for monthly
    if (cadence === "monthly") {
      options.coupon = MONTHLY_COUPON;
    }

    try {
      console.log("➡️ Calling ms.checkout()", options);
      await ms.checkout(options);
    } catch (err) {
      console.error("❌ Checkout error:", err);
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
      {children ??
        (cadence === "yearly" ? "Start — Yearly" : "Start — Monthly")}
    </button>
  );
}
