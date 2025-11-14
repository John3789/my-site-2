// app/membership/AutoRedirectIfMember.jsx
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

export default function AutoRedirectIfMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMemberstack();
    if (!ms) return;

    let cancelled = false;

    async function sendIfMember() {
      if (!ms.getCurrentMember) return;
      try {
        const { data: member } = await ms.getCurrentMember();
        const hasPlan = !!member?.planConnections?.length;

        if (!cancelled && hasPlan) {
          router.replace("/members");
        }
      } catch {
        // ignore
      }
    }

    // 1) Check immediately on load (for people coming from successUrl, refresh, etc.)
    sendIfMember();

    // 2) Listen for login / plan changes
    let listener;
    if (ms.onAuthChange) {
      listener = ms.onAuthChange((memberWrapper) => {
        if (cancelled) return;

        const member = memberWrapper?.data || memberWrapper;
        const hasPlan = !!member?.planConnections?.length;

        if (hasPlan) {
          router.replace("/members");
        }
      });
    }

    return () => {
      cancelled = true;
      if (listener?.unsubscribe) listener.unsubscribe();
    };
  }, [router]);

  return null;
}
