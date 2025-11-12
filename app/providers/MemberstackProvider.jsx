// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY;

export default function MemberstackProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    // ✅ Single, canonical init (with custom client domain)
    const ms = memberstackDOM.init({
      publicKey: PUBLIC_KEY,
      domain: "https://memberstack-client.drjuanpablosalerno.com",
    });

    if (typeof window !== "undefined") {
      // expose it everywhere for buttons, console debugging, etc.
      window.$memberstack = ms;
      window.Memberstack = ms;
      window.memberstack = ms;
    }

    try {
      ms.mount?.();
      console.log("[MS] DOM mounted with custom domain");
    } catch (err) {
      console.error("[MS] mount error:", err);
    }
  }, []);

  return children;
}
