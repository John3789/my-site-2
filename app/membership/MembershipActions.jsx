// app/membership/MembershipActions.jsx
"use client";

import { useEffect } from "react";
import { useMemberstack } from "@memberstack/react";

export function FreeSignupButton({ planId, className = "", children = "Create Free Account" }) {
  const { memberstack, ready } = useMemberstack();

  useEffect(() => {
    // expose for quick console checks
    if (ready && memberstack) window.$ms = memberstack;
  }, [ready, memberstack]);

  function open() {
    if (!ready || !memberstack) return console.warn("[MS] not ready yet");
    if (planId) memberstack.openModal("SIGNUP", { planId });
    else memberstack.openModal("SIGNUP");
  }

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

export function LoginButton({ className = "", children = "Sign in here" }) {
  const { memberstack, ready } = useMemberstack();

  useEffect(() => {
    if (ready && memberstack) window.$ms = memberstack;
  }, [ready, memberstack]);

  function open() {
    if (!ready || !memberstack) return console.warn("[MS] not ready yet");
    memberstack.openModal("LOGIN");
  }

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
