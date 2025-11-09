// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

const DOMAIN = "https://memberstack-client.drjuanpablosalerno.com"; // 👈 EXACTLY this
const PUBLIC_KEY = "pk_981855eac27759d0f11f"; // 👈 your key

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // IMPORTANT: do not use `.then()` — init returns the API object, not a promise.
    const ms = memberstackDOM.init({
      domain: DOMAIN,
      publicKey: PUBLIC_KEY,
    });

    // Keep a global for your buttons to use
    //   window.$memberstack.openModal("LOGIN" | "SIGNUP")
    window.$memberstack = ms;
    console.log("[MS] init OK", ms);
  }, []);

  return children;
}
