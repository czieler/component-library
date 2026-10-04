import { text } from "./content.js";
export const overview = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(
    text("p", "A small component library", "eyebrow"),
    text("h1", "Reusable Components, built from real product work."),
    text(
      "p",
      "A growing collection of reusable, accessible UI components and interaction patterns extracted and generalized from production-style application development.",
      "hero-description",
    ),
  );
  const panel = document.createElement("section");
  panel.className = "overview-panel";
  const intro = document.createElement("div");
  intro.append(
    text("h2", "Reusable Components"),
    text(
      "p",
      "The same design language is implemented with React + TypeScript and Vanilla JavaScript, making the underlying browser behavior and framework-specific approaches easy to compare.",
    ),
  );
  const facts = document.createElement("dl");
  facts.className = "project-facts";
  facts.innerHTML =
    "<div><dt>Implementations</dt><dd>React + TypeScript<br>Vanilla JavaScript</dd></div><div><dt>Foundation</dt><dd>Shared design tokens<br>Responsive behavior</dd></div><div><dt>Quality bar</dt><dd>Accessible labels<br>Keyboard interaction</dd></div><div><dt>API design</dt><dd>Application-independent<br>Consumer-controlled</dd></div>";
  panel.append(intro, facts);
  const why = document.createElement("section");
  why.className = "why-section";
  why.append(
    text("h2", "Why this exists"),
    text(
      "p",
      "Useful Reusable Components often begin inside applications. This project demonstrates identifying those patterns, removing application-specific coupling, and turning them into reusable components that can be carried into future products.",
    ),
  );
  fragment.append(panel, why);
  return fragment;
};
