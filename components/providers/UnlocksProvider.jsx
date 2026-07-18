"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  DEFAULT_UNLOCKS,
  STORAGE_KEY,
  CORE_SECTIONS,
  SECTION_KEYS,
} from "@/lib/unlocks";

const UnlocksContext = createContext(null);

export function UnlocksProvider({ children }) {
  const [unlocks, setUnlocks] = useState(DEFAULT_UNLOCKS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUnlocks({ ...DEFAULT_UNLOCKS, ...JSON.parse(saved) });
    } catch (e) {
      // localStorage no disponible, seguimos con los valores por defecto
    }
    setReady(true);
  }, []);

  const unlockSection = useCallback((key) => {
    setUnlocks((prev) => {
      if (prev[key]) return prev; // ya estaba desbloqueada, no hace nada
      const next = { ...prev, [key]: true };
      const allCoreDone = CORE_SECTIONS.every((k) => next[k]);
      if (allCoreDone) next[SECTION_KEYS.GALERIA] = true;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        // noop
      }
      return next;
    });
  }, []);

  const resetUnlocks = useCallback(() => {
    setUnlocks(DEFAULT_UNLOCKS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // noop
    }
  }, []);

  return (
    <UnlocksContext.Provider
      value={{ unlocks, unlockSection, resetUnlocks, ready }}
    >
      {children}
    </UnlocksContext.Provider>
  );
}

export function useUnlocks() {
  const ctx = useContext(UnlocksContext);
  if (!ctx) {
    throw new Error("useUnlocks debe usarse dentro de <UnlocksProvider>");
  }
  return ctx;
}
