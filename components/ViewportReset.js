"use client";

import { useEffect } from "react";

export default function ViewportReset() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    const apply = () => {
      // Keep your desired viewport while ensuring scale resets on pageshow
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
      );
    };

    // Run once now and again when coming back from bfcache (iOS Safari quirk)
    apply();
    window.addEventListener("pageshow", apply);

    return () => window.removeEventListener("pageshow", apply);
  }, []);

  return null;
}
