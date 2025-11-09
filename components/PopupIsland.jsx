// components/PopupIsland.jsx
"use client";
import dynamic from "next/dynamic";

// Load the popup only on the client
const NewsletterMeditationPopup = dynamic(
  () => import("./NewsletterMeditationPopup"),
  { ssr: false }
);

export default function PopupIsland(props) {
  return <NewsletterMeditationPopup {...props} />;
}