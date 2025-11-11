// dev-only mirror of /members to work on layout
import MembersIsland from "../members/MembersIsland";

export const metadata = { title: "Members (Dev Preview) — Dr. Juan Pablo Salerno" };
export const dynamic = "force-dynamic";

export default function Page() {
  return <MembersIsland />;
}