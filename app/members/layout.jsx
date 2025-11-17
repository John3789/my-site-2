// app/members/layout.jsx
"use client";

import AutoRedirectIfNoMember from "./AutoRedirectIfNoMember";

export default function MembersLayout({ children }) {
  return (
    <>
      <AutoRedirectIfNoMember />
      {children}
    </>
  );
}
