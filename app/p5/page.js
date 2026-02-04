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

const hashPrefix = "n3ur45ens3X";

export default function P5HomePage() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = "P5 • Home (Alt)";
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCounter((prev) => (prev + 1) % 100000);
    }, 10);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="p5v2-root">
      <section className="p5v2-hero">
        <div className="p5v2-glow p5v2-glow-a" />
        <div className="p5v2-glow p5v2-glow-b" />
        <header className="p5v2-header">
          <div className="p5v2-brand">
            <Image className="grayscale" src="/logo.svg" alt="Neurasense" width={24} height={24} />
            <span>Neurasense • P5</span>
          </div>
          <nav className="p5v2-nav">
            <a href="#p5v2-capabilities">Capabilities</a>
            <a href="/products">Products</a>
            <a href="#p5v2-contact">Contact</a>
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

      <section className="p5v2-band" id="p5v2-capabilities">
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

      <section className="p5v2-cta-block" id="p5v2-contact">
        <p className="p5v2-eyebrow">Let’s build</p>
        <h2>Tell us what you want to ship next.</h2>
        <p>
          Share your vision and we will craft a roadmap that balances speed,
          security, and measurable outcomes.
        </p>
        <button className="p5v2-primary">Schedule a call</button>
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
