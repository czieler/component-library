import { WorkflowProgress } from "../components/WorkflowProgress";
import { ImplementationDetails } from "./ImplementationDetails";
export function WorkflowDemo() {
  const steps = ["Plan", "Design", "Build", "Review", "Launch", "Measure"];
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Workflow pattern</p>
        <h2>Progress that keeps the application in control.</h2>
        <p className="lede">Supply colors, step labels, and the current 1-based step. Completed steps use the primary color; the current step uses the highlight color. Resize the demo to see the five-step tablet and three-step mobile focus windows.</p>
      </div>
      <section className="demo-section">
        <WorkflowProgress
          steps={steps}
          currentStep={3}
          primaryColor="#555b62"
          highlightColor="#a61f1f"
          markerSize={32} />
        <ImplementationDetails>
          <p><code>{`<WorkflowProgress steps={steps} currentStep={3} primaryColor="#555b62" highlightColor="#a61f1f" markerSize={32} />`}</code></p>
          <p>The component is display-only and application-independent. It clamps out-of-range current-step values, exposes the active step with <code>aria-current="step"</code>, and scrolls horizontally when space is limited.</p>
        </ImplementationDetails>
      </section>
    </>
  );
}
