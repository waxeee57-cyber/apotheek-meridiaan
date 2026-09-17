export function createBrowserStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();
  const fallbackJson = JSON.stringify(fallback);
  let cached: string = fallbackJson;

  function snapshot(): string {
    if (typeof window === "undefined") {
      return fallbackJson;
    }
    const raw = window.localStorage.getItem(key);
    const next = raw ?? fallbackJson;
    if (cached !== next) {
      cached = next;
    }
    return cached;
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function getServerSnapshot(): string {
    return fallbackJson;
  }

  function set(value: T): void {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    cached = serialized;
    listeners.forEach((listener) => listener());
  }

  function parse(raw: string): T {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  return { snapshot, subscribe, getServerSnapshot, set, parse };
}

export function createOptionalBrowserStore(key: string) {
  const listeners = new Set<() => void>();
  let cached = "";

  function snapshot(): string {
    if (typeof window === "undefined") {
      return "";
    }
    const raw = window.localStorage.getItem(key) ?? "";
    if (cached !== raw) {
      cached = raw;
    }
    return cached;
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function getServerSnapshot(): string {
    return "";
  }

  function set(value: unknown): void {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    cached = serialized;
    listeners.forEach((listener) => listener());
  }

  return { snapshot, subscribe, getServerSnapshot, set };
}
