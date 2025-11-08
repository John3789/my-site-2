// app/account/page.jsx
"use client";

export default function AccountPage() {
  async function openPortal() {
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert(data?.error || "Could not open billing portal.");
    } catch (e) {
      console.error(e);
      alert("Something went wrong.");
    }
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Account & Billing</h1>
      <p className="mt-2 opacity-80">Update your card, change plan, cancel, download invoices.</p>
      <button
        onClick={openPortal}
        className="mt-4 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-semibold"
      >
        Open Stripe Portal
      </button>
    </main>
  );
}
