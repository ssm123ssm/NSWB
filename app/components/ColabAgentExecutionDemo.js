"use client";

import { useEffect, useState } from "react";
import { CheckIcon, NeuralIcon } from "./Icons";
import styles from "./ColabLanding.module.css";

const instruction = "@Atlas summarize the discussion and add the requested change to the review task.";
const phaseDurations = [2200, 2200, 2600, 2600, 1800, 3400, 6000];

function TypingDots() {
  return <span className={styles.chatTypingDots} aria-label="Typing"><i /><i /><i /></span>;
}

export default function ColabAgentExecutionDemo({ editorial = false }) {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(6);
      return undefined;
    }
    const timer = window.setTimeout(() => setPhase((current) => (current + 1) % phaseDurations.length), phaseDurations[phase]);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 3) {
      setTypedText(phase > 3 ? instruction : "");
      return undefined;
    }
    setTypedText("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(instruction.slice(0, index));
      if (index >= instruction.length) window.clearInterval(timer);
    }, 30);
    return () => window.clearInterval(timer);
  }, [phase]);

  const commentVisible = phase >= 2;
  const instructionSent = phase >= 4;
  const processing = phase === 4;
  const completed = phase >= 5;
  const huddleStarting = phase === 6;

  return (
    <div className={`${styles.agentChatWindow} ${editorial ? styles.editorialChatDemo : ""}`} aria-label="Project communication demonstration">
      <aside className={styles.agentChatSidebar}>
        <div className={styles.agentChatBrand}><span><NeuralIcon /></span><strong>coLab</strong></div>
        <small>CHAT</small>
        <button type="button" tabIndex="-1">+ New</button>
        <div className={styles.agentChatSearch}>⌕&nbsp;&nbsp;Find a conversation</div>
        <div className={styles.agentChatChannels}>
          <p><i data-color="blue" />Research Platform</p>
          <span className={styles.activeProjectChannel}># <b>General</b><em>Supun mentioned you</em></span>
          <span># <b>Methods</b></span>
          <p><i data-color="violet" />Product Launch</p>
          <span># <b>General</b></span>
          <p><i data-color="cyan" />Private agents</p>
          <span className={styles.activeAgentChannel}><span><NeuralIcon /></span><b>Atlas</b><em>Project AI agent</em></span>
        </div>
        <div className={styles.agentChatContext}><small>Project context</small><strong>Research Platform</strong></div>
        <div className={styles.agentChatUser}><span>I</span><strong>Isuru</strong></div>
      </aside>

      <div className={styles.agentChatMain}>
        <div className={styles.agentChatHeader}>
          <div className={styles.channelMark}>#</div>
          <div><strong>General</strong><p>Research Platform · Project channel</p></div>
          <div className={styles.agentChatHeaderActions}><span>Search messages</span><button type="button" tabIndex="-1">Start huddle</button></div>
        </div>

        <div className={styles.agentChatBody} aria-live="polite">
          <div className={styles.agentChatDate}><span>Today</span></div>
          <div className={styles.chatMessageRow}>
            <span className={`${styles.chatUserAvatar} ${styles.priyaAvatar}`}>S</span>
            <div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}><small>Supun · 10:12 AM</small><p>The methods review is ready. <b>@Isuru</b> please check the reviewer comment on the results section.</p></div>
          </div>

          {commentVisible ? <div className={styles.contextCommentCard}><small>COMMENT · RESULTS PREVIEW</small><strong>Update this chart label to state the measured outcome.</strong><span>Open annotated preview →</span></div> : null}

          {instructionSent ? <div className={`${styles.chatMessageRow} ${styles.chatMessageRowUser}`}><div className={`${styles.chatMessage} ${styles.chatMessageUser}`}><small>Isuru · 10:14 AM</small><p>{instruction}</p></div><span className={styles.chatUserAvatar}>I</span></div> : null}

          {processing ? <div className={styles.chatMessageRow}><span className={styles.chatAgentAvatar}><NeuralIcon /></span><div className={`${styles.chatMessage} ${styles.chatMessageAgent}`}><small>Atlas · project agent</small><div className={styles.chatProcessing}><TypingDots /><span>Reviewing the channel and linked comment</span></div></div></div> : null}

          {completed ? <div className={styles.chatMessageRow}><span className={styles.chatAgentAvatar}><NeuralIcon /></span><div className={`${styles.chatMessage} ${styles.chatMessageComplete}`}><small>Atlas · project agent · 10:15 AM</small><p>I summarized the discussion and updated the review task.</p><div className={styles.chatActionReceipt}><strong><i />Completed</strong><ul><li><CheckIcon />Read channel discussion</li><li><CheckIcon />Linked reviewer comment</li><li><CheckIcon />Updated review task</li></ul></div></div></div> : null}
        </div>

        <div className={styles.agentChatFooter}><div className={styles.agentChatComposer}><div className={styles.chatComposerField}><span>{phase === 3 ? typedText : "Message General — mention people or agents"}</span>{phase === 3 && typedText.length < instruction.length ? <i /> : null}</div><button type="button" aria-label="Send message" tabIndex="-1">Send</button></div></div>

        {huddleStarting ? <div className={styles.huddleStarting} role="status"><div className={styles.huddleAvatars} aria-hidden="true"><span>I</span><span>S</span><span>H</span></div><div><small>RESEARCH PLATFORM</small><strong>Project huddle is starting</strong><p>Isuru, Supun, and Shashika are joining.</p></div><div className={styles.huddleActions}><span className={styles.huddleSignal} aria-hidden="true"><i /><i /><i /></span><button type="button" tabIndex="-1">Join now</button></div></div> : null}
      </div>
    </div>
  );
}
