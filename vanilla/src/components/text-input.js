import { icons } from "./icons.js";
import {
  createFieldShell,
  configureField,
  createFieldMessage,
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
  const { wrapper, control } = createFieldShell({
    required,
    requiredIndicatorPosition,
    disabled,
    error
  }, false);
  const input = document.createElement("input");
  input.value = value;
  input.placeholder = " ";
  const { id, messageId } = configureField(input, "input", {
    attributes,
    required,
    disabled,
    error,
    helperText
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
  const message = createFieldMessage({
    id: messageId,
    error,
    helperText
  });
  if (message) wrapper.append(message);
  return wrapper;
}
