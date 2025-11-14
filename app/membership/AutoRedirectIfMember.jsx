// app/membership/AutoRedirectIfMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function getMemberstackCore() {
  if (typeof window === "undefined") return null;
  return (
    window.memberstack ||
    window.$memberstackDom ||
    window.$memberstack ||
    null
  );
}

export default function AutoRedirectIfMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMemberstackCore();
    if (!ms || !ms.onAuthChange) return;

    // ⚠️ Only react to *auth changes* (login/logout),
    // NOT just "page load while already logged in."
    const stop = ms.onAuthChange(async (member) => {
      // member will be null/undefined when logged out
      if (!member) return;

      try {
        // Normalise shape: sometimes it's { data }, sometimes it's raw
        const raw = member?.data || member;

        // Check their plans via getCurrentMember
        if (!ms.getCurrentMember) return;
        const { data } = await ms.getCurrentMember();
        const hasPlan =
          Array.isArray(data?.planConnections) &&
          data.planConnections.length > 0;

        if (hasPlan) {
          router.replace("/members");
        }
      } catch (e) {
        // If something explodes, do nothing instead of breaking the page
      }
    });

    // Clean up listener on unmount
    return () => {
      if (typeof stop === "function") {
        stop();
      } else if (stop?.unsubscribe) {
        stop.unsubscribe();
      }
    };
  }, [router]);

  return null;
}
