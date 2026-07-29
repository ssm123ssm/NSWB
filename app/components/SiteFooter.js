import Link from "next/link";
import { footerLinks, site } from "../data/site";
import { CookieSettingsButton } from "./CookieBanner";
import HashMark from "./HashMark";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.github, Icon: GitHubIcon },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <div className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pb-5 pt-8">
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
          <Link className="link-faint" href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}

        {/* Sits in the same row as the links because it does the same job —
            it is a button only because it reopens the banner in place. */}
        <CookieSettingsButton />
      </div>

      <p className="shell pb-8 text-center text-sm text-faint">
        © {new Date().getFullYear()}{" "}
        {/* The visible name morphs into a digest; screen readers get the real one. */}
        <span className="sr-only">{site.name}</span>
        <HashMark />
      </p>
    </footer>
  );
}
