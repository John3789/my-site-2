useEffect(() => {
  if (inited.current) return;
  inited.current = true;

  if (!PUBLIC_KEY) {
    console.warn("[MS] Missing NEXT_PUBLIC_MS_PUBLIC_KEY");
    return;
  }

  const ms = memberstackDOM.init({
    publicKey: PUBLIC_KEY,   // ✅ NO domain here
  });

  if (typeof window !== "undefined") {
    window.$memberstack = ms;
    window.memberstack = ms;
    window.Memberstack = ms;
  }

  try {
    ms.mount?.();
    console.log("[MS] Provider v4 – no custom domain");
  } catch (err) {
    console.error("[MS] mount error:", err);
  }
}, []);
