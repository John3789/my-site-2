// app/membership/LoginInline.jsx
"use client";

const AUTH_ORIGIN =
  process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_ORIGIN ||
  "https://auth.drjuanpablosalerno.com";
const REDIRECT_AFTER_LOGIN =
  process.env.NEXT_PUBLIC_MS_LOGIN_REDIRECT ||
  "https://www.drjuanpablosalerno.com/members";

function loginHref() {
  const url = new URL(`${AUTH_ORIGIN}/auth/login`);
  url.searchParams.set("redirect", REDIRECT_AFTER_LOGIN);
  return url.toString();
}

export default function LoginInline({ children = "Sign in", className = "group" }) {
  async function open() {
    // 1) Try DOM SDK
    try {
      const ms =
        (typeof window !== "undefined" &&
          (window.$memberstack ||
            window.memberstack ||
            window.Memberstack)) ||
        null;

      if (ms?.openModal) {
        await ms.openModal("LOGIN");
        // short poll; if member detected, redirect
        const start = Date.now();
        const limit = 6000;
        const check = async () => {
          try {
            const m = await ms.getCurrentMember?.();
            if (m?.data?.id) {
              window.location.href = REDIRECT_AFTER_LOGIN;
              return;
            }
          } catch {}
          if (Date.now() - start < limit) {
            setTimeout(check, 300);
          } else {
            window.location.href = REDIRECT_AFTER_LOGIN;
          }
        };
        check();
        return;
      }
    } catch {}

    // 2) Fallback: go to hosted auth
    window.location.href = loginHref();
  }

  return (
    <button
      type="button"
      onClick={open}
      className={className}
      data-ms-action="login"
      data-ms-redirect={REDIRECT_AFTER_LOGIN}
    >
      {children}
    </button>
  );
}
