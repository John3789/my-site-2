// components/safeStorage.ts

/** Safely access local/session storage without ever referencing the
 * bare identifier `localStorage`/`sessionStorage` on the server.
 * We ONLY touch them via globalThis and optional chaining.
 */

function getLS(): Storage | undefined {
  // in browsers, globalThis.localStorage exists; on server it's undefined
  return (globalThis as any)?.localStorage as Storage | undefined;
}

function getSS(): Storage | undefined {
  return (globalThis as any)?.sessionStorage as Storage | undefined;
}

export const safeLocal = {
  get(key: string): string | null {
    try {
      const ls = getLS();
      return ls?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set(key: string, val: string) {
    try {
      const ls = getLS();
      ls?.setItem(key, val);
    } catch {}
  },
  remove(key: string) {
    try {
      const ls = getLS();
      ls?.removeItem(key);
    } catch {}
  },
};

export const safeSession = {
  get(key: string): string | null {
    try {
      const ss = getSS();
      return ss?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set(key: string, val: string) {
    try {
      const ss = getSS();
      ss?.setItem(key, val);
    } catch {}
  },
  remove(key: string) {
    try {
      const ss = getSS();
      ss?.removeItem(key);
    } catch {}
  },
};
