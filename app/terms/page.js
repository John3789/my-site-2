// app/terms/page.js
import TermsClient from "../../components/TermsClient";

export const metadata = {
  title: "Terms & Conditions — Dr. Juan Pablo Salerno",
  description: "Review the terms and conditions for using this website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsClient />;
}
