/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}"],
  theme: {
    // Everything extends rather than replaces. Weight carries hierarchy in
    // this system, so the full scale stays reachable.
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // The token ladder as utilities, so a one-off does not have to reopen
      // globals.css to reach a radius or an elevation.
      borderRadius: {
        DEFAULT: "var(--radius)",
        token: "var(--radius)",
        "token-sm": "var(--radius-sm)",
        "token-md": "var(--radius-md)",
        "token-lg": "var(--radius-lg)",
        "token-xl": "var(--radius-xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        soft: "var(--shadow-sm)",
        lift: "var(--shadow-md)",
        float: "var(--shadow-lg)",
      },
      colors: {
        ink: "var(--text)",
        muted: "var(--text-muted)",
        faint: "var(--text-faint)",
        brand: "var(--brand)",
        "brand-text": "var(--brand-text)",
        "brand-soft": "var(--brand-soft)",
        surface: "var(--surface)",
        subtle: "var(--bg-subtle)",
        sunken: "var(--bg-sunken)",
        line: "var(--border)",
      },
      maxWidth: {
        shell: "80rem",
      },
    },
  },
  plugins: [],
};
