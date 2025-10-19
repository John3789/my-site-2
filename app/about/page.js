// app/about/page.js  (server wrapper, no "use client")
import AboutClient from "../../components/AboutClient";

export const metadata = {
  title: "About — Dr. Juan Pablo Salerno",
  description:
    "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
  openGraph: {
    title: "About — Dr. Juan Pablo Salerno",
    description:
      "Dr. Juan Pablo Salerno, award-winning mental health scientist, personal growth expert, author and professor— inspiring transformation, purpose, and healing.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return <AboutClient />;
}
