// components/TopOnMount.jsx
"use client";

import { useEffect } from "react";

export default function TopOnMount({ children }) {
  useEffect(() => {
    // Desktop only
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // Temporarily disable smooth scroll so it doesn't animate
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    // Force to top on first paint
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      // restore any previous behavior
      html.style.scrollBehavior = prevBehavior || "";
    });
  }, []);

  return children;
}
