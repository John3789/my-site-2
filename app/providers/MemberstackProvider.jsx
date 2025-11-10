// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

// ✅ Use your actual public key
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY || "pk_981855eac27759d0f11f";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // ✅ Initialize Memberstack (no custom domain!)
    const ms = memberstackDOM.init({ publicKey: PUBLIC_KEY });

    // ✅ Make it available globally for button actions
    window.$memberstack = ms;
    console.log("[MS] init OK", ms);

    // ✅ Mount to activate data-ms-action buttons
    try { ms.mount?.(); } catch {}

    // ✅ Re-mount if the DOM changes (Next.js App Router sometimes re-renders)
    const obs = new MutationObserver(() => {
      try { ms.mount?.(); } catch {}
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, []);

  return children;
}
