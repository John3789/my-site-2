// app/members/AutoRedirectIfNoMember.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MEMBER_OK_FLAG = "__salernoMemberOk";
const POST_LOGIN_FLAG = "postLoginReload"; // must match what you set after login

function setPersistentMemberFlag() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MEMBER_OK_FLAG, "true");
  } catch (err) {
    console.warn("Failed to set localStorage member flag", err);
  }
}

function hasPersistentMemberFlag() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MEMBER_OK_FLAG) === "true";
}

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
    if (typeof window !== "undefined" && (hasMemberFlag() || hasPersistentMemberFlag())) {
      return "allowed";
    }
    return "checking";
  });

  // ✅ 1) Handle the "post-login reload" case first
  useEffect(() => {
    if (typeof window === "undefined") return;

    const flag = window.sessionStorage?.getItem(POST_LOGIN_FLAG);
    if (!flag) return;

    // We just came back from a hard reload after login/payment
    window.sessionStorage.removeItem(POST_LOGIN_FLAG);

    // Mark this tab as allowed and go to members home
    setMemberFlag();
    setStatus("allowed");
    router.replace("/members");
  }, [router]);

  // ✅ 2) Normal Memberstack gate (unchanged except for using status)
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
          console.log("Member confirmed, rendering page.");
          setMemberFlag();
          setPersistentMemberFlag(); // New line to persist the flag
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

  // ✅ 3) Safety watchdog: never stay "checking" forever
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status !== "checking") return;

    // If the gate hasn't resolved within 8 seconds, stop blocking the UI.
    const watchdog = window.setTimeout(() => {
      console.warn(
        "[Member gate] Timed out after 8s — proceeding as allowed to avoid lock."
      );
      setMemberFlag();
      setPersistentMemberFlag();
      setStatus("allowed");
    }, 8000);

    return () => {
      window.clearTimeout(watchdog);
    };
  }, [status]);

  // While checking, keep the overlay (your existing behavior)
  if (status !== "allowed") {
    return (
      <div className="fixed inset-0 z-[9999] bg-[var(--color-teal-850)]" />
    );
  }

  return children;
}
