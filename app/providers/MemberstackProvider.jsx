// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

// ✅ Use your original env name; optional fallback just in case
const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MS_PUBLIC_KEY ||
  process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY ||
  "";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing PUBLIC KEY env (NEXT_PUBLIC_MS_PUBLIC_KEY).");
      return;
    }

    // ✅ No domain — let SDK use Memberstack’s hosted domain
    const ms = memberstackDOM.init({ publicKey: PUBLIC_KEY });

    // Make available for any manual calls (optional)
    window.$memberstack = ms;
    console.log("[MS] init OK", ms);

    // Wire up data-ms-action / data-ms-redirect buttons
    try { ms.mount?.(); } catch {}

    // Re-mount on DOM changes (App Router can swap nodes)
    const obs = new MutationObserver(() => {
      try { ms.mount?.(); } catch {}
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, []);

  return children;
}
