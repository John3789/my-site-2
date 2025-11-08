// app/providers/MemberstackProvider.jsx
"use client";
import { MemberstackProvider } from "memberstack-react";

export default function MSProvider({ children }) {
  const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY || "pk_placeholder";
  return <MemberstackProvider publicKey={publicKey}>{children}</MemberstackProvider>;
}
