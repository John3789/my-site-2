// components/MembersSurveyBanner.jsx
"use client";

import Link from "next/link";

export default function MembersSurveyBanner() {
  return (
    <section className="mx-auto mt-5 max-w-[1100px] px-6 -mb-1">
      <div className="flex items-stretch overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
        {/* Gold spine */}
        <div className="hidden w-1.5 bg-[var(--color-gold)] sm:block" />

        <div className="flex flex-1 flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:px-5 sm:py-4"
>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              Help shape what comes next
            </p>
            <div className="max-w-[90%]"> 
            <p className="mt-.5 text-xs sm:text-sm text-[var(--color-cream)]/90">
Take the RISE member survey so I can continue shaping this space and the support you receive. You’re welcome to return anytime—and as often as you’d like—to share feedback on any part of the program.          </p>
          </div>
          </div>

<Link
  href="/members/feedback"
  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[var(--color-gold)] bg-transparent px-4 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--color-gold)] shadow-sm hover:bg-[var(--color-gold)] hover:text-black active:translate-y-[1px]"
>
  Take the survey
</Link>
        </div>
      </div>
    </section>
  );
}
