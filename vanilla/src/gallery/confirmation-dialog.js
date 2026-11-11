import { createButton } from "../components/button.js";
import { createConfirmationDialog } from "../components/confirmation-dialog.js";
import { implementationDetails, text } from "./content.js";

const usageExample = `import { createButton, createConfirmationDialog } from "@czieler/ui-vanilla";
import "@czieler/ui-vanilla/styles.css";

const deleteButton = createButton({
  label: "Delete item",
  variant: "danger",
});

const confirmation = createConfirmationDialog({
  title: "Delete this item?",
  message: "This action cannot be undone.",
  confirmText: "Delete",
  denyText: "Keep item",
  onConfirm: () => deleteItem(),
  onDeny: () => console.log("Deletion canceled"),
});

document.body.append(deleteButton.element, confirmation.element);
deleteButton.element.addEventListener("click", () => confirmation.open());`;

export const confirmationDialogDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Actions", "eyebrow"),
    text("h2", "Confirmation Dialog"),
    text("p", "Ask users to confirm or deny an action before continuing.", "lede"),
  );

  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  const section = document.createElement("section");
  section.className = "demo-section";
  const trigger = createButton({ label: "Delete item", variant: "danger" });
  const result = text("p", "Choose an action to see its callback result.", "confirmation-dialog-demo__result");
  result.setAttribute("aria-live", "polite");

  const dialog = createConfirmationDialog({
    title: "Delete this item?",
    message: "This action cannot be undone. Do you want to continue?",
    confirmText: "Delete",
    denyText: "Keep item",
    onConfirm: () => {
      result.textContent = "Confirm callback: item deleted.";
    },
    onDeny: () => {
      result.textContent = "Deny callback: item kept.";
    },
    onClose: (value) => {
      if (!value) result.textContent = "Dialog dismissed without choosing an action.";
    },
  });

  trigger.element.addEventListener("click", () => dialog.open());
  section.append(
    trigger.element,
    result,
    dialog.element,
    implementationDetails([
      "Open the dialog with the trigger. Confirm, deny, and Escape each close it; the callbacks report the selected action.",
    ]),
  );
  const example = document.createElement("div");
  example.className = "confirmation-dialog-demo__example";
  example.append(text("h3", "Use in a Vanilla application"));
  const pre = document.createElement("pre");
  pre.className = "confirmation-dialog-demo__code";
  const code = document.createElement("code");
  code.textContent = usageExample;
  pre.append(code);
  example.append(pre);
  section.append(example);
  showcase.append(section);
  fragment.append(heading, showcase);
  return fragment;
};
