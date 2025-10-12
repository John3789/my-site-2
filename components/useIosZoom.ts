// components/useIosZoom.ts
import { useEffect } from "react";

type Opts = { portraitZoom: number; landscapeZoom: number };

/**
 * Safe iOS zoom:
 * - Zooms **only in landscape** on phones (<= 1000px effective width).
 * - Never zooms in portrait (prevents "arrive very close").
 * - Enables zoom only after the visual viewport is **stable** for a short window.
 * Works with:
 *   - html.zoom-not-ready (global kill-switch) — removed after decision
 *   - data-[zoom=on]:[...] gated wrapper transforms
 *   - html.zoom-on + CSS vars on <html> so global .zoom-exempt can counter-scale
 */
export function useIosZoomVars(
  ref: React.RefObject<HTMLElement>,
  { portraitZoom, landscapeZoom }: Opts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const PHONE_MAX = 1000; // phones only (tablets excluded)
    const STABLE_MS = 200;  // viewport must remain stable for this long
    const TOL = 1;          // px tolerance for width/height stability
    const SCALE_TOL = 0.01; // tolerance for vv.scale stability

    // Tablet guard (prevents iPad portrait 768 from being treated as phone)
    const ua = navigator.userAgent;
    const isIPad =
      /\biPad\b/.test(ua) ||
      (/\bMacintosh\b/.test(ua) && (navigator as any).maxTouchPoints > 1);
    const isTabletLike =
      isIPad ||
      (!/iPhone|Android.+Mobile/.test(ua) &&
        Math.min(window.screen.width, window.screen.height) >= 600);

    // Write CSS vars (wrapper + <html> for global zoom-exempt)
    const setVars = (pz: number, lz: number) => {
      el.style.setProperty("--z", String(pz));
      el.style.setProperty("--zoomL", String(lz));
      document.documentElement.style.setProperty("--z", String(pz));
      document.documentElement.style.setProperty("--zoomL", String(lz));
    };

    // Remove the kill-switch after we’ve applied a decision
    const flipReady = () =>
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("zoom-not-ready")
      );

    const enableZoom = () => {
      el.setAttribute("data-zoom", "on");
      document.documentElement.classList.add("zoom-on");   // for global .zoom-exempt
      flipReady();
    };

    const disableZoom = () => {
      el.removeAttribute("data-zoom");
      document.documentElement.classList.remove("zoom-on");
      flipReady();
    };

    const mqlLandscape = window.matchMedia("(orientation: landscape)");

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

    const effectiveHeight = () => {
      const hScreen =
        typeof window.screen?.height === "number"
          ? window.screen.height
          : Number.POSITIVE_INFINITY;
      const hVV = window.visualViewport?.height ?? Number.POSITIVE_INFINITY;
      const hInner = window.innerHeight;
      const hClient = document.documentElement.clientHeight;
      return Math.min(hScreen, hVV, hInner, hClient);
    };

    // Decide whether we *want* zoom (logic only; doesn't apply yet)
    const wantZoom = () => {
      if (isTabletLike) return false;            // never zoom tablets
      if (!mqlLandscape.matches) return false;   // never zoom in portrait
      const w = effectiveWidth();
      return w <= PHONE_MAX;                     // phones only
    };

    // Wait until viewport is stable (width/height/scale steady) before applying
    let stableTimer: number | undefined;
    let lastW = 0, lastH = 0, lastS = 1;

    const isStable = () => {
      const vv = window.visualViewport;
      const w = effectiveWidth();
      const h = effectiveHeight();
      const s = vv?.scale ?? 1;
      const okW = Math.abs(w - lastW) <= TOL;
      const okH = Math.abs(h - lastH) <= TOL;
      const okS = Math.abs(s - lastS) <= SCALE_TOL;
      lastW = w; lastH = h; lastS = s;
      return okW && okH && okS;
    };

    const applyDecision = () => {
      if (wantZoom()) {
        // keep portrait at 1; only landscape uses landscapeZoom
        setVars(1, landscapeZoom);
        enableZoom();
      } else {
        setVars(1, 1);
        disableZoom();
      }
    };

    const settleAndApply = () => {
      // sample until stable for STABLE_MS, then apply decision
      if (stableTimer) clearTimeout(stableTimer);
      lastW = effectiveWidth();
      lastH = effectiveHeight();
      lastS = window.visualViewport?.scale ?? 1;

      const tick = () => {
        if (isStable()) {
          stableTimer = window.setTimeout(() => {
            // ensure we are still stable at the end of the window
            if (isStable()) applyDecision();
            else schedule();
          }, STABLE_MS);
        } else {
          schedule();
        }
      };
      const schedule = () => requestAnimationFrame(tick);
      schedule();
    };

    // Debounce noisy events
    let debounceHandle: number | undefined;
    const debounced = () => {
      if (debounceHandle) clearTimeout(debounceHandle);
      debounceHandle = window.setTimeout(settleAndApply, 120);
    };

    // Initial run + listeners
    settleAndApply();

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

      if (stableTimer) clearTimeout(stableTimer);
      if (debounceHandle) clearTimeout(debounceHandle);

      // safety: clear global flag in case we unmount mid-state
      document.documentElement.classList.remove("zoom-on");
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
