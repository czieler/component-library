import { text } from "./content.js";
import { createBusyIndicator } from "../components/busy-indicator.js";
export const busyIndicatorDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Status pattern", "eyebrow"),
    text("h2", "Busy Indicator"),
    text("p", "One consistent spinner-and-message treatment for loading, saving, importing, processing, and other busy states."),
  );
  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  ["Loading records…", "Saving changes…", "Processing upload…"].forEach((message) => {
    showcase.append(createBusyIndicator({ message }).element);
  });
  const details = document.createElement("div");
  details.className = "implementation-details";
  const busyButton = document.createElement("button");
  busyButton.type = "button";
  busyButton.className = "button button--primary busy-button-demo";
  busyButton.disabled = true;
  busyButton.append(createBusyIndicator({ message: "Processing…", inline: true }).element);
  showcase.append(busyButton);
  details.innerHTML = `<strong>Implementation details</strong><div><p><code>createBusyIndicator({ message: "Saving changes…" })</code></p><p>The spinner uses <code>currentColor</code>, so it automatically matches the message text. The returned controller also exposes <code>setMessage()</code>.</p></div>`;
  showcase.append(details);
  fragment.append(heading, showcase);
  return fragment;
};
