// app/membership/AuthButtons.jsx
"use client";

import { useEffect, useState, useCallback } from "react";

export default function AuthButtons() {
  const redirect = "https://www.drjuanpablosalerno.com/members";
  const [ms, setMs] = useState(null);

  // Discover the SDK object after it initializes
  useEffect(() => {
    const grab = () =>
      (window.$memberstack || window.memberstack || window.Memberstack) || null;
    // try immediately
    let found = grab();
    if (found) { setMs(found); return; }

    // try again shortly (in case Provider finishes a tick later)
    const id = setInterval(() => {
      found = grab();
      if (found) { setMs(found); clearInterval(id); }
    }, 150);
    // stop after a few seconds
    setTimeout(() => clearInterval(id), 4000);
    return () => clearInterval(id);
  }, []);

  const open = useCallback((kind) => (e) => {
    const api = ms;
    if (api?.openModal) {
      e.preventDefault(); // don’t rely on data-ms-* when we can do it explicitly
      api.openModal(kind === "signup" ? "SIGNUP" : "LOGIN", { redirect });
    }
    // If `ms` isn’t ready yet, the data-ms-* attrs below will still work when Memberstack mounts.
  }, [ms, redirect]);

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
