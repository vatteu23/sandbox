import { useCallback, useEffect, useState } from "react";

export function useToolPersistence<T>(slug: string, defaults: T) {
  const storageKey = `tool:${slug}`;

  const [value, setValue] = useState<T>(defaults);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setValue({ ...defaults, ...JSON.parse(stored) });
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(storageKey, JSON.stringify(resolved));
        } catch {
          // ignore quota errors
        }
        return resolved;
      });
    },
    [storageKey]
  );

  return { value, setValue: persist, hydrated };
}
