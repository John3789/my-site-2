// app/membership/AuthButtons.jsx
"use client";

export default function AuthButtons() {
  // Keep this as only the origin (no path):
  const HOSTED = (process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com").replace(/\/+$/, "");
  const REDIRECT = "https://www.drjuanpablosalerno.com/members";

  const urlFor = (kind) => {
    const base = HOSTED; // e.g., https://auth.drjuanpablosalerno.com
    const path = kind === "signup" ? "/signup" : "/login";
    const url = new URL(base + path);
    url.searchParams.set("redirect", REDIRECT);
    return url.toString();
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
