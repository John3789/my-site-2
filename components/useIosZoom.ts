// components/useIosZoom.ts
"use client";

import { useEffect, type RefObject } from "react";

type Opts = {
  min?: number;             // hard floor
  max?: number;             // hard ceiling
  portraitTarget?: number;  // design width for portrait (CSS px)
  landscapeTarget?: number; // design width for landscape (CSS px)
};

export function useIosZoomVars(
  ref: RefObject<HTMLElement>,
  {
    min = 1,
    max = 3,
    portraitTarget = 390,
    landscapeTarget = 560,
  }: Opts = {}
) {
  useEffect(() => {
    // SSR / first render guard
    if (typeof window === "undefined") return;

    const el = ref.current;
    if (!el) return;

    // iOS (includes iPadOS-as-Mac with touch)
    const ua = navigator.userAgent || navigator.vendor || "";
    const isIOS =
      /\b(iPhone|iPad|iPod)\b/i.test(ua) ||
      (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);

    const compute = () => {
      if (!el) return;

      if (!isIOS) {
        el.style.setProperty("--z", "1");
        el.style.setProperty("--zoomL", "1");
        return;
      }

      const vv = (window as any).visualViewport as VisualViewport | undefined;
      const vw = vv ? vv.width : window.innerWidth;
      const vh = vv ? vv.height : window.innerHeight;
      const isLandscape = vw > vh;

      const target = isLandscape ? landscapeTarget : portraitTarget;
      const raw = vw / target;
      const clamped = Math.max(min, Math.min(max, raw));

      if (isLandscape) {
        el.style.setProperty("--z", "1");
        el.style.setProperty("--zoomL", String(clamped));
      } else {
        el.style.setProperty("--z", String(clamped));
        el.style.setProperty("--zoomL", "1");
      }
    };

    compute();

    const onResize = () => compute();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    const vv = (window as any).visualViewport as VisualViewport | undefined;
    if (vv) {
      vv.addEventListener("resize", onResize);
      vv.addEventListener("scroll", onResize);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (vv) {
        vv.removeEventListener("resize", onResize);
        vv.removeEventListener("scroll", onResize);
      }
    };
  }, [ref, min, max, portraitTarget, landscapeTarget]);
}
