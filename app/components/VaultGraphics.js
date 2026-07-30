import { DocIcon, LockIcon } from "./Icons";
import { vaultHowItWorks, vaultSceneFiles } from "../data/site";

/**
 * The two illustrations on the Vault page.
 *
 * Both are ordinary markup animated in `app/globals.css` rather than image or
 * video files: they inherit the product accent, follow the theme toggle, stay
 * sharp at any size, and add nothing to the page weight. They are also server
 * components — the whole page still ships no client JS beyond the contact
 * dialog.
 *
 * Neither scene depicts the real system. They show what a customer gets to
 * see — readable here, unreadable everywhere else — and stop there.
 */

/**
 * The hero loop: a project's file list, swept once and left encrypted. Marked
 * `aria-hidden` because it is a restatement of the copy beside it, and a
 * screen reader reading out sixteen characters of decorative hex is noise.
 */
export function VaultScene() {
  return (
    <div className="vault-scene" aria-hidden="true">
      <div className="vault-scene-head">
        <span>client-delivery</span>
        <span className="vault-swap">
          <span className="vault-state-open">Readable on your device</span>
          <span className="vault-state-locked">
            <LockIcon className="h-3 w-3" />
            Encrypted
          </span>
        </span>
      </div>

      <div className="vault-scene-body">
        <span className="vault-scan" />
        {vaultSceneFiles.map((file, index) => (
          <div className="vault-row" key={file.name} style={{ "--i": index }}>
            <span className="vault-row-icon">
              <DocIcon className="h-3.5 w-3.5" />
            </span>
            <span className="vault-row-name vault-swap">
              <span className="vault-plain">{file.name}</span>
              <span className="vault-cipher">{file.cipher}</span>
            </span>
            <span className="vault-row-meta vault-swap">
              <span className="vault-plain">{file.size}</span>
              <span className="vault-cipher">{file.blob}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="vault-scene-foot">
        <span className="vault-swap">
          <span className="vault-state-open">Before it leaves you</span>
          <span className="vault-state-locked">What we receive</span>
        </span>
        <span>4 files</span>
      </div>
    </div>
  );
}

/**
 * The three-beat explainer, set on a rail with a packet descending it — the
 * same vertical language as the product timeline on the home page, so the two
 * read as one family.
 */
export function VaultFlow() {
  return (
    <div className="vault-flow">
      <span className="vault-flow-rail" aria-hidden="true" />
      <span className="vault-flow-pulse" aria-hidden="true" />

      {vaultHowItWorks.map((step, index) => (
        <div className="reveal vault-flow-step" key={step.title}>
          <span className="vault-flow-node" aria-hidden="true" />
          <p className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.16em] text-brand">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-base">{step.title}</h3>
          <p className="mt-2 text-[0.925rem] leading-relaxed text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
