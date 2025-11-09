// app/membership/MembershipClient.jsx
"use client";

const AUTH_ORIGIN =
  process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_ORIGIN ||
  "https://auth.drjuanpablosalerno.com";

const REDIRECT = "https://www.drjuanpablosalerno.com/members";

export default function MembershipClient() {
  async function openLogin() {
    // Try the modal first (DOM SDK initialized in MSProvider)
    const ms =
      typeof window !== "undefined" &&
      (window.$memberstack || window.Memberstack || window.memberstack);

    try {
      if (ms?.openModal) {
        await ms.openModal("LOGIN");
        return; // Memberstack handles the flow
      }
    } catch {
      // fall through to hosted URL
    }

    // Fallback: hosted auth URL
    const url = `${AUTH_ORIGIN}/auth/login?redirect=${encodeURIComponent(
      REDIRECT
    )}`;
    window.location.href = url;
  }

  return (
    <div className="mt-6">
      <button
        onClick={openLogin}
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Sign in
      </button>
    </div>
  );
}
