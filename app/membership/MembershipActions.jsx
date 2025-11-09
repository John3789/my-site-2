// app/membership/MembershipActions.jsx
"use client";

const BASE = "https://memberstack-client.drjuanpablosalerno.com";
const SITE = "https://www.drjuanpablosalerno.com";

export function FreeSignupLink({ className = "", children = "Create Free Account" }) {
  // After signup, send them back to your Membership page
  const href = `${BASE}/signup?redirect=${encodeURIComponent(`${SITE}/membership?joined=1`)}`;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function LoginLink({ className = "", children = "Sign in here" }) {
  // After login, send paying members to /members (they’ll be allowed in), others can still land on /membership
  const href = `${BASE}/login?redirect=${encodeURIComponent(`${SITE}/members`)}`;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
