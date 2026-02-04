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
  "Cryptographic hash",
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
  const [talkOpen, setTalkOpen] = useState(false);
  const [talkStatus, setTalkStatus] = useState("idle");
  const [talkError, setTalkError] = useState("");

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
            <span>Neurasense</span>
          </div>
          <nav className="p5v2-nav">
            <a href="#p7-home">Home</a>
            <a href="#p7-products">Our products</a>
            <a href="#p7-research">Research</a>
            <a
              href="#p7-contact"
              onClick={(event) => {
                event.preventDefault();
                setTalkOpen(true);
                setTalkStatus("idle");
              }}
            >
              Contact
            </a>
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
          <button
            className="float-cta mt-8 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90 shadow-[0_18px_45px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20 hover:text-white"
            type="button"
            onClick={() => {
              setTalkOpen(true);
              setTalkStatus("idle");
            }}
          >
            Let&apos;s talk
          </button>
        </div>
      </section>

      {talkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-lg rounded-[28px] border border-white/15 bg-[#0c111a] p-6 text-left text-white shadow-[0_30px_90px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                {talkStatus === "success" && (
                  <p className="text-xs uppercase tracking-[0.35em] font-semibold text-white/80">
                    Thank you
                  </p>
                )}
              </div>
              <button
                className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-white/60 hover:text-white"
                type="button"
                onClick={() => {
                  setTalkOpen(false);
                  setTalkStatus("idle");
                  setTalkError("");
                }}
              >
                Close
              </button>
            </div>
            {talkStatus === "success" ? (
              <div className="mt-6 space-y-3 text-white/80">
                <p className="text-sm">
                  We will contact you shortly.
                </p>
                <p className="text-base font-semibold text-white sm:text-lg">
                  Let&apos;s build together.
                </p>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const email = String(formData.get("email") ?? "").trim();
                  const contact = String(formData.get("contact") ?? "").trim();
                  if (!email && !contact) {
                    setTalkError("Please provide an email or contact number.");
                    return;
                  }
                  setTalkError("");
                  setTalkStatus("success");
                }}
              >
                <p className="text-sm text-white/70">
                  We&apos;d love to contact you. Share your details and we&apos;ll reach out.
                </p>
                {talkError && (
                  <p className="text-sm text-rose-200">
                    {talkError}
                  </p>
                )}
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
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Contact number
                  <input
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                    name="contact"
                    placeholder="+1 555 000 0000"
                    type="tel"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Message
                  <textarea
                    className="min-h-[120px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/50"
                    name="message"
                    placeholder="Tell us a bit about what you want to build."
                    required
                  />
                </label>
                <button
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/85 transition hover:border-white/60 hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

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

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-6 sm:gap-6">
          <a
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 hover:text-white"
            href="#"
            aria-label="GitHub (coming soon)"
            title="GitHub (coming soon)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path d="M12 .5C5.73.5.75 5.6.75 12c0 5.2 3.44 9.61 8.2 11.18.6.11.82-.26.82-.59 0-.29-.01-1.05-.02-2.06-3.34.75-4.04-1.66-4.04-1.66-.55-1.43-1.35-1.81-1.35-1.81-1.1-.78.08-.77.08-.77 1.22.09 1.86 1.27 1.86 1.27 1.08 1.9 2.83 1.35 3.52 1.03.11-.8.42-1.35.76-1.66-2.67-.31-5.48-1.37-5.48-6.1 0-1.35.46-2.46 1.22-3.33-.12-.31-.53-1.58.12-3.28 0 0 1-.33 3.3 1.27a11.13 11.13 0 0 1 3-.42c1.02 0 2.05.14 3 .42 2.3-1.6 3.3-1.27 3.3-1.27.65 1.7.24 2.97.12 3.28.76.87 1.22 1.98 1.22 3.33 0 4.74-2.82 5.78-5.5 6.08.43.38.81 1.13.81 2.28 0 1.65-.02 2.98-.02 3.38 0 .33.22.71.83.59A11.75 11.75 0 0 0 23.25 12C23.25 5.6 18.27.5 12 .5z" />
            </svg>
          </a>
          <a
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 hover:text-white"
            href="https://www.linkedin.com/company/neurasns/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.48 1c1.4 0 2.5 1.12 2.5 2.5zM0 23.5h5V7.98H0V23.5zM7.5 7.98H12v2.13h.06c.63-1.2 2.18-2.47 4.49-2.47 4.8 0 5.69 3.16 5.69 7.27v8.59h-5v-7.61c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.99-2.93 4.03v7.74h-5V7.98z" />
            </svg>
          </a>
          <a
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 hover:text-white"
            href="#"
            aria-label="Instagram (coming soon)"
            title="Instagram (coming soon)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.75 1.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z" />
            </svg>
          </a>
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          © 2026 Neurasense. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
