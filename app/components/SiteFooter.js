import Image from "next/image";
import Link from "next/link";
import { navLinks, products, site } from "../data/site";
import { LinkedInIcon } from "./Icons";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link className="flex items-center gap-2.5" href="/">
            <Image src="/logo.svg" alt="" width={24} height={24} />
            <span className="text-[0.95rem] font-semibold tracking-tight">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Precision intelligence systems with a cryptographic spine.
          </p>
          <a
            className="link-muted mt-4 inline-flex items-center gap-2"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="link-muted" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">
            Products
          </h2>
          <ul className="mt-4 space-y-2.5">
            {products.map((product) => (
              <li key={product.slug}>
                {product.detail ? (
                  <Link className="link-muted" href={product.detail}>
                    {product.name}
                  </Link>
                ) : product.app ? (
                  <a
                    className="link-muted"
                    href={product.app}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {product.name}
                  </a>
                ) : (
                  <Link className="link-muted" href="/products">
                    {product.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-faint">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
