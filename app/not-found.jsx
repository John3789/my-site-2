// app/not-found.jsx

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl mb-4">
        Page not found
      </h1>
      <p className="text-sm md:text-base opacity-80 max-w-[600px]">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-[var(--color-gold)] text-black px-5 py-2.5 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
      >
        ← Back to home
      </a>
    </main>
  );
}
