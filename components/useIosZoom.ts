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
      el.style.setProperty("--z", String(pz));
      el.style.setProperty("--zoomL", String(lz));
    };

    // Only zoom on small screens (< 900px)
    if (window.innerWidth >= 999) {
      setVars(1, 1);
      return;
    }

    // ---- iPhone Safari and other small screens: wait for viewport to settle ----
    const vv = window.visualViewport;
    let raf1 = 0,
      raf2 = 0,
      settleTimer: number | undefined;
    let debounceTimer: number | undefined;

    const apply = () => setVars(portraitZoom, landscapeZoom);

    const settleAndApply = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
          settleTimer = window.setTimeout(apply, 80);
        });
      });
    };

    const debounced = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(settleAndApply, 140);
    };

    // initial run
    settleAndApply();

    // respond to visual viewport & orientation changes
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
