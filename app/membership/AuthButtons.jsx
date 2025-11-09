// app/membership/AuthButtons.jsx
"use client";

export default function AuthButtons() {
  const HOSTED = (process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com").replace(/\/+$/,"");
  const REDIRECT = "https://www.drjuanpablosalerno.com/members";

  // If your dashboard shows /login & /signup (no /auth), set these to "login"/"signup".
  const LOGIN_PATH  = process.env.NEXT_PUBLIC_MS_LOGIN_PATH  || "/auth/login";
  const SIGNUP_PATH = process.env.NEXT_PUBLIC_MS_SIGNUP_PATH || "/auth/signup";

  const url = (path) => `${HOSTED}${path}?redirect=${encodeURIComponent(REDIRECT)}`;

  return (
    <div className="space-x-3">
      <a href={url(SIGNUP_PATH)} className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px">
        Create Free Account
      </a>
      <a href={url(LOGIN_PATH)} className="inline-flex underline underline-offset-4 hover:opacity-80">
        Sign in
      </a>
    </div>
  );
}
