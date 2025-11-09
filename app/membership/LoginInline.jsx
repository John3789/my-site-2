// app/membership/LoginInline.jsx
"use client";

import { useMemberstack } from "@memberstack/react";
import { useCallback, useRef, useState } from "react";

export default function LoginInline({ children }) {
  const { memberstack, ready } = useMemberstack();
  const [err, setErr] = useState("");
  const polling = useRef(false);

  const open = useCallback(async () => {
    setErr("");

    // 1) Preferred: React SDK
    try {
      if (ready && memberstack && typeof memberstack.openModal === "function") {
        console.log("[Memberstack] opening modal via React SDK");
        await memberstack.openModal("LOGIN");
        afterOpen(memberstack);
        return;
      }
    } catch (e) {
      console.warn("[Memberstack] React SDK openModal failed:", e);
    }

    // 2) Window globals fallback
    try {
      const anyMS =
        (typeof window !== "undefined" &&
          (window.memberstack || window.Memberstack || window.$memberstack)) ||
        null;

      if (anyMS && typeof anyMS.openModal === "function") {
        console.log("[Memberstack] opening modal via window global");
        await anyMS.openModal("LOGIN");
        afterOpen(memberstack);
        return;
      }
    } catch (e) {
      console.warn("[Memberstack] window global openModal failed:", e);
    }

    // 3) Hard fallback: send them to /members (your middleware will gate)
    console.warn("[Memberstack] modal not available; hard-fallback to /members");
    if (typeof window !== "undefined") {
      window.location.href = "/members";
    } else {
      setErr("Sign-in is temporarily unavailable. Please try again.");
    }
  }, [ready, memberstack]);

  return (
    <>
      <button type="button" onClick={open} className="group">
        {children}
      </button>
      {err ? <p className="mt-2 text-sm text-red-500">{err}</p> : null}
    </>
  );
}

// After the modal opens, poll briefly to detect session and go to /members
async function afterOpen(memberstack) {
  let tries = 0;
  const maxTries = 20;

  const tick = async () => {
    tries++;
    try {
      const m = await memberstack?.getCurrentMember?.();
      if (m?.data?.id) {
        window.location.href = "/members";
        return;
      }
    } catch {
      // ignore and retry
    }
    if (tries < maxTries) {
      setTimeout(tick, 300);
    } else {
      // If not detected, still go — your middleware will gate appropriately
      window.location.href = "/members";
    }
  };

  tick();
}
