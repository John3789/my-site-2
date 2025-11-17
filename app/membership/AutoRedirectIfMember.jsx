// app/membership/AutoRedirectIfMember.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MEMBER_OK_FLAG = "__salernoMemberOk";

function getMemberstackCore() {
  if (typeof window === "undefined") return null;
  return (
    window.memberstack ||
    window.$memberstackDom ||
    window.$memberstack ||
    null
  );
}

function setMemberFlag() {
  if (typeof window === "undefined") return;
  window[MEMBER_OK_FLAG] = true;
}

export default function AutoRedirectIfMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMemberstackCore();
    if (!ms || !ms.onAuthChange) return;

    let cancelled = false;
    let retryTimeout;

    async function checkAndMaybeRedirect(allowRetry = true) {
      try {
        if (!ms.getCurrentMember) return;

        const result = await ms.getCurrentMember();
        const data = result?.data ?? result;

        const hasPlan =
          Array.isArray(data?.planConnections) &&
          data.planConnections.length > 0;

        if (cancelled) return;

        if (hasPlan) {
          // ✅ Mark this tab as already validated
          setMemberFlag();

          // Send directly to /members
          router.replace("/members");
        } else if (allowRetry) {
          // Retry once after a brief delay
          retryTimeout = setTimeout(() => {
            checkAndMaybeRedirect(false);
          }, 600);
        }
        // If !hasPlan and !allowRetry, do nothing (stay on membership page)
      } catch (e) {
        if (cancelled) return;
      }
    }

    const stop = ms.onAuthChange((member) => {
      if (!member) return;
      checkAndMaybeRedirect(true);
    });

    return () => {
      cancelled = true;
      if (retryTimeout) clearTimeout(retryTimeout);

      if (typeof stop === "function") {
        stop();
      } else if (stop?.unsubscribe) {
        stop.unsubscribe();
      }
    };
  }, [router]);

  return null;
}
