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

  // If we've *already* confirmed membership in this tab, skip the check
  const [status, setStatus] = useState(() => {
    if (typeof window !== "undefined" && hasMemberFlag()) {
      return "allowed";
    }
    return "checking";
  });

  useEffect(() => {
    let cancelled = false;

    // If we've already marked this tab as "member ok", don't re-check
    if (hasMemberFlag()) {
      setStatus("allowed");
      return;
    }

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
          // Valid member → remember it for this tab and allow page to render
          setMemberFlag();
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

    // start the first check (only if we didn't already know they're a member)
    if (status === "checking") {
      runGate();
    }

    return () => {
      cancelled = true;
    };
  }, [router, status]);

  // While checking, show the overlay (prevents footer/content flashes)
  if (status !== "allowed") {
    return (
      <div className="fixed inset-0 z-[9999] bg-[var(--color-teal-850)]" />
    );
  }

  // Once we KNOW they’re a valid member (or we've already confirmed them
  // earlier in this tab), show the content immediately.
  return children;
}
