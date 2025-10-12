// components/useIosZoom.ts
import { useEffect } from "react";

type Opts = { portraitZoom: number; landscapeZoom: number };

/**
 * Stable iOS zoom hook:
 * - Decides phone vs not after the visual viewport settles.
 * - Writes CSS vars: --z (portrait) and --zoomL (landscape).
 * - Enables wrapper scaling via data-zoom="on" (Option A gating).
 * - Removes the global kill-switch class 'zoom-not-ready' after applying.
 *
 * Requirements elsewhere:
 * - layout.js adds 'zoom-not-ready' + inline kill-switch CSS (beforeInteractive).
 * - Wrappers use data-gated utilities:
 *     data-[zoom=on]:[transform:scale(var(--z))]
 *     data-[zoom=on]:[width:calc(100%/var(--z))]
 *     landscape:data-[zoom=on]:[transform:scale(var(--zoomL))]
 *     landscape:data-[zoom=on]:[width:calc(100%/var(--zoomL))]
 * - No inline SSR defaults for --z / --zoomL.
 */
export function useIosZoomVars(
  ref: React.RefObject<HTMLElement>,
  { portraitZoom, landscapeZoom }: Opts
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Your preferred cutoff (phones only). Tablets are excluded by guard below.
    const PHONE_MAX = 1000;

    // Tablet guard (iPadOS 13+ can masquerade as Mac).
    const ua = navigator.userAgent;
    const isIPad =
      /\biPad\b/.test(ua) ||
      (/\bMacintosh\b/.test(ua) && (navigator as any).maxTouchPoints > 1);
    const isTabletLike =
      isIPad ||
      (!/iPhone|Android.+Mobile/.test(ua) &&
        Math.min(window.screen.width, window.screen.height) >= 600);

    const setVars = (pz: number, lz: number) => {
      el.style.setProperty("--z", String(pz));
      el.style.setProperty("--zoomL", String(lz));
    };

    const flipReady = () =>
      requestAnimationFrame(() =>
        document.documentElement.classList.remove("zoom-not-ready")
      );

    const enableZoom = () => {
      el.setAttribute("data-zoom", "on");
      flipReady();
    };
    const disableZoom = () => {
      el.removeAttribute("data-zoom");
      flipReady();
    };

    // Use the smallest reported width for stability on iOS.
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

    const applyForCurrentWidth = () => {
      const w = effectiveWidth();
      const shouldZoom = !isTabletLike && w <= PHONE_MAX;

      if (shouldZoom) {
        setVars(portraitZoom, landscapeZoom);
        enableZoom();
      } else {
        setVars(1, 1);
        disableZoom();
      }
    };

    // Wait until viewport settles; include a late second pass.
    let r1 = 0,
      r2 = 0,
      t1: number | undefined,
      t2: number | undefined;

    const settleAndApply = () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);

      r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => {
          // tiny nudge helps iOS collapse toolbar in landscape
          window.scrollTo(window.scrollX, Math.max(0, window.scrollY) + 0.1);
          t1 = window.setTimeout(() => {
            applyForCurrentWidth();
            // late pass to catch URL bar collapse post-paint
            t2 = window.setTimeout(applyForCurrentWidth, 280);
          }, 80);
        });
      });
    };

    // Debounce noisy events so we compute after changes finish.
    let debounce: number | undefined;
    const debounced = () => {
      if (debounce) clearTimeout(debounce);
      debounce = window.setTimeout(settleAndApply, 140);
    };

    // Initial run (also covers bfcache restores).
    settleAndApply();

    // Re-apply on visual viewport changes & orientation/page restores.
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
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (debounce) clearTimeout(debounce);
    };
  }, [ref, portraitZoom, landscapeZoom]);
}
