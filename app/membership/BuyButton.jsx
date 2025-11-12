"use client";

const PRICE_IDS = {
  monthly: "prc_9_99-hj9j03x8",
  yearly:  "prc_89_99-lt9v0nf5",
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function ensureSession(ms) {
    // Is there a current member?
    const cur = await ms.getCurrentMember?.().catch(() => null);
    if (cur?.data) return true;

    // Open modal to sign up / log in
    try {
      // You can swap "SIGNUP" for "LOGIN" if you prefer.
      await ms.openModal?.("SIGNUP");
    } catch {
      // user closed the modal
      return false;
    }

    // Re-check after modal closes
    const after = await ms.getCurrentMember?.().catch(() => null);
    return !!after?.data;
  }

  async function handleClick(e) {
    e.preventDefault();

    let ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (ms && typeof ms.then === "function") {
      try { ms = await ms; } catch {}
    }

    if (!ms || typeof ms.purchasePlansWithCheckout !== "function") {
      console.error("[MS] not ready", ms);
      alert("Membership is loading. Please refresh and try again.");
      return;
    }

    // Make sure a session exists (fixes 401 login-required)
    const hasSession = await ensureSession(ms);
    if (!hasSession) return; // user closed modal

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;

    try {
      // This will navigate to Stripe Checkout
      await ms.purchasePlansWithCheckout({
        priceId,
        successUrl: `${origin}/members?status=success`,
        cancelUrl: `${origin}/membership?canceled=1`,
      });
    } catch (err) {
      console.error("[MS] checkout error:", err);
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
