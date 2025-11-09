// app/account/page.jsx
import AccountIsland from "./AccountIsland";

export const metadata = { title: "Account — Dr. Juan Pablo Salerno" };
export const dynamic = "force-dynamic"; // avoids prerender/SSG pitfalls

export default function Page() {
  return <AccountIsland />;
}
