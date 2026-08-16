import { DocIcon, LockIcon } from "./Icons";
import { vaultSceneFiles } from "../data/site";

/**
 * The hero illustration on the Vault page.
 *
 * Ordinary markup animated in `app/globals.css` rather than an image or video
 * file: it inherits the product accent, follows the theme toggle, stays sharp
 * at any size, and adds nothing to the page weight. It is also a server
 * component — the whole page still ships no client JS beyond the contact
 * dialog.
 *
 * The scene does not depict the real system. It shows what a customer gets to
 * see — readable here, unreadable everywhere else — and stops there.
 *
 * The three-beat explainer that used to live here as `VaultFlow` is now
 * `<StepRail>`, because coLab wanted the same rail with different words.
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
        <span className="state-swap">
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
            <span className="vault-row-name state-swap">
              <span className="vault-plain">{file.name}</span>
              <span className="vault-cipher">{file.cipher}</span>
            </span>
            <span className="vault-row-meta state-swap">
              <span className="vault-plain">{file.size}</span>
              <span className="vault-cipher">{file.blob}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="vault-scene-foot">
        <span className="state-swap">
          <span className="vault-state-open">Before it leaves you</span>
          <span className="vault-state-locked">What we receive</span>
        </span>
        <span>4 files</span>
      </div>
    </div>
  );
}
