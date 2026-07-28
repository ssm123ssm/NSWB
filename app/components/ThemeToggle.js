"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

/**
 * The stored preference is applied by the inline script in app/layout.js
 * before paint; this component only mirrors and updates it.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ns-theme", next);
    } catch {
      // Private browsing — the toggle still works for this session.
    }
    setTheme(next);
  }

  return (
    <button
      className="icon-button"
      type="button"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      {/* Render nothing until mounted so server and client markup agree. */}
      {theme === "dark" ? <MoonIcon /> : theme === "light" ? <SunIcon /> : <span className="h-4 w-4" />}
    </button>
  );
}
