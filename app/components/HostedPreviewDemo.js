"use client";

import { useEffect, useState } from "react";
import styles from "./ColabLanding.module.css";

const comment = "Change this heading to describe the research outcome.";
const durations = [1800, 700, 2600, 3200];

export default function HostedPreviewDemo() {
  const [phase, setPhase] = useState(0);
  const [typedComment, setTypedComment] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(3);
      setTypedComment(comment);
      return undefined;
    }

    const timer = window.setTimeout(
      () => setPhase((current) => (current + 1) % durations.length),
      durations[phase],
    );
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) {
      setTypedComment(phase === 3 ? comment : "");
      return undefined;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedComment(comment.slice(0, index));
      if (index >= comment.length) window.clearInterval(timer);
    }, 38);
    return () => window.clearInterval(timer);
  }, [phase]);

  const annotationOpen = phase >= 1;
  const submitted = phase === 3;

  return (
    <div className={styles.hostedPreviewVisual} aria-label="A reviewer adds a comment to a hosted preview">
      <div className={styles.hostedPreviewBar}><span /><span /><span /><small>preview.neurasense.io/research-platform</small><b>3 viewers</b></div>
      <div className={styles.hostedPreviewPage}>
        <nav><strong>Research Platform</strong><span>Overview&nbsp;&nbsp; Methods&nbsp;&nbsp; Results</span><button type="button" tabIndex="-1">Join project</button></nav>
        <div className={styles.hostedPreviewContent}>
          <small>OPEN RESEARCH WORKSPACE</small>
          <h3>Keep research work connected.</h3>
          <p>Manage tasks, documents, collaborators, and decisions in one project workspace.</p>
          <button type="button" tabIndex="-1">View research</button>

          <span className={`${styles.previewCursor} ${annotationOpen ? styles.previewCursorClicked : ""}`} aria-hidden="true">↖</span>
          {annotationOpen ? <span className={`${styles.annotationPin} ${styles.pinOne}`}>1</span> : null}

          {annotationOpen ? (
            <div className={`${styles.annotationComposer} ${submitted ? styles.annotationSubmitted : ""}`}>
              <small>PRIYA · VIEWER</small>
              <div>{typedComment || "Add a comment"}{phase === 2 ? <i /> : null}</div>
              {submitted ? <strong>Comment added</strong> : <button type="button" tabIndex="-1">Add comment</button>}
            </div>
          ) : null}

          <span className={`${styles.annotationPin} ${styles.pinTwo}`}>2</span>
          <div className={`${styles.annotationComment} ${styles.commentTwo}`}><small>DANIEL · VIEWER</small><strong>Use the project access label on this button.</strong><span>Reply</span></div>
        </div>
        <div className={styles.previewViewerStrip}><span>P</span><span>D</span><span>M</span><p><strong>3 reviewers</strong><small>Comments are attached to preview areas.</small></p></div>
      </div>
    </div>
  );
}
