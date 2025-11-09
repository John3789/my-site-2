// app/membership/MembershipClient.jsx
"use client";

import Link from "next/link";
import { useMemberstack } from "@memberstack/react";
import { useCallback, useRef, useState } from "react";

export default function MembershipClient({ isMember }) {
  if (isMember) return <MemberPanel />;
  return <GuestPanel />;
}

function GuestPanel() {
  const { memberstack, ready } = useMemberstack();
  const [error, setError] = useState("");
  const polling = useRef(false);

  const openLogin = useCallback(async () => {
    setError("");
    try {
      // Open Memberstack login modal
      if (ready && memberstack?.openModal) {
        await memberstack.openModal("LOGIN");
      } else {
        const anyMS = (window.memberstack || window.Memberstack || window.$memberstack);
        if (anyMS?.openModal) anyMS.openModal("LOGIN");
      }

      // After modal closes, poll for a logged-in member briefly
      if (!polling.current) {
        polling.current = true;
        const start = Date.now();
        const limitMs = 6000;

        const check = async () => {
          try {
            const m = await memberstack?.getCurrentMember?.();
            if (m?.data?.id) {
              // Logged in — go straight to members page
              window.location.href = "/members";
              return;
            }
          } catch {}
          if (Date.now() - start < limitMs) {
            setTimeout(check, 300);
          } else {
            // If no session found, just send them to /members — middleware will gate correctly
            window.location.href = "/members";
          }
        };
        check();
      }
    } catch (e) {
      setError(e?.message || "Couldn’t open sign-in.");
    }
  }, [ready, memberstack]);

  return (
    <section className="mt-8 grid gap-3">
      <Link
        href="/join"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/90 text-white px-5 py-3 font-semibold hover:opacity-90 active:translate-y-px"
      >
        Join the Membership
      </Link>

      <button
        onClick={openLogin}
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Sign in
      </button>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

      <p className="mt-2 text-sm opacity-70">
        If you just finished checkout, you may already have access on this device.
        Try the <Link href="/members" className="underline">Members page</Link>.
      </p>
    </section>
  );
}

function MemberPanel() {
  return (
    <section className="mt-8 grid gap-3">
      <Link
        href="/members"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Go to Members Area
      </Link>

      <Link
        href="/account"
        className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
      >
        Manage Billing
      </Link>
    </section>
  );
}
