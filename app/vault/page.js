import {
  FaqList,
  FeatureBento,
  ProductClosing,
  ProductHero,
  StepList,
} from "../components/ProductSections";
import {
  getProduct,
  vaultAudiences,
  vaultCapabilities,
  vaultFaqs,
  vaultHowItWorks,
  vaultLimits,
} from "../data/site";

const vault = getProduct("vault");

export const metadata = {
  title: "Vault — zero-trust storage built on client-side encryption",
  description:
    "Files encrypted on your own device before anything is sent. We hold the scrambled copy and never receive the key, so reading your work is not something we could do if asked.",
  alternates: { canonical: "/vault" },
};

export default function VaultPage() {
  return (
    <main id="main" data-brand={vault.accent}>
      <ProductHero
        product={vault}
        eyebrow="By request"
        headline="Storage where trusting us is not part of the threat model"
        lead={vault.description}
        actions={[
          { label: "Request access", contact: true },
          { label: "How it works", href: "#how" },
        ]}
      />

      <FeatureBento
        eyebrow="What it does"
        title="Built for the files you cannot afford to leak"
        items={vaultCapabilities}
        subtle
      />

      <div id="how">
        <StepList
          eyebrow="How it works"
          title="Three steps, and the key never leaves you"
          lead="The guarantee is a property of the design rather than a promise about our staff."
          steps={vaultHowItWorks}
        />
      </div>

      <section className="section section-subtle">
        <div className="shell">
          <p className="eyebrow">Being straight about it</p>
          <h2 className="section-title max-w-2xl">What Vault does not do</h2>
          <p className="lead">
            The same design that keeps us out keeps us from helping in a few
            places. Those are here rather than in the small print.
          </p>
          <ul className="check-list mt-10 max-w-2xl">
            {vaultLimits.map((limit) => (
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
            Teams where a leak is not recoverable
          </h2>
          <div className="bento mt-12">
            {vaultAudiences.map((entry) => (
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
        faqs={vaultFaqs}
        subtle
      />

      <ProductClosing
        product={vault}
        title="Tell us what you need to keep private"
        body="Vault is granted rather than signed up for. Say what you are storing and who needs to open it, and we will tell you whether it fits."
        action={{ label: "Request access" }}
      />
    </main>
  );
}
