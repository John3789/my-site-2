// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (!ms) {
      console.error("[BuyButton] Memberstack not found");
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl = `${origin}/membership?canceled=1`;

    try {
      // 1) Check if user is logged in
      const current = (await ms.getCurrentMember?.()) || {};
      const isLoggedIn = !!current?.data?.id;

      if (!isLoggedIn) {
        // remember what they tried to buy
        window.localStorage.setItem(
          "ms_pending_checkout",
          JSON.stringify({ cadence, priceId })
        );

        // open signup modal
        if (ms.openModal) {
          await ms.openModal("signup");
        } else if (ms.showSignup) {
          await ms.showSignup();
        } else {
          console.warn("[BuyButton] No signup modal method found on Memberstack");
        }

        return;
      }

      // 2) Already logged in → go straight to checkout
      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl,
        cancelUrl,
      });
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
