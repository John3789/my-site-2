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

        if (cancelled) return;

        if (hasPlan) {
          // Valid member → allow page to render
          setStatus("allowed");
        } else {
          // Not logged in OR no active plan → send them away
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

  // While checking (or redirecting), render nothing → no flash
  if (status !== "allowed") {
    return null;
  }

  // Once we KNOW they’re a valid member, show the content
  return children;
}
