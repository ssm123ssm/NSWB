"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    name: "Vault",
    tagline: "Zero‑trust storage built around client‑side encryption.",
    description:
      "End‑to‑end encrypted file storage where plaintext never touches the server. Encrypted manifests and policy‑based access by design.",
    href: "https://vault.neurasense.io/dashboard",
    accent: "from-indigo-500/30 via-white/10 to-transparent",
    featured: true,
    infoHref: "/vault",
  },
  {
    name: "Presence",
    tagline: "QR attendance with real‑time visibility.",
    description:
      "Fast, reliable check‑ins for teams and institutions with secure access, clean exports, and operational clarity.",
    href: "https://presence.neurasense.io/owner/login",
    accent: "from-emerald-400/30 via-white/10 to-transparent",
  },
  {
    name: "Lipd Hub",
    tagline: "Lipid management for insight, referral, and research.",
    description:
      "A lipid management system that helps identify important patterns in lipid metabolism, streamlines the referral system, and facilitates research.",
    href: "#",
    accent: "from-rose-400/30 via-white/10 to-transparent",
  },
  {
    name: "AES",
    tagline: "Automated AI‑based essay scoring system.",
    description:
      "An automated, AI‑based essay scoring system designed for fast, consistent evaluation and feedback.",
    href: "#",
    accent: "from-amber-400/30 via-white/10 to-transparent",
  },
];

export default function P7Combined() {
  const router = useRouter();
  const vaultTarget = "ENCRYPTED COLLABORATING";
  const vaultFinal = "ENCRYPT3D C0LLABORAT1NG";
  const [counter, setCounter] = useState(0);
  const [accessProduct, setAccessProduct] = useState(null);
  const [accessStatus, setAccessStatus] = useState("idle");
  const [talkOpen, setTalkOpen] = useState(false);
  const [talkStatus, setTalkStatus] = useState("idle");
  const [talkError, setTalkError] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [infoProduct, setInfoProduct] = useState(null);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultPhase, setVaultPhase] = useState("hash");
  const [vaultHash, setVaultHash] = useState("");
  const landingRef = useRef(null);
  const networkRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const vaultTimerRef = useRef(null);
  const vaultPhaseTimerRef = useRef(null);
  const vaultHashIntervalRef = useRef(null);
  const vaultHashStartRef = useRef(null);

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

  useEffect(() => {
    const container = landingRef.current;
    const canvas = networkRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let particles = [];
    let running = true;
    const mouse = { x: 0, y: 0, active: false };
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeParticles = () => {
      const target = Math.max(42, Math.min(140, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 1 + Math.random() * 1.8,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(160, 214, 255, 0.75)";
      context.strokeStyle = "rgba(160, 214, 255, 0.25)";

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        if (mouse.active) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 160) {
            const pull = (1 - distance / 160) * 0.015;
            particle.vx += dx * pull * 0.002;
            particle.vy += dy * pull * 0.002;
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const neighbor = particles[j];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 140) continue;
          const alpha = 0.3 * (1 - dist / 140);
          context.strokeStyle = `rgba(160, 214, 255, ${alpha})`;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.stroke();
        }
      }

      if (mouse.active) {
        for (const particle of particles) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 180) continue;
          const alpha = 0.28 * (1 - dist / 180);
          context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(mouse.x, mouse.y);
          context.stroke();
        }
      }
    };

    const animate = () => {
      if (!running) return;
      draw();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const updateMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const clearMouse = () => {
      mouse.active = false;
    };

    const handleMotionPreference = () => {
      running = !mediaQuery.matches;
      if (running) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        window.cancelAnimationFrame(animationFrame);
        draw();
      }
    };

    const handleResize = () => {
      resize();
      makeParticles();
      if (!running) draw();
    };

    resize();
    makeParticles();
    handleMotionPreference();

    container.addEventListener("pointermove", updateMouse);
    container.addEventListener("pointerdown", updateMouse);
    container.addEventListener("pointerleave", clearMouse);
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      running = false;
      window.cancelAnimationFrame(animationFrame);
      container.removeEventListener("pointermove", updateMouse);
      container.removeEventListener("pointerdown", updateMouse);
      container.removeEventListener("pointerleave", clearMouse);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
      if (vaultTimerRef.current) {
        window.clearTimeout(vaultTimerRef.current);
      }
      if (vaultPhaseTimerRef.current) {
        window.clearTimeout(vaultPhaseTimerRef.current);
      }
      if (vaultHashIntervalRef.current) {
        window.clearInterval(vaultHashIntervalRef.current);
      }
      if (vaultHashStartRef.current) {
        window.clearTimeout(vaultHashStartRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!vaultOpen) return;
    setVaultPhase("hash");
    setVaultHash("");
    if (vaultHashIntervalRef.current) {
      window.clearInterval(vaultHashIntervalRef.current);
    }
    if (vaultHashStartRef.current) {
      window.clearTimeout(vaultHashStartRef.current);
    }
    const target = vaultTarget;
    const jitter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+-=";
    const revealInterval = 100;
    const startDelay = 0;
    const holdFinal = 2000;
    vaultHashStartRef.current = window.setTimeout(() => {
      vaultHashIntervalRef.current = window.setInterval(() => {
        const chars = target.split("").map((char) => {
          if (char === " ") return " ";
          return jitter[Math.floor(Math.random() * jitter.length)];
        });
        setVaultHash(chars.join(""));
      }, revealInterval);
    }, startDelay);
    if (vaultPhaseTimerRef.current) {
      window.clearTimeout(vaultPhaseTimerRef.current);
    }
    const totalRun = 1500;
    vaultPhaseTimerRef.current = window.setTimeout(() => {
      setVaultPhase("final");
      setVaultHash(vaultFinal);
      if (vaultHashIntervalRef.current) {
        window.clearInterval(vaultHashIntervalRef.current);
        vaultHashIntervalRef.current = null;
      }
    }, totalRun);
    if (vaultTimerRef.current) {
      window.clearTimeout(vaultTimerRef.current);
    }
    vaultTimerRef.current = window.setTimeout(() => {
      setVaultOpen(false);
      router.push("/vault");
    }, totalRun + holdFinal);
    return () => {
      if (vaultTimerRef.current) {
        window.clearTimeout(vaultTimerRef.current);
      }
      if (vaultPhaseTimerRef.current) {
        window.clearTimeout(vaultPhaseTimerRef.current);
      }
      if (vaultHashIntervalRef.current) {
        window.clearInterval(vaultHashIntervalRef.current);
      }
      if (vaultHashStartRef.current) {
        window.clearTimeout(vaultHashStartRef.current);
      }
    };
  }, [router, vaultOpen]);

  return (
    <main className="scroll-smooth">
      <section className="landing-page onepage-section" id="p7-landing" ref={landingRef}>
        <div className="landing-bg" />
        <canvas className="landing-network" ref={networkRef} aria-hidden="true" />
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
      </section>

      <section className="p5v2-hero onepage-section" id="p7-home">
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
          <div className="p5v2-panel p5v2-panel-split surface-card">
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

      <section className="p5v2-band onepage-section">
        <div className="p5v2-band-inner">
          <h2>Capabilities</h2>
          <p>
            A focused set of disciplines built for secure, scalable intelligence.
            Every engagement balances research depth with operational delivery.
          </p>
        </div>
        <div className="p5v2-bands">
          {capabilityBands.map((band) => (
            <div key={band.title} className="p5v2-card surface-card">
              <h3>{band.title}</h3>
              <p>{band.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p5v2-insight onepage-section">
        <div className="p5v2-insight-card surface-card">
          <p className="p5v2-insight-label">Neurasense Principle</p>
          <h3>Make the complex feel inevitable.</h3>
          <p>
            Our systems are built to be trusted by design—clear in behavior,
            secure in data handling, and refined in experience.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden p7-products onepage-section" id="p7-products">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 sm:px-12">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.45em] text-white/55">
                Our products
              </p>
              <h1 className="text-balance text-3xl leading-tight sm:text-5xl">
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
                className={`group relative overflow-hidden rounded-[30px] p-8 transition hover:-translate-y-1.5 surface-card ${
                  product.featured ? "product-featured" : ""
                }`}
                onMouseEnter={() => {
                  if (hoverTimerRef.current) {
                    window.clearTimeout(hoverTimerRef.current);
                  }
                  setHoveredProduct(null);
                  hoverTimerRef.current = window.setTimeout(() => {
                    setHoveredProduct(product.name);
                  }, 2000);
                }}
                onMouseLeave={() => {
                  if (hoverTimerRef.current) {
                    window.clearTimeout(hoverTimerRef.current);
                  }
                  setHoveredProduct(null);
                }}
              >
                <div
                  className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${product.accent} blur-[120px] opacity-0 transition group-hover:opacity-100`}
                />
                {product.featured && (
                  <div className="product-featured-pill">
                    Featured
                  </div>
                )}
                <div className="relative grid gap-6 lg:grid-cols-[0.55fr_0.45fr]">
                  <div>
                    <h2
                      className={`mt-4 text-3xl ${
                        product.featured ? "mt-10" : ""
                      }`}
                    >
                      {product.name}
                    </h2>
                    <p className="mt-3 text-sm text-white/70">
                      {product.tagline}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="product-intent">
                      <button
                        className={`product-more ${
                          hoveredProduct === product.name ? "product-more--show" : ""
                        }`}
                        type="button"
                        onClick={() => setInfoProduct(product.name)}
                      >
                        More info
                      </button>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {product.infoHref &&
                        (product.name === "Vault" ? (
                          <button
                            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90 shadow-[0_10px_30px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/25 hover:text-white"
                            type="button"
                            onClick={() => setVaultOpen(true)}
                          >
                            Explore {product.name}
                          </button>
                        ) : (
                          <a
                            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/90 shadow-[0_10px_30px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/25 hover:text-white"
                            href={product.infoHref}
                          >
                            Explore {product.name}
                          </a>
                        ))}
                      {!product.featured && (
                        <button
                          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/85 transition hover:border-white/60 hover:bg-white/20 hover:text-white"
                          type="button"
                          onClick={() => setAccessProduct(product.name)}
                        >
                          Request access for {product.name}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>

      <section className="p5v2-insight onepage-section" id="p7-contact">
        <div className="p5v2-insight-card surface-card">
          <p className="p5v2-insight-label">Start a project</p>
          <h3>Tell us what you&apos;d like to build.</h3>
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
            Start a project
          </button>
        </div>
      </section>

      {talkOpen && (
        <div className="popup-overlay fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="talk-modal popup-card surface-card w-full max-w-lg rounded-[28px] p-6 text-left text-white sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                {talkStatus === "success" && (
                  <p className="text-xs uppercase tracking-[0.35em] font-semibold text-white/80">
                    Thank you
                  </p>
                )}
              </div>
              <button
                className="popup-close"
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
                <p className="popup-body">
                  We will contact you shortly.
                </p>
                <p className="popup-heading">
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
                <p className="popup-body">
                  We&apos;d love to contact you. Share your details and we&apos;ll reach out.
                </p>
                {talkError && (
                  <p className="popup-body text-rose-200">
                    {talkError}
                  </p>
                )}
                <label className="popup-label">
                  Name
                  <input
                    className="popup-input"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    required
                  />
                </label>
                <label className="popup-label">
                  Email
                  <input
                    className="popup-input"
                    name="email"
                    placeholder="you@company.com"
                    type="email"
                  />
                </label>
                <label className="popup-label">
                  Contact number
                  <input
                    className="popup-input"
                    name="contact"
                    placeholder="+1 555 000 0000"
                    type="tel"
                  />
                </label>
                <label className="popup-label">
                  Message
                  <textarea
                    className="popup-input popup-textarea"
                    name="message"
                    placeholder="Tell us a bit about what you want to build."
                    required
                  />
                </label>
                <button
                  className="popup-submit"
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
        <div className="popup-overlay fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="talk-modal popup-card surface-card w-full max-w-lg rounded-[28px] p-6 text-left text-white sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Request access
                </p>
                <h3 className="popup-heading">
                  {accessProduct}
                </h3>
              </div>
              <button
                className="popup-close"
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
              <p className="popup-body mt-6">
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
                <label className="popup-label">
                  Name
                  <input
                    className="popup-input"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    required
                  />
                </label>
                <label className="popup-label">
                  Email
                  <input
                    className="popup-input"
                    name="email"
                    placeholder="you@company.com"
                    type="email"
                  required
                />
              </label>
              <button
                className="popup-submit"
                type="submit"
              >
                Send request
              </button>
            </form>
          )}
          </div>
        </div>
      )}

      {infoProduct && (
        <div className="popup-overlay fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="talk-modal popup-card surface-card w-full max-w-lg rounded-[28px] p-6 text-left text-white sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                  More info
                </p>
                <h3 className="popup-heading">
                  {infoProduct}
                </h3>
              </div>
              <button
                className="popup-close"
                type="button"
                onClick={() => setInfoProduct(null)}
              >
                Close
              </button>
            </div>
            <p className="popup-body mt-6">
              Share your interest in {infoProduct}, and we&apos;ll send detailed
              documentation, onboarding steps, and timelines tailored to your team.
            </p>
            <button
              className="popup-submit mt-6"
              type="button"
              onClick={() => {
                setInfoProduct(null);
                setAccessProduct(infoProduct);
              }}
            >
              Request access
            </button>
          </div>
        </div>
      )}

      {vaultOpen && (
        <div
          className="popup-overlay fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={() => setVaultOpen(false)}
        >
          <div
            className="vault-modal popup-card surface-card w-full max-w-lg rounded-[28px] p-8 text-center text-white sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="vault-holo">
              <div className="vault-title">Vault</div>
            </div>
            <div className="vault-stream">
              <span className="vault-hash p5v2-panel-code" aria-hidden="true">
                {(vaultPhase === "hash" ? vaultHash : vaultFinal)
                  .split("")
                  .map((char, index) => (
                    <span
                      className={char === " " ? "vault-space" : "vault-glyph"}
                      key={`${char}-${index}`}
                      style={{ "--glyph-delay": `${index * 45}ms` }}
                    >
                      {char === " " ? (
                        "\u00A0"
                      ) : (
                        <>
                          <span className="vault-glyph-trail">{char}</span>
                          <span className="vault-glyph-main">{char}</span>
                        </>
                      )}
                    </span>
                  ))}
              </span>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 py-10 onepage-section">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-6 sm:gap-6">
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
        </div>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          © 2026 Neurasense. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
