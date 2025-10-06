// components/ViewportReset.jsx
"use client";

import { useEffect } from "react";

export default function ViewportReset() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    const apply = () => {
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      );
    };

    apply();
    window.addEventListener("pageshow", apply);
    return () => window.removeEventListener("pageshow", apply);
  }, []);

  return null;
}
