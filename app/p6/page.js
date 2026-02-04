"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const capabilityBands = [
  {
    title: "Neural Systems",
    description:
      "Applied AI and retrieval pipelines engineered for reliability, speed, and clarity under real-world constraints.",
  },
  {
    title: "Cryptographic R&D",
    description:
      "Privacy-preserving computation, verifiable storage, and data sovereignty built into every architecture.",
  },
  {
    title: "Software Platforms",
    description:
      "Resilient, production-ready systems with observability, automation, and rigorous security posture.",
  },
];

const signals = [
  "Zero-trust storage",
  "Private inference layers",
  "Agentic workflow design",
  "Enterprise deployment",
];

const products = [
  {
    name: "Preview",
    tagline: "Private Git previews with controlled access.",
    description:
      "Share rendered files inside private repositories with collaborators. Built with Next.js + Clerk for fast, secure review workflows.",
    href: "https://preview.neurasense.io/",
    accent: "from-cyan-400/30 via-white/10 to-transparent",
  },
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

export default function P6Site() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = "P6 • New Site";
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCounter((prev) => (prev + 1) % 100000);
    }, 10);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="p6-root">
      <section className="p5v2-hero" id="p6-home">
        <div className="p5v2-glow p5v2-glow-a" />
        <div className="p5v2-glow p5v2-glow-b" />
        <header className="p5v2-header">
          <div className="p5v2-brand">
            <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={24} height={24} />
            <span>Neurasense • P6</span>
          </div>
          <nav className="p5v2-nav">
            <a href="#p6-home">Home</a>
            <a href="#p6-products">Products</a>
            <a href="#p6-contact">Contact</a>
          </nav>
        </header>

        <div className="p5v2-hero-grid">
          <div className="p5v2-copy">
            <p className="p5v2-eyebrow">we make</p>
            <h1>
              Precision intelligence systems with a cryptographic spine.
            </h1>
            <p>
              Neurasense designs AI, data science, and secure software for teams
              who need high-confidence outcomes. We turn deep research into calm,
              elegant, production-grade experiences.
            </p>
            <div className="p5v2-cta">
              <button className="p5v2-primary">Start a project</button>
              <button className="p5v2-ghost">View research</button>
            </div>
          </div>
          <div className="p5v2-panel p5v2-panel-split">
            <div className="p5v2-panel-left">
              <p className="p5v2-panel-label">Signal Stack</p>
              <div className="p5v2-panel-list">
                {signals.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="p5v2-panel-right">
              <p className="p5v2-panel-code">
                n3ur45ens3X
                {String(counter).padStart(5, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="p5v2-band">
        <div className="p5v2-band-inner">
          <h2>Capabilities</h2>
          <p>
            A focused set of disciplines built for secure, scalable intelligence.
            Every engagement balances research depth with operational delivery.
          </p>
        </div>
        <div className="p5v2-bands">
          {capabilityBands.map((band) => (
            <div key={band.title} className="p5v2-card">
              <h3>{band.title}</h3>
              <p>{band.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p5v2-insight">
        <div className="p5v2-insight-card">
          <p className="p5v2-insight-label">Neurasense Principle</p>
          <h3>Make the complex feel inevitable.</h3>
          <p>
            Our systems are built to be trusted by design—clear in behavior,
            secure in data handling, and refined in experience.
          </p>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" id="p6-products">
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

      <section className="text-center" id="p6-contact">
        <h2>Let’s build</h2>
      </section>

      <div className="social-row" aria-label="Social links">
        <a
          className="social-icon"
          href="https://www.linkedin.com/company/neurasns/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.08.88 1.97 1.98 1.97h.02c1.1 0 1.98-.89 1.98-1.97C6.98 4.38 6.1 3.5 4.98 3.5zM3.5 20.5h3V8.5h-3v12zM9.5 8.5v12h3v-6.6c0-3.69 4.5-3.99 4.5 0v6.6h3v-7.6c0-6.06-6.5-5.83-7.5-2.85V8.5h-3z" />
          </svg>
        </a>
        <a
          className="social-icon"
          href="#"
          data-instagram-link="TODO"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.5 3.5h9A4 4 0 0 1 20.5 7.5v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4zm0 2A2 2 0 0 0 5.5 7.5v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-9zm4.5 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.25-2.65a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
