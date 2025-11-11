// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY; // keep as-is

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    // DOM package init (no domain while your custom subdomain is unverified)
    const ms = memberstackDOM.init({
      publicKey: PUBLIC_KEY,
      // Optional session tuning:
      // useCookies: true,
      // setCookieOnRootDomain: true,
      // sessionDurationDays: 14,
    });

    // expose if you want
    window.$memberstack = ms;

    // bind SDK to DOM (safe if no data-attrs present)
    try { ms.mount?.(); } catch {}
  }, []);

  return children;
}
