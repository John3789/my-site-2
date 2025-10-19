// app/page.js — server wrapper (NO "use client")
import HomeClient from "../components/HomeClient";

export const metadata = {
  title: "Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
  openGraph: {
    title: "Dr. Juan Pablo Salerno",
    description:
      "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return <HomeClient />;
}
