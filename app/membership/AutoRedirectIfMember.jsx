// app/membership/AutoRedirectIfMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Your live RISE plan IDs (from Memberstack dashboard)
const RISE_PLAN_IDS = [
  "pln_rise-monthly-plan-y9ao098m",
  "pln_rise-yearly-plan-4w9s0n01",
];

export default function AutoRedirectIfMember() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ Only run this logic right after a successful purchase/signup
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status !== "success") {
      // No ?status=success → let everyone stay on /membership
      return;
    }

    const ms =
      window.$memberstack || window.memberstack || window.Memberstack || null;

    if (!ms?.getCurrentMember) {
      console.warn("[AutoRedirectIfMember] Memberstack not ready yet");
      return;
    }

    ms.getCurrentMember()
      .then((res) => {
        const member = res?.data?.member || res?.data || res?.member || null;
        if (!member) return;

        const plans =
          member.plans || member.activePlans || member.memberships || [];

        const hasRise = Array.isArray(plans)
          ? plans.some((p) =>
              RISE_PLAN_IDS.includes(p.id || p.planId || p.plan_id)
            )
          : false;

        // ✅ Only redirect if they truly have a RISE plan
        if (hasRise) {
          router.replace("/members");
        }
      })
      .catch((err) => {
        console.error("[AutoRedirectIfMember] getCurrentMember error", err);
      });
  }, [router]);

  return null;
}
