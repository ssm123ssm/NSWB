import { ArrowIcon, LockIcon } from "./Icons";
import {
  colabAccess,
  colabMainFeatures,
  colabComparison,
  colabFaqs,
  colabTrust,
} from "../data/colab-page";
import styles from "./ColabLanding.module.css";
import ColabFeatureCards from "./ColabFeatureCards";
import ColabAgentExecutionDemo from "./ColabAgentExecutionDemo";
import HostedPreviewDemo from "./HostedPreviewDemo";
import { colabLinks } from "../data/site";

function ColabCommunicationVisual() {
  return (
    <div className={styles.chatEditorialLayout}>
      <div className={styles.macbookScene} aria-label="Animated coLab chat displayed on a MacBook">
        <div className={styles.macbookDisplay}>
          <span className={styles.macbookCamera} aria-hidden="true" />
          <div className={styles.macbookScreen}>
            <div className={styles.screenCanvas}>
              <ColabAgentExecutionDemo editorial />
            </div>
          </div>
        </div>
        <div className={styles.macbookBase} aria-hidden="true"><span /></div>
      </div>
      <div className={styles.chatEditorialCopy}>
        <h3>Project communication</h3>
        <p>Use coLab chat to communicate with project members and instruct AI bots or project-specific agents.</p>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className={styles.sectionHead}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title max-w-3xl">{title}</h2>
      {lead ? <p className="lead max-w-2xl">{lead}</p> : null}
    </div>
  );
}

export function ColabHero() {
  return (
    <section className={styles.hero}>
      <div className="shell">
        <div className={styles.heroCopy}>
          <h1>An integrated digital workspace for project work.</h1>
          <p className={styles.heroLead}>coLab is an advanced digital workspace where individuals and teams can organize projects, coordinate work, communicate with collaborators, store project knowledge, and use AI to assist with project tasks.</p>
          <div className={styles.heroActions}>
            <a className="btn btn-gradient btn-lg" href={colabLinks.signup} target="_blank" rel="noreferrer">Request access <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoForSection() {
  const audiences = [
    "Research labs and academic teams",
    "Product and software teams",
    "Design and creative teams",
    "Project managers",
    "Small organizations and startups",
    "Individual professionals",
    "Anyone who manages complex tasks",
  ];

  return (
    <section className={`section section-subtle ${styles.whoForSection}`}>
      <div className="shell">
        <div className={styles.whoForLayout}>
          <SectionHead title="Who coLab is made for" lead="coLab supports individuals and teams that manage projects, knowledge, collaborators, and AI-assisted tasks." />
          <ol className={styles.whoForList}>
            {audiences.map((audience, index) => (
              <li key={audience}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{audience}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function MainFeaturesSection() {
  return (
    <section className={`section section-subtle ${styles.mainFeaturesSection}`}><div className="shell shell-wide">
      <SectionHead eyebrow="Main features" title="What you can do in coLab" lead="Manage project work, communication, knowledge, specialist tools, and AI execution from one workspace." />
      <ColabFeatureCards features={colabMainFeatures} />
    </div></section>
  );
}

export function ColabChatSection() {
  return (
    <section className={styles.chatEditorialSection}>
      <div className="shell shell-wide">
        <ColabCommunicationVisual />
      </div>
    </section>
  );
}

export function AcademicResearchSection() {
  return (
    <section className={styles.academicEditorialSection}>
      <div className="shell shell-wide">
        <div className={styles.academicEditorialLayout}>
          <div className={styles.chatEditorialCopy}>
            <h3>Academic writing, reproducible and open research</h3>
            <p>Use LaTeX for scientific writing, keep source files and references together, and prepare research that others can review and reproduce.</p>
          </div>

          <div className={`${styles.macbookScene} ${styles.academicDevice}`} aria-label="coLab academic writing and reproducible open research workspace displayed on a MacBook">
            <div className={styles.macbookDisplay}>
              <span className={styles.macbookCamera} aria-hidden="true" />
              <div className={styles.macbookScreen}>
                <div className={`${styles.screenCanvas} ${styles.academicScreen}`}>
                  <aside className={styles.academicSidebar}>
                    <strong>Research paper</strong>
                    <small>FILES</small>
                    <span className={styles.academicFileActive}>main.tex</span>
                    <span>references.bib</span>
                    <span>methods.tex</span>
                    <span>figures</span>
                  </aside>
                  <div className={styles.academicWorkspace}>
                    <header><span className={styles.latexMark}>L<span>A</span>T<span>E</span>X</span><small>main.tex · saved</small><button type="button" tabIndex="-1">Compile</button></header>
                    <div className={styles.academicEditor}>
                      <pre><code><i>01</i> \documentclass&#123;article&#125;{"\n"}<i>02</i> \usepackage&#123;graphicx&#125;{"\n"}<i>03</i> \title&#123;Reproducible AI Research&#125;{"\n"}<i>04</i> \begin&#123;document&#125;{"\n"}<i>05</i> \maketitle{"\n"}<i>06</i> \section&#123;Method&#125;{"\n"}<i>07</i> Results are linked to the project.{"\n"}<i>08</i> \end&#123;document&#125;</code></pre>
                    </div>
                    <div className={styles.academicPreview}>
                      <small>PDF PREVIEW</small>
                      <h4>Reproducible AI Research</h4>
                      <p>Method</p>
                      <span />
                      <span />
                      <span className={styles.shortLine} />
                      <div className={styles.researchStatus}><i /><div><small>OPEN RESEARCH</small><strong>Source and references ready to share</strong></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.macbookBase} aria-hidden="true"><span /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HostedPreviewsSection() {
  return (
    <section className={styles.previewEditorialSection}>
      <div className="shell shell-wide">
        <div className={styles.chatEditorialLayout}>
          <div className={`${styles.macbookScene} ${styles.hostedPreviewDevice}`} aria-label="Hosted product preview with reviewer annotations displayed on a MacBook">
            <div className={styles.macbookDisplay}>
              <span className={styles.macbookCamera} aria-hidden="true" />
              <div className={styles.macbookScreen}>
                <div className={styles.screenCanvas}>
                  <HostedPreviewDemo />
                </div>
              </div>
            </div>
            <div className={styles.macbookBase} aria-hidden="true"><span /></div>
          </div>

          <div className={styles.chatEditorialCopy}>
            <h3>Hosted previews and annotations</h3>
            <p>Host HTML previews, invite viewers with controlled access, and attach comments to the exact interface areas that require changes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className={`section ${styles.comparisonSection}`}><div className="shell">
      <SectionHead eyebrow="Capability comparison" title="Compare project workspaces" lead="See how project information, specialist tools, access, and AI are handled in each setup." />
      <div className={styles.tableWrap}><table className={styles.comparison}><thead><tr><th>Capability</th><th>Basic task manager</th><th>Multiple separate tools</th><th>coLab</th></tr></thead><tbody>{colabComparison.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
    </div></section>
  );
}

export function TrustSection() {
  return (
    <section className={`section ${styles.trustSection}`}><div className="shell"><div className={styles.trustLayout}>
      <div><p className="eyebrow">Access control</p><h2 className="section-title">Access is defined by role and project</h2><p className="lead">Workspace members, project guests, preview reviewers, and AI agents receive separate access scopes.</p></div>
      <div className={styles.trustList}>{colabTrust.map(([name, detail]) => <article key={name}><LockIcon /><div><h3>{name}</h3><p>{detail}</p></div></article>)}</div>
    </div></div></section>
  );
}

export function FaqSection() {
  return (
    <section className={`section section-subtle ${styles.faqSection}`}><div className="shell">
      <details className={styles.faqSectionDisclosure}>
        <summary><div><h2 className="section-title">FAQ</h2></div><span>+</span></summary>
        <div className={styles.faqGrid}>{colabFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </details>
    </div></section>
  );
}

export function AccessSection() {
  return (
    <section className="section" id="access">
      <div className="shell flex flex-col items-center text-center">
        <p className="eyebrow">{colabAccess.eyebrow}</p>
        <h2 className="section-title max-w-3xl">{colabAccess.title}</h2>
        <p className="lead lead-center mt-3 max-w-2xl">{colabAccess.lead}</p>
        <a className="btn btn-gradient btn-lg mt-7" href={colabLinks.signup} target="_blank" rel="noreferrer">{colabAccess.action}<ArrowIcon /></a>
      </div>
    </section>
  );
}
