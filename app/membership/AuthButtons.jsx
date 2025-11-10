"use client";

const AUTH = process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com";
const REDIRECT = "https://www.drjuanpablosalerno.com/members";

function hostedUrl(kind) {
  const base = AUTH.replace(/\/$/, "");
  const path = kind === "signup" ? "/auth/signup" : "/auth/login";
  const url = new URL(base + path);
  url.searchParams.set("redirect", REDIRECT);
  return url.toString();
}

export default function AuthButtons() {
  const open = (kind) => async (e) => {
    const api =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    // Try modal first (best UX)
    if (api?.openModal) {
      e.preventDefault();
      try {
        await api.openModal(kind === "signup" ? "SIGNUP" : "LOGIN", { redirect: REDIRECT });
      } catch {}
      // If we don’t get a session within ~3s, fall back to hosted page
      const started = Date.now();
      const poll = async () => {
        try {
          const m = await api?.getCurrentMember?.();
          if (m?.data?.id) return; // success, modal will close/redirect
        } catch {}
        if (Date.now() - started > 3000) {
          window.location.href = hostedUrl(kind); // fallback
        } else {
          setTimeout(poll, 250);
        }
      };
      poll();
      return;
    }

    // If the SDK isn’t ready, just use hosted page directly.
    // (Don’t preventDefault so the anchor still works if we convert these back to <a> tags)
    window.location.href = hostedUrl(kind);
  };

  return (
    <div className="space-x-3">
      <button
        data-ms-action="signup"
        data-ms-redirect={REDIRECT}
        onClick={open("signup")}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </button>
      <button
        data-ms-action="login"
        data-ms-redirect={REDIRECT}
        onClick={open("login")}
        className="inline-flex underline underline-offset-4 hover:opacity-80"
      >
        Sign In
      </button>
    </div>
  );
}
