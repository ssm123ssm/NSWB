/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}"],
  theme: {
    // The brand handoff replaced Tailwind's weight scale with two steps (300
    // and 400) so `font-semibold` could not be reached at all. That rule is
    // gone with the rest of the handoff, and weight is an open decision again,
    // so the full scale is restored — under `extend`, merging rather than
    // replacing. Whatever system lands next can narrow it again deliberately.
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
