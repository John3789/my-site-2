// app/resources/page.js
import ResourcesClient from "../../components/ResourcesClient";

export const metadata = {
  title: "Resources — Dr. Juan Pablo Salerno",
  description:
    "A growing library of concise media collections—shaped by science and lived experience—to sharpen your mind and uplift your life.",
  openGraph: {
    title: "Resources — Dr. Juan Pablo Salerno",
    description:
    "A growing library of concise media collections—shaped by science and lived experience—to sharpen your mind and uplift your life.",
    images: ["/hero17.jpg"],
      },
  alternates: { canonical: "/resources" },
};
export default function Page() {
  return <ResourcesClient />;
}
