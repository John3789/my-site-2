// app/members/AutoRedirectIfNoMember.jsx
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

export default function AutoRedirectIfNoMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMemberstack();

    // 👉 If Memberstack isn't ready yet, do NOTHING.
    // We only want to redirect once we can actually ask "are they a member?"
    if (!ms || !ms.getCurrentMember) {
      return;
    }

    let cancelled = false;

    async function checkMember() {
      try {
        const { data: member } = await ms.getCurrentMember();
        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        // If not logged in OR no active plan → send them away
        if (!hasPlan && !cancelled) {
          router.replace("/membership?need_member=1");
        }
      } catch (err) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
      }
    }

    // 1) Run once on first load
    checkMember();

    // 2) Also react to future login/logout changes
    let stop;
    if (ms.onAuthChange) {
      stop = ms.onAuthChange(async (memberWrapper) => {
        if (cancelled) return;

        const member = memberWrapper?.data || memberWrapper;
        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        // If they lose their plan or log out → kick them out of /members
        if (!hasPlan) {
          router.replace("/membership?need_member=1");
        }
      });
    }

    return () => {
      cancelled = true;
      if (typeof stop === "function") {
        stop();
      } else if (stop?.unsubscribe) {
        stop.unsubscribe();
      }
    };
  }, [router]);

  return null;
}
