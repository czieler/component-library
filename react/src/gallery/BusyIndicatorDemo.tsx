import { BusyIndicator } from "../components/BusyIndicator";
import { ImplementationDetails } from "./ImplementationDetails";
export function BusyIndicatorDemo() {
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Status pattern</p>
        <h2>Busy Indicator</h2>
        <p>One consistent spinner-and-message treatment for loading, saving, importing, processing, and other busy states.</p>
      </div>
      <div className="component-showcase">
        <BusyIndicator message="Loading records…" />
        <BusyIndicator message="Saving changes…" />
        <BusyIndicator message="Processing upload…" />
        <button type="button" className="button button--primary" disabled><BusyIndicator inline message="Processing…" /></button>
        <ImplementationDetails>
          <p><code>{`<BusyIndicator message="Saving changes…" />`}</code></p>
          <p>The spinner uses <code>currentColor</code>, so it automatically matches the message text. The component exposes a polite live status for assistive technology.</p>
        </ImplementationDetails>
      </div>
    </>
  );
}
