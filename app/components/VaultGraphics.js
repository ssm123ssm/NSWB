"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DocIcon, LockIcon } from "./Icons";
import { vaultSceneFiles } from "../data/site";

/**
 * The hero illustration on the Vault page.
 *
 * Ordinary markup styled in `app/globals.css` rather than an image or video
 * file: it inherits the product accent, follows the theme toggle, stays sharp
 * at any size, and adds nothing to the page weight.
 *
 * The scene does not depict the real system. It shows what a customer gets to
 * see — readable here, unreadable everywhere else — and stops there.
 *
 * It used to be a server component running a 9s CSS loop, with a scroll-driven
 * scrub standing in for control on wide screens. It is now a small client
 * island instead, because the claim is abstract until a reader watches their
 * own filename turn into noise: the name in the header is theirs to type, and
 * the lock is theirs to throw. The page around it is still a server component.
 *
 * Two properties are worth keeping as you edit it. The cipher is derived, not
 * canned, so a name the reader invents produces a plausible result rather than
 * a stock string. And it is always sixteen characters wide however long the
 * name is — the length of what you called a file is metadata too, and the
 * scene should not quietly imply we leak it.
 *
 * The three-beat explainer that used to live here as `VaultFlow` is now
 * `<StepRail>`, because coLab wanted the same rail with different words.
 */

const CIPHER_LENGTH = 16;

/**
 * Sixteen hex characters from an arbitrary string. Deterministic, so the
 * server render and the first client render agree; `salt` is what the settle
 * animation varies while a name is being typed, and is 0 at rest.
 *
 * This is a stand-in for the look of a result, not a cipher — it makes no
 * secrecy claim and none of the page's copy asks it to.
 */
function cipherOf(input, salt = 0) {
  const source = input.length ? input : " ";
  let h = (0x811c9dc5 ^ salt) >>> 0;
  let out = "";

  for (let i = 0; out.length < CIPHER_LENGTH; i += 1) {
    h ^= source.charCodeAt(i % source.length) + i * 131 + salt;
    h = Math.imul(h, 16777619) >>> 0;
    h ^= h >>> 13;
    out += ((h >>> (i % 24)) & 255).toString(16).padStart(2, "0");
  }

  return out.slice(0, CIPHER_LENGTH);
}

export function VaultScene() {
  const [name, setName] = useState(vaultSceneFiles[0].name);
  const [locked, setLocked] = useState(false);
  const [salt, setSalt] = useState(0);
  /* Bumped to remount the sweep, which is what restarts its animation. */
  const [sweep, setSweep] = useState(0);
  const settleRef = useRef(null);
  const calmRef = useRef(false);

  /* Lock it once, shortly after arrival, so a reader who never touches the
     scene still sees the turn. Reduced motion gets the still it should have —
     already locked, no sweep — which is also the correct frame to stop on. */
  useEffect(() => {
    calmRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (calmRef.current) {
      setLocked(true);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLocked(true);
      setSweep((n) => n + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => () => window.clearInterval(settleRef.current), []);

  /* A few frames of noise before the value settles, so re-encrypting reads as
     work happening rather than as text being replaced. */
  const settle = useCallback(() => {
    if (calmRef.current) return;
    window.clearInterval(settleRef.current);

    let frame = 0;
    settleRef.current = window.setInterval(() => {
      frame += 1;
      if (frame > 5) {
        window.clearInterval(settleRef.current);
        settleRef.current = null;
        setSalt(0);
      } else {
        setSalt(frame * 977 + ((frame * 31) % 97));
      }
    }, 45);
  }, []);

  const rename = useCallback(
    (event) => {
      setName(event.target.value);
      if (locked) settle();
    },
    [locked, settle],
  );

  const toggle = useCallback(() => {
    setLocked((current) => {
      if (!current) setSweep((n) => n + 1);
      return !current;
    });
  }, []);

  /* Keyed on the name from the data, not the displayed one — row 0's label is
     the reader's to change, and a key that moved with it would remount the row
     on every keystroke. */
  const files = vaultSceneFiles.map((file, index) =>
    index === 0 ? { ...file, name, key: file.name } : { ...file, key: file.name },
  );

  return (
    <div
      className="vault-scene"
      data-interactive=""
      data-locked={locked ? "" : undefined}
    >
      <div className="vault-scene-head">
        {/* Outside the swapping layers on purpose: the field has to stay
            reachable in every motion setting, including the reduced-motion
            still that pins the rows to their locked state. */}
        <label className="vault-field-label">
          <span className="sr-only">A file name to encrypt</span>
          <input
            className="vault-field"
            value={name}
            onChange={rename}
            spellCheck="false"
            autoComplete="off"
            maxLength={40}
            size={22}
            aria-describedby="vault-scene-state"
          />
        </label>

        <span className="state-swap" id="vault-scene-state" aria-live="polite">
          <span className="vault-state-open">Readable on your device</span>
          <span className="vault-state-locked">
            <LockIcon className="h-3 w-3" aria-hidden="true" />
            Encrypted
          </span>
        </span>
      </div>

      <div className="vault-scene-body">
        <span className="vault-scan" key={sweep} aria-hidden="true" />
        {files.map((file, index) => (
          <div className="vault-row" key={file.key} style={{ "--i": index }}>
            <span className="vault-row-icon" aria-hidden="true">
              <DocIcon className="h-3.5 w-3.5" />
            </span>
            <span className="vault-row-name state-swap">
              <span className="vault-plain">{file.name}</span>
              <span className="vault-cipher">
                {index === 0 ? cipherOf(name, salt) : file.cipher}
              </span>
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
        <button className="vault-toggle" type="button" onClick={toggle}>
          {locked ? "Open it on my device" : "Lock it and send"}
        </button>
      </div>
    </div>
  );
}
