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

    if (!ms) {
      console.error("[BuyButton] Memberstack not available yet", ms);
      alert("Membership system is still loading. Please try again in a moment.");
      return;
    }

    // ✅ Make sure cadence is always one of these two strings
    const safeCadence = cadence === "yearly" ? "yearly" : "monthly";
    const priceId = PRICE_IDS[safeCadence] || PRICE_IDS.monthly;

    const payload = {
      cadence: safeCadence,
      priceId,
    };

    try {
      // ✅ Remember what they clicked so AutoContinueAfterSignup can resume checkout
      window.localStorage.setItem("ms_pending_checkout", JSON.stringify(payload));

      // ✅ For *logged-out* people, open the signup modal
      if (ms.openModal) {
        await ms.openModal("signup");
      } else if (ms.showSignup) {
        await ms.showSignup(); // older SDK API
      } else {
        // Fallback if there is some custom method
        console.warn("[BuyButton] No signup modal method found on Memberstack instance");
      }

      // We do NOT call purchasePlansWithCheckout here anymore.
      // AutoContinueAfterSignup will do that after signup/login.
    } catch (err) {
      console.error("[BuyButton] error starting signup/checkout", err);
      alert("Something went wrong starting checkout. Please try again.");
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
