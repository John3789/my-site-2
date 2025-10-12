// useIosZoom.ts
import { useEffect } from "react";

type Opts = { portraitZoom: number; landscapeZoom: number };

export function useIosZoomVars(
  ref: React.RefObject<HTMLElement>,
  { portraitZoom, landscapeZoom }: Opts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setVars = (pz: number, lz: number) => {
      el.style.setProperty("--z", String(pz));      // portrait zoom var
      el.style.setProperty("--zoomL", String(lz));  // landscape zoom var
    };

    // Decide based on the *current, stable* viewport width
    const applyForCurrentWidth = () => {
      const w = (window.visualViewport?.width ?? window.innerWidth);
      if (w < 999) {
        setVars(portraitZoom, landscapeZoom);
      } else {
        setVars(1, 1); // never zoom on ≥900px
      }
    };

    // Wait a moment for iOS URL bar / visual viewport to settle
    let raf1 = 0, raf2 = 0, settleTimer: number | undefined;
    const settleAndApply = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          // tiny nudge encourages toolbar collapse in iOS landscape
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
          settleTimer = window.setTimeout(applyForCurrentWidth, 80);
        });
      });
    };

    // Debounce noisy vv changes so we compute only after it stops bouncing
    let debounceTimer: number | undefined;
    const debounced = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(settleAndApply, 140);
    };

    // Initial run (also covers bfcache restores)
    settleAndApply();

    // Re-apply on visual viewport changes & orientation/page restores
    const vv = window.visualViewport;
    vv?.addEventListener("resize", debounced);
    vv?.addEventListener("scroll", debounced);
    window.addEventListener("orientationchange", debounced);
    window.addEventListener("pageshow", debounced);

    return () => {
      vv?.removeEventListener("resize", debounced);
      vv?.removeEventListener("scroll", debounced);
      window.removeEventListener("orientationchange", debounced);
      window.removeEventListener("pageshow", debounced);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
