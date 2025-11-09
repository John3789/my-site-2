// app/membership/MembershipClient.jsx
"use client";

import { useMemberstack } from "@memberstack/react";
import { useCallback, useRef, useState } from "react";

export default function MembershipClient() {
  const { memberstack, ready } = useMemberstack();
  const [error, setError] = useState("");
  const polling = useRef(false);

  const openLogin = useCallback(async () => {
    setError("");
    try {
      if (ready && memberstack?.openModal) {
        await memberstack.openModal("LOGIN");
      } else {
        const anyMS = window.memberstack || window.Memberstack || window.$memberstack;
        if (anyMS?.openModal) anyMS.openModal("LOGIN");
      }

      // Poll briefly; if member is present, jump to /members
      if (!polling.current) {
        polling.current = true;
        const start = Date.now();
        const limitMs = 6000;

        const check = async () => {
          try {
            const m = await memberstack?.getCurrentMember?.();
            if (m?.data?.id) {
              window.location.href = "/members";
              return;
            }
          } catch {}
          if (Date.now() - start < limitMs) {
            setTimeout(check, 300);
          } else {
            window.location.href = "/members"; // middleware will gate if needed
          }
        };
        check();
      }
    } catch (e) {
      setError(e?.message || "Couldn’t open sign-in.");
    }
  }, [ready, memberstack]);

  return (
    <div className="mt-6">
      <button
        onClick={openLogin}
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Sign in
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
