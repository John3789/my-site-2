// app/members/guides/page.jsx

import GuidesIsland from "./GuidesIsland";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Mental Health Guide Library — Members",
  description:
    "In-depth, science-backed mental health guides organized by theme, with the latest featured guide highlighted for members.",
  alternates: { canonical: "/members/guides" },
  openGraph: {
    title: "Mental Health Guide Library — Members",
    description:
      "In-depth, science-backed mental health guides organized by theme, with the latest featured guide highlighted for members.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return <GuidesIsland />;
}
