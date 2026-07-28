"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ContactDialog from "./ContactDialog";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const ContactContext = createContext(null);

/**
 * Wraps every page so the header, footer and contact dialog exist exactly
 * once. Any component can call useContact() to open the dialog — that is how
 * the "Request access" links on product cards reach the same form.
 */
export default function SiteChrome({ children }) {
  const [request, setRequest] = useState(null);

  const open = useCallback((subject = null) => setRequest({ subject }), []);
  const close = useCallback(() => setRequest(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ContactContext.Provider value={value}>
      <SiteHeader />
      {children}
      <SiteFooter />
      {request && <ContactDialog subject={request.subject} onClose={close} />}
    </ContactContext.Provider>
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
  className = "btn btn-primary",
  children,
}) {
  const { open } = useContact();
  return (
    <button className={className} type="button" onClick={() => open(subject)}>
      {children}
    </button>
  );
}
