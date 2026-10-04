import { text, implementationDetails } from "./content.js";
import { createButton } from "../components/button.js";
export const buttonsDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(text("p", "Actions", "eyebrow"), text("h2", "Buttons"), text("p", "Consistent action variants, sizes, disabled states, and in-button loading.", "lede"));
  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  const section = document.createElement("section");
  section.className = "demo-section";
  const grid = document.createElement("div");
  grid.className = "state-grid";
  ["primary", "secondary", "outline", "ghost", "danger"].forEach((variant) => grid.append(createButton({ label: variant[0].toUpperCase() + variant.slice(1), variant }).element));
  grid.append(createButton({ label: "Small", size: "small" }).element);
  const loadingButton = createButton({ label: "Save changes", loadingLabel: "Saving…" });
  loadingButton.element.addEventListener("click", () => {
    loadingButton.setLoading(true);
    window.setTimeout(() => loadingButton.setLoading(false), 900);
  });
  grid.append(loadingButton.element, createButton({
    label: "Finishing setup",
    loading: true,
    ariaLabel: "Finishing setup"
  }).element);
  section.append(grid, implementationDetails(["Loading disables the button and renders the shared spinner inside it. Omit the loading label for spinner-only progress."]));
  showcase.append(section);
  fragment.append(heading, showcase);
  return fragment;
};
