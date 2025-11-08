// app/members/resources/page.jsx
export default function MembersResourcesPage() {
  const tags = ["Mental Health", "Relationships", "Stress Relief", "Purpose", "Mindset"];
  const items = [
    { t: "How to unwind after work", k: "Mental Health" },
    { t: "Self-compassion micro-practice", k: "Mindset" },
    { t: "Grounding for anxiety", k: "Stress Relief" },
    { t: "Healthy boundary script", k: "Relationships" },
  ];

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Members-Only Resources</h1>
      <p className="opacity-80 mt-2">Full archive, downloads, and bonus materials.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((x) => (
          <span key={x} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold">
            {x}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.t} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-sm opacity-75">Article</div>
            <div className="text-lg font-semibold">{it.t}</div>
            <p className="text-sm opacity-90 mt-2">
              Members get full text, downloads, and templates.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
