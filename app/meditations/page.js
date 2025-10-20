// app/meditations/page.js
import MeditationClient from "../../components/MeditationsClient";

export const metadata = {
  title: "Meditations — Dr. Juan Pablo Salerno",
  description:
    "Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.",
  openGraph: {
    title: "Meditations — Dr. Juan Pablo Salerno",
    description:
    "Practices designed to help reset your body, calm your mind, and uplift your spirit — guiding you through the day with clarity and ease.",
    images: ["/hero17.jpg"],
  },
};

export default function Page() {
  return <MeditationClient />;
}
