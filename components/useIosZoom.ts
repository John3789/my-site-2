"use client";

import { useEffect } from "react";

export function useIosZoomVars(
  ref: React.RefObject<HTMLElement | null>,
  {
    portraitZoom = 3.0,   // locked zoom level for portrait
    landscapeZoom = 1.3,  // locked zoom level for landscape
  } = {}
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const ua = navigator.userAgent || navigator.vendor || "";
    const isIOS =
      /\b(iPhone|iPad|iPod)\b/i.test(ua) ||
      (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);

    const apply = () => {
      if (!isIOS) {
        el.style.setProperty("--z", "1");
        el.style.setProperty("--zoomL", "1");
        return;
      }

      const vv = (window as any).visualViewport;
      const vw = vv ? vv.width : window.innerWidth;
      const vh = vv ? vv.height : window.innerHeight;
      const isLandscape = vw > vh;

      if (isLandscape) {
        el.style.setProperty("--z", "1");
        el.style.setProperty("--zoomL", String(landscapeZoom));
      } else {
        el.style.setProperty("--z", String(portraitZoom));
        el.style.setProperty("--zoomL", "1");
      }
    };

    apply();

    const onResize = () => apply();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
