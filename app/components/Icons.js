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

export function GitHubIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.31-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.23v3.31c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
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

/* --- Small feature glyphs ------------------------------------------------- */

/**
 * One per NSQR capability. Six repeats of the same tick told the reader
 * nothing, so each of these says what its row is about at a glance. Drawn on
 * the same 24-unit box and stroke weight as the set above so they sit together.
 */

export function SwapIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5" />
    </svg>
  );
}

export function ChartIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 20V4M4 20h16M8 20v-6M12.5 20v-10M17 20v-4" />
    </svg>
  );
}

export function TagIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M11.5 3H19a2 2 0 0 1 2 2v7.5a2 2 0 0 1-.6 1.4l-6.5 6.5a2 2 0 0 1-2.8 0l-6.6-6.6a2 2 0 0 1 0-2.8l6.5-6.5A2 2 0 0 1 11.5 3Z" />
      <circle cx="16.5" cy="7.5" r="1.4" />
    </svg>
  );
}

export function PaletteIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.8 0-1.4 1-2 2.2-2H18a3 3 0 0 0 3-3.2A9 9 0 0 0 12 3Z" />
      <circle cx="8" cy="11" r="1.2" />
      <circle cx="12" cy="8" r="1.2" />
      <circle cx="16" cy="11" r="1.2" />
    </svg>
  );
}

export function PauseIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M9 5v14M15 5v14" />
    </svg>
  );
}

export function PlayIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M7 4.8v14.4L19 12 7 4.8Z" />
    </svg>
  );
}

export const featureIconMap = {
  swap: SwapIcon,
  chart: ChartIcon,
  lock: LockIcon,
  tag: TagIcon,
  palette: PaletteIcon,
  pause: PauseIcon,
};

/* --- Product motifs ------------------------------------------------------- */

/**
 * Oversized watermark glyphs, one per product. These are decorative texture
 * drawn at a few percent opacity — they suggest what a product does rather
 * than depict it. The QR motif in particular is deliberately not a real
 * encoded code: a scannable-looking mark that resolves to nothing is a trap.
 *
 * All five share a 120-unit box and the same stroke weight so they read as one
 * set at a glance.
 */
const motifStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const solid = { fill: "currentColor", stroke: "none" };

function Motif({ className, children }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...motifStroke} aria-hidden="true">
      {children}
    </svg>
  );
}

// Modules on an 18-unit pitch, avoiding the three finder squares.
const qrModules = [
  [46, 10], [64, 28], [10, 46], [28, 46], [46, 46], [82, 46], [100, 46],
  [46, 64], [64, 64], [100, 64], [46, 82], [64, 82], [100, 82], [64, 100],
  [82, 100],
];

export function QrMotif({ className }) {
  return (
    <Motif className={className}>
      {[[10, 10], [80, 10], [10, 80]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="30" height="30" rx="4" />
          <rect x={x + 9} y={y + 9} width="12" height="12" rx="1.5" {...solid} />
        </g>
      ))}
      {qrModules.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" rx="1.5" {...solid} />
      ))}
    </Motif>
  );
}

// A vault door: outer plate, dial, spokes.
export function VaultMotif({ className }) {
  return (
    <Motif className={className}>
      <rect x="16" y="16" width="88" height="88" rx="14" />
      <circle cx="60" cy="60" r="24" />
      <circle cx="60" cy="60" r="8" />
      <path d="M60 36V22M60 98V84M36 60H22M98 60H84" />
    </Motif>
  );
}

// An attendance grid, a few cells checked in.
export function CheckInMotif({ className }) {
  const cells = [14, 48, 82];
  const checked = new Set(["14-14", "82-48", "48-82"]);

  return (
    <Motif className={className}>
      {cells.flatMap((x) =>
        cells.map((y) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="26" height="26" rx="5" />
            {checked.has(`${x}-${y}`) && (
              <path d={`M${x + 7} ${y + 13}l5 5 8-10`} strokeWidth="2.4" />
            )}
          </g>
        ))
      )}
    </Motif>
  );
}

// A lipid bilayer: two facing rows of polar heads with their tails inward.
// A single phospholipid reads as a stick figure at this size; the membrane
// doesn't.
export function LipidMotif({ className }) {
  return (
    <Motif className={className}>
      {[30, 60, 90].map((x) => (
        <g key={x}>
          <circle cx={x} cy="20" r="8" />
          <path d={`M${x - 4} 28V56M${x + 4} 28V56`} />
          <circle cx={x} cy="100" r="8" />
          <path d={`M${x - 4} 92V64M${x + 4} 92V64`} />
        </g>
      ))}
    </Motif>
  );
}

// A marked-up page with a score gauge over the corner.
export function ScoreMotif({ className }) {
  return (
    <Motif className={className}>
      <rect x="18" y="14" width="62" height="80" rx="6" />
      <path d="M30 34h38M30 48h30M30 62h38M30 76h24" />
      <path d="M60 86a22 22 0 0 1 44 0" />
      <path d="M82 86 96 69" />
      <circle cx="82" cy="86" r="3" {...solid} />
    </Motif>
  );
}

export const motifMap = {
  qr: QrMotif,
  vault: VaultMotif,
  checkin: CheckInMotif,
  lipid: LipidMotif,
  score: ScoreMotif,
};
