// app/contact/page.js
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  // TEMP: no backend yet—this just shows a success message.
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Wire to Formspree / Getform / API route later.
    setSent(true);
  }

  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-900)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Contact</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-10">
          For consulting, speaking, media, and collaborations, please share a few details below.
        </p>

        {sent ? (
          <div className="rounded-md bg-black/20 border border-white/10 p-6">
            <p className="font-semibold">Thanks! Your message was received and we will follow-up soon.</p>
            
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
            {/* Honeypot anti-spam (hidden) */}
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Topic</label>
              <select
                name="topic"
                className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none"
                defaultValue="Consulting"
              >
                <option className="bg-[var(--color-teal-900)]" value="Consulting">Consulting</option>
                <option className="bg-[var(--color-teal-900)]" value="Speaking">Speaking</option>
                <option className="bg-[var(--color-teal-900)]" value="Media">Media / Press</option>
                <option className="bg-[var(--color-teal-900)]" value="Collaborations">Collaborations</option>
                <option className="bg-[var(--color-teal-900)]" value="Other">Another Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                rows={6}
                required
                className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
                placeholder="How can I help?"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Send
            </button>

            {/* Disclaimer */}
            <p className="text-xs opacity-80 mt-4 max-w-xl leading-relaxed">
              <strong>Disclaimer:</strong> This website and all communications through this form are for
              informational and educational purposes only. They do not constitute medical advice, diagnosis,
              or treatment. If you have medical or mental health concerns, please consult a qualified
              healthcare professional.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
