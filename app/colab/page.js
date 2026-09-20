import {
  AudienceSection,
  ColabHero,
  ComparisonSection,
  FaqSection,
  PricingSection,
  ProductProofSection,
  PromiseSection,
  TrustSection,
  WhySection,
  WorkflowSection,
  WhoForSection,
} from "../components/ColabLanding";
import { getProduct } from "../data/site";

const colab = getProduct("colab");

export const metadata = {
  title: "coLab — digital workspace for project management and collaboration",
  description:
    "Organize projects, coordinate work, communicate with collaborators, store project knowledge, and use AI to assist with project tasks.",
  alternates: { canonical: "/colab" },
};

export default function ColabPage() {
  return (
    <main id="main" data-brand={colab.accent}>
      <ColabHero />
      <WhoForSection />
      <AudienceSection />
      <WorkflowSection />
      <WhySection />
      <PromiseSection />
      <ComparisonSection />
      <ProductProofSection />
      <TrustSection />
      <FaqSection />
      <PricingSection />
    </main>
  );
}
