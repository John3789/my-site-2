// app/members/page.jsx
import AutoRedirectIfNoMember from "./AutoRedirectIfNoMember";
import MembersIsland from "./MembersIsland";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <AutoRedirectIfNoMember>
      <MembersIsland />
    </AutoRedirectIfNoMember>
  );
}
