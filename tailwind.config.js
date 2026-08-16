/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}"],
  // Themes are driven by data-theme on <html>, set before paint in app/layout.js.
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    // Declared here rather than under `extend` so it replaces Tailwind's scale
    // instead of merging with it: the brand runs on two weights, and this is
    // what stops `font-semibold` from being reachable at all. A stale one in a
    // template generates no CSS rather than quietly breaking rule 1.
    fontWeight: {
      light: "300",
      normal: "400",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
