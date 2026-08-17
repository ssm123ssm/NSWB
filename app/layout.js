import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import { site } from "./data/site";
import "./globals.css";

// Only the two weights the brand allows. Loading more would just be inviting
// someone to reach for a bold the system does not have.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafd" },
    { media: "(prefers-color-scheme: dark)", color: "#080d19" },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${plexMono.variable}`}>
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
