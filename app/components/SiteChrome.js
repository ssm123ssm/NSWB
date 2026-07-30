"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Analytics from "./Analytics";
import { ConsentProvider } from "./Consent";
import ContactDialog from "./ContactDialog";
import CookieBanner from "./CookieBanner";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const ContactContext = createContext(null);

/**
 * Wraps every page so the header, footer, contact dialog and consent banner
 * exist exactly once. Any component can call useContact() to open the dialog —
 * that is how the "Request access" links on product cards reach the same form
 * — or useConsent() to read or change the analytics choice.
 */
export default function SiteChrome({ children }) {
  const [request, setRequest] = useState(null);

  // intent: "access" forces the request-access form for a product that is
  // otherwise public, for entry points that stand in for opening the app.
  const open = useCallback(
    (subject = null, { intent = null } = {}) => setRequest({ subject, intent }),
    []
  );
  const close = useCallback(() => setRequest(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ConsentProvider>
      <ContactContext.Provider value={value}>
        <SiteHeader />
        {children}
        <SiteFooter />
        {request && (
          <ContactDialog
            subject={request.subject}
            intent={request.intent}
            onClose={close}
          />
        )}
        <CookieBanner />
        <Analytics />
      </ContactContext.Provider>
    </ConsentProvider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used inside SiteChrome");
  }
  return ctx;
}

/** Convenience trigger so server components can still open the dialog. */
export function ContactButton({
  subject = null,
  intent = null,
  className = "btn btn-primary",
  children,
}) {
  const { open } = useContact();
  return (
    <button
      className={className}
      type="button"
      onClick={() => open(subject, { intent })}
    >
      {children}
    </button>
  );
}
