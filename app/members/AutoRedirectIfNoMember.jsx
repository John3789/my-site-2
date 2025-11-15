// app/members/AutoRedirectIfNoMember.jsx
"use client";

import { useEffect, useState } from "react";
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

export default function AutoRedirectIfNoMember({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // "checking" | "allowed"

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

        if (cancelled) return;

        if (hasPlan) {
          // Valid member → allow page to render
          setStatus("allowed");
          return;
        }

        // No plan yet
        if (allowRetry) {
          // Give Memberstack a brief moment to attach the plan
          secondCheckTimeout = setTimeout(() => {
            runGate(false);
          }, 400);
        } else {
          // Confirmed non-member → redirect away
          router.replace("/membership?need_member=1");
        }
      } catch (err) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
      }
    }

    runGate(true);

    return () => {
      cancelled = true;
      if (secondCheckTimeout) clearTimeout(secondCheckTimeout);
    };
  }, [router]);

  // While checking OR redirecting, render nothing.
  if (status !== "allowed") {
    return null;
  }

  // Only render content once we KNOW they’re a valid member.
  return children;
}
