// app/members/AutoRedirectIfNoMember.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MEMBER_OK_FLAG = "__salernoMemberOk";

function getMemberstack() {
  if (typeof window === "undefined") return null;
  return (
    window.$memberstackDom ||
    window.memberstack ||
    window.$memberstack ||
    null
  );
}

function hasMemberFlag() {
  if (typeof window === "undefined") return false;
  return window[MEMBER_OK_FLAG] === true;
}

function setMemberFlag() {
  if (typeof window === "undefined") return;
  window[MEMBER_OK_FLAG] = true;
}

export default function AutoRedirectIfNoMember({ children }) {
  const router = useRouter();

  const [status, setStatus] = useState(() => {
    if (typeof window !== "undefined" && hasMemberFlag()) {
      return "allowed";
    }
    return "checking";
  });

  useEffect(() => {
    if (status !== "checking") return;

    let cancelled = false;
    let retryTimeout;
    let attempts = 0;
    const maxAttempts = 10; // 10 × 500ms ≈ 5s total patience

    async function runGate() {
      if (cancelled) return;

      const ms = getMemberstack();

      // Memberstack script not ready yet → retry
      if (!ms || !ms.getCurrentMember) {
        if (attempts >= maxAttempts) {
          // After enough tries with no Memberstack, treat as "no member"
          router.replace("/membership?need_member=1");
          return;
        }
        attempts += 1;
        retryTimeout = window.setTimeout(runGate, 500);
        return;
      }

      try {
        const result = await ms.getCurrentMember();
        const member = result?.data;
        if (cancelled) return;

        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        const isLoggedIn = !!member?.id;

        // ✅ Paid member with a plan: allow through and remember for this tab
        if (hasPlan) {
          setMemberFlag();
          setStatus("allowed");
          return;
        }

        // ⏳ Not logged in yet – could still be the first-load handshake
        if (!isLoggedIn && attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
          return;
        }

        // ⏳ Logged in but no plan yet – likely just created account / just paid
        // Give Memberstack more time to attach planConnections before we eject them
        if (isLoggedIn && attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
          return;
        }

        // ❌ After all attempts:
        // - either not logged in, or logged in but still no plan → send back
        router.replace("/membership?need_member=1");
      } catch (err) {
        if (cancelled) return;

        // Treat errors like "still initializing" up to maxAttempts
        if (attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
        } else {
          router.replace("/membership?need_member=1");
        }
      }
    }

    // If we've already marked this tab ok somehow, skip everything
    if (hasMemberFlag()) {
      setStatus("allowed");
    } else {
      runGate();
    }

    return () => {
      cancelled = true;
      if (retryTimeout) {
        window.clearTimeout(retryTimeout);
      }
    };
  }, [router, status]);

  // While checking, keep the overlay (your existing behavior)
  if (status !== "allowed") {
    return (
      <div className="fixed inset-0 z-[9999] bg-[var(--color-teal-850)]" />
    );
  }

  return children;
}
