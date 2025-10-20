// app/contact/page.js
import ContactClient from "../../components/ContactClient";

export const metadata = {
  title: "Contact — Dr. Juan Pablo Salerno",
  description:
    "Connect for speaking, consulting, media, or collaborations. Share your goals and we’ll explore the best way to work together.",
  openGraph: {
    title: "Contact — Dr. Juan Pablo Salerno",
    description:
      "Connect for speaking, consulting, media, or collaborations. Share your goals and we’ll explore the best way to work together.",
    images: ["/hero17.jpg"],
      },
  alternates: {
    canonical: "./contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
