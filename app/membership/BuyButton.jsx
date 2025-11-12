// app/membership/BuyButton.jsx
"use client";
import { useCallback, useState } from "react";

// LIVE price IDs (paid prices, not planIds)
const MONTHLY = "prc_9-99-hj9j03x8";
const YEARLY  = "prc_89-99-lt9v0nf5";

export default function BuyButton({
  cadence = "monthly",
  className = "",
  children,
  successUrl,
  cancelUrl,
}) {
  const [busy, setBusy] = useState(false);

  const startCheckout = async (ms, priceId) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return ms.purchasePlansWithCheckout({
      // array form is accepted across DOM builds
      priceIds: [priceId],
      successUrl: successUrl || `${origin}/members`,
      cancelUrl: cancelUrl || `${origin}/membership?canceled=1`,
    });
  };

  const ensureAuthThenCheckout = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const ms =
        (typeof window !== "undefined" &&
          (window.$memberstack || window.memberstack || window.Memberstack)) ||
        null;

      if (!ms?.purchasePlansWithCheckout) throw new Error("Memberstack is not ready yet.");

      const priceId = cadence === "yearly" ? YEARLY : MONTHLY;

      // 1) Try checkout immediately
      try {
        await startCheckout(ms, priceId);
        return;
      } catch (e1) {
        // If auth is required, prompt the built-in modal and then retry once
        const msg1 = (e1 && (e1.message || e1.error)) || "";
        const needsAuth = /must be logged in|not authenticated|auth/i.test(msg1);
        if (!needsAuth) throw e1;

        // 2) Ask user to sign up or log in; Memberstack DOM provides a modal
        // Try SIGNUP first, then LOGIN if SIGNUP isn't available
        try {
          if (ms.openModal) {
            // common DOM usage is openModal("SIGNUP") or openModal("LOGIN")
            await (ms.openModal("SIGNUP") || ms.openModal("LOGIN"));
          } else if (ms.showSignUp) {
            await ms.showSignUp();
          } else if (ms.showLogin) {
            await ms.showLogin();
          }
        } catch {
          /* ignore modal open errors; we'll still retry */
        }

        // 3) Retry checkout once after auth modal
        try {
          await startCheckout(ms, priceId);
          return;
        } catch (e2) {
          throw e2;
        }
      }
    } catch (e) {
      console.error("[MS checkout] failed:", e);
      const msg =
        e?.message ||
        e?.error ||
        (typeof e === "string" ? e : "Checkout failed. Please try again.");
      alert(msg);
    } finally {
      setBusy(false);
    }
  }, [busy, cadence, successUrl, cancelUrl]);

  return (
    <button onClick={ensureAuthThenCheckout} disabled={busy} className={className}>
      {busy ? "Starting…" : children || "Start Full Access"}
    </button>
  );
}
