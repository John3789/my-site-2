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
      el.style.setProperty("--z", String(pz));      // portrait
      el.style.setProperty("--zoomL", String(lz));  // landscape
    };

    const effectiveWidth = () => {
      const vv = window.visualViewport;
      const a = vv?.width ?? Number.POSITIVE_INFINITY;
      const b = window.innerWidth;
      const c = document.documentElement.clientWidth;
      return Math.min(a, b, c);
    };

    // Treat Safari's transient 980px layout width as "phone"
    const PHONE_MAX = 999; // was 900 — 980 catches iOS's temporary large width

    const applyForCurrentWidth = () => {
      const w = effectiveWidth();
      if (w <= PHONE_MAX) {
        setVars(portraitZoom, landscapeZoom);
      } else {
        setVars(1, 1);
      }
    };

    // Wait until viewport settles, then apply
    let raf1 = 0, raf2 = 0, settleTimer: number | undefined;
    const settleAndApply = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          // tiny nudge helps iOS collapse toolbar in landscape
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
          settleTimer = window.setTimeout(() => {
            applyForCurrentWidth();
            // late double-check in case URL bar collapses after our apply
            window.setTimeout(applyForCurrentWidth, 180);
          }, 80);
        });
      });
    };

    // Debounce noisy vv changes so we compute only after it stops bouncing
    let debounceTimer: number | undefined;
    const debounced = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(settleAndApply, 140);
    };

    // Initial run (also covers BFCache restores)
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
