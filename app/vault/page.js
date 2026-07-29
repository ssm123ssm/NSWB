import Link from "next/link";
import { ArrowIcon, DocIcon, ExternalIcon, LockIcon } from "../components/Icons";
import ProductName from "../components/ProductName";
import RequestAccessLink from "../components/RequestAccessLink";
import { ContactButton } from "../components/SiteChrome";
import { getProduct, vaultAudiences, vaultCapabilities } from "../data/site";

const vault = getProduct("vault");

export const metadata = {
  title: "Vault — Zero-trust encrypted storage",
  description:
    "Vault is end-to-end encrypted file storage from the Neurasense research team. Plaintext never touches the server, with encrypted manifests and policy-based access by design.",
  openGraph: {
    title: "Vault — Zero-trust encrypted storage | Neurasense",
    description:
      "End-to-end encrypted storage and collaboration: encrypted file sharing, private data snapshots, encrypted repositories, synced local directories and policy-based app access.",
    type: "website",
  },
};

export default function VaultPage() {
  return (
    <main id="main" data-brand="cyan">
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-12rem] h-[26rem] w-[34rem] -translate-x-1/2 bg-[color:var(--brand)]"
          aria-hidden="true"
        />

        <div className="shell relative grid gap-12 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="brand-tag text-base">
                <ProductName product={vault} hero />
              </span>
              <span className="badge">
                <span className="dot" aria-hidden="true" />
                Live
              </span>
            </div>

            <h1 className="display mt-6 max-w-2xl text-[clamp(1.95rem,4.4vw,3.15rem)]">
              When your work matters most, keep every byte under your control.
            </h1>

            <p className="lead mt-5 max-w-xl">
              Vault is a total security solution made by the Neurasense research
              team that brings trusted protection to every online workflow.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Its capabilities range from simple encrypted file sharing to secure
              collaboration, repository protection, and policy-driven access for
              hosted applications.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row">
              <a
                className="btn btn-brand"
                href={vault.app}
                target="_blank"
                rel="noreferrer"
              >
                Open Vault
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
              <a
                className="btn btn-secondary"
                href="/preview-vault-white-paper.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <DocIcon className="h-4 w-4" />
                Read the white paper
              </a>
            </div>
          </div>

          <div className="card p-7">
            <span className="icon-tile">
              <LockIcon />
            </span>
            <h2 className="mt-5 text-lg">Zero-trust by construction</h2>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
              {vault.description}
            </p>
            <ul className="mt-6 space-y-3">
              {vault.highlights.map((highlight) => (
                <li
                  className="flex items-center justify-between border-b border-[color:var(--border)] pb-3 text-sm last:border-0 last:pb-0"
                  key={highlight}
                >
                  <span className="text-muted">{highlight}</span>
                  <span className="dot text-[color:var(--brand)]" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Capabilities */}
      <section className="section">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title mt-3">
              Five ways teams put Vault to work
            </h2>
            <p className="lead mt-4">
              One encryption model, applied across the places sensitive work
              actually lives.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vaultCapabilities.map((capability, index) => (
              <article
                className="card card-hover card-accent flex flex-col p-7"
                key={capability.title}
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg leading-snug">{capability.title}</h3>
                <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">
                  {capability.description}
                </p>
                <div className="mt-auto border-t border-[color:var(--border)] pt-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                    Who is it for
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    {capability.whoFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Audience */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Who is it for</p>
            <h2 className="section-title mt-3">
              Built for teams that cannot leak
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)]">
            {vaultAudiences.map((item, index) => (
              <div
                className={`flex flex-col gap-3 bg-[color:var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between ${
                  index > 0 ? "border-t border-[color:var(--border)]" : ""
                }`}
                key={item.audience}
              >
                <div>
                  <h3 className="text-base">{item.audience}</h3>
                  <p className="mt-1.5 text-sm text-muted">
                    {item.capabilities.join(" · ")}
                  </p>
                </div>
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-faint">
                  {item.capabilities.length} relevant{" "}
                  {item.capabilities.length === 1 ? "capability" : "capabilities"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Closing */}
      <section className="section">
        <div className="shell">
          <div className="card px-6 py-14 text-center sm:px-12">
            <h2 className="section-title">
              Put Vault behind your most sensitive work
            </h2>
            <p className="lead mx-auto mt-4 max-w-xl">
              Open the app to try it, read the white paper for the architecture,
              or talk to the team about deploying Vault for your organisation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ContactButton className="btn btn-brand" subject="Vault">
                Talk to the team
              </ContactButton>
              <a
                className="btn btn-secondary"
                href={vault.app}
                target="_blank"
                rel="noreferrer"
              >
                Open Vault
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link className="link-arrow" href="/products">
                All products
                <ArrowIcon />
              </Link>
              <RequestAccessLink
                product="Vault"
                label="Request a walkthrough"
                className="link-muted"
                withArrow={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
