import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import {
  ArrowIcon,
  CalendarIcon,
  ChartIcon,
  CheckIcon,
  DocIcon,
  ExternalIcon,
  LayersIcon,
  LockIcon,
  NeuralIcon,
  PaletteIcon,
  ShieldIcon,
  SwapIcon,
  TagIcon,
  UsersIcon,
} from "./Icons";
import ProductName from "./ProductName";

/**
 * The shared furniture for the three product pages. Every product page is the
 * same sequence of these sections in a different order with different data, so
 * a change to the language lands on all three at once rather than being ported
 * between them.
 *
 * Every section expects a `data-brand` ancestor — the page sets it once on its
 * <main> and the product's hue resolves for everything inside.
 */

const icons = {
  swap: SwapIcon,
  chart: ChartIcon,
  lock: LockIcon,
  layers: LayersIcon,
  neural: NeuralIcon,
  shield: ShieldIcon,
  doc: DocIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  palette: PaletteIcon,
  tag: TagIcon,
  users: UsersIcon,
};

/* ---------------------------------------------------------------- hero -- */
export function ProductHero({ product, eyebrow, headline, lead, actions = [] }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="shell pb-16 pt-20 md:pb-20 md:pt-24">
        {/* The lockup leads the page — it is the product's logo. */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="brand-tag brand-tag-lg">
            <ProductName product={product} />
          </span>
          <span
            className={`chip ${product.status === "live" ? "chip-dot" : "chip-neutral"}`}
          >
            {product.status === "live" ? "Live" : "In development"}
          </span>
          {eyebrow && <span className="chip chip-neutral">{eyebrow}</span>}
        </div>

        <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5.4vw,4rem)]">
          {headline}
        </h1>
        <p className="lead text-[clamp(1rem,1.5vw,1.1875rem)]">{lead}</p>

        {actions.length > 0 && (
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {actions.map((action, index) =>
              action.contact ? (
                <ContactButton
                  className={
                    index === 0
                      ? "btn btn-gradient btn-lg"
                      : "btn btn-bordered btn-lg"
                  }
                  key={action.label}
                  subject={product.name}
                  intent={action.intent ?? "access"}
                >
                  {action.label}
                </ContactButton>
              ) : (
                <a
                  className={
                    index === 0
                      ? "btn btn-gradient btn-lg"
                      : "btn btn-bordered btn-lg"
                  }
                  href={action.href}
                  key={action.label}
                  {...(action.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {action.label}
                  {action.external ? <ExternalIcon /> : <ArrowIcon />}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ features -- */
export function FeatureBento({ eyebrow, title, lead, items, subtle = false }) {
  return (
    <section className={`section ${subtle ? "section-subtle" : ""}`}>
      <div className="shell">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title max-w-2xl">{title}</h2>
        {lead && <p className="lead">{lead}</p>}

        <div className="bento mt-12">
          {items.map((item) => {
            const Icon = icons[item.icon] ?? LayersIcon;
            return (
              <article className="card card-hover" key={item.title}>
                <span className="icon-tile">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p className="mt-2 text-base leading-[1.5] text-muted">
                  {item.description}
                </p>
                {item.scenario && (
                  <p className="mt-4 rounded-token bg-[color:var(--bg-subtle)] p-3.5 text-sm leading-[1.43] text-muted">
                    {item.scenario}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- steps -- */
export function StepList({ eyebrow, title, lead, steps, subtle = false }) {
  return (
    <section className={`section ${subtle ? "section-subtle" : ""}`}>
      <div className="shell">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title max-w-2xl">{title}</h2>
        {lead && <p className="lead">{lead}</p>}

        <ol className="steps mt-12">
          {steps.map((step, index) => (
            <li className="step" data-active={index === 0} key={step.title}>
              <h3 className="text-lg">{step.title}</h3>
              <p className="mt-2 text-base leading-[1.5] text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- pricing -- */
export function PricingCards({ eyebrow, title, lead, plans }) {
  return (
    <section className="section">
      <div className="shell">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title max-w-2xl">{title}</h2>
        {lead && <p className="lead">{lead}</p>}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
          {plans.map((plan, index) => (
            <article
              className={`card ${index === 1 ? "card-featured" : ""}`}
              key={plan.name}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg">{plan.name}</h3>
                {plan.tag && <span className="chip">{plan.tag}</span>}
              </div>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="stat-value">{plan.price}</span>
                <span className="text-sm text-faint">{plan.period}</span>
              </p>
              <ul className="check-list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon className="h-4 w-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- faq -- */
export function FaqList({ eyebrow, title, faqs, subtle = false }) {
  return (
    <section className={`section ${subtle ? "section-subtle" : ""}`}>
      <div className="shell">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title max-w-2xl">{title}</h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article className="card" key={faq.question}>
              <h3 className="text-base">{faq.question}</h3>
              <p className="mt-2.5 text-base leading-[1.5] text-muted">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- closing -- */
export function ProductClosing({ product, title, body, action }) {
  return (
    <section className="section-tight pb-20">
      <div className="shell">
        <div className="gradient-panel">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-[clamp(2.25rem,3.6vw,3rem)]">
              {title}
            </h2>
            <p className="mt-4 text-base leading-[1.5] text-white/85">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {action?.href ? (
                <a
                  className="btn btn-lg bg-white text-[color:var(--text)] hover:opacity-90"
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {action.label}
                </a>
              ) : (
                <ContactButton
                  className="btn btn-lg bg-white text-[color:var(--text)] hover:opacity-90"
                  subject={product.name}
                  intent="access"
                >
                  {action?.label ?? "Request access"}
                </ContactButton>
              )}
              <Link
                className="btn btn-lg border-2 border-white/40 text-white hover:border-white"
                href="/products"
              >
                See the other products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
