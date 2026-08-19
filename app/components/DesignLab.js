"use client";

import { useEffect, useState } from "react";

/**
 * DESIGN LAB — development only. Not rendered in a production build; see the
 * `isDev` guard in app/layout.js.
 *
 * A floating panel that writes `data-palette`, `data-radius`, `data-elevation`,
 * `data-density` and `data-type` onto <html>. The variant rules in globals.css
 * re-point the design tokens underneath the whole site, so every choice here is
 * judged on the real pages rather than on a swatch.
 *
 * The choice is persisted to localStorage so it survives a reload and a route
 * change while a decision is being made.
 *
 * This whole component and the variant block in globals.css come out together
 * once a direction is settled — the winning values move up into `:root` and
 * become the design.
 */

const AXES = [
  {
    key: "palette",
    label: "Palette",
    options: [
      { value: "", label: "HeroUI blue", hint: "current" },
      { value: "indigo", label: "Indigo → violet" },
      { value: "teal", label: "Teal → emerald" },
      { value: "ink", label: "Ink + amber" },
      { value: "neutral", label: "Neutral + spectrum" },
      { value: "mono", label: "Mono grey + blue" },
    ],
  },
  {
    key: "type",
    label: "Typeface",
    options: [
      { value: "", label: "Inter", hint: "current" },
      { value: "instrument", label: "Instrument Sans" },
      { value: "grotesk", label: "Space Grotesk" },
    ],
  },
  {
    key: "radius",
    label: "Shape",
    options: [
      { value: "sharp", label: "Sharp" },
      { value: "", label: "Default", hint: "current" },
      { value: "soft", label: "Soft" },
    ],
  },
  {
    key: "elevation",
    label: "Elevation",
    options: [
      { value: "flat", label: "Flat" },
      { value: "", label: "Default", hint: "current" },
      { value: "heavy", label: "Heavy" },
    ],
  },
  {
    key: "density",
    label: "Density",
    options: [
      { value: "tight", label: "Tight" },
      { value: "", label: "Default", hint: "current" },
      { value: "airy", label: "Airy" },
    ],
  },
];

/* The alternate faces are fetched at runtime rather than through next/font, so
   a production build carries no trace of them. Dev only, and injected once. */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap";

const STORAGE_KEY = "nsw-design-lab";
const EMPTY = { palette: "", type: "", radius: "", elevation: "", density: "" };

export default function DesignLab() {
  const [choice, setChoice] = useState(EMPTY);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore on mount rather than during render, so the server and the first
  // client paint agree and React does not report a hydration mismatch.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setChoice({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      // A corrupt or unavailable store is not worth failing over — the lab
      // simply opens on the defaults.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    for (const [key, value] of Object.entries(choice)) {
      if (value) root.setAttribute(`data-${key}`, value);
      else root.removeAttribute(`data-${key}`);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
    } catch {
      // Persistence is a convenience; losing it does not break the panel.
    }
  }, [choice, ready]);

  // Pull the candidate faces in the first time one is actually asked for, so
  // the default view costs nothing.
  useEffect(() => {
    if (!choice.type) return;
    if (document.getElementById("design-lab-fonts")) return;
    const link = document.createElement("link");
    link.id = "design-lab-fonts";
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, [choice.type]);

  const set = (key, value) => setChoice((prev) => ({ ...prev, [key]: value }));

  if (!open) {
    return (
      <button
        className="fixed bottom-4 right-4 z-[95] inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm font-medium shadow-float"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span
          className="h-3 w-3 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, var(--grad-from), var(--grad-to))",
          }}
          aria-hidden="true"
        />
        Design lab
      </button>
    );
  }

  return (
    <aside className="fixed bottom-4 right-4 z-[95] max-h-[calc(100vh-2rem)] w-[19rem] overflow-y-auto rounded-token-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-float">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Design lab</h2>
        <div className="flex items-center gap-1">
          <button
            className="rounded-token-sm px-2 py-1 text-xs text-faint hover:bg-[color:var(--bg-subtle)]"
            onClick={() => setChoice(EMPTY)}
            type="button"
          >
            Reset
          </button>
          <button
            className="rounded-token-sm px-2 py-1 text-xs text-faint hover:bg-[color:var(--bg-subtle)]"
            onClick={() => setOpen(false)}
            type="button"
          >
            Hide
          </button>
        </div>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-faint">
        Dev only — never renders in production. Pick a direction and it gets
        baked into <code>:root</code>, then this comes out.
      </p>

      {AXES.map((axis) => (
        <fieldset className="mt-4" key={axis.key}>
          <legend className="text-xs font-semibold text-faint">
            {axis.label}
          </legend>
          <div className="mt-2 grid gap-1.5">
            {axis.options.map((option) => {
              const active = choice[axis.key] === option.value;
              return (
                <button
                  className={`flex items-center justify-between rounded-token-sm border px-2.5 py-1.5 text-left text-[0.8125rem] transition ${
                    active
                      ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] font-medium text-[color:var(--brand-text)]"
                      : "border-[color:var(--border)] hover:bg-[color:var(--bg-subtle)]"
                  }`}
                  key={option.label}
                  onClick={() => set(axis.key, option.value)}
                  type="button"
                >
                  {option.label}
                  {option.hint && (
                    <span className="text-[0.6875rem] text-faint">
                      {option.hint}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </aside>
  );
}
