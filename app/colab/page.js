import {
  FaqList,
  FeatureBento,
  ProductClosing,
  ProductHero,
  StepList,
} from "../components/ProductSections";
import {
  colabAudiences,
  colabCapabilities,
  colabFaqs,
  colabHowItWorks,
  colabLimits,
  colabLinks,
  getProduct,
} from "../data/site";

const colab = getProduct("colab");

export const metadata = {
  title: "coLab — the plan, the work, and the reasons, in one place",
  description:
    "A timeline with real dates, tasks that carry their own context, and a written record of what the team decided and why.",
  alternates: { canonical: "/colab" },
};

export default function ColabPage() {
  return (
    <main id="main" data-brand={colab.accent}>
      <ProductHero
        product={colab}
        eyebrow="Open for early teams"
        headline="The plan, the work, and the reasons — in one place"
        lead={colab.description}
        actions={[
          { label: "Create an account", href: colabLinks.signup, external: true },
          { label: "How it works", href: "#how" },
        ]}
      />

      <FeatureBento
        eyebrow="What it does"
        title="Built around dates and decisions, not a backlog"
        items={colabCapabilities}
        subtle
      />

      <div id="how">
        <StepList
          eyebrow="How it works"
          title="Start with the dates, then hang the work off them"
          steps={colabHowItWorks}
        />
      </div>

      <section className="section section-subtle">
        <div className="shell">
          <p className="eyebrow">Being straight about it</p>
          <h2 className="section-title max-w-2xl">What coLab does not do</h2>
          <p className="lead">
            The shape of the tool rules some things out. Better said here than
            discovered in week three.
          </p>
          <ul className="check-list mt-10 max-w-2xl">
            {colabLimits.map((limit) => (
              <li key={limit}>
                <span
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--brand)]"
                  aria-hidden="true"
                />
                {limit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Who it is for</p>
          <h2 className="section-title max-w-2xl">
            Teams who have to remember why
          </h2>
          <div className="bento mt-12">
            {colabAudiences.map((entry) => (
              <article className="card card-hover" key={entry.audience}>
                <h3 className="text-lg">{entry.audience}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.capabilities.map((capability) => (
                    <li className="chip" key={capability}>
                      {capability}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqList
        eyebrow="Questions"
        title="The things people ask first"
        faqs={colabFaqs}
        subtle
      />

      <ProductClosing
        product={colab}
        title="Bring your next project into it"
        body="Open a workspace, put the milestones you are actually working towards on a timeline, and see whether the team stops asking what was decided."
        action={{
          label: "Create an account",
          href: colabLinks.signup,
          external: true,
        }}
      />
    </main>
  );
}
