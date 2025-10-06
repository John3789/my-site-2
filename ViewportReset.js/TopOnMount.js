"use client";
import { useLayoutEffect, useState } from "react";

export default function TopOnMount({ children }) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    // Disable smooth for this tick and snap to top before reveal
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev || "";
    setReady(true);
  }, []);

  // Hide entirely until we've snapped to top (no fade animation)
  return (
    <div style={{ visibility: ready ? "visible" : "hidden" }}>
      {children}
    </div>
  );
}
