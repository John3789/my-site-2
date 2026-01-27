// app/members/roadmap/page.jsx
"use client";

import { useEffect, useRef } from "react";
import TopOnMount from "../../../components/TopOnMount";
import { useIosZoomVars } from "../../../components/useIosZoom";

export default function MembersRoadmapPage() {
  const wrapRef = useRef(null);
  useIosZoomVars(wrapRef, { portraitZoom: 3.0, landscapeZoom: 1.0 });

  // Gamma fullscreen view
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
          <iframe src="https://gamma.app/embed/rgasoco648olpx2" style="width: 700px; max-width: 100%; height: 450px" allow="fullscreen" title="Welcome to RISE by "></iframe>
        </main>
      </div>

      {/* Page-specific global styles: hide site header/nav on the roadmap page */}
      <style jsx global>{`
        /* Hide any main site header/nav only on the roadmap page */
        body.roadmap-page header,
        body.roadmap-page .site-header,
        body.roadmap-page nav[aria-label="Main"] {
          display: none !important;
        }
      `}</style>
    </>
  );
}
