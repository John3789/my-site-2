// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const DOMAIN = "https://memberstack-client.drjuanpablosalerno.com";
const PUBLIC_KEY = "pk_981855eac27759d0f11f";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // Init (sync)
    const ms = memberstackDOM.init({ domain: DOMAIN, publicKey: PUBLIC_KEY });
    window.$memberstack = ms;
    console.log("[MS] init OK", ms);

    // ✅ Attach data-ms-* click handlers now
    if (typeof ms?.mount === "function") {
      try { ms.mount(); } catch {}
    }

    // ✅ Re-attach if the DOM changes (App Router often re-renders)
    const obs = new MutationObserver(() => {
      try { ms?.mount?.(); } catch {}
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => obs.disconnect();
  }, []);

  return children;
}
