// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

/**
 * Memberstack Hosted Auth (custom domain) for Next.js App Router.
 * - Uses @memberstack/dom with your hosted auth domain
 * - Exposes window.$memberstack so existing buttons keep working
 *   e.g., window.$memberstack?.openModal("LOGIN" | "SIGNUP")
 */
export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // Use env if present; otherwise default to your domain from Memberstack step 3.
    const domain =
      process.env.NEXT_PUBLIC_MS_DOMAIN ||
      "https://memberstack-client.drjuanpablosalerno.com";

    const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY; // you already set this

    if (!publicKey) {
      console.error(
        "[MS] Missing NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY env var."
      );
      return;
    }

    let canceled = false;

    memberstackDOM
      .init({ domain, publicKey })
      .then((ms) => {
        if (canceled) return;
        // Keep old API for your buttons:
        window.$memberstack = ms;
        console.log("[MS] Hosted Auth ready:", domain);
      })
      .catch((err) => {
        console.error("[MS] init error:", err);
      });

    return () => {
      canceled = true;
    };
  }, []);

  return children;
}
