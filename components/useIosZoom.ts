// components/useIosZoom.ts
import { useEffect } from "react";

type Opts = { portraitZoom: number; landscapeZoom: number };

/**
 * Zoom hook:
 * - Decides phone vs not using a stable width heuristic
 * - Applies --z / --zoomL only after the viewport settles
 * - Enables wrapper zoom via data-zoom="on"
 * - Flips off the global kill-switch html.zoom-not-ready
 */
export function useIosZoomVars(
  ref: React.RefObject<HTMLElement>,
  { portraitZoom, landscapeZoom }: Opts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const PHONE_MAX = 1000; // catch iOS first-paint widths (980–1024) so phones still zoom

    // Write CSS vars that your wrappers already use
    const setVars = (pz: number, lz: number) => {
      el.style.setProperty("--z", String(pz));
      el.style.setProperty("--zoomL", String(lz));
    };

    // 🔑 Flip the global kill-switch after we’ve applied a decision
    const flipReady = () =>
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("zoom-not-ready")
      );

    // Gate your wrapper transforms via data-zoom (Option A)
    const enableZoom = () => {
      el.setAttribute("data-zoom", "on");
      flipReady();
    };
    const disableZoom = () => {
      el.removeAttribute("data-zoom");
      flipReady();
    };

    // Use a stable width heuristic (min of several reports)
    const effectiveWidth = () => {
      const wScreen =
        typeof window.screen?.width === "number"
          ? window.screen.width
          : Number.POSITIVE_INFINITY;
      const wVV = window.visualViewport?.width ?? Number.POSITIVE_INFINITY;
      const wInner = window.innerWidth;
      const wClient = document.documentElement.clientWidth;
      return Math.min(wScreen, wVV, wInner, wClient);
    };

    // Apply zoom or not for the current (settled) width
    const applyForCurrentWidth = () => {
      const w = effectiveWidth();
      if (w < PHONE_MAX) {
        setVars(portraitZoom, landscapeZoom);
        enableZoom();   // <- sets data-zoom="on" and removes zoom-not-ready next frame
      } else {
        setVars(1, 1);
        disableZoom();  // <- removes zoom-not-ready next frame even when not zooming
      }
    };

    // Wait until viewport settles; also do a late second pass
    let raf1 = 0, raf2 = 0, settleTimer: number | undefined, lateTimer: number | undefined;
    const settleAndApply = () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (settleTimer) clearTimeout(settleTimer);
      if (lateTimer) clearTimeout(lateTimer);

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          // small nudge helps iOS collapse toolbar in landscape
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
