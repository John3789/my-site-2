// app/terms/page.js (or wherever your TermsPage lives)
"use client";

import { useRef } from "react";
import { useIosZoomVars } from "../,,/components/useIosZoom";


export default function TermsPage() {
  const wrapRef = useRef(null); 

  useIosZoomVars(wrapRef, {
    portraitTarget: 390,
    landscapeTarget: 560,
    min: 1,
    max: 3,
  });

  return (
    <>
      {/* ===== PAGE BODY WRAPPER (zoom on mobile, normal on desktop) ===== */}
      <div
      ref={wrapRef}
        style={{ "--z": 3.0, "--zoomL": 1.3 }}
        className="
        will-change-[transform]  
        lg:contents
          origin-top
          [transform:scale(var(--z))]
          [width:calc(100%/var(--z))]
          mx-auto
          lg:[transform:none]
          lg:[width:100%]
          landscape:[transform:scale(var(--zoomL))]
          landscape:[width:calc(100%/var(--zoomL))]
          overflow-visible
        "
      >
        <main className="min-h-screen w-full bg-[var(--color-teal-850)] text-[var(--color-cream)]">
          <div className="mx-auto max-w-[1000px] px-6 py-20 opacity-90">
            <h1 className="font-serif text-4xl opacity-90 mb-10">Terms of Use</h1>

            {/* 1. Ownership & Rights */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">1. Ownership &amp; Rights</h2>
              <p className="mb-3">
                All content on this website—including text, audio, video, images, meditations,
                courses, and coaching materials—is the property of Dr. Juan Pablo Salerno
                <sup className="text-xs">™</sup>.
              </p>
              <p className="mb-3">Content is provided for personal, non-commercial use only.</p>
              <p className="mb-3">
                Purchasing or accessing content does not transfer copyright or grant any license beyond personal use.
              </p>
              <p className="mb-3">
                Reproduction, distribution, resale, adaptation, public performance, or use in training
                machine learning models is strictly prohibited without prior written consent.
              </p>
            </section>

            {/* 2. Meditations */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">2. Meditations</h2>
              <p className="mb-3">
                <strong>Pre-recorded meditations:</strong> Licensed for personal use only. They may not be uploaded,
                shared, or redistributed.
              </p>
              <p className="mb-3">
                <strong>Custom meditations:</strong> Unless otherwise agreed in writing, all custom meditations are
                non-exclusive. This means Dr. Salerno may adapt, resell, or redistribute them.
              </p>
            </section>

            {/* 3. Courses & Coaching */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">3. Courses &amp; Coaching</h2>
              <p className="mb-3">
                <strong>Courses:</strong> Access is limited to the purchaser. Login credentials may not be shared.
              </p>
              <p className="mb-3">
                <strong>Coaching sessions:</strong> Sessions must be scheduled in advance. Rescheduling requires at least
                24 hours notice. Missed sessions without notice are non-refundable.
              </p>
            </section>

            {/* 4. Refunds & Cancellations */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">4. Refunds &amp; Cancellations</h2>
              <p className="mb-3">
                Digital products (meditations, courses) are non-refundable once delivered or accessed.
              </p>
              <p className="mb-3">
                <strong>Coaching:</strong> Refunds are not provided for completed sessions. Rescheduling policies apply as
                outlined above.
              </p>
            </section>

            {/* 5. Disclaimers */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">5. Disclaimers</h2>
              <p className="mb-3">
                Meditations, courses, and coaching are intended for educational and wellness purposes only. They are not a
                substitute for medical or mental health treatment.
              </p>
              <p className="mb-3">
                Users are responsible for their own well-being and should consult a qualified professional for medical,
                psychological, or therapeutic concerns.
              </p>
            </section>

            {/* 6. Trademarks */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">6. Trademarks</h2>
              <p className="mb-3">
                “Dr. Juan Pablo Salerno<sup className="text-xs">™</sup>” is a trademark used exclusively for educational,
                consulting, and speaking services. Unauthorized use of the name or brand is prohibited.
              </p>
            </section>

            {/* 7. Updates */}
            <section>
              <h2 className="font-serif text-2xl mb-3">7. Updates to Terms</h2>
              <p>
                These Terms of Use may be updated from time to time. Continued use of the site and services after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Bottom spacer */}
            <div className="pb-10" />
          </div>

      
          <style jsx global>{`
  footer {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    height: 0 !important;
    overflow: hidden !important;
  }
`}</style>

        </main>
      </div>
    </>
  );
}
