// app/Providers/MemberstackProvider.js
"use client";

import { MemberstackProvider } from "@memberstack/react";

export default function MSProvider({ children }) {
  const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY;

  // Helpful diagnostics in the browser console
  if (typeof window !== "undefined") {
    if (!publicKey) {
      console.warn(
        "[Memberstack] Missing NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY — modal cannot open."
      );
    } else {
      console.log("[Memberstack] Using public key:", publicKey.slice(0, 8) + "…");
    }
  }

  // If key isn’t set, still render children so the site doesn’t blank out
  if (!publicKey) return children;

  return (
    <MemberstackProvider config={{ publicKey }}>
      {children}
    </MemberstackProvider>
  );
}
