import { Alert } from "../components/Alert";
export function AlertsDemo() {
  return <>
    <div className="section-heading"><p className="eyebrow">Feedback</p><h2>Alerts</h2><p className="lede">Accessible inline status, success, warning, and error messaging.</p></div>
    <div className="component-showcase"><section className="demo-section">
      <div className="state-grid"><Alert>Informational status message.</Alert><Alert variant="success" title="Saved">Your changes were saved.</Alert><Alert variant="warning" title="Check this">Review this value before continuing.</Alert><Alert variant="error" title="Could not save">Try again or contact support.</Alert></div>
    </section></div>
  </>;
}
