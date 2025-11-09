/**
 * SSR-safe storage shim.
 * During server render there is no window/localStorage/sessionStorage.
 * This defines harmless in-memory stand-ins so code that *reads* them
 * won’t crash. On the client, the real Web APIs are used.
 */
if (typeof window === 'undefined') {
  const makeStore = () => {
    const store = new Map();
    return {
      get length() { return store.size; },
      key: (i) => Array.from(store.keys())[i] ?? null,
      getItem: (k) => (store.has(k) ? String(store.get(k)) : null),
      setItem: (k, v) => { store.set(String(k), String(v)); },
      removeItem: (k) => { store.delete(String(k)); },
      clear: () => { store.clear(); },
    };
  };

  if (!globalThis.localStorage) globalThis.localStorage = makeStore();
  if (!globalThis.sessionStorage) globalThis.sessionStorage = makeStore();
}
