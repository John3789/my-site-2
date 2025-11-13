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

    // ✅ NO custom domain here
    const ms = memberstackDOM.init({
      publicKey: PUBLIC_KEY,
    });

    if (typeof window !== "undefined") {
      window.$memberstack = ms;
      window.memberstack = ms;
      window.Memberstack = ms;
    }

    try {
      ms.mount?.();
      console.log("[MS] DOM mounted (no custom domain)");
    } catch (err) {
      console.error("[MS] mount error:", err);
    }
  }, []);

  return children;
}
