"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site";
import { CloseIcon, MenuIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import { useContact } from "./SiteChrome";

/**
 * Pages that carry their own call to action and want nothing competing with
 * it. On these the header keeps the wordmark and the theme toggle and drops
 * everything else — no nav, no "Start a project", no burger, because there is
 * no menu left to open.
 *
 * Scoped to a list rather than a flag on the page, because the header renders
 * above the route and cannot ask it anything.
 */
const BARE_HEADER = new Set(["/nsqr"]);

export default function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useContact();
  const bare = BARE_HEADER.has(pathname);

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
        <Link className="flex items-center gap-2.5" href="/" aria-label={`${site.name} home`}>
          <Image src="/logo.svg" alt="" width={26} height={26} priority />
          <span className="text-[0.95rem] font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        {!bare && (
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link className="nav-link" key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!bare && (
            <>
              <button
                className="btn btn-primary btn-sm hidden sm:inline-flex"
                type="button"
                onClick={() => open()}
              >
                Start a project
              </button>
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
            </>
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
              className="btn btn-primary mt-4 mb-2"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
            >
              Start a project
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
