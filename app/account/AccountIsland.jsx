"use client";

function getMemberstack() {
  if (typeof window === "undefined") return null;
  return (
    window.$memberstackDom ||
    window.memberstack ||
    window.$memberstack ||
    null
  );
}

export default function AccountIsland() {
  const openProfile = async () => {
    const ms = getMemberstack();
    if (!ms) {
      alert("Loading your account… please try again.");
      return;
    }

    try {
      await ms.openModal("PROFILE", { defaultTab: "account" });
    } catch (err) {
      console.error("Error opening profile modal", err);
      alert("Unable to open your profile settings.");
    }
  };

  const openBilling = async () => {
    const ms = getMemberstack();
    if (!ms) {
      alert("Loading your billing… please try again.");
      return;
    }

    try {
      await ms.launchStripeCustomerPortal();
    } catch (err) {
      console.error("Error opening billing portal", err);
      alert("Unable to open your billing portal.");
    }
  };

  return (
    <div className="mx-auto max-w-[650px] px-6 py-12 text-[var(--color-cream)]">
      <h1 className="text-2xl font-bold">Account &amp; Billing</h1>
      <p className="mt-3 text-sm opacity-80">
        Manage your personal details, password, and payment information below.
      </p>

      <div className="mt-10 space-y-6">
        <button
          type="button"
          onClick={openProfile}
          className="w-full rounded-xl bg-white/5 p-4 text-left text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/10"
        >
          Update username, email &amp; password
        </button>

        <button
          type="button"
          onClick={openBilling}
          className="w-full rounded-xl bg-white/5 p-4 text-left text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/10"
        >
          Manage payment methods &amp; subscription
        </button>
      </div>
    </div>
  );
}
