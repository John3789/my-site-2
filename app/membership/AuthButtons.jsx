"use client";

export default function AuthButtons() {
  return (
    <div className="space-x-3">
      <button
        data-ms-action="signup"
        data-ms-redirect="https://www.drjuanpablosalerno.com/members"
        className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Create Free Account
      </button>

      <button
        data-ms-action="login"
        data-ms-redirect="https://www.drjuanpablosalerno.com/members"
        className="inline-flex underline underline-offset-4 hover:opacity-80"
      >
        Sign In
      </button>
    </div>
  );
}
