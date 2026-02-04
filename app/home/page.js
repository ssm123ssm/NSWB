"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Products", href: "/products" },
  { label: "Read", href: "#read" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "P2 • Home";
  }, []);

  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload =
      navEntry?.type === "reload" ||
      (performance.navigation && performance.navigation.type === 1);
    if (isReload) {
      window.sessionStorage.removeItem("ns_landing_seen");
      router.replace("/");
    }
  }, [router]);

  return (
    <main className="home-root">
      <section className="home hero" id="home">
        <div className="home-glow home-glow-left" />
        <div className="home-glow home-glow-right" />
        <header className="home-header">
          <div className="home-left">
            <button className="hamburger" aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
            <span className="brand">Neurasense • P2</span>
          </div>
          <nav className="home-nav">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="home-hero">
          <div className="home-copy">
            <p className="eyebrow">Research & Development</p>
            <h1>
              We build secure, intelligent systems at the edge of AI, data
              science, and software.
            </h1>
            <p className="body">
              Neurasense is a technology R&D company delivering advanced AI and
              data science solutions with a cryptographic vision. We translate
              complex research into elegant products, secure platforms, and
              measurable business outcomes.
            </p>
            <div className="cta-row">
              <button className="cta-primary">Start a project</button>
              <button className="cta-ghost">View research</button>
            </div>
          </div>
          <div className="home-panel">
            <p className="panel-title">Neurasense Signal Stack</p>
            <div className="panel-card">
              <span>Adaptive AI Models</span>
              <span>Private data intelligence workflows</span>
              <span>Secure software infrastructure</span>
              <span>Cryptographic research for trust</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-inner">
          <h2>About Neurasense</h2>
          <p>
            We are a multidisciplinary research team designing the next wave of
            intelligent systems. Our work blends foundational AI research,
            applied data science, and secure software engineering to deliver
            trustworthy solutions for modern enterprises and startups.
          </p>
        </div>
      </section>

      <section className="section" id="read">
        <div className="section-inner">
          <h2>Read</h2>
          <p>
            We publish research briefs, product notes, and technical insights on
            the future of AI and secure software. Stay informed on our latest
            discoveries and deployments.
          </p>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-inner">
          <h2>Contact</h2>
          <p>
            Tell us about your project or research idea. We will respond with a
            clear proposal, timeline, and strategy tailored to your goals.
          </p>
          <button className="cta-primary">Let{"'"}s talk</button>
        </div>
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
