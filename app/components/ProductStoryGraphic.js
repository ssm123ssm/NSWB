import styles from "./ProductSequence.module.css";

function MiniQr() {
  const cells = [
    [7, 7, 7, 1, 1, 0, 7, 7, 7],
    [7, 0, 7, 0, 1, 0, 7, 0, 7],
    [7, 7, 7, 1, 0, 0, 7, 7, 7],
    [0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 1, 0, 1],
    [7, 7, 7, 0, 1, 1, 1, 0, 0],
    [7, 0, 7, 1, 0, 1, 0, 1, 1],
    [7, 7, 7, 0, 1, 0, 1, 1, 0],
  ];

  return (
    <div className={styles.qr}>
      {cells.flatMap((row, y) =>
        row.map((cell, x) => (
          <i className={cell ? styles.qrCell : undefined} key={`${x}-${y}`} />
        ))
      )}
    </div>
  );
}

function NsqrStory() {
  const bars = [38, 54, 46, 72, 62, 86, 68];
  return (
    <div className={`${styles.scene} ${styles.nsqrScene}`}>
      <div className={styles.sceneToolbar}>
        <span />
        <span />
        <span />
        <b>Campaign / Autumn launch</b>
      </div>
      <div className={styles.nsqrGrid}>
        <div className={styles.qrPanel}>
          <span className={styles.microLabel}>Live code</span>
          <MiniQr />
          <span className={styles.liveLine}><i /> 1,284 scans</span>
        </div>
        <div className={styles.analyticsPanel}>
          <div className={styles.destinationRow}>
            <span><small>Destination</small>neurasense.io/autumn</span>
            <b>Edit</b>
          </div>
          <div className={styles.chartHead}>
            <span><small>Scans this week</small>+24.8%</span>
            <i>Live</i>
          </div>
          <div className={styles.barChart}>
            {bars.map((height, i) => <i key={i} style={{ "--bar": `${height}%` }} />)}
          </div>
          <div className={styles.chartAxis}><span>Mon</span><span>Sun</span></div>
        </div>
      </div>
      <span className={styles.scanPulse} />
    </div>
  );
}

function VaultStory() {
  return (
    <div className={`${styles.scene} ${styles.vaultScene}`}>
      <div className={styles.sceneToolbar}>
        <span /><span /><span /><b>Secure workspace</b>
      </div>
      <div className={styles.vaultFlow}>
        <div className={styles.fileCard}>
          <i>PDF</i>
          <span><b>research-notes.pdf</b><small>2.4 MB · on your device</small></span>
        </div>
        <div className={styles.encryptLane}>
          <span className={styles.packet}>0110</span>
          <span className={styles.packet}>A9F2</span>
          <span className={styles.packet}>7C41</span>
          <div className={styles.keyBadge} aria-label="Encrypted before upload">
            <i />
            <b>Encrypted here</b>
            <small>Your key never leaves this device</small>
          </div>
        </div>
        <div className={styles.vaultCard}>
          <div className={styles.vaultDoor}><i /><span /></div>
          <b>Vault storage</b>
          <small>Ciphertext only</small>
        </div>
      </div>
      <div className={styles.policyStrip}>
        <span><i /> Client encrypted</span>
        <span><i /> Manifest protected</span>
        <span><i /> Policy verified</span>
      </div>
    </div>
  );
}

function PresenceStory() {
  const people = [
    ["AK", "Ari K.", "09:02"],
    ["RS", "Ravi S.", "09:04"],
    ["MJ", "Maya J.", "09:11"],
  ];
  return (
    <div className={`${styles.scene} ${styles.presenceScene}`}>
      <div className={styles.attendancePanel}>
        <div className={styles.attendanceHead}>
          <span><small>Design Lab</small>Live attendance</span>
          <b><i /> 24 present</b>
        </div>
        <div className={styles.roster}>
          {people.map(([initials, name, time]) => (
            <div key={initials}>
              <i>{initials}</i><span>{name}</span><time>{time}</time><b>Checked in</b>
            </div>
          ))}
        </div>
        <div className={styles.rosterFoot}><span>24 of 27</span><i><b /></i><small>89%</small></div>
      </div>
      <div className={styles.phone}>
        <span className={styles.phoneSpeaker} />
        <small>Scan to check in</small>
        <MiniQr />
        <div className={styles.scanLine} />
        <b><i /> Ready</b>
      </div>
      <span className={styles.checkinToast}><i>✓</i><span><b>Check-in recorded</b><small>Just now · verified</small></span></span>
    </div>
  );
}

function LipdStory() {
  const points = "0,75 28,68 56,71 84,49 112,55 140,25 168,45 196,37 224,12";
  return (
    <div className={`${styles.scene} ${styles.lipdScene}`}>
      <div className={styles.lipidHead}>
        <span><small>Patient profile</small>Lipid trajectory</span>
        <b>Needs review</b>
      </div>
      <div className={styles.lipidChart}>
        <div className={styles.metricStack}>
          <span><small>LDL-C</small><b>186</b><i>mg/dL</i></span>
          <span><small>Non-HDL</small><b>212</b><i>mg/dL</i></span>
        </div>
        <svg aria-hidden="true" viewBox="0 0 224 88">
          <path d="M0 75H224M0 45H224M0 15H224" />
          <polyline points={points} />
          <circle cx="140" cy="25" r="5" />
          <circle cx="224" cy="12" r="6" />
        </svg>
        <span className={styles.patternFlag}>Pattern detected</span>
      </div>
      <div className={styles.referralFlow}>
        <span><i>1</i><b>Pattern found</b><small>Familial risk</small></span>
        <em />
        <span><i>2</i><b>Review ready</b><small>Evidence grouped</small></span>
        <em />
        <span className={styles.currentStep}><i>3</i><b>Refer</b><small>Specialist pathway</small></span>
      </div>
    </div>
  );
}

function AesStory() {
  const scores = [["Ideas", 86], ["Evidence", 72], ["Structure", 91]];
  return (
    <div className={`${styles.scene} ${styles.aesScene}`}>
      <div className={styles.essayPage}>
        <div className={styles.essayTitle}><i /><span><b>Climate and cities</b><small>Essay · 842 words</small></span></div>
        <p>Urban design can reduce emissions while making daily life <mark>more resilient and equitable</mark>.</p>
        <p>Well-connected public spaces give communities <u>measurable social and environmental benefits</u>.</p>
        <span className={styles.commentPin}>1</span>
      </div>
      <div className={styles.scorePanel}>
        <div className={styles.totalScore}><span><small>Overall score</small><b>84</b><i>/100</i></span><em>Strong</em></div>
        <div className={styles.rubricRows}>
          {scores.map(([label, value]) => (
            <div key={label}><span>{label}<b>{value}</b></span><i><em style={{ "--score": `${value}%` }} /></i></div>
          ))}
        </div>
        <div className={styles.feedback}><i>↗</i><span><b>Next improvement</b><small>Connect evidence to the final claim.</small></span></div>
      </div>
    </div>
  );
}

const STORIES = {
  nsqr: NsqrStory,
  vault: VaultStory,
  presence: PresenceStory,
  "lipd-hub": LipdStory,
  aes: AesStory,
};

export default function ProductStoryGraphic({ slug }) {
  const Story = STORIES[slug];
  return Story ? <Story /> : null;
}
