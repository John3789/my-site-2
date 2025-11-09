// app/account/AccountIsland.jsx
"use client";

import { useState } from "react";

export default function AccountIsland() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const goToStripePortal = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErr("");

    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json(); // { url: "https://billing.stripe.com/..." }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (e) {
      setErr("Unable to open billing portal. Please try again.");
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Manage Billing</h1>
      <p className="mt-2 opacity-80">
        Update your payment method, view invoices, or cancel your plan.
      </p>

      <button
        onClick={goToStripePortal}
        disabled={loading}
        className="mt-6 inline-flex rounded-full border border-amber-300 bg-amber-300 text-black px-5 py-3 font-semibold active:translate-y-px disabled:opacity-60"
      >
        {loading ? "Opening…" : "Open Billing Portal"}
      </button>

      {err && <p className="mt-3 text-red-400">{err}</p>}
    </main>
  );
}
