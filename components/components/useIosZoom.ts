"use client";

import { useEffect } from "react";

type Opts = {
  min?: number;            // hard floor
  max?: number;            // hard ceiling
  portraitTarget?: number; // width we design for in portrait (CSS px)
  landscapeTarget?: number;// width for landscape (CSS px)
};

export function useIosZoomVars(
  el: HTMLElement | null,
  {
    min = 1,
    max = 3,
    portraitTarget = 390,   // iPhone-ish portrait
    landscapeTarget = 560,  // a bit wider for iPhone landscape
  }: Opts = {}
) {
  useEffect(() => {
    if (!el) return;

    // Detect iOS (includes iPadOS that identifies as Mac with touch)
    const ua = navigator.userAgent || navigator.vendor || "";
    const isIOS =
      /\biPhone\b|\biPod\b|\biPad\b/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // If not iOS → normalize
    if (!isIOS) {
      el.style.setProperty("--z", "1");
      el.style.setProperty("--zoomL", "1");
      return;
    }

    const compute = () => {
      const vv = window.visualViewport;
      const vw = vv ? vv.width : window.innerWidth;
      const vh = vv ? vv.height : window.innerHeight;
      const isLandscape = vw > vh;

      // Choose a target “design width” for each orientation
      const target = isLandscape ? landscapeTarget : portraitTarget;

      // Scale so that our design width fits the current viewport
      const raw = vw / target;                 // how much we’d need to scale
      const clamped = Math.max(min, Math.min(max, raw));

      // We use two vars in your CSS: --z (portrait) and --zoomL (landscape)
      if (isLandscape) {
        el.style.setProperty("--z", "1");
        el.style.setProperty("--zoomL", String(clamped));
      } else {
        el.style.setProperty("--z", String(clamped));
        el.style.setProperty("--zoomL", "1");
      }
    };

    compute();

    // Recompute when iOS changes the visual viewport
    const onResize = () => compute();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize);
      window.visualViewport.addEventListener("scroll", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onResize);
        window.visualViewport.removeEventListener("scroll", onResize);
      }
    };
  }, [el, min, max, portraitTarget, landscapeTarget]);
}
