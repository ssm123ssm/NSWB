import { Inter, JetBrains_Mono } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import { site } from "./data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

// One tagline, read from the site data, so the tab title and both link
// previews can never drift apart again.
const siteTitle = `${site.name} — ${site.tagline}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: siteTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: site.description,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
};

/**
 * Runs before first paint so a dark-theme visitor never sees a white flash.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("ns-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme =
      stored || (prefersDark ? "dark" : "light");
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetBrainsMono.variable}`}>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-[color:var(--surface)] focus:px-4 focus:py-2 focus:shadow-lg"
          href="#main"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
