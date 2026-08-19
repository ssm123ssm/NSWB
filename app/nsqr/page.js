import {
  FaqList,
  FeatureBento,
  PricingCards,
  ProductClosing,
  ProductHero,
} from "../components/ProductSections";
import {
  getProduct,
  nsqrCapabilities,
  nsqrContentTypes,
  nsqrFaqs,
  nsqrLinks,
  nsqrPlans,
} from "../data/site";

const nsqr = getProduct("nsqr");

export const metadata = {
  title: "NSQR — QR codes you can edit, track and brand",
  description:
    "Print a QR code once and keep changing where it goes. Scan analytics by day, country and device, passcode protection, and static codes free forever.",
  alternates: { canonical: "/nsqr" },
};

export default function NsqrPage() {
  return (
    <main id="main" data-brand={nsqr.accent}>
      <ProductHero
        product={nsqr}
        eyebrow="Free to start"
        headline="Print it once. Change where it goes for as long as you like."
        lead={nsqr.description}
        actions={[
          { label: "Start free", href: nsqrLinks.register, external: true },
          {
            label: "Try the generator",
            href: nsqrLinks.generator,
            external: true,
          },
        ]}
      />

      <FeatureBento
        eyebrow="What it does"
        title="A code that stays useful after it is printed"
        lead="The print is permanent. The destination does not have to be."
        items={nsqrCapabilities}
        subtle
      />

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Content types</p>
          <h2 className="section-title max-w-2xl">Eight things a code can be</h2>
          <p className="lead">
            Pick what the code should do, and the form changes to match it.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {nsqrContentTypes.map((type) => (
              <li className="chip h-9 px-4 text-sm" key={type.name}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PricingCards
        eyebrow="Pricing"
        title="Free forever, or $2.99 when you need more"
        lead="No card to try it. The free plan is not a trial that expires into nothing."
        plans={nsqrPlans}
      />

      <FaqList eyebrow="Questions" title="The things people ask first" faqs={nsqrFaqs} subtle />

      <ProductClosing
        product={nsqr}
        title="Make one and see"
        body="It takes about a minute, and you do not need an account to find out whether it does what you want."
        action={{ label: "Start free", href: nsqrLinks.register, external: true }}
      />
    </main>
  );
}
