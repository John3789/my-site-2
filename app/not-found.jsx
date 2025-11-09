// app/not-found.jsx
export default function NotFound() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 opacity-80">
        Sorry, we couldn’t find that page.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 active:translate-y-px"
      >
        Go home
      </a>
    </main>
  );
}
