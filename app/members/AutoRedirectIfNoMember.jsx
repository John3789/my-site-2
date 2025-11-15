// app/members/AutoRedirectIfNoMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function getMemberstack() {
  if (typeof window === "undefined") return null;
  return (
    window.$memberstackDom ||
    window.memberstack ||
    window.$memberstack ||
    null
  );
}

export default function AutoRedirectIfNoMember() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function runGate() {
      try {
        const ms = getMemberstack();

        // If Memberstack still isn't ready, try again shortly
        if (!ms || !ms.getCurrentMember) {
          if (!cancelled) {
            setTimeout(runGate, 300); // retry in 300ms
          }
          return;
        }

        const { data: member } = await ms.getCurrentMember();
        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        // If not logged in OR no active plan → send them away
        if (!hasPlan && !cancelled) {
          router.replace("/membership?need_member=1");
        }
      } catch (err) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
      }
    }

    // start the first check
    runGate();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
