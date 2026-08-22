import { footerLinks, site } from "../data/site";
import { CookieSettingsButton } from "./CookieBanner";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.github, Icon: GitHubIcon },
];

/**
 * A single centered band: socials and legal links in one row, then the
 * tagline, then the stamped copyright line.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <div className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pb-3 pt-6">
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--border)] text-faint transition hover:text-[color:var(--fg)]"
              href={href}
              key={label}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        {footerLinks.map((link) => (
          <a className="link-faint text-sm" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
        <CookieSettingsButton />
      </div>

      <p className="shell pb-6 text-center font-mono text-xs tracking-[0.2em] text-faint">
        © {new Date().getFullYear()} n3ur45ens3
      </p>
    </footer>
  );
}
