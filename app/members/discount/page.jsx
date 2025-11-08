// app/members/discount/page.jsx
export default function MemberDiscountPage() {
  async function startCheckout() {
    const res = await fetch("/api/checkout/custom-meditation", { method: "POST" });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-2xl font-bold">Member Discount — Custom Meditation + Discovery Call</h1>
      <p className="mt-2 opacity-80">As a member, you get a special price. We verify your membership then send you to a pre-discounted Stripe Checkout.</p>
      <button onClick={startCheckout} className="mt-4 rounded-full border border-amber-300 bg-amber-300 text-black px-5 py-2 font-semibold">Start Checkout</button>
    </main>
  );
}
