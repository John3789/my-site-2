// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Memberstack Hosted Auth provider for Next.js (App Router).
 * - Injects the hosted script once on the client
 * - Makes window.$memberstack available (for openModal("LOGIN"/"SIGNUP"))
 * - Safe to include in production & dev
 */
export default function MSProvider({ children }) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    // If already present (hot reloads, multiple mounts), don't inject again
    if (typeof window !== "undefined" && window.$memberstack) {
      console.log("[MS] already loaded");
      return;
    }

    // Avoid double-inserting the script
    if (document.querySelector('script[data-memberstack-app="app_cmhr27ueu00dr0spu834zhexr"]')) {
      console.log("[MS] script tag already in DOM");
      return;
    }

    // Inject the official hosted script
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://static.memberstack.com/scripts/v2/memberstack.js";
    s.setAttribute("data-memberstack-app", "app_cmhr27ueu00dr0spu834zhexr");
    s.async = true;

    s.onload = () => {
      // Memberstack usually sets window.$memberstack on load
      if (window.$memberstack) {
        console.log("Memberstack React has initialized");
      } else {
        // Fallback: poll briefly in case it races
        const start = Date.now();
        const t = setInterval(() => {
          if (window.$memberstack) {
            console.log("Memberstack React has initialized (polled)");
            clearInterval(t);
          } else if (Date.now() - start > 8000) {
            console.warn("[MS] not ready after 8s");
            clearInterval(t);
          }
        }, 150);
      }
    };

    s.onerror = () => {
      console.error("[MS] failed to load hosted script");
    };

    document.head.appendChild(s);

    // Optional: listen for readiness events if Memberstack fires them
    const onReady = () => console.log("[MS] ready event fired");
    document.addEventListener("ms-ready", onReady);
    return () => document.removeEventListener("ms-ready", onReady);
  }, []);

  return children;
}
