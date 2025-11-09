"use client";
import { MemberstackProvider } from "@memberstack/react";

export default function MemberstackWrapper({ children }) {
  return (
    <MemberstackProvider
      config={{
        publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY,
      }}
    >
      {children}

      {/* ✅ This script loads Memberstack's hosted login/signup modals */}
      <script
        src="https://api.memberstack.com/v2/memberstack.js"
        data-memberstack-id={process.env.NEXT_PUBLIC_MEMBERSTACK_APP_ID}
      ></script>
    </MemberstackProvider>
  );
}
