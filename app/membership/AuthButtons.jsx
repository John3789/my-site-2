// app/membership/AuthButtons.jsx
"use client";

export default function AuthButtons() {
  // Put JUST the base in Vercel (no path). Example:
  // NEXT_PUBLIC_MS_HOSTED_AUTH_URL = https://auth.drjuanpablosalerno.com
  const HOSTED_BASE =
    process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL ||
    "https://auth.drjuanpablosalerno.com";

  // Redirect back to the exact host you're on (handles www vs non-www)
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://drjuanpablosalerno.com";
  const REDIRECT = `${origin}/members`;

  const urlFor = (kind) => {
    try {
      // Build /auth/login or /auth/signup
      const u = new URL(HOSTED_BASE);
      u.pathname = `/auth/${kind === "signup" ? "signup" : "login"}`;
      u.searchParams.set("redirect", REDIRECT);
      return u.toString();
    } catch {
      // Fallback if env is malformed
      return `https://auth.drjuanpablosalerno.com/auth/${
        kind === "signup" ? "signup" : "login"
      }?redirect=${encodeURIComponent(REDIRECT)}`;
    }
  };

  return (
    <div className="space-x-3">
      <a
        href={urlFor("signup")}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </a>
      <a
        href={urlFor("login")}
        className="inline-flex underline underline-offset-4 hover:opacity-80"
      >
        Sign in
      </a>
    </div>
  );
}
