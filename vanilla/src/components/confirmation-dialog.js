import { createButton } from "./button.js";

let dialogCount = 0;

export function createConfirmationDialog({
  title = "Are you sure?",
  message = "",
  confirmText = "Yes",
  denyText = "No",
  onConfirm,
  onDeny,
  onClose,
  className = "",
} = {}) {
  const element = document.createElement("dialog");
  element.className = ["confirmation-dialog", className].filter(Boolean).join(" ");

  const id = ++dialogCount;
  const titleId = `confirmation-dialog-title-${id}`;
  const messageId = `confirmation-dialog-message-${id}`;
  element.setAttribute("aria-labelledby", titleId);
  element.setAttribute("aria-describedby", messageId);

  const content = document.createElement("div");
  content.className = "confirmation-dialog__content";

  const titleElement = document.createElement("h2");
  titleElement.id = titleId;
  titleElement.className = "confirmation-dialog__title";
  titleElement.textContent = title;

  const messageElement = document.createElement("p");
  messageElement.id = messageId;
  messageElement.className = "confirmation-dialog__message";
  messageElement.textContent = message;

  const actions = document.createElement("div");
  actions.className = "confirmation-dialog__actions";

  const denyButton = createButton({
    label: denyText,
    variant: "outline",
    onClick: () => {
      try {
        onDeny?.();
      } finally {
        element.close("deny");
      }
    },
  });
  denyButton.element.autofocus = true;

  const confirmButton = createButton({
    label: confirmText,
    variant: "primary",
    onClick: () => {
      try {
        onConfirm?.();
      } finally {
        element.close("confirm");
      }
    },
  });

  actions.append(denyButton.element, confirmButton.element);
  content.append(titleElement, messageElement, actions);
  element.append(content);
  element.addEventListener("close", () => onClose?.(element.returnValue));

  return {
    element,
    open() {
      if (!element.open) element.showModal();
    },
    close() {
      element.close();
    },
  };
}
