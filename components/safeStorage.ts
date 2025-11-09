// components/safeStorage.ts
export const safeLocal = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, val: string) {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(key, val); } catch {}
  },
  remove(key: string) {
    if (typeof window === "undefined") return;
    try { localStorage.removeItem(key); } catch {}
  },
};

export const safeSession = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try { return sessionStorage.getItem(key); } catch { return null; }
  },
  set(key: string, val: string) {
    if (typeof window === "undefined") return;
    try { sessionStorage.setItem(key, val); } catch {}
  },
  remove(key: string) {
    if (typeof window === "undefined") return;
    try { sessionStorage.removeItem(key); } catch {}
  },
};
