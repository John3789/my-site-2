// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY;

export default function MemberstackProvider({ children }) {
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    // ✅ Use default Memberstack domain for now
    const ms = memberstackDOM.init({
      publicKey: PUBLIC_KEY,
      // no `domain` key here
    });

    if (typeof window !== "undefined") {
      window.$memberstack = ms;
      window.memberstack = ms;
      window.Memberstack = ms;
    }

    ms.mount?.()
      .then(() => {
        console.log("[MS] DOM mounted (default domain)");
      })
      .catch((err) => {
        console.error("[MS] mount error:", err);
      });
  }, []);

  return children;
}
