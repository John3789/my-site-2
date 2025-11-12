"use client";

const PRICE_IDS = {
  monthly: "prc_9_99-hj9j03x8",
  yearly:  "prc_89_99-lt9v0nf5",
};

async function ensureSession(ms, cadence) {
  // already logged in?
  try {
    const cur = await ms.getCurrentMember?.();
    if (cur?.data) return true;
  } catch {}

  // try embedded modal first (SIGNUP shows create-account form)
  try {
    await ms.openModal?.("SIGNUP");
  } catch {
    /* user closed modal */
  }

  try {
    const after = await ms.getCurrentMember?.();
    if (after?.data) return true;
  } catch {}

  // Fallback: full hosted signup (sets cookies reliably)
  const origin = window.location.origin;
  const hosted = (process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "").replace(/\/$/, "");
  const ret = `${origin}/membership?joined=1&cadence=${encodeURIComponent(cadence)}`;
  window.location.href = `${hosted}/#/signup?redirect=${encodeURIComponent(ret)}`;
  return false; // we navigated away
}

export default function BuyButton({ cadence = "monthly", className = "", children }) {
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
      alert("Membership is loading. Please refresh and try again.");
      return;
    }

    const ok = await ensureSession(ms, cadence);
    if (!ok) return; // hosted redirect happened

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;

    try {
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
