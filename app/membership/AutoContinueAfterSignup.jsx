// app/membership/AutoContinueAfterSignup.jsx
"use client";

import { useEffect } from "react";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_99-99-od7m0akf",
};

export default function AutoContinueAfterSignup() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ms =
      window.$memberstack || window.memberstack || window.Memberstack || null;

    if (!ms?.purchasePlansWithCheckout) return;

    const raw = window.localStorage.getItem("ms_pending_checkout");
    if (!raw) return;

    let stored;
    try {
      stored = JSON.parse(raw);
    } catch {
      window.localStorage.removeItem("ms_pending_checkout");
      return;
    }

    const cadence = stored?.cadence === "yearly" ? "yearly" : "monthly";
    const priceId = stored?.priceId || PRICE_IDS[cadence] || PRICE_IDS.monthly;

    // Clear first so we don’t loop if something breaks
    window.localStorage.removeItem("ms_pending_checkout");

    const { origin } = window.location;
    const successUrl = `${origin}/members?status=success`;
    const cancelUrl = `${origin}/membership?canceled=1`;

    ms.purchasePlansWithCheckout({
      priceId,
      successUrl,
      cancelUrl,
    }).catch((err) => {
      console.error("[AutoContinueAfterSignup] checkout retry failed", err);
    });
  }, []);

  return null;
}
