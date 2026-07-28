const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function NeuralIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M12 7.6V5.5M9.7 13.4 6.4 16.7M14.3 13.4l3.3 3.3" />
      <circle cx="12" cy="11" r="3" />
      <circle cx="12" cy="4" r="1.6" />
      <circle cx="5" cy="18" r="1.6" />
      <circle cx="19" cy="18" r="1.6" />
    </svg>
  );
}

export function LockIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
    </svg>
  );
}

export function LayersIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function DocIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2} aria-hidden="true">
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function CloseIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SunIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.48 1c1.4 0 2.5 1.12 2.5 2.5zM0 23.5h5V7.98H0V23.5zM7.5 7.98H12v2.13h.06c.63-1.2 2.18-2.47 4.49-2.47 4.8 0 5.69 3.16 5.69 7.27v8.59h-5v-7.61c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.99-2.93 4.03v7.74h-5V7.98z" />
    </svg>
  );
}

export const iconMap = {
  neural: NeuralIcon,
  lock: LockIcon,
  layers: LayersIcon,
  shield: ShieldIcon,
  doc: DocIcon,
};
