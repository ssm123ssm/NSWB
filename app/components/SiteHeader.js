"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, pageHeaders, site } from "../data/site";
import { CloseIcon, MenuIcon } from "./Icons";
import { useContact } from "./ContactContext";
import Wordmark from "./Wordmark";

/**
 * Sticky, translucent and blurred — the page slides under it, and the border
 * only appears once the page has actually moved, so the header has no edge
 * while the hero is at rest.
 *
 * Product pages run a stripped header carrying their own action instead of the
 * site nav; see `pageHeaders` in the site data for what that means.
 *
 * The primary call sits on the right as a gradient button, which is the one
 * place in the chrome the house gradient appears.
 */
export default function SiteHeader() {
  const { open: openContact } = useContact();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nearClosing, setNearClosing] = useState(false);
  const pathname = usePathname();
  const override = pageHeaders[pathname];
  const bare = Boolean(override);
  // /products makes its own case for getting in touch at the foot of the
  // page, so the header does not also carry the CTA there.
  const hideCta = pathname === "/products";
  // Legal pages carry no nav and no CTA — just the mark, centered, so the
  // reader isn't pulled back toward the marketing site while reading a policy.
  const legal = pathname === "/legal" || pathname.startsWith("/legal/");
  const ctaStateClass = nearClosing ? " btn-muted" : stuck ? " btn-scrolled" : "";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The home page's own closing CTA restates "Start a conversation" — mute
  // the header's copy while that section is on screen so the two don't read
  // as two separate asks.
  useEffect(() => {
    if (pathname !== "/") {
      setNearClosing(false);
      return;
    }
    const target = document.getElementById("closing");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearClosing(entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  if (legal) {
    return (
      <header className="site-header" data-stuck={stuck}>
        <div className="shell flex h-16 items-center justify-center">
          <Link
            className="flex items-center"
            href="/"
            aria-label={`${site.name} home`}
          >
            <Wordmark className="wordmark-vivid" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="site-header" data-stuck={stuck || menuOpen}>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          className="flex items-center"
          href="/"
          aria-label={`${site.name} home`}
        >
          <Wordmark />
        </Link>

        {!bare && (
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                className="nav-link"
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {override?.cta ? (
            <a
              className="btn btn-gradient btn-sm"
              data-brand={override.brand}
              href={override.cta.href}
              {...(override.cta.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {override.cta.label}
            </a>
          ) : (
            !hideCta && (
              <button
                className={`btn btn-gradient btn-sm hidden md:inline-flex${ctaStateClass}`}
                type="button"
                onClick={() => openContact()}
              >
                Start a conversation
              </button>
            )
          )}
          {!bare && (
            <button
              className="icon-button md:hidden"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>

      {menuOpen && !bare && (
        <div
          id="mobile-menu"
          className="border-t border-[color:var(--border)] bg-[color:var(--bg)] md:hidden"
        >
          <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                className="rounded-token px-3 py-2.5 text-[0.95rem] font-medium hover:bg-[color:var(--bg-subtle)]"
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!hideCta && (
              <button
                className={`btn btn-gradient mt-2 w-full${ctaStateClass}`}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openContact();
                }}
              >
                Start a conversation
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
