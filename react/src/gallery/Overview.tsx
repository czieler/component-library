
export function Overview() {
  return (
    <>
      <p className="eyebrow">A small component library</p>
      <h1>Reusable Components, built from real product work.</h1>
      <p className="hero-description">
        A growing collection of reusable, accessible UI components and
        interaction patterns extracted and generalized from production-style
        application development.
      </p>
      <section className="overview-panel">
        <div>
          <h2>Reusable Components</h2>
          <p>
            The same design language is implemented with React + TypeScript and
            Vanilla JavaScript, making the underlying browser behavior and
            framework-specific approaches easy to compare.
          </p>
        </div>
        <dl className="project-facts">
          <div>
            <dt>Implementations</dt>
            <dd>
              React + TypeScript
              <br />
              Vanilla JavaScript
            </dd>
          </div>
          <div>
            <dt>Foundation</dt>
            <dd>
              Shared design tokens
              <br />
              Responsive behavior
            </dd>
          </div>
          <div>
            <dt>Quality bar</dt>
            <dd>
              Accessible labels
              <br />
              Keyboard interaction
            </dd>
          </div>
          <div>
            <dt>API design</dt>
            <dd>
              Application-independent
              <br />
              Consumer-controlled
            </dd>
          </div>
        </dl>
      </section>
      <section className="why-section">
        <h2>Why this exists</h2>
        <p>
          Useful Reusable Components often begin inside applications. This
          project demonstrates identifying those patterns, removing
          application-specific coupling, and turning them into reusable
          components that can be carried into future products.
        </p>
      </section>
    </>
  );
}
