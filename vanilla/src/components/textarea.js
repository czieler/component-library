import {
  applyAttributes,
  createFieldMessage,
  setFieldAccessibility,
} from "./field-helpers.js";

export function createTextarea({
  label,
  value = "",
  required = false,
  requiredIndicatorPosition = "bottom",
  error = "",
  helperText = "",
  disabled = false,
  attributes = {},
  onInput,
}) {
  const wrapper = document.createElement("div");
  wrapper.className = `field ${
    required
      ? `field--required field--required-${requiredIndicatorPosition}`
      : ""
  } ${disabled ? "field--disabled" : ""} ${error ? "field--error" : ""}`;

  const control = document.createElement("div");
  control.className = "field__control";

  const textarea = document.createElement("textarea");
  const id = attributes.id ?? `textarea-${crypto.randomUUID()}`;
  const messageId = `${id}-message`;
  const existingDescribedBy = attributes["aria-describedby"];

  textarea.id = id;
  textarea.value = value;
  textarea.placeholder = " ";
  textarea.disabled = disabled;
  textarea.required = required;

  applyAttributes(textarea, attributes);
  setFieldAccessibility(textarea, {
    error,
    helperText,
    messageId,
    describedBy: existingDescribedBy,
  });

  if (onInput) {
    textarea.addEventListener("input", () => onInput(textarea.value));
  }

  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.append(document.createTextNode(label));

  if (required) {
    const marker = document.createElement("span");
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = " *";
    labelElement.append(marker);
  }

  control.append(textarea, labelElement);
  wrapper.append(control);

  const message = createFieldMessage({ id: messageId, error, helperText });
  if (message) wrapper.append(message);

  return wrapper;
}
