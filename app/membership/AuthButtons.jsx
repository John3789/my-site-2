"use client";

export default function AuthButtons() {
  const redirect = "https://www.drjuanpablosalerno.com/members";

  const open = (kind) => (e) => {
    // If SDK is ready, open explicitly and prevent default.
    const api =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (api?.openModal) {
      e.preventDefault();
      api.openModal(kind === "signup" ? "SIGNUP" : "LOGIN", { redirect });
    }
    // else: allow data-ms-action to handle it if/when mounted
  };

  return (
    <div className="space-x-3">
      <button
        data-ms-action="signup"
        data-ms-redirect={redirect}
        onClick={open("signup")}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </button>

      <button
        data-ms-action="login"
        data-ms-redirect={redirect}
        onClick={open("login")}
        className="inline-flex underline underline-offset-4 hover:opacity-80"
      >
        Sign In
      </button>
    </div>
  );
}
