// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    if (typeof window === "undefined") return;

    const ms =
      window.$memberstack || window.memberstack || window.Memberstack || null;

    if (!ms?.purchasePlansWithCheckout) {
      console.error("purchasePlansWithCheckout not available", ms);
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
      console.error("[BuyButton] checkout error", err);

      const code = err?.code || err?.response?.data?.code;
      const msg = err?.message || err?.response?.data?.message || "";

      // 🔐 If they aren't logged in, open signup and remember what they picked
      if (code === "login-required" || /logged in/i.test(msg)) {
        try {
          window.localStorage.setItem(
            "ms_pending_checkout",
            JSON.stringify({ cadence, priceId })
          );
        } catch (_) {}

        if (ms?.openModal) {
          ms.openModal("signup");
        } else {
          // Fallback: send them to your signup/login page
          window.location.href = "/membership?auth=signup";
        }
        return;
      }

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
