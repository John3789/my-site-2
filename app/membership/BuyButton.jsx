// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

const PLAN_IDS = {
  monthly: "pln_rise-monthly-plan-y9ao098m",
  yearly:  "pln_rise-yearly-plan-4w9s0n01",
};

// 👇 Stripe/Memberstack coupon ID for $1 trial (monthly)
const STRIPE_COUPON_ID = "UMJ0pIHr"; // change if your coupon ID is different


export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (!ms) {
      console.error("[BuyButton] Memberstack client not found", ms);
      alert("Membership system is still loading. Please try again in a moment.");
      return;
    }

const planId = PLAN_IDS[cadence] || PLAN_IDS.monthly;


    try {
      // 1) Check if user is already logged in
      let member = null;
      try {
        const res = await ms.getCurrentMember?.();
        // Memberstack DOM can return { data: member } or { data: { member } }
        member = res?.data?.member || res?.data || res?.member || null;
      } catch (err) {
        console.warn("[BuyButton] getCurrentMember failed (probably logged out)", err);
      }

      // 2) If NOT logged in, open the signup modal and wait until it finishes
      if (!member) {
        await ms.openModal("SIGNUP"); // resolves after successful signup/login
      }

// 3) Now that they’re logged in, start checkout WITH plan + optional coupon
const plans = [
  {
    planId,
    // Only apply coupon for the monthly plan
    ...(cadence === "monthly" ? { coupon: STRIPE_COUPON_ID } : {}),
  },
];

await ms.purchasePlansWithCheckout(plans);

    } catch (err) {
      console.error("[BuyButton] checkout flow error", err);
      alert("Checkout failed. Please try again, or contact support if it continues.");
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
