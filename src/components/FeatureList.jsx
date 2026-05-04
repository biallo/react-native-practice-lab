export function FeatureList({ features }) {
  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <article className="feature-card" key={feature.title}>
          <h4>{feature.title}</h4>
          <p>{feature.body}</p>
        </article>
      ))}
    </div>
  );
}
