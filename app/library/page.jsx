// app/library/page.jsx
export default function LibraryPage() {
  const items = Array.from({ length: 6 }).map((_, i) => `track-${i + 1}`);
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Meditation Library</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((id) => (
          <div key={id} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-sm opacity-75">Guided Meditation</div>
            <div className="text-lg font-semibold">Release & Reset ({id})</div>
            <audio controls className="mt-3 w-full"><source src={`/api/media/${id}`} type="audio/mpeg" /></audio>
            <div className="mt-2 text-xs opacity-70">Served via short-lived signed URL</div>
          </div>
        ))}
      </div>
    </main>
  );
}
