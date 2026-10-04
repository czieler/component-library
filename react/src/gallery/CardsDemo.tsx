import { Card } from "../components/Card";
import { ImplementationDetails } from "./ImplementationDetails";
export function CardsDemo() {
  return <>
    <div className="section-heading"><p className="eyebrow">Layout</p><h2>Cards</h2><p className="lede">A lightweight surface wrapper for generic grouped content.</p></div>
    <div className="component-showcase"><section className="demo-section"><div className="component-card-demo-grid">
      <Card><h3>Default card</h3><p>Standard padding and border.</p></Card>
      <Card elevated padding="compact"><h3>Elevated card</h3><p>Compact spacing with a soft shadow.</p></Card>
    </div><ImplementationDetails><p>Use Card only for generic surface treatment. Product-specific layouts should remain in the consuming application.</p></ImplementationDetails></section></div>
  </>;
}
