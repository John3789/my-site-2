// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const DOMAIN = (process.env.NEXT_PUBLIC_MS_HOSTED_AUTH_URL || "https://auth.drjuanpablosalerno.com").replace(/\/+$/, "");
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MS_PUBLIC_KEY; // <- Live public key

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const ms = memberstackDOM.init({ domain: DOMAIN, publicKey: PUBLIC_KEY });
    window.$memberstack = ms;
  }, []);

  return children;
}
