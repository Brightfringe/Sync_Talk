const KEY = "synctalk:username";

export function getStoredUsername(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setStoredUsername(name: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, name);
  } catch {
    /* noop */
  }
}

export function clearStoredUsername() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}