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
    const maxAttempts = 6; // 6 × 500ms ≈ 3s patience total

    async function runGate() {
      if (cancelled) return;

      const ms = getMemberstack();

      // Memberstack script not ready yet → retry
      if (!ms || !ms.getCurrentMember) {
        if (attempts >= maxAttempts) {
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

        if (hasPlan) {
          setMemberFlag();
          setStatus("allowed");
          return;
        }

        const isLoggedIn = !!member?.id;

        // If nobody is logged in yet and we still have attempts left,
        // it might just be the first-load handshake → retry.
        if (!isLoggedIn && attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
          return;
        }

        // If we got here, we either:
        // - see a non-member, or
        // - waited long enough and still no member → redirect.
        router.replace("/membership?need_member=1");
      } catch (err) {
        if (cancelled) return;

        // Treat transient errors like "still initializing" up to maxAttempts
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

  if (status !== "allowed") {
    return (
      <div className="fixed inset-0 z-[9999] bg-[var(--color-teal-850)]" />
    );
  }

  return children;
}
