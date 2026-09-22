import {
  ColabHero,
  ColabChatSection,
  AcademicResearchSection,
  HostedPreviewsSection,
  ComparisonSection,
  FaqSection,
  MainFeaturesSection,
  PricingSection,
  TrustSection,
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
      <ColabChatSection />
      <WhoForSection />
      <AcademicResearchSection />
      <TrustSection />
      <HostedPreviewsSection />
      <MainFeaturesSection />
      <ComparisonSection />
      <FaqSection />
      <PricingSection />
    </main>
  );
}
