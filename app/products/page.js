"use client";

import Image from "next/image";
import { useEffect } from "react";
const products = [
  {
    name: "Vault",
    tagline: "Zero‑trust storage built around client‑side encryption.",
    description:
      "End‑to‑end encrypted file storage where plaintext never touches the server. Encrypted manifests and policy‑based access by design.",
    href: "https://vault.neurasense.io/dashboard",
    accent: "from-indigo-500/30 via-white/10 to-transparent",
  },
  {
    name: "Presence",
    tagline: "QR attendance with real‑time visibility.",
    description:
      "Fast, reliable check‑ins for teams and institutions with secure access, clean exports, and operational clarity.",
    href: "https://presence.neurasense.io/owner/login",
    accent: "from-emerald-400/30 via-white/10 to-transparent",
  },
];

export default function ProductsPage() {
  useEffect(() => {
    document.title = "P3 • Products";
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[rgb(6,7,10)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[160px]" />
        <div className="absolute right-0 top-32 h-[460px] w-[460px] rounded-full bg-indigo-500/20 blur-[160px]" />
        <div className="absolute left-1/3 bottom-0 h-[520px] w-[520px] rounded-full bg-emerald-400/15 blur-[180px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 sm:px-12">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={22} height={22} />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Neurasense • P3
            </p>
          </div>
          <a
            className="text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
            href="/#home"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-white/55">
              Products
            </p>
            <h1 className="text-balance text-4xl leading-tight sm:text-6xl">
              A focused product line for secure, modern intelligence.
            </h1>
            <p className="max-w-2xl text-base text-white/65 leading-relaxed">
              Each platform blends clean interaction design with research‑grade
              engineering. Built to feel calm, precise, and dependable.
            </p>
          </div>
          <div className="rounded-[28px] bg-white/[0.02] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Core themes
            </p>
            <div className="mt-6 grid gap-4 text-sm text-white/60">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Privacy‑first architecture</span>
                <span className="text-white/40">01</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>Secure collaboration workflows</span>
                <span className="text-white/40">02</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Operational clarity at scale</span>
                <span className="text-white/40">03</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10">
          {products.map((product) => (
            <article
              key={product.name}
              className="group relative overflow-hidden rounded-[30px] border border-white/20 bg-white/[0.02] p-8 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl transition hover:-translate-y-1.5"
            >
              <div
                className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${product.accent} blur-[120px] opacity-0 transition group-hover:opacity-100`}
              />
              <div className="relative grid gap-6 lg:grid-cols-[0.55fr_0.45fr]">
                <div>
                  <h2 className="mt-4 text-3xl">{product.name}</h2>
                  <p className="mt-3 text-sm text-white/70">{product.tagline}</p>
                </div>
                <div>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {product.description}
                  </p>
                  <a
                    className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.35em] text-white/80 underline-offset-4 transition hover:text-white"
                    href={product.href}
                  >
                    Visit {product.name}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/55">
            Start a project
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            Tell us what you want to build next.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/65">
            From AI tooling to secure platforms, we help you design and ship
            products that feel refined and trustworthy from day one.
          </p>
          <a
            className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:text-white"
            href="/#contact"
          >
            Start a Project
          </a>
        </section>
      </div>
    </main>
  );
}
