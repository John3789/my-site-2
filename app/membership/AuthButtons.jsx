// app/membership/AuthButtons.jsx
"use client";

export default function AuthButtons() {
  const redirect = "https://www.drjuanpablosalerno.com/members";

  const open = (kind) => async (e) => {
    e.preventDefault();
    const api =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (api?.openModal) {
      await api.openModal(kind === "signup" ? "SIGNUP" : "LOGIN", { redirect });
    } else {
      console.warn("[MS] SDK not ready");
    }
  };

  return (
    <div className="space-x-3">
      <a href="#" onClick={open("signup")} className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px">
        Create Free Account
      </a>
      <a href="#" onClick={open("login")} className="inline-flex underline underline-offset-4 hover:opacity-80">
        Sign In
      </a>
    </div>
  );
}
