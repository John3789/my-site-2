// components/SignInButton.jsx
"use client";

const POST_LOGIN_FLAG = "postLoginReload"; // must match AutoRedirectIfNoMember

export default function SignInButton({
  children = "Sign in",
  className = "",
  redirect = "/members",
}) {
  const onClick = async (e) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    const ms =
      window.$memberstackDom ||
      window.memberstack ||
      window.$memberstack ||
      null;

    if (!ms || !ms.openModal) return;

    try {
      // Open the built-in LOGIN modal
      const result = await ms.openModal("LOGIN");

      // If they actually logged in, result.data will have member info
      if (result?.data) {
        // 🔍 After login, try to confirm they actually have a paid plan
        try {
          if (typeof ms.getCurrentMember === "function") {
            const res = await ms.getCurrentMember();
            const member =
              res?.data?.member || res?.data || res?.member || null;

            const hasPlan =
              Array.isArray(member?.planConnections) &&
              member.planConnections.length > 0;

            // ✅ Only set the post-login flag if they REALLY have a plan
            if (hasPlan && typeof window !== "undefined") {
              try {
                window.sessionStorage?.setItem(POST_LOGIN_FLAG, "1");
              } catch (err) {
                console.warn(
                  "[SignInButton] Unable to set postLoginReload flag",
                  err
                );
              }
            }
          }
        } catch (err) {
          console.warn(
            "[SignInButton] getCurrentMember after login failed",
            err
          );
          // If this fails, we just fall back to normal redirect with no flag.
        }

        // 🔁 Redirect as before (AutoRedirectIfNoMember will handle the flag)
        window.location.assign(redirect);
      }
    } catch (err) {
      // If they close the modal or it errors, just stay put
      console.error("Login modal error:", err);
    }
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
