"use client";

const REDIRECT = "https://www.drjuanpablosalerno.com/members";
// put your actual plan id here or read from env
const FREE_PLAN_ID = process.env.NEXT_PUBLIC_MS_FREE_PLAN_ID || "pln_dr-juan-pablo-salerno-free-membership-bbeb0nb7";

export default function AuthButtons() {
  const open = (kind) => (e) => {
    const api =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;

    if (api?.openModal) {
      e.preventDefault();
      if (kind === "signup") {
        api.openModal("SIGNUP", { redirect: REDIRECT, planId: FREE_PLAN_ID });
      } else {
        api.openModal("LOGIN", { redirect: REDIRECT });
      }
    }
    // else: let data-ms-* handle it once SDK mounts
  };

  return (
    <div className="space-x-3">
      {/* SIGNUP: tell Memberstack which plan to add */}
      <button
        data-ms-action="signup"
        data-ms-redirect={REDIRECT}
        data-ms-plan={FREE_PLAN_ID}
        onClick={open("signup")}
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </button>

      {/* LOGIN */}
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
