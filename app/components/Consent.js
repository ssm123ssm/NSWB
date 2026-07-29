"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const COOKIE_NAME = "ns-consent";

/** A year. Long enough not to nag, short enough to be a fresh question. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const ConsentContext = createContext(null);

function readConsent() {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=(granted|denied)(?:;|$)`)
  );
  return match ? match[1] : null;
}

function writeConsent(value) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie =
    `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}` +
    `; samesite=lax${secure}`;
}

/**
 * Analytics consent, stored in a first-party cookie holding one word —
 * `granted` or `denied`, the same for everyone who answers the same way, so it
 * identifies nobody. It is strictly necessary: storing a refusal is the only
 * way to honour it. The measurement it gates sets no cookies of its own.
 *
 * Three states matter and they are not interchangeable. `undefined` means the
 * cookie has not been read yet — the server render and the first paint, where
 * showing the banner would make it flash for people who already answered.
 * `null` means read, but undecided. A string is a decision. Only `null` (or an
 * explicit reopen) puts the banner on screen.
 */
export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(undefined);
  const [revisiting, setRevisiting] = useState(false);

  useEffect(() => {
    try {
      setConsent(readConsent());
    } catch {
      // Cookies blocked outright. Treat it as undecided and ask again next
      // visit — never as consent.
      setConsent(null);
    }
  }, []);

  const decide = useCallback(
    (next) => {
      try {
        writeConsent(next);
      } catch {
        // Nothing to persist to; the choice still holds for this page view.
      }

      // The analytics script patches history.pushState so it follows
      // client-side navigation on its own. Once it is running, dropping the
      // component from the tree does not stop it — the loaded code stays live.
      // Withdrawal has to mean withdrawal from that moment, so reload instead
      // of pretending.
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
