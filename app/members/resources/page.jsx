// app/members/resources/page.jsx
export const metadata = { title: "Members Resources — Dr. Juan Pablo Salerno" };

export default function MembersResources() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-2xl font-bold">Members Resources</h1>
      <p className="mt-2 opacity-80">
        This is your private library. We’ll organize weekly newsletters, meditation recordings,
        and themed content here (mental health, relationships, etc.).
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <h2 className="font-semibold">Latest Weekly Newsletter</h2>
          <p className="opacity-80 text-sm">Coming soon — we’ll pull from Hoppy Copy.</p>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <h2 className="font-semibold">Meditation Recordings</h2>
          <p className="opacity-80 text-sm">We’ll list your members-only meditations here.</p>
        </div>

        <div className="rounded-lg border border-white/15 bg-white/5 p-4">
          <h2 className="font-semibold">Themes</h2>
          <ul className="opacity-90 text-sm list-disc pl-5">
            <li>Mental Health</li>
            <li>Relationships</li>
            <li>Motivation & Mindset</li>
            <li>Self-Compassion & Healing</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
