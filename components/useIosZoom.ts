// useIosZoom.ts (or wherever your hook lives)
import { useEffect } from "react";

type Opts = { portraitZoom: number; landscapeZoom: number };

/**
 * Sets CSS vars --z (portrait) and --zoomL (landscape) AFTER the iOS visual viewport settles,
 * then reapplies on orientation/viewport changes (debounced).
 * Leaves wrappers/classes untouched.
 */
export function useIosZoomVars(
  ref: React.RefObject<HTMLElement>,
  { portraitZoom, landscapeZoom }: Opts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isIOS =
      /iP(hone|od|ad)/.test(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    // Write both vars (your wrappers already decide which one is used)
    const applyVars = () => {
      el.style.setProperty("--z", String(portraitZoom));
      el.style.setProperty("--zoomL", String(landscapeZoom));
    };

    // Wait until visual viewport isn't bouncing (URL bar show/hide, etc.)
    const waitForStableViewport = (cb: () => void) => {
      const vv = (window as any).visualViewport as VisualViewport | undefined;
      // If no visualViewport API, just apply immediately
      if (!vv) {
        cb();
        return;
      }

      let lastW = vv.width;
      let lastH = vv.height;
      let stableCount = 0;
      let raf = 0;
      let timer: number | undefined;

      const sample = () => {
        // small nudge helps iOS collapse the toolbar once
        if (isIOS) {
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
        }

        if (Math.abs(vv.width - lastW) < 0.5 && Math.abs(vv.height - lastH) < 0.5) {
          stableCount += 1;
        } else {
          stableCount = 0;
          lastW = vv.width;
          lastH = vv.height;
        }

        if (stableCount >= 2) {
          // stayed stable across two frames — add a tiny delay for safety
          timer = window.setTimeout(() => cb(), 60);
        } else {
          raf = requestAnimationFrame(sample);
        }
      };

      raf = requestAnimationFrame(sample);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        if (timer) clearTimeout(timer);
      };
    };

    const debouncedReapply = (() => {
      let t: number | undefined;
      return () => {
        if (t) clearTimeout(t);
        t = window.setTimeout(() => {
          const cleanup = waitForStableViewport(applyVars);
          // Cleanup pending sampler if the effect cleans up soon after
          if (cleanup) setTimeout(() => cleanup(), 0);
        }, 140);
      };
    })();

    // Initial run (also covers bfcache restores)
    let cleanupInitial: (() => void) | void = waitForStableViewport(applyVars);

    // Re-apply on visual viewport changes & orientation
    const vv = (window as any).visualViewport as VisualViewport | undefined;
    const onResize = debouncedReapply;
    const onScroll = debouncedReapply;
    const onOrient = debouncedReapply;
    const onPageShow = debouncedReapply;

    if (vv) {
      vv.addEventListener("resize", onResize);
      vv.addEventListener("scroll", onScroll);
    }
    window.addEventListener("orientationchange", onOrient);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      if (cleanupInitial) cleanupInitial();
      if (vv) {
        vv.removeEventListener("resize", onResize);
        vv.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("orientationchange", onOrient);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
