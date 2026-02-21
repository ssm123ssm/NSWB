import Image from "next/image";

const solutionTiles = [
  {
    title: "Encrypted File Sharing",
    description:
      "Share files with end-to-end encryption so only authorized recipients can read the content.",
    whoFor: "Teams handling confidential files across legal, finance, operations, and client delivery.",
  },
  {
    title: "Private Data Snapshots",
    description:
      "Protect sensitive snapshots and collaborate on intermediate research outputs with controlled visibility.",
    whoFor: "Research labs, principal investigators, and collaborators sharing intermediate experiment results.",
  },
  {
    title: "Encrypted Remote Repositories",
    description:
      "Encrypt and share remote repositories while preserving traceability and confidentiality across teams.",
    whoFor: "Distributed engineering teams building sensitive codebases and internal security tooling.",
  },
  {
    title: "Synced Local Encrypted Directories",
    description:
      "Sync local encrypted directories across devices without exposing plaintext in transit or at rest.",
    whoFor: "Researchers and hybrid teams who work locally first and need secure multi-device continuity.",
  },
  {
    title: "Hosted App Access Control",
    description:
      "Apply fine-grained access control for hosted web applications with policy-based permissions.",
    whoFor: "Platform admins and product owners managing role-based access for internal or external users.",
  },
];

export const metadata = {
  title: "Vault | Neurasense",
  description: "Vault by Neurasense: secure collaboration and encrypted workflow infrastructure.",
};

export default function VaultPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[rgb(6,7,10)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-36 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[140px]" />
        <div className="absolute right-[-80px] top-32 h-[380px] w-[380px] rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] left-1/3 h-[420px] w-[420px] rounded-full bg-sky-300/10 blur-[170px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10 sm:px-12">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={22} height={22} />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Neurasense • Vault</p>
          </div>
          <a
            className="text-xs uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
            href="/#p7-products"
          >
            Back to Products
          </a>
        </header>

        <section className="grid items-center gap-10">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-white/55">Product</p>
            <p className="max-w-lg border-l border-cyan-200/45 pl-4 text-sm uppercase tracking-[0.24em] text-cyan-100/85">
              When your work matters most, keep every byte under your control.
            </p>
            <h1 className="text-balance text-4xl leading-tight sm:text-6xl">Vault</h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70">
              Vault is a total security solution made by the Neurasense research team that brings
              trusted protection to every online workflow.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-white/65">
              Its capabilities range from simple encrypted file sharing to secure collaboration,
              repository protection, and policy-driven access for hosted applications.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-white/55">Solution</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Security capabilities in motion.</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {solutionTiles.map((tile, index) => (
              <article
                key={tile.title}
                className="group relative isolate animate-float min-h-[280px] overflow-hidden rounded-3xl border border-white/20 bg-white/[0.04] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-cyan-100/45 hover:bg-white/[0.06]"
                style={{ animationDelay: `${index * 0.6}s` }}
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br blur-[95px] transition duration-300 group-hover:opacity-100 ${
                    index % 2 === 0
                      ? "from-cyan-300/30 via-sky-200/10 to-transparent opacity-80"
                      : "from-indigo-300/25 via-cyan-200/10 to-transparent opacity-70"
                  }`}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent opacity-65" />
                <h3 className="text-2xl text-white/95">{tile.title}</h3>
                <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-white/50">Description</p>
                <p className="mt-2 text-base leading-relaxed text-white/65">{tile.description}</p>
                <div className="mt-5 rounded-2xl border border-white/12 bg-white/[0.03] p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Who is it for</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{tile.whoFor}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
