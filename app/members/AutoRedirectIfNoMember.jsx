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
    let secondCheckTimeout;

    async function runGate(allowRetry = true) {
      try {
        const ms = getMemberstack();

        // If Memberstack still isn't ready, try again shortly
        if (!ms || !ms.getCurrentMember) {
          if (!cancelled) {
            setTimeout(() => runGate(allowRetry), 300);
          }
          return;
        }

        const result = await ms.getCurrentMember();
        const member = result?.data ?? result;

        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        if (!hasPlan && !cancelled) {
          if (allowRetry) {
            // Give Memberstack a brief moment to finish attaching the plan,
            // then check ONE more time before redirecting.
            secondCheckTimeout = setTimeout(() => {
              runGate(false);
            }, 400);
          } else {
            router.replace("/membership?need_member=1");
          }
        }

        // If hasPlan === true, do nothing — they stay on /members
      } catch (err) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
      }
    }

    // start the first check
    runGate(true);

    return () => {
      cancelled = true;
      if (secondCheckTimeout) clearTimeout(secondCheckTimeout);
    };
  }, [router]);

  // This component is still "invisible" — same as before.
  return null;
}
