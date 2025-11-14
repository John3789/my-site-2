// app/members/AutoRedirectIfNoMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Same live RISE plan IDs you used in AutoRedirectIfMember
const RISE_PLAN_IDS = [
  "pln_rise-monthly-plan-y9ao098m",
  "pln_rise-yearly-plan-4w9s0n01",
];

export default function AutoRedirectIfNoMember() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ms = window.$memberstack || window.memberstack || window.Memberstack || null;

    if (!ms?.getCurrentMember) {
      console.warn("[AutoRedirectIfNoMember] Memberstack not ready yet");
      return;
    }

    ms.getCurrentMember()
      .then((res) => {
        const member = res?.data?.member || res?.data || res?.member || null;

        // Not logged in at all → send to membership
        if (!member) {
          router.replace("/membership");
          return;
        }

        const plans = member.plans || member.activePlans || member.memberships || [];
        const hasRise = Array.isArray(plans)
          ? plans.some((p) => RISE_PLAN_IDS.includes(p.id || p.planId || p.plan_id))
          : false;

        // Logged in but does NOT have RISE → send to membership
        if (!hasRise) {
          router.replace("/membership");
        }
      })
      .catch((err) => {
        console.error("[AutoRedirectIfNoMember] getCurrentMember error", err);
      });
  }, [router]);

  return null;
}
