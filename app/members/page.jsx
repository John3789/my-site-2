// app/members/page.jsx
import MembersIsland from "./MembersIsland";
import AutoRedirectIfNoMember from "./AutoRedirectIfNoMember";

export const metadata = { title: "Members — Dr. Juan Pablo Salerno" };
export const dynamic = "force-dynamic"; // avoids SSG/prerender issues

export default function Page() {
  return (
        <AutoRedirectIfNoMember>
      <MembersIsland />
    </AutoRedirectIfNoMember>
  );
}
