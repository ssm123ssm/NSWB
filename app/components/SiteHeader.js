"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, pageHeaders, site } from "../data/site";
import { CloseIcon, MenuIcon } from "./Icons";
import { useContact } from "./ContactContext";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";

export default function SiteHeader() {
  const { open: openContact } = useContact();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Product pages run a stripped header carrying their own action instead of
  // the site nav. See `pageHeaders` for what that means and why it is keyed by
  // path.
  const override = pageHeaders[pathname];
  const bare = Boolean(override);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header className="site-header" data-stuck={stuck || menuOpen}>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link className="flex items-center" href="/" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>

        {!bare && (
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link className="nav-link" key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            {/* Contact sits with the nav rather than beside the theme toggle:
                it is a third destination, and a filled button here would be a
                second accent competing with the hero. It opens the dialog
                instead of navigating, so it is a button wearing .nav-link. */}
            <button className="nav-link" type="button" onClick={() => openContact()}>
              Contact
            </button>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {override?.cta && (
            <a
              className="btn btn-brand btn-sm"
              data-brand={override.brand}
              href={override.cta.href}
              {...(override.cta.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {override.cta.label}
            </a>
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
          <nav className="shell flex flex-col py-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                className="border-b border-[color:var(--border)] py-3.5 text-[0.95rem] last:border-0"
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="border-b border-[color:var(--border)] py-3.5 text-left text-[0.95rem] last:border-0"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openContact();
              }}
            >
              Contact
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
