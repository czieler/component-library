import { text, implementationDetails } from "./content.js";
import { createVennDiagram } from "../components/venn-diagram.js";
export const vennDiagramDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Data visualization", "eyebrow"),
    text("h2", "Venn diagrams for focused 2–3 item comparisons."),
    text("p", "Labels stay outside the circles with leader lines so names remain readable at responsive sizes.", "lede"),
  );
  fragment.append(heading);
  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  const two = document.createElement("section");
  two.className = "demo-section";
  two.append(text("h3", "Two-item comparison"), text("p", "Use for a direct comparison between two or three datasets, groups, or sets.", "component-description"));
  const twoCard = document.createElement("div");
  twoCard.className = "venn-demo-card";
  twoCard.append(createVennDiagram({ items: [{ id: "alpha", label: "Set Alpha" }, { id: "beta", label: "Set Beta" }], sharedAllCount: 4 }));
  two.append(twoCard);
  showcase.append(two);
  const three = document.createElement("section");
  three.className = "demo-section";
  three.append(text("h3", "Three-item comparison"), text("p", "Use for a focused three-way comparison. Pair counts are optional; the center count represents items shared by all three.", "component-description"));
  const threeCard = document.createElement("div");
  threeCard.className = "venn-demo-card";
  threeCard.append(createVennDiagram({
    items: [{ id: "alpha", label: "Set Alpha" }, { id: "beta", label: "Set Beta" }, { id: "gamma", label: "Set Gamma" }],
    sharedAllCount: 1,
    pairCounts: {
      "alpha|beta": 4,
      "alpha|gamma": 2,
      "beta|gamma": 2
    }
  }));
  three.append(threeCard, implementationDetails([
    { code: "items" }, " accepts exactly two or three entries. Each item can override its fill/stroke. ", { code: "sharedAllCount" }, " and ", { code: "pairCounts" }, " are optional display values; the consuming application owns the set/intersection calculation."
  ]));
  showcase.append(three);
  fragment.append(showcase);
  return fragment;
};
