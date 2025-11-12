"use client";

export default function SignInButton({
  children = "Sign in",
  className = "",
  redirect = "https://www.drjuanpablosalerno.com/members",
}) {
  const onClick = (e) => {
    e.preventDefault();
    const api =
      (typeof window !== "undefined" &&
        (window.$memberstack || window.memberstack || window.Memberstack)) ||
      null;
    if (api?.openModal) api.openModal("LOGIN", { redirect });
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
