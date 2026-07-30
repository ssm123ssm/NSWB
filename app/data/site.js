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
  { label: "Privacy", href: "/legal/website-privacy" },
  { label: "Legal", href: "/legal" },
];

/**
 * Policy documents. The prose lives in `content/legal/*.md` — the only content
 * on the site that is not authored here, because these are legal instruments
 * kept under their own review and edited as whole documents.
 *
 * `scope` matters: the website notice covers neurasense.io itself, while the
 * NSQR documents govern the product and say so in their own opening lines.
 *
 * Two descriptions, because they do different jobs: `note` is the one quiet
 * line under each row of the register on `/legal`, and `summary` is the page
 * metadata description, which wants to be fuller for search results.
 */
export const legalDocs = [
  {
    slug: "website-privacy",
    href: "/legal/website-privacy",
    file: "website-privacy.md",
    title: "Website Privacy Notice",
    scope: "neurasense.io",
    note: "What this site collects, and what it does not",
    summary:
      "What this site collects when you use the contact form, and the opt-in visit measurement that stays off until you allow it. One cookie, which remembers your answer. No advertising, no cross-site tracking.",
  },
  {
    slug: "privacy-policy",
    href: "/legal/nsqr/privacy-policy",
    file: "privacy-policy.md",
    product: "NSQR",
    title: "NSQR Privacy Policy",
    scope: "NSQR",
    note: "Account data, and analytics from QR code scans",
    summary:
      "How NSQR handles account information, and how scan analytics work for the people who scan a customer's QR code.",
  },
  {
    slug: "terms-of-service",
    href: "/legal/nsqr/terms-of-service",
    file: "terms-of-service.md",
    product: "NSQR",
    title: "NSQR Terms of Service",
    scope: "NSQR",
    note: "Accounts, billing, and acceptable use of QR destinations",
    summary:
      "The agreement governing use of NSQR — accounts, billing, acceptable use of QR destinations, and liability.",
  },
  {
    slug: "refund-policy",
    href: "/legal/nsqr/refund-policy",
    file: "refund-policy.md",
    product: "NSQR",
    title: "NSQR Refund Policy",
    scope: "NSQR",
    note: "The 14-day guarantee and how to claim it",
    summary:
      "The 14-day money-back guarantee, how to claim it, and what happens to your QR codes when a refund is issued.",
  },
];

/** The three NSQR documents, in the order they are listed on `/legal`. */
export const nsqrLegalDocs = legalDocs.filter((doc) => doc.product === "NSQR");

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

/* ---------------------------------------------------------------- Vault --
 *
 * Everything below is the public account of Vault, and it is deliberately a
 * plain-language one. The product's cryptographic design is a confidential
 * document: the page describes what the system does for the reader and what it
 * refuses to do, never how it is built. Nothing here should name an algorithm,
 * a parameter, a storage path, a key name or an endpoint — if a sentence would
 * help someone rebuild Vault rather than decide whether to use it, it does not
 * belong on the marketing site.
 */

export const vaultCapabilities = [
  {
    title: "Encrypted File Sharing",
    description:
      "Share files with end-to-end encryption so only authorized recipients can read the content.",
    scenario:
      "Send a due-diligence pack to outside counsel without it sitting readable in anyone's inbox or drive.",
    whoFor:
      "Teams handling confidential files across legal, finance, operations, and client delivery.",
  },
  {
    title: "Private Data Snapshots",
    description:
      "Protect sensitive snapshots and collaborate on intermediate research outputs with controlled visibility.",
    scenario:
      "Circulate an unpublished cohort dataset to three collaborators while the paper is still under review.",
    whoFor:
      "Research labs, principal investigators, and collaborators sharing intermediate experiment results.",
  },
  {
    title: "Encrypted Remote Repositories",
    description:
      "Encrypt and share remote repositories while preserving traceability and confidentiality across teams.",
    scenario:
      "Keep a security-sensitive codebase mirrored off-site without handing the source to whoever hosts it.",
    whoFor:
      "Distributed engineering teams building sensitive codebases and internal security tooling.",
  },
  {
    title: "Synced Local Directories",
    description:
      "Sync local encrypted directories across devices without exposing plaintext in transit or at rest.",
    scenario:
      "Start an analysis on the office workstation, finish it on a laptop, and never leave a readable copy in between.",
    whoFor:
      "Researchers and hybrid teams who work locally first and need secure multi-device continuity.",
  },
  {
    title: "Hosted App Access Control",
    description:
      "Apply fine-grained access control for hosted web applications with policy-based permissions.",
    scenario:
      "Give a contractor access to one project for the length of an engagement, and take it back in a click.",
    whoFor:
      "Platform admins and product owners managing role-based access for internal or external users.",
  },
];

/**
 * The hero illustration's file list. Fixed strings rather than anything
 * generated: the scene renders on the server, so random values would differ on
 * the client and trip hydration — and the ciphertext column is decorative
 * texture, not a real encryption of the name beside it.
 */
export const vaultSceneFiles = [
  { name: "board-pack-q3.pdf", size: "2.4 MB", cipher: "8f3ac1d94e0b7a2f", blob: "◼◼◼◼◼◼" },
  { name: "cohort-2026.csv", size: "18.1 MB", cipher: "b20e7c8a5f1d3906", blob: "◼◼◼◼◼◼" },
  { name: "term-sheet.docx", size: "612 KB", cipher: "5d9142fb6c0ea837", blob: "◼◼◼◼◼◼" },
  { name: "keys/rotation.md", size: "9 KB", cipher: "e7602b3d8a94c5f1", blob: "◼◼◼◼◼◼" },
];

/** The three-beat explainer: lock here, move nothing readable, open there. */
export const vaultHowItWorks = [
  {
    title: "It is locked where you are",
    description:
      "Your files are encrypted on your own device, before anything is sent. The passphrase that unlocks them is yours, and it does not travel with the file.",
  },
  {
    title: "Only the scrambled copy travels",
    description:
      "What reaches our servers and our storage is unreadable. File names, folder structure and file types are scrambled along with the contents, so even the shape of your work stays private.",
  },
  {
    title: "It opens only where you choose",
    description:
      "Unlocking happens back on a device you trust. You decide who holds a key — only you, named teammates, your whole team, or anyone with a link.",
  },
];

/**
 * The comparison that does the persuading. Read as: here is the question a
 * security review will ask, here is the ordinary answer, here is ours.
 */
export const vaultComparison = [
  {
    question: "Who can read the file contents",
    ordinary: "You, and whoever operates the service",
    vault: "Only the people you give a key to",
  },
  {
    question: "Who can see file and folder names",
    ordinary: "Visible to the provider in plain text",
    vault: "Scrambled along with the contents",
  },
  {
    question: "If the storage is breached",
    ordinary: "Attackers walk away with your documents",
    vault: "Attackers walk away with noise",
  },
  {
    question: "If a rogue employee goes looking",
    ordinary: "Access controls are the only thing stopping them",
    vault: "There is nothing readable to find",
  },
  {
    question: "If someone with legal power demands the data",
    ordinary: "The provider can hand over your files",
    vault: "We can only hand over what we hold: ciphertext",
  },
];

/**
 * The four sharing policies, described by the choice they represent rather
 * than by how the key is protected in each case.
 */
export const vaultAccessModes = [
  {
    name: "Ask me every time",
    tag: "Default",
    summary:
      "The key is never kept anywhere. Every time a project is opened, someone has to supply the passphrase. The strongest of the four, and the one Vault starts you on.",
    bestFor: "Board papers, patient data, anything you would hand-carry",
  },
  {
    name: "Remember on this device",
    tag: "Convenience",
    summary:
      "The key stays on one machine you control, so routine work does not stop to ask twice. Nothing is added to what the server knows.",
    bestFor: "Your own laptop — never a shared or borrowed machine",
  },
  {
    name: "Share with my team",
    tag: "Collaboration",
    summary:
      "Every teammate's device gets its own sealed copy of the key, which only that device can open. People can be added or removed without re-encrypting a single file.",
    bestFor: "Working groups, project teams, and long-running collaborations",
  },
  {
    name: "Anyone with the link",
    tag: "Open",
    summary:
      "A link that opens the project without an account. The most convenient and the weakest of the four, and Vault says so in the interface when you pick it.",
    bestFor: "Previews and handoffs you would be comfortable emailing",
  },
];

/** Why it is worth asking for access, as opposed to what the product is. */
export const vaultBenefits = [
  {
    title: "Nothing to trust us with",
    description:
      "Most security promises ask you to believe in a provider's staff, controls and good intentions. Vault removes the question: we cannot read what we never receive in readable form.",
  },
  {
    title: "One model, five workflows",
    description:
      "File sharing, research snapshots, repositories, synced folders and app access all sit on the same protection. One thing to learn, one thing to explain to your auditor.",
  },
  {
    title: "It keeps up on its own",
    description:
      "Protected work can be kept current straight from the pipeline your team already runs, so nothing depends on someone remembering to re-upload the latest version.",
  },
  {
    title: "Answers the security questionnaire",
    description:
      "Vault is built by the Neurasense cryptographic research team and documented in a full design paper we share with prospective customers under agreement.",
  },
  {
    title: "Onboarding from the people who built it",
    description:
      "Access comes with a walkthrough: choosing the right sharing policy per project, handling passphrases properly, and getting your first team moved across.",
  },
];

/**
 * Stated plainly and on the page, because the alternative is a customer
 * discovering it later. A protection model is only credible if it says where
 * it stops.
 */
export const vaultLimits = [
  "If your own device is compromised, encryption cannot save what is open on it.",
  "If a passphrase is stolen or shared carelessly, whoever holds it can read the project.",
  "Lose the only copy of a passphrase and the files are unrecoverable — by you, and by us.",
];

export const vaultFaqs = [
  {
    question: "Can anyone at Neurasense read my files?",
    answer:
      "No. Files are encrypted before they leave your device, and we never receive the key. What we hold is unreadable to us, and that is a property of the design rather than a promise about our staff.",
  },
  {
    question: "What happens if I lose my passphrase?",
    answer:
      "The project cannot be opened again. There is no reset link and no back door for us to use on your behalf — the same reason nobody else can open your files. Keep passphrases in a password manager, and use a policy that shares the key with your team so one person is never the single point of failure.",
  },
  {
    question: "What can you still see?",
    answer:
      "Account and billing details, that a project exists, and the ordinary operational facts of storage — roughly how much is held, and when it changed. Not the contents, not the file names, not the folder structure.",
  },
  {
    question: "Does it slow the team down?",
    answer:
      "Locking and unlocking happen on your own device, in the background, while you work. The place people notice Vault is the moment of choosing who gets a key, which is the decision you wanted to make consciously anyway.",
  },
  {
    question: "Can we host it ourselves?",
    answer:
      "Talk to us. Vault is already built so that the storage it runs against holds nothing readable, which makes the deployment conversation a short one.",
  },
  {
    question: "How do we get started?",
    answer:
      "Request access below. We will set up your first project with you, help you pick a sharing policy that matches the sensitivity of the work, and share the design documentation your security team will want to read.",
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
