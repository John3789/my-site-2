// app/privacy/page.js
"use client";

import { useRef } from "react";
import { useIosZoomVars } from "../../components/useIosZoom";

export default function PrivacyPage() {
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
            <h1 className="font-serif text-4xl opacity-90 mb-10">Privacy Policy</h1>
            <p className="mb-6">Effective Date: 09/26/2025</p>

            <p className="mb-8">
              Your privacy is important to Dr. Juan Pablo Salerno<sup className="text-xs">™</sup>. 
              This Privacy Policy explains how we collect, use, and protect your information when 
              you use this website and related services.
            </p>

            {/* 1. Information We Collect */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">1. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details (such as name, email, or phone number) when you sign up, purchase, or contact us.</li>
                <li>Payment information is processed securely by third-party providers (e.g., Stripe, PayPal). We do not store your credit card details.</li>
                <li>Technical information (such as cookies and analytics data) to help improve site performance and user experience.</li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deliver digital products (meditations, courses) and services (coaching).</li>
                <li>Send confirmations, reminders, or updates related to your purchases or sessions.</li>
                <li>Improve site functionality and content through analytics.</li>
                <li>With your consent, share newsletters or promotional content (you may unsubscribe at any time).</li>
              </ul>
            </section>

            {/* 3. Sharing of Information */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">3. Sharing of Information</h2>
              <p className="mb-3">We do not sell, rent, or trade your personal information.</p>
              <p className="mb-3">
                We may share information with trusted third-party providers who perform services on our behalf 
                (such as payment processing, analytics, or email delivery). These providers have access only to the 
                information necessary to perform their functions.
              </p>
              <p className="mb-3">We may disclose information if required by law.</p>
            </section>

            {/* 4. Data Protection */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">4. Data Protection</h2>
              <p className="mb-3">
                We take reasonable measures to safeguard your personal information. However, no system can 
                guarantee absolute security.
              </p>
              <p>
                This site may be hosted on servers located outside your country. By using the site, you consent 
                to the transfer of information as needed.
              </p>
            </section>

            {/* 5. Cookies & Tracking */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">5. Cookies &amp; Tracking</h2>
              <p>
                This website may use cookies and analytics tools (such as Google Analytics) to understand traffic 
                and improve user experience. You can disable cookies in your browser settings, though some site 
                functions may be affected.
              </p>
            </section>

            {/* 6. Children’s Privacy */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">6. Children’s Privacy</h2>
              <p>
                Our services are not directed toward children under 13 (or 16 where applicable). We do not knowingly 
                collect personal information from children. If we become aware that a child has provided personal data, 
                we will delete it promptly.
              </p>
            </section>

            {/* 7. Your Rights */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl mb-3">7. Your Rights</h2>
              <p>
                You may request to access, update, or delete your personal information by contacting us at: 
                drjuanpablosalerno@gmail.com.
              </p>
            </section>

            {/* 8. Updates */}
            <section>
              <h2 className="font-serif text-2xl mb-3">8. Updates to this Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised 
                effective date. Continued use of the site after changes constitutes acceptance of the updated policy.
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
