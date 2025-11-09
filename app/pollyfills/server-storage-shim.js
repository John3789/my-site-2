// app/polyfills/server-storage-shim.js
// Prevent "localStorage is not defined" during SSR/prerender.
// No-ops on the server; the real storages still work on the client.

if (typeof window === "undefined") {
  const makeStorage = () => {
    const store = new Map();
    return {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => { store.set(key, String(value)); },
      removeItem: (key) => { store.delete(key); },
      clear: () => { store.clear(); },
      key: (i) => Array.from(store.keys())[i] ?? null,
      get length() { return store.size; },
    };
  };

  if (typeof globalThis.localStorage === "undefined") {
    globalThis.localStorage = makeStorage();
  }
  if (typeof globalThis.sessionStorage === "undefined") {
    globalThis.sessionStorage = makeStorage();
  }
}
