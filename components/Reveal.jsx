"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If it's already in view on mount (e.g., near top), show immediately
    const alreadyVisible =
      typeof window !== "undefined" &&
      el.getBoundingClientRect().top < window.innerHeight * 0.88;

    if (alreadyVisible) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target); // fire once
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px", // trigger a bit earlier
        threshold: 0.05,                // lower threshold for small elements (like <h5>)
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
