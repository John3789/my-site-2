"use client";

export default function FooterSubscribeClient() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Subscribe failed:", data);
        alert("Something went wrong. Please try again.");
      } else {
        alert("Thank you! You're now subscribed.");
        form.reset();
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 placeholder-white/60 outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-[var(--color-gold)] text-black px-4 py-2 font-semibold"
      >
        Subscribe
      </button>
    </form>
  );
}
