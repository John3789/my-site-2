// app/providers/MemberstackProvider.jsx
"use client";

import { useEffect, useRef } from "react";
import memberstackDOM from "@memberstack/dom";

export default function MSProvider({ children }) {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    let canceled = false;

    try {
      const ms = memberstackDOM.init({
        // Hosted Auth subdomain you created in Memberstack
        domain: "auth.drjuanpablosalerno.com",
        // Use your public key; env var preferred if you set it
        publicKey:
          process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY ||
          "app_cmhr27ueu00dr0spu834zhexr",
      });

      if (!canceled) {
        // keep the global for your buttons: window.$memberstack.openModal("LOGIN"/"SIGNUP")
        window.$memberstack = ms;
        console.log("[MS] DOM initialized");
      }
    } catch (err) {
      console.error("[MS] init failed", err);
    }

    return () => {
      canceled = true;
    };
  }, []);

  return children;
}
