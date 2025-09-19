export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-teal-900)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h1 className="font-serif text-4xl mb-6">Contact</h1>
        <p className="text-lg opacity-90 max-w-3xl mb-8">
          For consulting, speaking, media, and collaborations, please get in touch below.
        </p>

        <form className="max-w-2xl space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
          />
          <textarea
            rows="5"
            placeholder="How can I help?"
            className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none placeholder-white/60"
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-[var(--color-teal)] text-[var(--color-cream)] px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
