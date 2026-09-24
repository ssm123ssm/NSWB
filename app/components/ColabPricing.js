import { ArrowIcon, CheckIcon } from "./Icons";
import { colabPlans } from "../data/colab-page";
import ColabPlanFinder from "./ColabPlanFinder";
import styles from "./ColabLanding.module.css";

/**
 * Preserved coLab pricing UI. This component is intentionally not connected
 * to the public coLab page while access is limited to requests and invitations.
 */
export default function Pricing() {
  return (
    <section className={`section ${styles.pricingSection}`} id="pricing">
      <div className="shell">
        <details className={styles.pricingGuideDisclosure}>
          <summary>
            <h2 className="section-title">Plans and custom configurations</h2>
            <span>+</span>
          </summary>
          <div className={styles.pricingGuideContent}>
            <p className="lead max-w-2xl">Registration collects information about the user, projects, collaborators, required capabilities, and expected AI use. coLab then recommends a package or prepares a custom configuration. These prices are provisional examples.</p>
            <div className={styles.planSteps}>
              <span><b>1</b> Provide requirements</span>
              <ArrowIcon />
              <span><b>2</b> Review the recommendation</span>
              <ArrowIcon />
              <span><b>3</b> Activate selected capabilities</span>
            </div>
            <ColabPlanFinder />
          </div>
        </details>
        <div className={styles.pricingGrid}>
          {colabPlans.map((plan) => (
            <article className={`card ${plan.featured ? "card-featured" : ""}`} key={plan.name}>
              <div className={styles.planHead}>
                <h3>{plan.name}</h3>
                {plan.featured ? <span className="chip">Custom configuration</span> : null}
              </div>
              <p className={styles.price}>{plan.price}</p>
              <small>{plan.period}</small>
              <p>{plan.description}</p>
              <ul>{plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
              <a className={plan.featured ? "btn btn-gradient" : "btn btn-bordered"} href="https://colab.neurasense.io/signup" target="_blank" rel="noreferrer">{plan.action}<ArrowIcon /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
