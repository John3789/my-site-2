"use client";
import { useLayoutEffect, useState } from "react";

export default function TopOnMount({ children }) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    // Disable any smooth scrolling for this tick so there's no animation
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    // Snap to the very top before first paint
    window.scrollTo(0, 0);

    // Restore previous scroll behavior and reveal
    html.style.scrollBehavior = prev || "";
    setReady(true);
  }, []);

  // Hide content until we've positioned at the top
  return (
    <div style={{ opacity: ready ? 1 : 0, transition: "opacity 120ms ease-out" }}>
      {children}
    </div>
  );
}
