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
    if (!ms || !ms.getCurrentMember) {
      // If Memberstack isn't ready at all, be safe and send them away
      router.replace("/membership?need_member=1");
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

    checkMember();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
