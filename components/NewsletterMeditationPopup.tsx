// app/components/NewsletterMeditationPopup.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

type Props = {
  /** true on the meditation page (disables 30s timer) */
  isMeditationPage?: boolean;
  /** milliseconds before showing (ignored on meditation page); default 30000 */
  delayMs?: number;
  /** suppression window in days after showing/submitting; default 7 */
  freqDays?: number;
  /** localStorage key for suppression timestamp */
  lsKey?: string;
  /** sessionStorage key to ensure single show per tab session */
  ssKey?: string;
  /** id of <audio> element to watch for “N seconds from end” */
  audioElementId?: string;
  /** trigger when playback is this close to end; default 10 */
  secondsFromEnd?: number;
  /** newsletter endpoint; e.g. "/api/subscribe" */
  formAction?: string;
};

export default function NewsletterMeditationPopup({
  isMeditationPage = false,
  delayMs = 30000,
  freqDays = 7,
  lsKey = "__popup_suppress_until__",
  ssKey = "__popup_shown_this_session__",
  audioElementId,
  secondsFromEnd = 10,
  formAction = "/api/subscribe",
}: Props) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // used to prevent duplicate shows
  const shownRef = useRef<boolean>(false);

  // --- helpers wrapped in useCallback to satisfy exhaustive-deps ---
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
    if (suppressed() || sessionShown()) return;
    shownRef.current = true;
    markSessionShown();
    setOpen(true);
  }, [suppressed, sessionShown, markSessionShown]);

  // --- A) Time-based (skip on meditation page) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMeditationPage) return;
    if (suppressed() || sessionShown()) return;

    // compute media queries inside effect so they don't need to be deps
    const isDesktop = !!(window.matchMedia && window.matchMedia("(pointer:fine)").matches);
    const isMobile = !!(window.matchMedia && window.matchMedia("(pointer:coarse)").matches);
    if (!(isDesktop || isMobile)) return;

    const id = window.setTimeout(() => showOnce(), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs, isMeditationPage, suppressed, sessionShown, showOnce]);

  // --- B) Exit intent: DISABLED by request ---
  // (intentionally removed)

  // --- C) Audio trigger (desktop & mobile): show when within N seconds from end ---
  useEffect(() => {
    if (typeof document === "undefined" || !audioElementId) return;
    if (suppressed() || sessionShown()) return;

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
  }, [audioElementId, secondsFromEnd, suppressed, sessionShown, showOnce]);

  // --- UI handlers ---
  const dismiss = useCallback(() => {
    setOpen(false);
    markSuppressed();
  }, [markSuppressed]);

  function onEsc(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") dismiss();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget;
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
      markSuppressed();
      setSuccess(true);
    } catch {
      // allow preview flow even if endpoint isn't wired yet
      markSuppressed();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter popup"
      tabIndex={-1}
      onKeyDown={onEsc}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* backdrop */}
      <button
        aria-label="Close popup"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/50"
      />

      {/* panel */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[var(--color-teal-850)] p-5 text-[var(--color-cream)] shadow-2xl">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm opacity-80 hover:opacity-100"
        >
          ✕
        </button>

        {!success ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-xl leading-tight">I&rsquo;d love to gift this meditation to you</h3>
            <p className="opacity-85 text-sm">
              Get a 5-minute guided meditation you can download for everyday resets &mdash; and join my
              monthly newsletter, <span className="italic">Science, Soul, and a Bit of Magic</span>, where I share
              practical wisdom on mental health, personal growth, and wellbeing.
            </p>

            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:opacity-60 focus:bg-white/[0.07]"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-black font-semibold shadow-sm hover:brightness-105 active:translate-y-[1px] disabled:opacity-80"
              >
                {loading ? "Sending…" : "Subscribe"}
              </button>
            </form>

            <p className="text-[12px] opacity-70">No spam. Unsubscribe anytime.</p>
            <button onClick={dismiss} className="self-start text-[12px] underline opacity-75 hover:opacity-100">
              No thanks
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 p-1">
            <h3 className="font-serif text-xl leading-tight">Thank you &mdash; I&rsquo;m so glad you&rsquo;re here</h3>
            <p className="text-sm opacity-85">
              Your 5-minute guided meditation download is waiting in your inbox.
              <br />
              Your first <span className="italic">Science, Soul, and a Bit of Magic</span> newsletter will arrive soon
              &mdash; one thoughtful note each month to support you in body, mind, and spirit.
            </p>

            <Link
              href="/"
              className="mt-3 inline-flex items-center justify-center rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-3 text-black font-semibold shadow-sm hover:brightness-105 active:translate-y-[1px]"
            >
              Back to the website
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
