// app/members/roadmap/page.jsx
"use client";

import { useEffect, useRef } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";

export default function MembersRoadmapPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

  const GAMMA_URL = "https://gamma.app/embed/rgasoco648olpx2";

  // Add/remove class on <body> so header + top area can be styled differently
  useEffect(() => {
    document.body.classList.add("roadmap-page");
    return () => document.body.classList.remove("roadmap-page");
  }, []);

  return (
    <>
      <TopOnMount mountTop={15} />

      <div
        ref={wrapRef}
        className="min-h-screen bg-[var(--roadmap-teal)] text-[var(--color-cream)]"
      >
        {/* TOP COLOR BAND BELOW HEADER (matches header color) */}
        <div className="w-full h-[60px] md:h-[75px] bg-[var(--roadmap-teal)]"></div>

        <main className="flex-1 flex flex-col">
          {/* FULL-SCREEN IFRAME BELOW THE HEADER + COLOR BAND */}
          <iframe
            src={GAMMA_URL}
            style={{
              width: "100%",
              height: "calc(100vh - 60px)", // adjust if header height changes
              border: "none",
            }}
            allow="fullscreen"
            title="RISE Roadmap"
          />
        </main>
      </div>
    </>
  );
}
