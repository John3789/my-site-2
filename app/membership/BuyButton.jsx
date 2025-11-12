"use client";

const PRICE_IDS = {
  monthly: "prc_9_99-hj9j03x8",
  yearly:  "prc_89_99-lt9v0nf5",
};

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();
    console.log("[BuyButton] click, cadence:", cadence);

    let ms =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    // If someone set it to a Promise, await it
    if (ms && typeof ms.then === "function") {
      try { ms = await ms; } catch (err) { console.error("[MS] await failed:", err); }
    }

    if (!ms) {
      console.error("[MS] not initialized (window.$memberstack is null)");
      alert("Membership not ready. Please refresh and try again.");
      return;
    }

    if (typeof ms.purchasePlansWithCheckout !== "function") {
      console.error("[MS] purchasePlansWithCheckout missing on instance:", ms);
      alert("Checkout unavailable. Please refresh and try again.");
      return;
    }

    const priceId = PRICE_IDS[cadence] || PRICE_IDS.monthly;
    const { origin } = window.location;
    const payload = {
      priceId,
      successUrl: `${origin}/members?status=success`,
      cancelUrl: `${origin}/membership?canceled=1`,
    };

    console.log("[MS] purchasePlansWithCheckout payload:", payload);

    try {
      // don't await the navigation — kick it off and let it redirect
      const p = ms.purchasePlansWithCheckout(payload);
      if (p && typeof p.catch === "function") {
        p.catch(err => {
          console.error("[MS] checkout promise rejected:", err);
          alert("Checkout failed. Please try again.");
        });
      }
      // If the SDK navigates away immediately, code after this won't run.
      console.log("[MS] purchase invoked");
    } catch (err) {
      console.error("[MS] purchase threw:", err);
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
