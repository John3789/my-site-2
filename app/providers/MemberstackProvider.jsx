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
      console.error("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    (async () => {
      try {
        const ms = await memberstackDOM.init({ publicKey: PUBLIC_KEY });
        window.$memberstack = ms;            // ✅ resolved instance (not a Promise)
        try { ms.mount?.(); } catch {}
        console.log("[MS] Ready:", typeof ms.purchasePlansWithCheckout === "function");
      } catch (err) {
        console.error("[MS] init failed:", err);
      }
    })();
  }, []);

  return children;
}
