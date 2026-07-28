import Link from "next/link";
import { footerLinks, site } from "../data/site";
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
      </div>

      <p className="shell pb-8 text-center text-sm text-faint">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
