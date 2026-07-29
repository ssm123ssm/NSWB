"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ns-consent";

const ConsentContext = createContext(null);

/**
 * Analytics consent, stored the same way as the theme preference: one
 * localStorage key holding one word.
 *
 * Three states matter and they are not interchangeable. `undefined` means
 * storage has not been read yet — the server render and the first paint, where
 * showing the banner would make it flash for people who already answered.
 * `null` means read, but undecided. A string is a decision. Only `null` (or an
 * explicit reopen) puts the banner on screen.
 */
export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(undefined);
  const [revisiting, setRevisiting] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setConsent(stored === "granted" || stored === "denied" ? stored : null);
    } catch {
      // Private browsing. Treat it as undecided and ask again next visit —
      // never as consent.
      setConsent(null);
    }
  }, []);

  const decide = useCallback(
    (next) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Nothing to persist to; the choice still holds for this page view.
      }

      // Plausible patches history.pushState so it follows client-side
      // navigation on its own. Once it is running, dropping the <script> from
      // the tree does not stop it — the loaded code stays live. Withdrawal has
      // to mean withdrawal from that moment, so reload instead of pretending.
      if (consent === "granted" && next === "denied") {
        window.location.reload();
        return;
      }

      setRevisiting(false);
      setConsent(next);
    },
    [consent]
  );

  /** Reopens the banner without clearing the stored answer, so someone who
      changes their mind halfway and navigates away keeps what they chose. */
  const reopen = useCallback(() => setRevisiting(true), []);

  const value = useMemo(
    () => ({
      consent,
      decide,
      reopen,
      granted: consent === "granted",
      visible: consent !== undefined && (consent === null || revisiting),
    }),
    [consent, decide, reopen, revisiting]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used inside ConsentProvider");
  }
  return ctx;
}
