import { useState } from "react";
import { Button } from "../components/Button";
import { ImplementationDetails } from "./ImplementationDetails";
export function ButtonsDemo() {
  const [loading, setLoading] = useState(false);
  return <>
    <div className="section-heading"><p className="eyebrow">Actions</p><h2>Buttons</h2><p className="lede">Consistent action variants, sizes, disabled states, icons, and in-button loading.</p></div>
    <div className="component-showcase"><section className="demo-section">
      <h3>Variants and states</h3>
      <div className="state-grid">
        <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button><Button size="small">Small</Button>
        <Button loading={loading} loadingLabel="Saving…" onClick={() => {
          setLoading(true);
          window.setTimeout(() => setLoading(false), 900);
        }}>Save changes</Button>
        <Button loading aria-label="Finishing setup">Finishing setup</Button>
      </div>
      <ImplementationDetails><p><code>loading</code> disables the button and renders the shared spinner inside it. Omit <code>loadingLabel</code> for spinner-only progress.</p></ImplementationDetails>
    </section></div>
  </>;
}
