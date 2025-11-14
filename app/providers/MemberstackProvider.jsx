// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY;
const DOMAIN = "https://memberstack-client.drjuanpablosalerno.com";

export default function MemberstackProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    const ms = memberstackDOM.init({
      publicKey: PUBLIC_KEY,
      domain: DOMAIN, // 👈 critical for custom auth domain
    });

    if (typeof window !== "undefined") {
      window.$memberstack = ms;
      window.memberstack = ms;
      window.Memberstack = ms;
    }

    try {
      ms.mount?.();
      console.log("[MS] DOM mounted with custom domain:", DOMAIN);
    } catch (err) {
      console.error("[MS] mount error:", err);
    }
  }, []);

  return children;
}
