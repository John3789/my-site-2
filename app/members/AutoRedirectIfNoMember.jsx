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
  try {
    return window.localStorage.getItem(MEMBER_OK_FLAG) === "true";
  } catch (err) {
    console.warn("Failed to read localStorage member flag", err);
    return false;
  }
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
  const [status, setStatus] = useState("checking"); // "checking" | "allowed" | "redirecting"

  // 1) Handle the "post-login reload" case
  useEffect(() => {
    if (typeof window === "undefined") return;

    const flag = window.sessionStorage?.getItem(POST_LOGIN_FLAG);
    if (!flag) return;

    // We just came back from a hard reload after login/payment
    window.sessionStorage.removeItem(POST_LOGIN_FLAG);

    // Mark this tab as allowed and go to members home
    setMemberFlag();
    setPersistentMemberFlag();
    setStatus("allowed");
    router.replace("/members");
  }, [router]);

  // 2) Normal Memberstack gate — but NO full-screen overlay anymore
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let retryTimeout;
    let attempts = 0;
    const maxAttempts = 10; // 10 × 500ms ≈ 5s total patience

    async function runGate() {
      if (cancelled) return;

      // If we've already marked this tab OK, don't block anything
      if (hasMemberFlag() || hasPersistentMemberFlag()) {
        setStatus("allowed");
        return;
      }

      const ms = getMemberstack();

      // Memberstack script not ready yet → retry
      if (!ms || !ms.getCurrentMember) {
        if (attempts >= maxAttempts) {
          console.warn(
            "[Member gate] Memberstack not ready after retries — skipping gate (allowing)."
          );
          setStatus("allowed");
          return;
        }
        attempts += 1;
        retryTimeout = window.setTimeout(runGate, 500);
        return;
      }

      try {
        const result = await ms.getCurrentMember();
        if (cancelled) return;

        const member = result?.data;
        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        const isLoggedIn = !!member?.id;

        if (hasPlan) {
          console.log("Member confirmed, rendering page.");
          setMemberFlag();
          setPersistentMemberFlag();
          setStatus("allowed");
          return;
        }

        // Not logged in yet – could still be handshake
        if (!isLoggedIn && attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
          return;
        }

        // Logged in but no plan – give it more time once
        if (isLoggedIn && attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
          return;
        }

        // After all attempts, treat as no member
        console.warn("[Member gate] No valid member/plan found — redirecting.");
        setStatus("redirecting");
        router.replace("/membership?need_member=1");
      } catch (err) {
        if (cancelled) return;

        console.warn("[Member gate] Error during gate:", err);
        if (attempts < maxAttempts) {
          attempts += 1;
          retryTimeout = window.setTimeout(runGate, 500);
        } else {
          setStatus("redirecting");
          router.replace("/membership?need_member=1");
        }
      }
    }

    runGate();

    return () => {
      cancelled = true;
      if (retryTimeout) {
        window.clearTimeout(retryTimeout);
      }
    };
  }, [router]);

  // 3) Optional: you *could* show a tiny "Checking access..." bar or nothing at all.
  // The key fix is: DO NOT block the entire screen with a fixed overlay.

  return children;
}
