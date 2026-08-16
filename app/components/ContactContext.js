"use client";

import { createContext, useContext } from "react";

/**
 * The contact dialog's context, kept in its own module rather than in
 * SiteChrome so that the chrome's own children can reach it. SiteChrome imports
 * SiteHeader directly, so a header that imported the context back from
 * SiteChrome would close an import cycle; everything below the chrome
 * (ProductTimeline, RequestAccessLink, the page-level buttons) is free of that
 * problem, but they all read better pointing at the same place.
 *
 * SiteChrome owns the provider and re-exports both helpers, so existing
 * `from "./SiteChrome"` imports keep working.
 */
export const ContactContext = createContext(null);

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
