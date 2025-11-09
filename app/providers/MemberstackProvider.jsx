// app/providers/MemberstackProvider.jsx
"use client";

import { MemberstackProvider as MS } from "@memberstack/react";

export default function MemberstackProvider({ children }) {
  const publicKey =
    process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY || "pk_placeholder";

  return <MS config={{ publicKey }}>{children}</MS>;
}
