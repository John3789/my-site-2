// app/membership/AuthButtons.jsx
"use client";

/**
 * Client-only buttons that open the hosted Memberstack UI.
 * No hooks. No SSR. Safe in prerender.
 */
export default function AuthButtons() {
  const open = (which) => {
    // Prefer hosted auth URL if the modal isn't ready
    const hosted = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL;
    if (typeof window !== "undefined" && window.$memberstack?.openModal) {
      window.$memberstack.openModal(which); // "LOGIN" or "SIGNUP"
    } else if (hosted) {
      const redirect =
        which === "LOGIN"
          ? "https://www.drjuanpablosalerno.com/members"
          : "https://www.drjuanpablosalerno.com/membership?joined=1";
      const sep = hosted.includes("?") ? "&" : "?";
      window.location.href = `${hosted}${sep}redirect=${encodeURIComponent(
        redirect
      )}`;
    }
  };

  return (
    <div className="space-x-3">
      <button
        onClick={() => open("SIGNUP")}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </button>
      <button
        onClick={() => open("LOGIN")}
        className="inline-flex rounded-full underline underline-offset-4 hover:opacity-80"
      >
        Sign in
      </button>
    </div>
  );
}
