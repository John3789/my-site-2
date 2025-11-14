// components/SignInButton.jsx (or wherever it lives)
"use client";

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
        // Send them to the members page (or whatever you passed via `redirect`)
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
