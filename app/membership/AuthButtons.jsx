// app/membership/AuthButtons.jsx
"use client";

export default function AuthButtons() {
  // You set this in Vercel; we’ll handle it even if it includes /auth/login
  const HOSTED = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com/auth/login";
  const REDIRECT = "https://www.drjuanpablosalerno.com/members";

  const urlFor = (kind) => {
    try {
      const u = new URL(HOSTED);
      // Normalize path to /auth/login or /auth/signup
      if (kind === "signup") {
        u.pathname = u.pathname.replace(/login\/?$/i, "signup");
        if (!/\/auth\/signup\/?$/i.test(u.pathname)) u.pathname = "/auth/signup";
      } else {
        u.pathname = u.pathname.replace(/signup\/?$/i, "login");
        if (!/\/auth\/login\/?$/i.test(u.pathname)) u.pathname = "/auth/login";
      }
      u.searchParams.set("redirect", REDIRECT);
      return u.toString();
    } catch {
      // Hard fallbacks if env var is missing/bad
      const base = "https://auth.drjuanpablosalerno.com";
      return `${base}/auth/${kind}?redirect=${encodeURIComponent(REDIRECT)}`;
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
