// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY;
const HOSTED_AUTH_URL = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL; // https://auth.drjuanpablosalerno.com

export default function MemberstackProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    if (!PUBLIC_KEY) {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
      return;
    }

    const initConfig = {
      publicKey: PUBLIC_KEY,
    };

    // ✅ Attach your correct custom domain so cookies & auth work
    if (HOSTED_AUTH_URL) {
      // Memberstack expects just the origin, no trailing slash
      initConfig.domain = HOSTED_AUTH_URL.replace(/\/$/, "");
    } else {
      console.warn("[MS] Missing NEXT_PUBLIC_MS_HOSTED_AUTH_URL");
    }

    const ms = memberstackDOM.init(initConfig);

    if (typeof window !== "undefined") {
      // Expose globally (your BuyButton uses this)
      window.$memberstack = ms;
      window.memberstack = ms;
      window.Memberstack = ms;
    }

    try {
      ms.mount?.();
      console.log(
        "[MS] DOM mounted with domain:",
        initConfig.domain || "(none)"
      );
    } catch (err) {
      console.error("[MS] mount error:", err);
    }
  }, []);

  return children;
}
