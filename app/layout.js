import { Inter, JetBrains_Mono } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import { site } from "./data/site";
import "./globals.css";

// Inter, which is what HeroUI itself sets. Weight carries hierarchy in this
// system — 700 display, 600 headings, 500 controls, 400 body — so all four
// steps are loaded and all four are used.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

// Mono is no longer a semantic marker of machine output the way the old brand
// used it. It is here for code, hashes and figures, and nothing else.
const mono = JetBrains_Mono({
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
  // Only the home page's canonical belongs here. `alternates` is inherited
  // rather than rewritten per route, so a value set in the root layout would
  // have every page declaring "/" as its canonical URL and ask search engines
  // to drop the rest of the site. Each page sets its own.
  alternates: { canonical: "/" },
};

// One theme, so one colour — matching --bg. The site has no dark mode: there
// is nothing for a (prefers-color-scheme: dark) entry here to point at, and
// declaring one would put the browser's chrome in a palette the page never
// wears.
export const viewport = {
  themeColor: "#ffffff",
};

/**
 * What the company is, in the vocabulary search engines parse rather than the
 * one people read. It is what lets a result carry the logo and the right name
 * instead of a guess assembled from the page.
 *
 * Every value is read from `site` or derived from the product data, so this
 * cannot fall out of step with the pages the way a hand-written block would.
 * `sameAs` is the identity claim — these are the profiles that are us.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  logo: `${site.url}/logo.svg`,
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${mono.variable}`}>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-token-lg focus:bg-[color:var(--surface)] focus:px-4 focus:py-2 focus:shadow-float"
          href="#main"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
