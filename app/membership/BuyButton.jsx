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

    if (!ms?.purchasePlansWithCheckout || !ms?.getCurrentMember) {
      console.error("Memberstack not ready or missing purchasePlansWithCheckout", ms);
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const safeCadence = cadence === "yearly" ? "yearly" : "monthly";
    const priceId = PRICE_IDS[safeCadence] || PRICE_IDS.monthly;
    const { origin } = window.location;

    // 1) Check if user is logged in
    let member;
    try {
      const res = await ms.getCurrentMember();
      member = res?.data?.member;
    } catch (err) {
      console.warn("[BuyButton] getCurrentMember failed", err);
    }

    // 2) If NOT logged in → remember what they wanted + open signup modal
    if (!member) {
      try {
        window.localStorage.setItem(
          "ms_pending_checkout",
          JSON.stringify({
            cadence: safeCadence,
            priceId,
            ts: Date.now(),
          })
        );
      } catch {}

      if (typeof ms.openModal === "function") {
        ms.openModal("signup");
      } else if (typeof ms.open === "function") {
        ms.open("signup");
      } else {
        console.error("No Memberstack modal open function found");
      }
      return;
    }

    // 3) If already logged in → go straight to checkout
    try {
      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl: `${origin}/members?status=success`,
        cancelUrl: `${origin}/membership?canceled=1`,
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
