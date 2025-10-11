"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroImageIphoneAware(props) {
  const { alt = "", ...rest } = props;   // ✅ default alt

  const [isIphone, setIsIphone] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";
    setIsIphone(/\biPhone\b|\biPod\b/.test(ua));
  }, []);

  return <Image alt={alt} {...rest} unoptimized={!isIphone} />;
}
