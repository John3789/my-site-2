"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Optimizes on iPhone only; everywhere else uses the original (unoptimized). */
export default function HeroImageIphoneAware(props) {
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    setIsIphone(/\biPhone\b|\biPod\b/.test(ua));
  }, []);

  // On iPhone => optimized (unoptimized=false)
  // Elsewhere => unoptimized (original file served)
  return <Image {...props} unoptimized={!isIphone} />;
}
