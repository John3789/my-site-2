// app/membership/LoginInline.jsx
"use client";

import { useMemberstack } from "@memberstack/react";
import { useCallback, useRef } from "react";

export default function LoginInline({ children }) {
  const { memberstack, ready } = useMemberstack();
  const polling = useRef(false);

  const onClick = useCallback(async () => {
    try {
      if (ready && memberstack?.openModal) {
        await memberstack.openModal("LOGIN");
      } else {
        const anyMS =
          window.memberstack || window.Memberstack || window.$memberstack;
        if (anyMS?.openModal) anyMS.openModal("LOGIN");
      }

      // After modal, detect session quickly then go straight to /members
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
            window.location.href = "/members";
          }
        };
        check();
      }
    } catch {
      // no-op; UI stays the same
    }
  }, [ready, memberstack]);

  return (
    <button type="button" onClick={onClick} className="group">
      {children}
    </button>
  );
}
