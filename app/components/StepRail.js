/**
 * An ordered explainer on a rail, with a packet descending it. Vault uses it
 * for what happens to a file; coLab for what happens to a project.
 *
 * It was Vault's `VaultFlow` first. The second caller wanted the identical
 * markup with different words, so the component moved here and the CSS lost
 * its `vault-` prefix rather than being copied under a `colab-` one — see
 * `.flow` in app/globals.css.
 *
 * A server component, like everything that renders it: the rail is markup and
 * CSS, so a page carrying one still ships no client JS of its own.
 *
 * Steps are `{ title, description }`, in the order they happen — the numbers
 * are printed from the index, so reordering the data reorders the count.
 */
export default function StepRail({ steps }) {
  return (
    <div className="flow">
      <span className="flow-rail" aria-hidden="true" />
      <span className="flow-pulse" aria-hidden="true" />

      {steps.map((step, index) => (
        <div className="reveal flow-step" key={step.title}>
          <span className="flow-node" aria-hidden="true" />
          <p className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.16em] text-brand">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-base">{step.title}</h3>
          <p className="mt-2 text-[0.925rem] leading-relaxed text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
