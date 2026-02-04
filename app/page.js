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

export default function P7Combined() {
  const [counter, setCounter] = useState(0);
  const [accessProduct, setAccessProduct] = useState(null);
  const [accessStatus, setAccessStatus] = useState("idle");

  useEffect(() => {
    document.title = "Neurasense";
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCounter((prev) => (prev + 1) % 100000);
    }, 10);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const landing = document.getElementById("p7-landing");
    const target = document.getElementById("p7-home");
    if (!landing || !target) return;

    const goNext = () => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onWheel = (event) => {
      if (event.deltaY <= 0) return;
      const rect = landing.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom > 0;
      if (!inView) return;
      event.preventDefault();
      goNext();
    };

    const onKeyDown = (event) => {
      const keys = ["PageDown", " ", "Spacebar", "ArrowDown"];
      if (!keys.includes(event.key)) return;
      const rect = landing.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom > 0;
      if (!inView) return;
      event.preventDefault();
      goNext();
    };

    let touchStartY = null;
    const onTouchStart = (event) => {
      touchStartY = event.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (event) => {
      if (touchStartY === null) return;
      const currentY = event.touches?.[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (delta <= 12) return;
      const rect = landing.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom > 0;
      if (!inView) return;
      event.preventDefault();
      touchStartY = null;
      goNext();
    };

    landing.addEventListener("click", goNext);
    landing.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    landing.addEventListener("touchstart", onTouchStart, { passive: true });
    landing.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      landing.removeEventListener("click", goNext);
      landing.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      landing.removeEventListener("touchstart", onTouchStart);
      landing.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <main className="scroll-smooth">
      <section className="landing-page" id="p7-landing">
        <div className="landing-bg" />
        <Image
          className="landing-logo"
          src="/logo.svg"
          alt="Neurasense"
          width={520}
          height={520}
          priority
        />
        <div className="landing-content">
          <p className="landing-label">P1</p>
          <p className="landing-title">TECH REVOLUTIONIZED</p>
        </div>
        <p className="landing-subtle">scroll to discover</p>
      </section>

      <section className="p5v2-hero" id="p7-home">
        <div className="p5v2-glow p5v2-glow-a" />
        <div className="p5v2-glow p5v2-glow-b" />
        <header className="p5v2-header">
          <div className="p5v2-brand">
            <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={24} height={24} />
            <span>Neurasense • P5</span>
          </div>
          <nav className="p5v2-nav">
            <a href="#p7-home">Home</a>
            <a href="#p7-products">Our products</a>
            <a href="#p7-contact">Contact</a>
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

      <section className="relative overflow-hidden" id="p7-products">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[160px]" />
          <div className="absolute right-0 top-32 h-[460px] w-[460px] rounded-full bg-indigo-500/20 blur-[160px]" />
          <div className="absolute left-1/3 bottom-0 h-[520px] w-[520px] rounded-full bg-emerald-400/15 blur-[180px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10 sm:px-12">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.45em] text-white/55">
                Our products
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
                    <p className="mt-3 text-sm text-white/70">
                      {product.tagline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/85 transition hover:border-white/60 hover:bg-white/20 hover:text-white"
                        type="button"
                        onClick={() => setAccessProduct(product.name)}
                      >
                        Request access for {product.name}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>

      <section className="p5v2-insight" id="p7-contact">
        <div className="p5v2-insight-card">
          <p className="p5v2-insight-label">Start a project</p>
          <h3>Tell us what would you like to build?</h3>
          <p>
            Share your idea or challenge, and we will help shape it into a clear
            plan with the right tech and timeline.
          </p>
        </div>
      </section>

      {accessProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-lg rounded-[28px] border border-white/15 bg-[#0c111a] p-6 text-left text-white shadow-[0_30px_90px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Request access
                </p>
                <h3 className="mt-3 text-2xl">
                  {accessProduct}
                </h3>
              </div>
              <button
                className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-white/60 hover:text-white"
                type="button"
                onClick={() => {
                  setAccessProduct(null);
                  setAccessStatus("idle");
                }}
              >
                Close
              </button>
            </div>
            {accessStatus === "success" ? (
              <p className="mt-6 text-sm text-white/75">
                We received your request and you will be notified by email
                shortly.
              </p>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setAccessStatus("success");
                }}
              >
                <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Name
                  <input
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    required
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Email
                  <input
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                    name="email"
                    placeholder="you@company.com"
                    type="email"
                  required
                />
              </label>
              <button
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/85 transition hover:border-white/60 hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
              >
                Send request
              </button>
            </form>
          )}
          </div>
        </div>
      )}
    </main>
  );
}
