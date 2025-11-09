"use client";
import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const DOMAIN = "https://memberstack-client.drjuanpablosalerno.com";
const PUBLIC_KEY = "pk_981855eac27759d0f11f";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const ms = memberstackDOM.init({ domain: DOMAIN, publicKey: PUBLIC_KEY });
    window.$memberstack = ms; // make it globally available
    console.log("[MS] init OK", ms);
  }, []);

  return children;
}
