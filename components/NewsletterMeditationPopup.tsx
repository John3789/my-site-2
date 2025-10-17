// app/components/NewsletterMeditationPopup.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import Image from "next/image"; 

type Props = {
  isMeditationPage?: boolean;
  delayMs?: number;
  freqDays?: number;
  lsKey?: string;
  ssKey?: string;
  audioElementId?: string;
  secondsFromEnd?: number;
  formAction?: string;
  photoSrc?: string;
};

export default function NewsletterMeditationPopup({
  isMeditationPage = false,
  delayMs = 25000,
  freqDays = 7,
  lsKey = "__popup_suppress_until__",
  ssKey = "__popup_shown_this_session__",
  audioElementId,
  secondsFromEnd = 10,
  formAction = "/api/subscribe",
  photoSrc = "/bwhero20a.jpg",
}: Props) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const shownRef = useRef<boolean>(false);

  const TESTING_MODE = false;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ↓↓↓ DEBUG OVERRIDES — remove after testing ↓↓↓
useEffect(() => {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const action = url.searchParams.get("popup");

  // 1) ?popup=reset → clear both guards
  if (action === "reset") {
    try {
      localStorage.removeItem(lsKey);
      sessionStorage.removeItem(ssKey);
      console.log("[Popup] Reset complete.");
    } catch {}
  }

  // 2) ?popup=force → show immediately (ignores suppression)
  if (action === "force") {
    shownRef.current = false;
    setOpen(true);
    console.log("[Popup] Forced open via URL.");
  }

  // 3) Optional: inspect current guard state in the console
  if (action === "debug") {
    try {
      const untilRaw = localStorage.getItem(lsKey);
      const until = untilRaw ? Number(untilRaw) : null;
      console.table({
        TESTING_MODE,
        suppressed: suppressed(),
        sessionShown: sessionShown(),
        now: Date.now(),
        suppress_until: until,
        suppress_in_ms: until ? until - Date.now() : null,
      });
    } catch {}
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [mounted]); // only when mounted is set
// ↑↑↑ remove this block when you’re done ↑↑↑


  const suppressed = useCallback((): boolean => {
    try {
      const raw = localStorage.getItem(lsKey);
      if (!raw) return false;
      const until = parseInt(raw, 10);
      return Number.isFinite(until) && Date.now() < until;
    } catch {
      return false;
    }
  }, [lsKey]);

  const sessionShown = useCallback((): boolean => {
    try {
      return sessionStorage.getItem(ssKey) === "1";
    } catch {
      return false;
    }
  }, [ssKey]);

  const markSuppressed = useCallback(() => {
    try {
      const d = new Date();
      d.setDate(d.getDate() + freqDays);
      localStorage.setItem(lsKey, String(d.getTime()));
    } catch {}
  }, [freqDays, lsKey]);

  const markSessionShown = useCallback(() => {
    try {
      sessionStorage.setItem(ssKey, "1");
    } catch {}
  }, [ssKey]);

  const showOnce = useCallback(() => {
    if (shownRef.current || typeof window === "undefined") return;
    if (!TESTING_MODE && (suppressed() || sessionShown())) return;
    shownRef.current = true;
    if (!TESTING_MODE) markSessionShown();
    setOpen(true);
  }, [TESTING_MODE, suppressed, sessionShown, markSessionShown]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMeditationPage) return;

const id = window.setTimeout(() => {
  if (TESTING_MODE) {
    shownRef.current = true;
    setOpen(true);
    return;
  }
  if (!suppressed() && !sessionShown()) showOnce();
}, delayMs);

    return () => window.clearTimeout(id);
  }, [TESTING_MODE, delayMs, isMeditationPage, suppressed, sessionShown, showOnce]);

  useEffect(() => {
    if (typeof document === "undefined" || !audioElementId) return;
    if (!TESTING_MODE && (suppressed() || sessionShown())) return;
    const el = document.getElementById(audioElementId) as HTMLAudioElement | null;
    if (!el) return;

    let armed = false;
    const onLoaded = () => {
      if (!el.duration || !Number.isFinite(el.duration)) return;
      armed = true;
    };
    const onTimeUpdate = () => {
      if (!armed || shownRef.current) return;
      if (!el.duration || !Number.isFinite(el.duration)) return;
      const threshold = Math.max(0, el.duration - secondsFromEnd);
      if (el.currentTime >= threshold) showOnce();
    };
    const onEnded = () => {
      if (!shownRef.current) showOnce();
    };

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    if (el.readyState >= 1) onLoaded();

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
    };
  }, [audioElementId, secondsFromEnd, suppressed, sessionShown, showOnce, TESTING_MODE]);

  const dismiss = useCallback(() => {
    setOpen(false);
    if (!TESTING_MODE) markSuppressed();
  }, [markSuppressed, TESTING_MODE]);

  function onEsc(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") dismiss();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = (formData.get("email") || "").toString().trim();

    if (!email || !email.includes("@")) {
      setLoading(false);
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch(formAction, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Subscribe failed");
      if (!TESTING_MODE) markSuppressed();
      setSuccess(true);
    } catch {
      if (!TESTING_MODE) markSuppressed();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter popup"
      tabIndex={-1}
      onKeyDown={onEsc}
      className="fixed inset-0 z-[9999] p-3 sm:p-4"
    >
      {/* Backdrop */}
      <button
        aria-label="Close popup"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/55"
      />

      {/* Centering wrapper with safe viewport height */}
      <div className="grid min-h-[100svh] w-full place-items-center">
        {/* Card */}
        <div
          className="
            relative w-[min(92vw,640px)]
            max-h-[92svh] overflow-y-auto
            [@media(orientation:landscape)_and_(max-width:950px)]:max-w-[96vw]
            rounded-xl
            bg-[#0d1d2d] text-[var(--color-cream)]
            ring-1 ring-white/10
            shadow-[0_6px_25px_rgba(0,0,0,0.45)]
            hover:bg-[#102438] transition
            p-[2px]
          "
        >
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 inline-flex h-8 w-8 items-center justify-center border border-white/15 text-sm opacity-80 hover:opacity-100 bg-transparent z-10"
          >
            ✕
          </button>

          {!success ? (
            // 2-column layout across devices
<div className="grid items-stretch grid-cols-[42%_58%] md:grid-cols-[220px_1fr] [@media(orientation:landscape)_and_(max-width:950px)]:grid-cols-[200px_1fr]">
              {/* Photo — centered crop; slight shift on iPhone landscape */}
              <div className="h-full w-full bg-black/20 flex items-center justify-center overflow-hidden">
<Image
  src={photoSrc}
  alt="Dr. Juan Pablo Salerno"
  width={900}
  height={1200}
  quality={95}
  sizes="(max-width: 950px) 42vw, 220px"
  className="
    h-full w-full object-cover
    object-[45%]
    [@media(orientation:landscape)_and_(max-width:950px)]:object-[55%]
    md:object-center
    md:rounded-l-xl
  "
/>
              </div>

              {/* Text + form */}
<div className="p-4 sm:p-5">
  {/** PHONE (portrait + landscape up to 950px): SHORT COPY */}
  <h3 className="hidden [@media(max-width:950px)]:block font-serif text-[22px] leading-snug mb-2 opacity-90">
    Please accept this guided meditation as a personal gift
  </h3>
  <p className="hidden [@media(max-width:950px)]:block text-[14px] opacity-90">
   — and my invitation to join <span className="italic">Science, Soul, and a Bit of Magic</span>, my monthly newsletter.
  </p>

  {/** DESKTOP / LARGE TABLETS (> 950px): FULL COPY */}
  <h3 className="block [@media(max-width:950px)]:hidden font-serif text-[26px] md:text-[30px] leading-snug mb-2 opacity-90">
    Please accept this guided meditation as a personal gift
  </h3>
  <p className="block [@media(max-width:950px)]:hidden text-[15px] md:text-[17px] opacity-90">
  A 5-minute reset to help you reconnect — and my invitation to keep that feeling
  alive each month through <span className="italic">Science, Soul, and a Bit of Magic</span>, my monthly newsletter.
</p>

  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
    <input
      type="email"
      name="email"
      required
      placeholder="you@example.com"
      className="
        w-full rounded-md border border-white/15 bg-white/5
        px-4 py-3 outline-none placeholder-white/60
        focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50
        text-[15px]
        [@media(orientation:landscape)_and_(max-width:950px)]:py-2.5
      "
    />
    <button
      type="submit"
      disabled={loading}
      className="
        inline-flex w-full items-center justify-center
        rounded-md bg-[var(--color-gold)] text-black
        px-4 py-3 font-semibold
        shadow-md hover:shadow-lg hover:-translate-y-[1px]
        transition disabled:opacity-80
        [@media(orientation:landscape)_and_(max-width:950px)]:py-2.5
      "
    >
      {loading ? "Sending…" : "Subscribe"}
    </button>
  </form>
</div>

            </div>
          ) : (
            <div className="p-5 text-center">
              <h3 className="font-serif text-[22px] md:text-[30px] leading-snug tracking-[0.02em] opacity-90">
                Thank you — I’m so glad you’re here
              </h3>
              <p className="mt-2 text-[14px] md:text-[18px] opacity-90">
                Your 5-minute guided meditation download is waiting in your inbox.
                <br />
                Your first <span className="italic">Science, Soul, and a Bit of Magic</span> newsletter will arrive soon.
              </p>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 mt-3"
              >
                Back to the website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
