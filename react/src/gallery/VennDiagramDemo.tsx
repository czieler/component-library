import { VennDiagram } from "../components/VennDiagram";
import { ImplementationDetails } from "./ImplementationDetails";
export function VennDiagramDemo() {
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Data visualization</p>
        <h2>Venn diagrams for focused 2–3 item comparisons.</h2>
        <p className="lede">Labels stay outside the circles with leader lines so names remain readable at responsive sizes.</p>
      </div>
      <div className="component-showcase">
        <section className="demo-section">
          <h3>Two-item comparison</h3>
          <p className="component-description">Use for a direct comparison between two or three datasets, groups, or sets.</p>
          <div className="venn-demo-card">
            <VennDiagram items={[{ id: "alpha", label: "Set Alpha" }, { id: "beta", label: "Set Beta" }]} sharedAllCount={4} />
          </div>
        </section>
        <section className="demo-section">
          <h3>Three-item comparison</h3>
          <p className="component-description">Use for a focused three-way comparison. Pair counts are optional; the center count represents items shared by all three.</p>
          <div className="venn-demo-card">
            <VennDiagram
              items={[{ id: "alpha", label: "Set Alpha" }, { id: "beta", label: "Set Beta" }, { id: "gamma", label: "Set Gamma" }]}
              sharedAllCount={1}
              pairCounts={{
                "alpha|beta": 4,
                "alpha|gamma": 2,
                "beta|gamma": 2
              }}
            />
          </div>
          <ImplementationDetails>
            <p><code>items</code> accepts exactly two or three entries. Each item can override its fill/stroke. <code>sharedAllCount</code> and <code>pairCounts</code> are optional display values; the consuming application owns the set/intersection calculation.</p>
          </ImplementationDetails>
        </section>
      </div>
    </>
  );
}
