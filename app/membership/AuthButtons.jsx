"use client";

const APP_ID = "app_cmhr27ueu00dr0spu834zhexr"; // <- paste your exact App ID from Memberstack Dev Tools
const REDIRECT = "https://www.drjuanpablosalerno.com/members";

// Hosted auth bases that work even if your custom subdomain isn't verified yet
const HOSTED_SIGNUP = `https://app.memberstack.com/auth/signup?app=${APP_ID}&redirect=${encodeURIComponent(REDIRECT)}`;
const HOSTED_LOGIN  = `https://app.memberstack.com/auth/login?app=${APP_ID}&redirect=${encodeURIComponent(REDIRECT)}`;

export default function AuthButtons() {
  return (
    <div className="space-x-3">
      <a
        href={HOSTED_SIGNUP}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </a>

      <a
        href={HOSTED_LOGIN}
        className="inline-flex underline underline-offset-4 hover:opacity-80"
      >
        Sign In
      </a>
    </div>
  );
}
