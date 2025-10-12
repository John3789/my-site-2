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

    // A more stable width heuristic: take the smallest reported width
    // (screen.width is very stable on iPhone; vv/inner/client can bounce)
    const effectiveWidth = () => {
      const wScreen = (typeof window.screen?.width === "number" ? window.screen.width : Number.POSITIVE_INFINITY);
      const wVV = (window.visualViewport?.width ?? Number.POSITIVE_INFINITY);
      const wInner = window.innerWidth;
      const wClient = document.documentElement.clientWidth;
      return Math.min(wScreen, wVV, wInner, wClient);
    };

    const PHONE_MAX = 999; // your rule: zoom only below 900px

    const applyForCurrentWidth = () => {
      const w = effectiveWidth();
      if (w < PHONE_MAX) {
        setVars(portraitZoom, landscapeZoom);
      } else {
        setVars(1, 1); // never zoom on >= 900px
      }
    };

    // Wait until viewport settles, then apply; also do a late second pass
    let raf1 = 0, raf2 = 0, settleTimer: number | undefined, lateTimer: number | undefined;
    const settleAndApply = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);
      if (lateTimer) clearTimeout(lateTimer);

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          // small nudge helps iOS collapse the toolbar in landscape
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
          settleTimer = window.setTimeout(() => {
            applyForCurrentWidth();
            // late second pass to catch post-paint URL bar collapse
            lateTimer = window.setTimeout(applyForCurrentWidth, 220);
          }, 80);
        });
      });
    };

    // Debounce noisy events so we compute only after changes finish
    let debounceTimer: number | undefined;
    const debounced = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(settleAndApply, 140);
    };

    // Initial run (also handles bfcache restores)
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
      if (lateTimer) clearTimeout(lateTimer);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
