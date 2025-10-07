// app/components/NewsletterMeditationPopup.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

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
  delayMs = 30000,
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMeditationPage) return;
    if (suppressed() || sessionShown()) return;

    const id = window.setTimeout(() => showOnce(), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs, isMeditationPage, suppressed, sessionShown, showOnce]);

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
      {/* Backdrop */}
      <button
        aria-label="Close popup"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/55"
      />

      {/* Card — visually identical to newsletter footer */}
      <div
        className="
          relative w-full max-w-[640px]
          rounded-xl
          bg-[#0d1d2d] text-[var(--color-cream)]
          ring-1 ring-white/10
          shadow-[0_6px_25px_rgba(0,0,0,0.45)]
          hover:bg-[#102438] transition
          overflow-hidden p-[2px]
        "
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center border border-white/15 text-sm opacity-80 hover:opacity-100 bg-transparent"
        >
          ✕
        </button>

        {!success ? (
          <div className="grid grid-cols-[170px_1fr] sm:grid-cols-[220px_1fr]">
            {/* Photo */}
            <div className="h-full w-full bg-black/20">
              <img
                src={photoSrc}
                alt="Dr. Juan Pablo Salerno"
                className="h-full w-full object-cover object-center rounded-l-xl"
              />
            </div>

            {/* Text + form */}
            <div className="p-5">
              <h3 className="font-serif text-[27px] md:text-[30px] leading-tight mb-2 opacity-90">
                Please receive this guided meditation as a personal gift
              </h3>
              <p className="text-[15px] md:text-[18px] opacity-90">
 Enjoy my 5-minute reset meditation to help you recenter whenever you need it.{" "}
  I’d be honored if you joined my monthly newsletter community,{" "}
  <span className="italic">Science, Soul, and a Bit of Magic</span>, for practical wisdom to nourish
your body, mind, and spirit.
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
                  "
                >
                  {loading ? "Sending…" : "Subscribe"}
                </button>
              </form>


              <button
                onClick={dismiss}
                className="mt-1 text-[12px] underline opacity-75 hover:opacity-100"
              >
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 text-center">
            <h3 className="font-serif text-[27px] md:text-[30px] leading-tight tracking-[0.02em] opacity-90">
              Thank you — I’m so glad you’re here
            </h3>
            <p className="mt-2 text-[15px] md:text-[18px] opacity-90">
              Your 5-minute guided meditation download is waiting in your inbox.
              <br />
              Your first <span className="italic">Science, Soul, and a Bit of Magic</span> newsletter will arrive soon.
            </p>

            <Link
              href="/"
              onClick={dismiss}
    className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold)] text-black px-6 py-3 font-semibold uppercase tracking-wide text-sm shadow-md hover:shadow-lg hover:-translate-y-[2px] transition focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50"

            >
              Back to the website
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
