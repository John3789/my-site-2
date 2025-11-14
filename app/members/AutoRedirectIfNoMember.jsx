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
    let cancelled = false;

    async function gate() {
      const ms = getMemberstack();

      // If Memberstack isn't available at all, we do NOT want this page open
      if (!ms || !ms.getCurrentMember) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
        return;
      }

      try {
        const { data: member } = await ms.getCurrentMember();
        const hasPlan =
          Array.isArray(member?.planConnections) &&
          member.planConnections.length > 0;

        if (!hasPlan && !cancelled) {
          router.replace("/membership?need_member=1");
        }
      } catch (err) {
        if (!cancelled) {
          router.replace("/membership?need_member=1");
        }
      }
    }

    gate();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
