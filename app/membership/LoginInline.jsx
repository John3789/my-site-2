"use client";

import { useMemberstack } from "@memberstack/react";
import { useCallback, useRef, useState } from "react";

export default function LoginInline({ children }) {
  const { memberstack, ready } = useMemberstack();
  const [err, setErr] = useState("");
  const polled = useRef(false);

  const open = useCallback(async () => {
    setErr("");

    try {
      if (ready && memberstack && typeof memberstack.openModal === "function") {
        console.log("[MS] opening modal via React SDK");
        await memberstack.openModal("LOGIN");
        pollThenGo(memberstack);
        return;
      }
    } catch (e) {
      console.warn("[MS] React SDK openModal failed:", e);
    }

    try {
      const anyMS =
        (typeof window !== "undefined" &&
          (window.memberstack || window.Memberstack || window.$memberstack)) ||
        null;
      if (anyMS && typeof anyMS.openModal === "function") {
        console.log("[MS] opening modal via window global");
        await anyMS.openModal("LOGIN");
        pollThenGo(memberstack);
        return;
      }
    } catch (e) {
      console.warn("[MS] window global openModal failed:", e);
    }

    console.warn("[MS] modal not available; fallback to /members");
    if (typeof window !== "undefined") window.location.href = "/members";
    else setErr("Sign-in temporarily unavailable.");
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

function pollThenGo(memberstack) {
  if (typeof window === "undefined") return;
  if (pollThenGo._running) return;
  pollThenGo._running = true;

  let tries = 0;
  const tick = async () => {
    tries++;
    try {
      const m = await memberstack?.getCurrentMember?.();
      if (m?.data?.id) {
        window.location.href = "/members";
        return;
      }
    } catch {}
    if (tries < 20) setTimeout(tick, 300);
    else window.location.href = "/members"; // middleware will gate if needed
  };
  tick();
}
