import {
  ArrowIcon,
  CheckIcon,
  LockIcon,
} from "./Icons";
import {
  colabMainFeatures,
  colabComparison,
  colabFaqs,
  colabPlans,
  colabTrust,
} from "../data/colab-page";
import styles from "./ColabLanding.module.css";
import ColabPlanFinder from "./ColabPlanFinder";
import ColabFeatureCards from "./ColabFeatureCards";
import ColabAgentExecutionDemo from "./ColabAgentExecutionDemo";
import HostedPreviewDemo from "./HostedPreviewDemo";

function ColabCommunicationVisual() {
  return (
    <div className={styles.chatEditorialLayout}>
      <div className={styles.macbookScene} aria-label="Animated coLab chat displayed on a MacBook">
        <div className={styles.macbookDisplay}>
          <span className={styles.macbookCamera} aria-hidden="true" />
          <div className={styles.macbookScreen}>
            <ColabAgentExecutionDemo editorial />
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
            <a className="btn btn-gradient btn-lg" href="#pricing">View plans <ArrowIcon /></a>
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
            <p>Use Overleaf and LaTeX for scientific writing, keep source files and references together, and prepare research that others can review and reproduce.</p>
          </div>

          <div className={`${styles.macbookScene} ${styles.academicDevice}`} aria-label="coLab academic writing and reproducible open research workspace displayed on a MacBook">
            <div className={styles.macbookDisplay}>
              <span className={styles.macbookCamera} aria-hidden="true" />
              <div className={`${styles.macbookScreen} ${styles.academicScreen}`}>
                <div className={styles.academicScreenCanvas}>
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
                <HostedPreviewDemo />
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

export function PricingSection() {
  return (
    <section className={`section ${styles.pricingSection}`} id="pricing"><div className="shell">
      <details className={styles.pricingGuideDisclosure}>
        <summary><h2 className="section-title">Plans and custom configurations</h2><span>+</span></summary>
        <div className={styles.pricingGuideContent}>
          <p className="lead max-w-2xl">Registration collects information about the user, projects, collaborators, required capabilities, and expected AI use. coLab then recommends a package or prepares a custom configuration. These prices are provisional examples.</p>
          <div className={styles.planSteps}><span><b>1</b> Provide requirements</span><ArrowIcon /><span><b>2</b> Review the recommendation</span><ArrowIcon /><span><b>3</b> Activate selected capabilities</span></div>
          <ColabPlanFinder />
        </div>
      </details>
      <div className={styles.pricingGrid}>{colabPlans.map((plan) => <article className={`card ${plan.featured ? "card-featured" : ""}`} key={plan.name}><div className={styles.planHead}><h3>{plan.name}</h3>{plan.featured ? <span className="chip">Custom configuration</span> : null}</div><p className={styles.price}>{plan.price}</p><small>{plan.period}</small><p>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul><a className={plan.featured ? "btn btn-gradient" : "btn btn-bordered"} href="https://colab.neurasense.io/signup" target="_blank" rel="noreferrer">{plan.action}<ArrowIcon /></a></article>)}</div>
    </div></section>
  );
}
