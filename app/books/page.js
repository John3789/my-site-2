// app/books/page.js
import BooksClient from "../../components/BooksClient";

export const metadata = {
  title: "Books & Publications — Dr. Juan Pablo Salerno",
  description:
    "Research led by Dr. Salerno exploring mental health, resilience, and wellbeing, with a focus on uplifting communities.",
  openGraph: {
    title: "Books & Publications — Dr. Juan Pablo Salerno",
    description:
    "Research led by Dr. Salerno exploring mental health, resilience, and wellbeing, with a focus on uplifting communities.",
    images: ["/hero17.jpg"],
      },
  alternates: { canonical: "/books" },
};
export default function Page() {
  return <BooksClient />;
}
