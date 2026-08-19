import Link from "next/link";
import { footerLinks, navLinks, products, site } from "../data/site";
import { CookieSettingsButton } from "./CookieBanner";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Wordmark from "./Wordmark";

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.github, Icon: GitHubIcon },
];

/**
 * A four-column footer on a sunken band: the lockup and the one-line
 * description, then products, then the site sections, then the legal surfaces.
 *
 * The product column is generated from `products` rather than listed here, so
 * adding a product to the site data puts it in the footer too.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bg-sunken)]">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={`${site.name} home`}>
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-[1.43] text-muted">
            {site.footerLine}
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-token border border-[color:var(--border)] bg-[color:var(--surface)] text-faint transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand-text)]"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Products">
          {products
            .filter((product) => product.detail)
            .map((product) => (
              <FooterLink href={product.detail} key={product.slug}>
                {product.name}
              </FooterLink>
            ))}
          <FooterLink href="/products">All products</FooterLink>
        </FooterColumn>

        <FooterColumn title="Studio">
          {navLinks.map((link) => (
            <FooterLink href={link.href} key={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Legal">
          {footerLinks.map((link) => (
            <FooterLink href={link.href} key={link.href}>
              {link.label}
            </FooterLink>
          ))}
          <li>
            {/* A button only because it reopens the banner in place; it sits
                with the links because it does the same job. */}
            <CookieSettingsButton />
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <p className="shell py-6 text-center text-sm text-faint">
          © {new Date().getFullYear()} {site.name}. {site.footerNote}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link className="link-muted text-sm" href={href}>
        {children}
      </Link>
    </li>
  );
}
