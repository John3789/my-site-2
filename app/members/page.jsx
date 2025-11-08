// app/members/page.jsx
import Link from "next/link";

function DashCard({ title, desc, href }) {
  return (
    <Link href={href} className="block rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 hover:bg-white/10">
      <div className="text-lg font-semibold">{title}</div>
      <p className="opacity-80 text-sm mt-1">{desc}</p>
    </Link>
  );
}

export default function MembersPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10">
      <h1 className="text-3xl font-bold">Welcome, Member</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <DashCard title="Meditation Library" href="/library" desc="Weekly drops + full archive." />
<DashCard title="Resources by Theme" href="/members/resources" desc="Mental Health, Relationships, Stress Relief, Purpose." />
        <DashCard title="Member Discount" href="/members/discount" desc="Custom Meditation + Discovery Call." />
      </div>
    </main>
  );
}
