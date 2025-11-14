// app/membership/AutoRedirectIfMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Your RISE plan IDs
const RISE_PLAN_IDS = [
  "pln_rise-monthly-plan-y9ao098m",
  "pln_rise-yearly-plan-4w9s0n01",
];

export default function AutoRedirectIfMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = window.$memberstack || window.memberstack || window.Memberstack;
    if (!ms?.getCurrentMember) return;

    ms.getCurrentMember()
      .then((res) => {
        const member = res?.data?.member || res?.member || null;
        if (!member) return;

        const plans = member.activePlans || member.plans || [];

        const hasRise = plans.some((p) =>
          RISE_PLAN_IDS.includes(p.id || p.planId)
        );

        if (hasRise) {
          router.replace("/members");
        }
      })
      .catch(() => {});
  }, [router]);

  return null;
}
