"use client";

import { useEffect, useState } from "react";
import { CheckIcon, NeuralIcon } from "./Icons";
import styles from "./ColabLanding.module.css";

const instruction = "@Atlas review the current milestones and identify overdue tasks.";
const response = "Group them by owner and add the summary to the project.";
const phaseDurations = [2800, 700, 900, 2300, 2500, 700, 2400, 3800];

function TypingDots() {
  return <span className={styles.chatTypingDots} aria-label="Typing"><i /><i /><i /></span>;
}

export default function ColabAgentExecutionDemo() {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(7);
      return undefined;
    }

    const timer = window.setTimeout(
      () => setPhase((current) => (current + 1) % phaseDurations.length),
      phaseDurations[phase],
    );

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const value = phase === 0 ? instruction : phase === 4 ? response : "";
    if (!value) {
      setTypedText("");
      return undefined;
    }

    setTypedText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(value.slice(0, index));
      if (index >= value.length) window.clearInterval(timer);
    }, 32);

    return () => window.clearInterval(timer);
  }, [phase]);

  const instructionSent = phase >= 1;
  const questionVisible = phase >= 3;
  const responseSent = phase >= 5;
  const processing = phase === 6;
  const completed = phase === 7;

  return (
    <div className={styles.agentChatWindow} aria-label="Project agent task demonstration">
      <aside className={styles.agentChatSidebar}>
        <div className={styles.agentChatBrand}><span><NeuralIcon /></span><strong>coLab</strong></div>
        <small>CHAT</small>
        <button type="button" tabIndex="-1">+ New</button>
        <div className={styles.agentChatSearch}>⌕&nbsp;&nbsp;Find a conversation</div>
        <div className={styles.agentChatChannels}>
          <p><i data-color="blue" />Research Platform</p>
          <span># <b>General</b></span>
          <p><i data-color="violet" />Product Launch</p>
          <span># <b>General</b></span>
          <p><i data-color="cyan" />Private agents</p>
          <span className={styles.activeAgentChannel}><span><NeuralIcon /></span><b>Atlas</b><em>Agent conversation</em></span>
        </div>
        <div className={styles.agentChatContext}><small>Project context</small><strong>Research Platform</strong></div>
        <div className={styles.agentChatUser}><span>M</span><strong>Maya</strong></div>
      </aside>

      <div className={styles.agentChatMain}>
        <div className={styles.agentChatHeader}>
          <div className={styles.agentChatMark}><NeuralIcon /></div>
          <div><strong>Atlas <span>@atlas</span></strong><p>Research Platform · Private agent conversation</p></div>
          <div className={styles.agentChatHeaderActions}><span>Search messages</span><button type="button" tabIndex="-1">Archive</button></div>
        </div>

        <div className={styles.agentChatBody} aria-live="polite">
          <div className={styles.agentChatDate}><span>Today</span></div>

          <div className={styles.chatMessageRow}>
            <span className={styles.chatAgentAvatar}><NeuralIcon /></span>
            <div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}>
              <small>Atlas · agent · 10:12 AM</small>
              <p>Project access confirmed. I can review milestones, tasks, notes, and decisions in Research Platform.</p>
            </div>
          </div>

          {instructionSent ? (
            <div className={`${styles.chatMessageRow} ${styles.chatMessageRowUser}`}>
              <div className={`${styles.chatMessage} ${styles.chatMessageUser}`}>
                <small>Maya · 10:14 AM</small>
                <p>{instruction}</p>
              </div>
              <span className={styles.chatUserAvatar}>M</span>
            </div>
          ) : null}

          {phase === 2 ? (
            <div className={styles.chatMessageRow}>
              <span className={styles.chatAgentAvatar}><NeuralIcon /></span>
              <div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}><TypingDots /></div>
            </div>
          ) : null}

          {questionVisible ? (
            <div className={styles.chatMessageRow}>
              <span className={styles.chatAgentAvatar}><NeuralIcon /></span>
              <div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}>
                <small>Atlas · agent · 10:14 AM</small>
                <p>Should I group the overdue tasks by owner or by milestone?</p>
              </div>
            </div>
          ) : null}

          {responseSent ? (
            <div className={`${styles.chatMessageRow} ${styles.chatMessageRowUser}`}>
              <div className={`${styles.chatMessage} ${styles.chatMessageUser}`}>
                <small>Maya · 10:15 AM</small>
                <p>{response}</p>
              </div>
              <span className={styles.chatUserAvatar}>M</span>
            </div>
          ) : null}

          {processing ? (
            <div className={styles.chatMessageRow}>
              <span className={styles.chatAgentAvatar}><NeuralIcon /></span>
              <div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}>
                <small>Atlas · agent</small>
                <div className={styles.chatProcessing}><TypingDots /><span>Checking milestones and tasks</span></div>
              </div>
            </div>
          ) : null}

          {completed ? (
            <div className={styles.chatMessageRow}>
              <span className={styles.chatAgentAvatar}><NeuralIcon /></span>
              <div className={`${styles.chatMessage} ${styles.chatMessageComplete}`}>
                <small>Atlas · agent · 10:15 AM</small>
                <p>I found 5 overdue tasks, grouped them by owner, and added the summary to the project.</p>
                <div className={styles.chatActionReceipt}>
                  <strong><i />Completed</strong>
                  <ul>
                    <li><CheckIcon />Searched the project</li>
                    <li><CheckIcon />Reviewed milestone dates</li>
                    <li><CheckIcon />Created project summary</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.agentChatFooter}>
          <div className={styles.agentChatSuggestions}><span>Summarize project status</span><span>List overdue tasks</span><span>Show current blockers</span></div>
          <div className={styles.agentChatComposer}>
            <div className={styles.chatComposerField}>
              <span>{phase === 0 || phase === 4 ? typedText : "Message Atlas — ask it to plan or act"}</span>
              {(phase === 0 || phase === 4) && typedText.length < (phase === 0 ? instruction.length : response.length) ? <i /> : null}
            </div>
            <button type="button" aria-label="Send message" tabIndex="-1">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
