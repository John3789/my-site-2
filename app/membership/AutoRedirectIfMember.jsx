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
          // ✅ Mark this tab as "member OK" so /members doesn't bounce them back
          setMemberFlag();
          // Logged-in paying member → send them to /members
          router.replace("/members");
        } else if (allowRetry) {
          // Give Memberstack a brief moment to attach the plan,
          // then check ONE more time before giving up.
          retryTimeout = setTimeout(() => {
            checkAndMaybeRedirect(false);
          }, 600);
        }
        // If !hasPlan and !allowRetry: do nothing, they stay on /membership
      } catch (e) {
        if (cancelled) return;
        // On error, do nothing instead of breaking the page
      }
    }

    // React only to auth changes (login/logout)
    const stop = ms.onAuthChange((member) => {
      // member will be null/undefined when logged out
      if (!member) return;

      // First check, with a single optional retry
      checkAndMaybeRedirect(true);
    });

    // Clean up listener on unmount
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
