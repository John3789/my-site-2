// app/membership/BuyButton.jsx
"use client";

export default function BuyButton({ cadence = "monthly", className = "", children }) {
  async function handleClick(e) {
    e.preventDefault();

    const safeCadence = cadence === "yearly" ? "yearly" : "monthly";

    try {
      const res = await fetch("/api/checkout/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cadence: safeCadence }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        console.error("[BuyButton] /api/checkout/member error", data);
        alert("Checkout unavailable. Please try again in a moment.");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("[BuyButton] unexpected error", err);
      alert("Checkout failed. Please try again in a moment.");
    }
  }

  const baseClasses =
    className ||
    "inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md transition hover:shadow-lg hover:-translate-y-0.5 ring-1 ring-black/10";

  const defaultLabel = safeCadence === "yearly" ? "Start — Yearly" : "Start — Monthly";

  return (
    <button type="button" onClick={handleClick} className={baseClasses}>
      {children ?? defaultLabel}
    </button>
  );
}
