export const site = {
  name: "Neurasense",
  description:
    "Neurasense designs AI, data science, and secure software for teams who need high-confidence outcomes.",
  url: "https://neurasense.io",
  linkedin: "https://www.linkedin.com/company/neurasns/?viewAsMember=true",
  github: "https://github.com/neurasense",
};

export const navLinks = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Products", href: "/#products" },
  { label: "Approach", href: "/#approach" },
];

/** The single inline row of footer links. */
export const footerLinks = [
  { label: "Company", href: "/#approach" },
  { label: "Research", href: "/#capabilities" },
  { label: "Contact", href: "/#contact" },
];

export const capabilities = [
  {
    id: "neural",
    title: "Neural Systems",
    description:
      "Applied AI and retrieval pipelines engineered for reliability, speed, and clarity under real-world constraints.",
    icon: "neural",
  },
  {
    id: "crypto",
    title: "Cryptographic R&D",
    description:
      "Privacy-preserving computation, verifiable storage, and data sovereignty built into every architecture.",
    icon: "lock",
  },
  {
    id: "platforms",
    title: "Software Platforms",
    description:
      "Resilient, production-ready systems with observability, automation, and rigorous security posture.",
    icon: "layers",
  },
];

/**
 * The one place product facts live. Home, /products and the Vault page all
 * read from here, so copy can never drift between them again.
 *
 * status: "live"        — shipped and running today
 *         "development" — real, not yet finished
 *
 * access: "public"  — anyone can open it at the URL (the default when omitted)
 *         "request" — proprietary; shipped, but only reachable once we grant
 *                     access, so it leads with Request access and carries no
 *                     public link.
 *
 * featured: the single product we lead with. Drives the emphasis in the hero
 * strip, so keep it on exactly one entry.
 *
 * wordmark: [head, tail] — the name set as a lockup instead of plain text, with
 * the tail in the product accent. Rendered by <ProductName>; `name` stays the
 * canonical spoken/written form.
 *
 * wordmarkScope: "all"  — settled, so the lockup replaces the name everywhere
 *                "hero" — on trial; the lockup shows in the hero strip only and
 *                         every other surface keeps the plain name (default)
 */
export const products = [
  {
    slug: "nsqr",
    motif: "qr",
    name: "NSQR",
    wordmark: ["ns", "qr"],
    wordmarkScope: "all",
    tagline: "QR codes you can edit, track, and brand.",
    description:
      "Dynamic QR codes whose destination stays editable after printing, with scan analytics by time, location, and device — plus branded design control across seven content types.",
    discipline: "Software Platforms",
    status: "live",
    featured: true,
    accent: "violet",
    app: "https://nsqr.neurasense.io/",
    highlights: [
      "Editable after printing",
      "Scan analytics",
      "Seven content types",
    ],
  },
  {
    slug: "vault",
    motif: "vault",
    name: "Vault",
    wordmark: ["va", "ult"],
    tagline: "Zero-trust storage built around client-side encryption.",
    description:
      "End-to-end encrypted file storage where plaintext never touches the server. Encrypted manifests and policy-based access by design.",
    discipline: "Cryptographic R&D",
    status: "live",
    accent: "cyan",
    detail: "/vault",
    app: "https://vault.neurasense.io/dashboard",
    highlights: [
      "Client-side encryption",
      "Encrypted manifests",
      "Policy-based access",
    ],
  },
  {
    slug: "presence",
    motif: "checkin",
    name: "Presence",
    wordmark: ["pre", "sence"],
    tagline: "QR attendance with real-time visibility.",
    description:
      "Fast, reliable check-ins for teams and institutions with secure access, clean exports, and operational clarity.",
    discipline: "Software Platforms",
    status: "live",
    accent: "emerald",
    app: "https://presence.neurasense.io/owner/login",
    highlights: ["Real-time check-ins", "Secure access", "Clean exports"],
  },
  {
    slug: "lipd-hub",
    motif: "lipid",
    name: "Lipd Hub",
    wordmark: ["lipd ", "hub"],
    tagline: "Lipid management for insight, referral, and research.",
    description:
      "A lipid management system that helps identify important patterns in lipid metabolism, streamlines the referral system, and facilitates research.",
    discipline: "Neural Systems",
    status: "live",
    access: "request",
    accent: "amber",
    highlights: ["Pattern detection", "Referral workflow", "Research-ready data"],
  },
  {
    slug: "aes",
    motif: "score",
    name: "AES",
    wordmark: ["a", "es"],
    tagline: "Automated AI-based essay scoring.",
    description:
      "An automated, AI-based essay scoring system designed for fast, consistent evaluation and feedback at scale.",
    discipline: "Neural Systems",
    status: "live",
    access: "request",
    accent: "blue",
    highlights: ["Consistent scoring", "Fast turnaround", "Actionable feedback"],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

/**
 * Products reach the contact dialog by their canonical `name`, which is all the
 * dialog is given. This resolves that back to the full entry so the dialog can
 * wear the product's accent and word its copy correctly. Returns undefined for
 * a general enquiry, which keeps the house accent.
 */
export function getProductByName(name) {
  return products.find((p) => p.name === name);
}

export const principles = [
  {
    label: "01",
    title: "Privacy-first architecture",
    description:
      "Data protection is a design constraint from the first diagram, not a layer added before launch.",
  },
  {
    label: "02",
    title: "Secure collaboration",
    description:
      "Shared workflows that stay verifiable end to end, so trust does not depend on the network.",
  },
  {
    label: "03",
    title: "Operational clarity",
    description:
      "Systems that stay legible and predictable at scale — for the people who run them, not just build them.",
  },
];

/* ---------------------------------------------------------------- Vault -- */

export const vaultCapabilities = [
  {
    title: "Encrypted File Sharing",
    description:
      "Share files with end-to-end encryption so only authorized recipients can read the content.",
    whoFor:
      "Teams handling confidential files across legal, finance, operations, and client delivery.",
  },
  {
    title: "Private Data Snapshots",
    description:
      "Protect sensitive snapshots and collaborate on intermediate research outputs with controlled visibility.",
    whoFor:
      "Research labs, principal investigators, and collaborators sharing intermediate experiment results.",
  },
  {
    title: "Encrypted Remote Repositories",
    description:
      "Encrypt and share remote repositories while preserving traceability and confidentiality across teams.",
    whoFor:
      "Distributed engineering teams building sensitive codebases and internal security tooling.",
  },
  {
    title: "Synced Local Directories",
    description:
      "Sync local encrypted directories across devices without exposing plaintext in transit or at rest.",
    whoFor:
      "Researchers and hybrid teams who work locally first and need secure multi-device continuity.",
  },
  {
    title: "Hosted App Access Control",
    description:
      "Apply fine-grained access control for hosted web applications with policy-based permissions.",
    whoFor:
      "Platform admins and product owners managing role-based access for internal or external users.",
  },
];

export const vaultAudiences = [
  {
    audience: "Research Labs & Investigators",
    capabilities: [
      "Private Data Snapshots",
      "Synced Local Directories",
      "Encrypted File Sharing",
    ],
  },
  {
    audience: "Engineering & Development Teams",
    capabilities: [
      "Encrypted Remote Repositories",
      "Hosted App Access Control",
      "Synced Local Directories",
    ],
  },
  {
    audience: "Operations & Governance Teams",
    capabilities: ["Encrypted File Sharing", "Hosted App Access Control"],
  },
];
