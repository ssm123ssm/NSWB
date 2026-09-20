import Image from "next/image";
import {
  ArrowIcon,
  CheckIcon,
  DocIcon,
  LayersIcon,
  LockIcon,
  NeuralIcon,
  SearchIcon,
} from "./Icons";
import ProductName from "./ProductName";
import { getProduct } from "../data/site";
import {
  colabFeatureGroups,
  colabComparison,
  colabFaqs,
  colabPlans,
  colabProofs,
  colabPromises,
  colabReasons,
  colabTrust,
  colabWorkflow,
} from "../data/colab-page";
import styles from "./ColabLanding.module.css";
import ColabPlanFinder from "./ColabPlanFinder";
import ColabFeatureCards from "./ColabFeatureCards";
import ColabAgentExecutionDemo from "./ColabAgentExecutionDemo";

const colab = getProduct("colab");

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className={styles.sectionHead}>
      <p className="eyebrow">{eyebrow}</p>
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
          <span className="brand-tag brand-tag-lg"><ProductName product={colab} /></span>
          <p className={styles.heroEyebrow}>Project management, collaboration, knowledge, and AI</p>
          <h1>An integrated digital workspace for project work.</h1>
          <p className={styles.heroLead}>coLab is an advanced digital workspace where individuals and teams can organize projects, coordinate work, communicate with collaborators, store project knowledge, and use AI to assist with project tasks.</p>
          <div className={styles.heroActions}>
            <a className="btn btn-gradient btn-lg" href="#pricing">View plans <ArrowIcon /></a>
            <a className="btn btn-bordered btn-lg" href="#how-it-works">View workflow</a>
          </div>
        </div>
        <div className={styles.heroShowcase}>
          <ColabAgentExecutionDemo />
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
    <section className="section section-subtle">
      <div className="shell">
        <SectionHead eyebrow="Intended users" title="Who coLab is made for" lead="coLab supports individuals and teams that manage projects, knowledge, collaborators, and AI-assisted tasks." />
        <ol className={styles.whoForList}>
          {audiences.map((audience, index) => (
            <li key={audience}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{audience}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PromiseSection() {
  return (
    <section className="section"><div className="shell">
      <SectionHead eyebrow="Core outcomes" title="Three functions provided by coLab" lead="coLab centralizes project records, presents project context, and supports project execution with AI." />
      <div className={styles.promiseGrid}>{colabPromises.map((item) => <article className="card card-hover" key={item.number}><span className={styles.cardNumber}>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><small>{item.proof}</small></article>)}</div>
    </div></section>
  );
}

export function AudienceSection() {
  return (
    <section className="section section-subtle"><div className="shell shell-wide">
      <SectionHead eyebrow="Main features" title="Features grouped by workflow" lead="Each group lists capabilities that are relevant to a specific type of work. All groups can receive access to any available capability." />
      <ColabFeatureCards groups={colabFeatureGroups} />
    </div></section>
  );
}

export function WorkflowSection() {
  return (
    <section className="section" id="how-it-works"><div className="shell">
      <SectionHead eyebrow="Workflow example" title="Preview feedback, task creation, and decision recording" lead="The workflow connects feedback to its source, related discussion, assigned task, completion status, and final decision." />
      <div className={styles.workflow}>
        <div className={styles.workflowMedia}>
          <div className={styles.previewChrome}><span /><span /><span /><small>preview.neurasense.io/onboarding</small></div>
          <div className={styles.previewPage}><span className={styles.previewLabel}>PRODUCT PREVIEW</span><h3>Research project workspace</h3><p>One comment is attached to this heading.</p><button type="button">Create project</button><span className={styles.previewPin}>1</span></div>
          <div className={styles.previewThread}><small>PRIYA · REVIEWER</small><strong>Replace the heading with a description of the research scope.</strong><p>Suggested text: “Manage research tasks, documents, and decisions.”</p><span>Convert to task →</span></div>
        </div>
        <ol>{colabWorkflow.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
      </div>
    </div></section>
  );
}

export function WhySection() {
  const icons = [DocIcon, NeuralIcon, SearchIcon, CheckIcon, LayersIcon, LockIcon];
  return (
    <section className="section section-subtle"><div className="shell">
      <SectionHead eyebrow="Why choose coLab" title="Reasons to choose coLab" lead="coLab combines project management, communication, knowledge storage, specialist tools, access control, and project-scoped AI." />
      <div className={styles.whyGrid}>{colabReasons.map((reason, index) => { const Icon = icons[index]; return <article className="card card-hover" key={reason.title}><span><Icon className="h-7 w-7" /></span><h3>{reason.title}</h3><p>{reason.description}</p></article>; })}</div>
    </div></section>
  );
}

export function ComparisonSection() {
  return (
    <section className="section"><div className="shell">
      <SectionHead eyebrow="Capability comparison" title="coLab, basic task managers, and separate tools" />
      <div className={styles.tableWrap}><table className={styles.comparison}><thead><tr><th>Capability</th><th>Basic task manager</th><th>Separate tools</th><th>coLab</th></tr></thead><tbody>{colabComparison.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
    </div></section>
  );
}

export function ProductProofSection() {
  return (
    <section className="section section-subtle"><div className="shell shell-wide">
      <SectionHead eyebrow="Product interfaces" title="coLab product views" lead="These images show the dashboard, milestones, Notes, previews, agent chat, and decision log in the current coLab interface." />
      <div className={styles.proofGrid}>{colabProofs.map((proof) => <article className={`${styles.proofCard} ${styles[proof.size]}`} key={proof.key}><div><small>COLAB INTERFACE</small><h3>{proof.title}</h3><p>{proof.description}</p></div><div className={styles.captureSlot} data-capture={proof.key}><Image src={proof.image} alt={`${proof.title} in coLab`} width={1440} height={900} /></div></article>)}</div>
    </div></section>
  );
}

export function TrustSection() {
  return (
    <section className="section"><div className="shell"><div className={styles.trustLayout}>
      <div><p className="eyebrow">Access control</p><h2 className="section-title">Access is defined by role and project</h2><p className="lead">Workspace members, project guests, preview reviewers, and AI agents receive separate access scopes.</p></div>
      <div className={styles.trustList}>{colabTrust.map(([name, detail]) => <article key={name}><LockIcon /><div><h3>{name}</h3><p>{detail}</p></div></article>)}</div>
    </div></div></section>
  );
}

export function FaqSection() {
  return (
    <section className="section section-subtle"><div className="shell"><SectionHead eyebrow="FAQ" title="Product, access, and plan information" /><div className={styles.faqGrid}>{colabFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
  );
}

export function PricingSection() {
  return (
    <section className="section" id="pricing"><div className="shell">
      <SectionHead eyebrow="Example prices in USD" title="Plans and custom configurations" lead="Registration collects information about the user, projects, collaborators, required capabilities, and expected AI use. coLab then recommends a package or prepares a custom configuration. These prices are provisional examples." />
      <div className={styles.planSteps}><span><b>1</b> Provide requirements</span><ArrowIcon /><span><b>2</b> Review the recommendation</span><ArrowIcon /><span><b>3</b> Activate selected capabilities</span></div>
      <ColabPlanFinder />
      <div className={styles.pricingGrid}>{colabPlans.map((plan) => <article className={`card ${plan.featured ? "card-featured" : ""}`} key={plan.name}><div className={styles.planHead}><h3>{plan.name}</h3>{plan.featured ? <span className="chip">Custom configuration</span> : null}</div><p className={styles.price}>{plan.price}</p><small>{plan.period}</small><p>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul><a className={plan.featured ? "btn btn-gradient" : "btn btn-bordered"} href="https://colab.neurasense.io/signup" target="_blank" rel="noreferrer">{plan.action}<ArrowIcon /></a></article>)}</div>
      <div className={styles.pricingClose}><h2>Configure coLab for your project requirements.</h2><p>Provide your project, team, integration, storage, compute, and AI requirements to receive a plan recommendation.</p><a className="btn btn-lg bg-white text-[color:var(--text)] hover:opacity-90" href="https://colab.neurasense.io/signup" target="_blank" rel="noreferrer">Start plan selection <ArrowIcon /></a></div>
    </div></section>
  );
}
