// app/components/NewsletterMeditationPopup.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  isMeditationPage?: boolean;
  delayMs?: number;
  freqDays?: number;
  lsKey?: string;
  ssKey?: string;
  audioElementId?: string;
  secondsFromEnd?: number;
  formAction?: string;
};

export default function NewsletterMeditationPopup({   // <-- FIXED NAME
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
  const shownRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const isDesktop = typeof window !== "undefined" ? !!(window.matchMedia && window.matchMedia("(pointer:fine)").matches) : false;
  const isMobile = typeof window !== "undefined" ? !!(window.matchMedia && window.matchMedia("(pointer:coarse)").matches) : false;

  function tsDaysFromNow(days: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.getTime();
  }

  function suppressed() {
    try {
      const raw = localStorage.getItem(lsKey);
      if (!raw) return false;
      const until = parseInt(raw, 10);
      return Number.isFinite(until) && Date.now() < until;
    } catch {
      return false;
    }
  }

  function sessionShown() {
    try {
      return sessionStorage.getItem(ssKey) === "1";
    } catch {
      return false;
    }
  }

  function markSuppressed() {
    try {
      localStorage.setItem(lsKey, String(tsDaysFromNow(freqDays)));
    } catch {}
  }

  function markSessionShown() {
    try {
      sessionStorage.setItem(ssKey, "1");
    } catch {}
  }

  function showOnce() {
    if (shownRef.current || typeof window === "undefined") return;
    if (suppressed() || sessionShown()) return;
    shownRef.current = true;
    markSessionShown();
    setOpen(true);
  }

  // Time-based (skip on meditation page)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMeditationPage) return;
    if (suppressed() || sessionShown()) return;
    if (!(isDesktop || isMobile)) return;
    timerRef.current = window.setTimeout(() => showOnce(), delayMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [delayMs, isMeditationPage]);

  // C) Audio trigger (both desktop and mobile): show when within N seconds from end
useEffect(() => {
  if (typeof document === "undefined" || !audioElementId) return;
  if (suppressed() || sessionShown()) return;

  const audio = document.getElementById(audioElementId) as HTMLAudioElement | null;
  if (!audio) return; // <-- early exit keeps 'audio' narrowed below

  let armed = false;

  const onLoaded = () => {
    if (!audio.duration || !Number.isFinite(audio.duration)) return;
    armed = true;
  };

  const onTimeUpdate = () => {
    if (!armed || shownRef.current) return;
    if (!audio.duration || !Number.isFinite(audio.duration)) return;
    const threshold = Math.max(0, audio.duration - secondsFromEnd);
    if (audio.currentTime >= threshold) showOnce();
  };

  const onEnded = () => {
    if (!shownRef.current) showOnce();
  };

  audio.addEventListener("loadedmetadata", onLoaded);
  audio.addEventListener("timeupdate", onTimeUpdate);
  audio.addEventListener("ended", onEnded);
  if (audio.readyState >= 1) onLoaded();

  return () => {
    audio.removeEventListener("loadedmetadata", onLoaded);
    audio.removeEventListener("timeupdate", onTimeUpdate);
    audio.removeEventListener("ended", onEnded);
  };
}, [audioElementId, secondsFromEnd]);

  function dismiss() {
    setOpen(false);
    markSuppressed();
  }

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
      markSuppressed();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Newsletter popup" tabIndex={-1} onKeyDown={onEsc} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button aria-label="Close popup" onClick={dismiss} className="absolute inset-0 cursor-default bg-black/50" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[var(--color-teal-850)] p-5 text-[var(--color-cream)] shadow-2xl">
        <button onClick={dismiss} aria-label="Close" className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm opacity-80 hover:opacity-100">✕</button>

        {!success ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-xl leading-tight">I&apos;d love to gift this meditation to you</h3>
            <p className="opacity-85 text-sm">Get a 5-minute guided meditation you can download for everyday resets — and join my monthly newsletter, <span className="italic">Science, Soul, and a Bit of Magic</span>, where I share practical wisdom on mental health, personal growth, and wellbeing.</p>
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
              <input type="email" name="email" required placeholder="Your email" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:opacity-60 focus:bg-white/[0.07]" />
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold)] px-4 py-3 text-black font-semibold shadow-sm hover:brightness-105 active:translate-y-[1px] disabled:opacity-80">{loading ? "Sending…" : "Subscribe"}</button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 p-1">
            <h3 className="font-serif text-xl leading-tight">Thank you — I&apos;m so glad you&apos;re here</h3>
            <p className="text-sm opacity-85">Your 5-minute guided meditation download is waiting in your inbox.<br/>Your first <span className="italic">Science, Soul, and a Bit of Magic</span> newsletter will arrive soon — one thoughtful note each month to support you in body, mind, and spirit.</p>
            <a href="/" className="mt-3 inline-flex items-center justify-center rounded-xl border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-3 text-black font-semibold shadow-sm hover:brightness-105 active:translate-y-[1px]">Back to the website</a>
          </div>
        )}
      </div>
    </div>
  );
}
