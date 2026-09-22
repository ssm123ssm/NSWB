import styles from "./ColabLanding.module.css";

export default function ColabFeatureCards({ features }) {
  return (
    <ol className={styles.mainFeatureList}>
      {features.map((feature) => (
        <li className={styles.mainFeatureItem} key={feature.id}>
          <span>{feature.number}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </li>
      ))}
    </ol>
  );
}
