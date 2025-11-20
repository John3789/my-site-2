// app/membership/BuyButton.jsx
"use client";

const PRICE_IDS = {
  monthly: "prc_15-99-dxji011p",
  yearly: "prc_97-50-eij00ppe",
};

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

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl = `${origin}/membership?canceled=1`;

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

      // 3) Now that they’re logged in, start checkout
      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl,
        cancelUrl,
        autoRedirect: true, // let Memberstack send them to Stripe
      });
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
