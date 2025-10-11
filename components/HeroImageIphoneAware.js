"use client";

import Image from "next/image";

/** All images optimized (Next.js handles DPR & srcset automatically). */
export default function HeroImageIphoneAware(props) {
  return <Image {...props} unoptimized={false} />;
}
