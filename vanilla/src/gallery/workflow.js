import { trackDemoElement } from "./lifecycle.js";
import { text, implementationDetails } from "./content.js";
import { createWorkflowProgress } from "../components/workflow-progress.js";
export const workflowDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Workflow pattern", "eyebrow"),
    text("h2", "Progress that keeps the application in control."),
    text("p", "Supply colors, step labels, and the current 1-based step. Completed steps use the primary color; the current step uses the highlight color.", "lede"),
  );
  const section = document.createElement("section");
  section.className = "demo-section";
  const steps = ["Plan", "Design", "Build", "Review", "Launch", "Measure"];
  section.append(
    trackDemoElement(createWorkflowProgress({
      steps,
      currentStep: 3,
      primaryColor: "#555b62",
      highlightColor: "#a61f1f",
      markerSize: 32
    })),
    implementationDetails(
      [{ code: 'createWorkflowProgress({ steps, currentStep: 3, primaryColor: "#555b62", highlightColor: "#a61f1f", markerSize: 32 })' }],
      ["The component is display-only and application-independent. It clamps out-of-range current-step values, exposes the active step with aria-current=step, and scrolls horizontally when space is limited."],
    ),
  );
  fragment.append(heading, section);
  return fragment;
};
