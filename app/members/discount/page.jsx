// app/members/discount/page.jsx
import Link from "next/link";

export const metadata = { title: "Member Discount — Dr. Juan Pablo Salerno" };

export default function DiscountPage() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 py-10">
      <h1 className="text-3xl font-bold">Member Discount</h1>
      <p className="mt-2 opacity-80">
        Use your member-only discount for a custom meditation + discovery call.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <form method="POST" action="/api/checkout/custom-meditation">
          <input type="hidden" name="plan" value="member-discount" />
          <button
            type="submit"
            className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10"
          >
            Continue to Checkout
          </button>
        </form>

        <Link
          href="/members"
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-semibold hover:bg-white/10 inline-flex items-center justify-center"
        >
          Back to Members
        </Link>
      </div>
    </main>
  );
}
