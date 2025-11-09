// app/membership/MembershipActions.jsx
"use client";

const AUTH_ORIGIN =
  process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_ORIGIN ||
  "https://auth.drjuanpablosalerno.com";
const SITE = "https://www.drjuanpablosalerno.com";

function withRedirect(path, redirectTo) {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}redirect=${encodeURIComponent(redirectTo)}`;
}

// ✅ Free Signup Link
export function FreeSignupLink({
  className = "",
  children = "Create Free Account",
}) {
  const url = withRedirect(
    `${AUTH_ORIGIN}/auth/signup`,
    `${SITE}/membership?joined=1`
  );
  return (
    <a
      href={url}
      className={className}
      data-ms-action="signup"
      data-ms-redirect={`${SITE}/membership?joined=1`}
    >
      {children}
    </a>
  );
}

// ✅ Login Link
export function LoginLink({ className = "", children = "Sign in here" }) {
  const url = withRedirect(
    `${AUTH_ORIGIN}/auth/login`,
    `${SITE}/members`
  );
  return (
    <a
      href={url}
      className={className}
      data-ms-action="login"
      data-ms-redirect={`${SITE}/members`}
    >
      {children}
    </a>
  );
}
