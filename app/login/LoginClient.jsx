// app/login/LoginClient.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useMemberstack } from "@memberstack/react";

export default function LoginClient() {
  const { memberstack, ready } = useMemberstack();
  const [error, setError] = useState("");

  async function openLogin() {
    setError("");
    try {
      if (ready && memberstack && typeof memberstack.openModal === "function") {
        await memberstack.openModal("LOGIN");
        return;
      }
      if (typeof window !== "undefined") {
        const anyMS = window.memberstack || window.Memberstack || window.$memberstack;
        if (anyMS && typeof anyMS.openModal === "function") {
          anyMS.openModal("LOGIN");
          return;
        }
      }
      setError("Couldn’t open the sign-in modal. Please try again in a moment.");
    } catch (e) {
      setError(e?.message || "Couldn’t open the sign-in modal.");
    }
  }

  return (
    <main className="mx-auto max-w-[700px] px-6 py-12">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="mt-2 opacity-80">
        Members can sign in to access meditations, resources, and manage billing.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={openLogin}
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/5 px-5 py-3 font-semibold hover:bg-black/10 active:translate-y-px"
        >
          Open Sign-In
        </button>

        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
        >
          I’m new — Join the Membership
        </Link>

        <Link
          href="/members"
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 font-semibold hover:bg-black/5 active:translate-y-px"
        >
          Go to Members Area
        </Link>

        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </div>

      <p className="mt-6 text-sm opacity-70">
        Tip: If you successfully checked out a moment ago, you may already be signed in on
        this device. Try the <Link href="/members" className="underline">Members page</Link>.
      </p>
    </main>
  );
}
