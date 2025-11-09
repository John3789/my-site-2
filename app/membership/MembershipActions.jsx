// app/membership/MembershipActions.jsx
"use client";

import { useMemberstack } from "@memberstack/react";

export function FreeSignupButton({ freePlanId, className = "", children = "Create Free Account" }) {
  const { memberstack, ready } = useMemberstack();

  const openSignup = () => {
    if (!ready || !memberstack) return;
    // Attach to a specific Free plan if provided
    if (freePlanId) {
      memberstack.openModal("SIGNUP", { planId: freePlanId });
    } else {
      memberstack.openModal("SIGNUP");
    }
  };

  return (
    <button type="button" onClick={openSignup} className={className}>
      {children}
    </button>
  );
}

export function LoginButton({ className = "", children = "Sign in here" }) {
  const { memberstack, ready } = useMemberstack();

  const openLogin = () => {
    if (!ready || !memberstack) return;
    memberstack.openModal("LOGIN");
  };

  return (
    <button type="button" onClick={openLogin} className={className}>
      {children}
    </button>
  );
}
