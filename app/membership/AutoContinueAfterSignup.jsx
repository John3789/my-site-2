// app/membership/AutoContinueAfterSignup.jsx
"use client";

import { useEffect } from "react";

const PRICE_IDS = {
  monthly: "prc_9-99-hj9j03x8",
  yearly: "prc_89-99-jwgn03ep",
};

export default function AutoContinueAfterSignup() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ms =
      window.$memberstack || window.memberstack || window.Memberstack || null;

    if (!ms?.purchasePlansWithCheckout || !ms?.getCurrentMember) return;

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

    // Clear first so we don’t loop
    window.localStorage.removeItem("ms_pending_checkout");

    const run = async () => {
      try {
        const res = await ms.getCurrentMember();
        const member = res?.data?.member;
        if (!member) {
          // somehow still not logged in – don’t do anything
          return;
        }

        const { origin } = window.location;
        await ms.purchasePlansWithCheckout({
          priceId,
          successUrl: `${origin}/members?status=success`,
          cancelUrl: `${origin}/membership?canceled=1`,
        });
      } catch (err) {
        console.error("[AutoContinueAfterSignup] checkout retry failed", err);
      }
    };

    run();
  }, []);

  return null;
}
