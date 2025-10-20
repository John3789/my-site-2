// app/speaking/page.js — SERVER FILE (no "use client")
import SpeakingClient from "../../components/SpeakingClient";

export const metadata = {
  title: "Speaking — Dr. Juan Pablo Salerno",
  description:
    "Evidence-based talks and workshops that empower transformation, resilience, wellbeing, and personal growth through science, story, and purpose.", 
  openGraph: {
    title: "Speaking — Dr. Juan Pablo Salerno",
    description:
    "Evidence-based talks and workshops that empower transformation, resilience, wellbeing, and personal growth through science, story, and purpose.", 
    images: ["/hero17.jpg"],
      },
  alternates: { canonical: "/speaking" },
};
export default function Page() {
  return <SpeakingClient />;
}
