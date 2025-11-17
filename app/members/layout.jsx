// app/members/layout.jsx
"use client";

import AutoRedirectIfNoMember from "./AutoRedirectIfNoMember";

export default function MembersLayout({ children }) {
  return (
    <>
      {/* 🔐 Gate all members pages */}
      <AutoRedirectIfNoMember />

      {children}

      {/* 🦶 Hide the global site footer on ALL /members pages */}
      <style jsx global>{`
        body :is(footer, .site-footer, [role="contentinfo"]) {
          display: none !important;
        }
      `}</style>
    </>
  );
}
