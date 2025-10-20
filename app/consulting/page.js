import ConsultingClient from "../../components/ConsultingClient";

export const metadata = {
  title: "Organizational Wellness Consulting — Dr. Juan Pablo Salerno",
  description:
    "Evidence-based consulting that helps organizations scale strategies to strengthen mental health, wellbeing, resilience, and growth.",
  openGraph: {
    title: "Organizational Wellness Consulting — Dr. Juan Pablo Salerno",
    description:
          "Evidence-based consulting that helps organizations scale strategies to strengthen mental health, wellbeing, resilience, and growth.",
    images: ["/hero17.jpg"], // resolved by metadataBase in layout
      },
  alternates: { canonical: "/consulting" },
};
export default function Page() {
  return <ConsultingClient />;
}
