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
      console.error("[BuyButton] Memberstack instance not found on window");
      alert("Signup is unavailable right now. Please refresh and try again.");
      return;
    }

    try {
      // 1) If user is not logged in, open SIGNUP modal and stop.
      if (ms.getCurrentMember) {
        const { data: member } = await ms.getCurrentMember();
        if (!member) {
          if (ms.openModal) {
            await ms.openModal("SIGNUP");
          }
          // User will sign up / log in in the modal, then click the button again.
          return;
        }
      }

      // 2) Logged-in member → proceed to checkout
      if (!ms.purchasePlansWithCheckout) {
        console.error("purchasePlansWithCheckout not available", ms);
        alert("Checkout unavailable. Please refresh and try again.");
        return;
      }

      const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
      const { origin } = window.location;

      const response = await ms.purchasePlansWithCheckout({
        priceId,
        successUrl: `${origin}/members?status=success`,
        cancelUrl: `${origin}/membership?canceled=1`,
      });

      if (response?.data?.url) {
        console.log("[BuyButton] Checkout URL:", response.data.url);
      }
    } catch (err) {
      console.error("[BuyButton] checkout error", err);

      // 3) If Memberstack still says login-required, open SIGNUP modal
      if (err?.code === "login-required" && ms?.openModal) {
        await ms.openModal("SIGNUP");
        return;
      }

      alert("Checkout failed. Please try again or contact support.");
    }
  }

  const baseClasses =
    "inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || baseClasses}
    >
      {children ?? (cadence === "yearly" ? "Start — Yearly" : "Start — Monthly")}
    </button>
  );
}
