import { icons } from "./icons.js";
import {
  applyAttributes,
  createFieldMessage,
  setFieldAccessibility,
} from "./field-helpers.js";

export function createTextInput({
  label,
  value = "",
  required = false,
  requiredIndicatorPosition = "bottom",
  error = "",
  helperText = "",
  disabled = false,
  clearable = false,
  attributes = {},
  onInput,
  onClear,
}) {
  const wrapper = document.createElement("div");
  wrapper.className = `field ${
    required
      ? `field--required field--required-${requiredIndicatorPosition}`
      : ""
  } ${disabled ? "field--disabled" : ""} ${error ? "field--error" : ""}`;

  const control = document.createElement("div");
  control.className = "field__control";

  const input = document.createElement("input");
  const id = attributes.id ?? `input-${crypto.randomUUID()}`;
  const messageId = `${id}-message`;
  const existingDescribedBy = attributes["aria-describedby"];

  input.id = id;
  input.value = value;
  input.placeholder = " ";
  input.disabled = disabled;
  input.required = required;

  applyAttributes(input, attributes);
  setFieldAccessibility(input, {
    error,
    helperText,
    messageId,
    describedBy: existingDescribedBy,
  });

  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.append(document.createTextNode(label));

  control.append(input, labelElement);

  if (clearable && value && !disabled) {
    const clear = document.createElement("button");
    clear.className = "field__clear";
    clear.type = "button";
    clear.innerHTML = `<span aria-hidden="true">${icons.clear}</span>`;
    clear.setAttribute("aria-label", `Clear ${label}`);

    clear.addEventListener("click", () => {
      input.value = "";
      onClear?.();
      input.focus();
    });

    control.append(clear);
  }

  if (onInput) {
    input.addEventListener("input", () => onInput(input.value));
  }

  wrapper.append(control);

  const message = createFieldMessage({ id: messageId, error, helperText });
  if (message) wrapper.append(message);

  return wrapper;
}
