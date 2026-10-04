import { text } from "./content.js";
import { createAlert } from "../components/alert.js";
export const alertsDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(text("p", "Feedback", "eyebrow"), text("h2", "Alerts"), text("p", "Accessible inline status, success, warning, and error messaging.", "lede"));
  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  const section = document.createElement("section");
  section.className = "demo-section";
  const grid = document.createElement("div");
  grid.className = "state-grid";
  grid.append(createAlert({ message: "Informational status message." }).element, createAlert({
    variant: "success",
    title: "Saved",
    message: "Your changes were saved."
  }).element, createAlert({
    variant: "warning",
    title: "Check this",
    message: "Review this value before continuing."
  }).element, createAlert({
    variant: "error",
    title: "Could not save",
    message: "Try again or contact support."
  }).element);
  section.append(grid);
  showcase.append(section);
  fragment.append(heading, showcase);
  return fragment;
};
