// app/privacy/page.js
import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy — Dr. Juan Pablo Salerno",
  description:
    "Learn how your data is collected, used, and protected on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
