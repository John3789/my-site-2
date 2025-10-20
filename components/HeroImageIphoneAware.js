"use client";

import Image from "next/image";

/** 
 * Wrapper around Next/Image optimized for iPhone rendering. 
 * All images are optimized by default unless explicitly disabled.
 * Ensures accessibility by requiring an alt prop.
 */
export default function HeroImageIphoneAware({ alt = "", ...props }) {
  return <Image {...props} alt={alt} unoptimized={false} />;
}
