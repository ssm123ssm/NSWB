import {
  CheckIcon,
  contentIconMap,
  DocIcon,
  LockIcon,
  UsersIcon,
} from "./Icons";
import { nsqrContentTypes, showcaseScenes } from "../data/site";

/**
 * The twelve product screens in the home page showcase — four products, three
 * capabilities each, one screen per capability.
 *
 * Drawn, not captured. A screenshot could not inherit the product colour, would
 * go stale on the next release, and for three of these four would be a picture
 * of a sign-in form, since only NSQR is reachable without an account. The same
 * reasoning is written out on `ColabScene` and `VaultScene`.
 *
 * One screen per capability, not one screen with three regions. The earlier
 * version stacked all three inside a single window and dimmed the two you were
 * not reading — which meant most of every card was desaturated grey, and each
 * region had a third of a small window to live in. Giving a capability the
 * whole stage is what lets a chart be a real chart and a QR code be big enough
 * to read as one. It is also what cake.com does, which is the reference this
 * section was asked for.
 *
 * Colour: these screens are deliberately off the site's contrast-derived accent
 * scale, which is built for *text* on paper and lands muted when used as fills.
 * A screen is an illustration, so it uses the saturated `--pop` set defined on
 * the panel in globals.css. Words inside a screen still take `--pop-deep`,
 * which is the same hue carried to where it is legible.
 *
 * `aria-hidden` on the frame: every screen restates the capability text beside
 * it, and reading out four roster rows and a hex digest is noise.
 */

/* --- Chassis -------------------------------------------------------------- */

function Screen({ path, title, children }) {
  return (
    <div className="shot" aria-hidden="true">
      <div className="shot-bar">
        <span className="shot-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="shot-path">{path}</span>
      </div>
      <div className="shot-body">
        {title && <p className="shot-title">{title}</p>}
        {children}
      </div>
    </div>
  );
}

/* --- NSQR ----------------------------------------------------------------- */

function NsqrDestination({ scene }) {
  return (
    <Screen path={scene.path} title="Destination">
      <div className="shot-hero">
        <div className="shot-qr">
          {scene.qr.map((row, r) =>
            row
              .split("")
              .map((module, c) => (
                <span key={`${r}-${c}`} data-on={module === "1" ? "" : undefined} />
              ))
          )}
        </div>
        <div className="shot-swap">
          <p className="shot-was">{scene.was}</p>
          <p className="shot-now">{scene.now}</p>
          <span className="shot-pill">Updated · no reprint</span>
        </div>
      </div>
    </Screen>
  );
}

function NsqrAnalytics({ scene }) {
  // The tallest bar sets the scale, so the chart fills its box whatever the
  // numbers are changed to.
  const peak = Math.max(...scene.scans);

  return (
    <Screen path={scene.path} title="Scans this week">
      <p className="shot-figure">
        448 <span>scans</span>
      </p>
      <div className="shot-chart">
        {scene.scans.map((value, i) => (
          <span key={scene.days[i] + i} className="shot-bar-col">
            <span className="shot-bar-value">{value}</span>
            <span
              className="shot-bar-fill"
              style={{ "--h": `${Math.round((value / peak) * 100)}%` }}
            />
            <span className="shot-bar-day">{scene.days[i]}</span>
          </span>
        ))}
      </div>
      <dl className="shot-stats">
        {scene.stats.slice(1).map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Screen>
  );
}

function NsqrContent({ scene }) {
  return (
    <Screen path={scene.path} title="What the code carries">
      <ul className="shot-tiles">
        {nsqrContentTypes.map((type, i) => {
          const Icon = contentIconMap[type.icon];
          return (
            <li key={type.name} data-on={i === 0 ? "" : undefined}>
              {Icon && <Icon className="h-5 w-5" />}
              <span>{type.name}</span>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}

/* --- Vault ---------------------------------------------------------------- */

function VaultEncryption({ scene }) {
  return (
    <Screen path={scene.path} title="Before anything is sent">
      <ul className="shot-files">
        {scene.files.map((file) => (
          <li key={file.name}>
            <DocIcon className="h-4 w-4 shrink-0" />
            <span className="shot-truncate">{file.name}</span>
            <span className="shot-arrow">→</span>
            <span className="shot-cipher">{file.cipher}</span>
          </li>
        ))}
      </ul>
      <p className="shot-banner">
        <LockIcon className="h-4 w-4" />
        Encrypted on this device
      </p>
    </Screen>
  );
}

function VaultManifest({ scene }) {
  return (
    <Screen path={scene.path} title="What the server can see">
      <dl className="shot-pairs">
        {scene.manifest.map((entry) => (
          <div key={entry.key}>
            <dt>{entry.key}</dt>
            <dd data-sealed={entry.value === "sealed" ? "" : undefined}>
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </Screen>
  );
}

function VaultAccess({ scene }) {
  return (
    <Screen path={scene.path} title="Who holds a key">
      <ul className="shot-people">
        {scene.policies.map((policy) => (
          <li key={policy.who}>
            <span className="shot-avatar">{policy.who.charAt(0)}</span>
            <span className="shot-truncate">
              <b>{policy.who}</b>
              <span className="shot-sub">{policy.scope}</span>
            </span>
            <span className="shot-tag">{policy.expiry}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

/* --- coLab ---------------------------------------------------------------- */

function ColabTimeline({ scene }) {
  return (
    <Screen path={scene.path} title="product-launch">
      <div className="shot-track">
        <span className="shot-track-line" />
        <span className="shot-track-fill" style={{ "--fill": `${scene.fill}%` }} />
        {scene.milestones.map((milestone, i) => (
          <span
            className="shot-milestone"
            key={milestone.label}
            style={{ "--at": `${milestone.at}%` }}
            data-done={milestone.at < scene.fill ? "" : undefined}
          >
            <span className="shot-milestone-node">
              {milestone.at < scene.fill && <CheckIcon className="h-3 w-3" />}
            </span>
            {milestone.label}
          </span>
        ))}
      </div>
      <p className="shot-banner">
        <span className="shot-dot-live" />
        62% of the way to Review
      </p>
    </Screen>
  );
}

function ColabDecisions({ scene }) {
  return (
    <Screen path={scene.path} title="Decision log">
      <ul className="shot-log">
        {scene.decisions.map((decision) => (
          <li key={decision.title}>
            <p className="shot-log-title">{decision.title}</p>
            <p className="shot-sub">{decision.why}</p>
            <p className="shot-signed">
              <span className="shot-avatar">{decision.by.charAt(0)}</span>
              {decision.by} · {decision.on}
            </p>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

function ColabSharing({ scene }) {
  return (
    <Screen path={scene.path} title="Who sees what">
      <ul className="shot-people">
        {scene.members.map((member) => (
          <li key={member.who} data-guest={member.role === "Guest" ? "" : undefined}>
            <span className="shot-avatar">
              {member.role === "Guest" ? (
                <UsersIcon className="h-3.5 w-3.5" />
              ) : (
                member.who.charAt(0)
              )}
            </span>
            <span className="shot-truncate">
              <b>{member.who}</b>
              <span className="shot-sub">{member.role}</span>
            </span>
            <span className="shot-tag">{member.scope}</span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

/* --- Presence ------------------------------------------------------------- */

function PresenceCheckins({ scene }) {
  return (
    <Screen path={scene.path} title={scene.session}>
      <p className="shot-figure">
        {scene.present}
        <span>/{scene.expected} present</span>
      </p>
      <ul className="shot-people">
        {scene.roster.map((entry) => (
          <li key={entry.who}>
            <span className="shot-avatar">{entry.who.charAt(0)}</span>
            <span className="shot-truncate">
              <b>{entry.who}</b>
              <span className="shot-sub">{entry.at}</span>
            </span>
            <span className="shot-state" data-state={entry.state}>
              {entry.state}
            </span>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

/* Drawn as a state rather than a mechanism — the repo does not record how
   Presence secures a session, and a drawn screen is not the place to guess. */
function PresenceSecure({ scene }) {
  return (
    <Screen path={scene.path} title="Who gets in">
      <dl className="shot-pairs">
        {scene.access.map((entry) => (
          <div key={entry.label}>
            <dt>{entry.label}</dt>
            <dd data-refused={entry.value === "Refused" ? "" : undefined}>
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </Screen>
  );
}

function PresenceExports({ scene }) {
  return (
    <Screen path={scene.path} title="Take the register out">
      <ul className="shot-scopes">
        {scene.exportScopes.map((scope, i) => (
          <li key={scope} data-on={i === 1 ? "" : undefined}>
            {scope}
          </li>
        ))}
      </ul>
      <p className="shot-figure">
        612 <span>rows</span>
      </p>
      <p className="shot-banner">
        <CheckIcon className="h-4 w-4" />
        {scene.range} · ready to download
      </p>
    </Screen>
  );
}

/**
 * Every screen, keyed by product slug then by the capability `id` it belongs
 * to. The ids must match `productShowcase` in site.js — a capability with no
 * entry here renders an empty stage.
 */
const screens = {
  nsqr: {
    destination: NsqrDestination,
    analytics: NsqrAnalytics,
    content: NsqrContent,
  },
  vault: {
    encryption: VaultEncryption,
    manifest: VaultManifest,
    access: VaultAccess,
  },
  colab: {
    timeline: ColabTimeline,
    decisions: ColabDecisions,
    sharing: ColabSharing,
  },
  presence: {
    checkins: PresenceCheckins,
    secure: PresenceSecure,
    exports: PresenceExports,
  },
};

/**
 * The stage. Renders the screen for the selected capability; `key` on the
 * wrapper is what makes React swap the subtree rather than patch it, which is
 * what gives the new screen its entry animation.
 */
export default function ShowcaseShot({ slug, capability }) {
  const scene = showcaseScenes[slug];
  const Chosen = screens[slug]?.[capability];
  if (!scene || !Chosen) return null;

  return (
    <div className="shot-swapper" key={capability}>
      <Chosen scene={scene} />
    </div>
  );
}
