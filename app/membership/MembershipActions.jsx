// app/membership/MembershipActions.jsx
"use client";

const AUTH = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com";
const SITE = "https://www.drjuanpablosalerno.com";

function withRedirect(base, to) {
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}redirect=${encodeURIComponent(to)}`;
}

export function FreeSignupLink({ className = "", children = "Create Free Account" }) {
  // After signup, return to /membership
  const href = withRedirect(AUTH, `${SITE}/membership?joined=1`);
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function LoginLink({ className = "", children = "Sign in here" }) {
  // After login, go to /members
  const href = withRedirect(AUTH, `${SITE}/members`);
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
