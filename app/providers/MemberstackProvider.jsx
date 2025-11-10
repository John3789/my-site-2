// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY || "";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    const ms = memberstackDOM.init({ publicKey: PUBLIC_KEY }); // ← no domain
    window.$memberstack = ms;
    try { ms.mount?.(); } catch {}

    const obs = new MutationObserver(() => { try { ms.mount?.(); } catch {} });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return children;
}
