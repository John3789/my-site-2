"use client";
import { useEffect } from "react";

const PRICE_IDS = {
  monthly: "prc_9_99-hj9j03x8",
  yearly:  "prc_89_99-lt9v0nf5",
};

export default function AutoContinueAfterSignup() {
  useEffect(() => {
    const ms = (typeof window !== "undefined" && (window.$memberstack || window.memberstack || window.Memberstack)) || null;
    if (!ms) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("joined") !== "1") return; // only run after hosted signup

    const cadence = params.get("cadence") || "monthly";

    (async () => {
      try {
        const { data } = await ms.getCurrentMember?.();
        if (!data) return; // if still not logged in, user can click the button again

        await ms.purchasePlansWithCheckout({
          priceId: PRICE_IDS[cadence] || PRICE_IDS.monthly,
          successUrl: `${window.location.origin}/members?status=success`,
          cancelUrl: `${window.location.origin}/membership?canceled=1`,
        });
      } catch (err) {
        console.error("[MS] auto-continue error:", err);
      }
    })();
  }, []);

  return null;
}
