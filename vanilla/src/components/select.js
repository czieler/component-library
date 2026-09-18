import { icons } from "./icons.js";
import {
  applyAttributes,
  createFieldMessage,
  setFieldAccessibility,
} from "./field-helpers.js";

export function createSelect({
  label,
  options = [],
  value = "",
  required = false,
  requiredIndicatorPosition = "bottom",
  error = "",
  helperText = "",
  disabled = false,
  attributes = {},
  onChange,
}) {
  const wrapper = document.createElement("div");
  wrapper.className = `field ${
    required
      ? `field--required field--required-${requiredIndicatorPosition}`
      : ""
  } ${disabled ? "field--disabled" : ""} ${error ? "field--error" : ""}`;

  const control = document.createElement("div");
  control.className = "field__control field__control--select";

  const select = document.createElement("select");
  select.classList.add("field__select");
  const id = attributes.id ?? `select-${crypto.randomUUID()}`;
  const messageId = `${id}-message`;
  const existingDescribedBy = attributes["aria-describedby"];

  select.id = id;
  select.disabled = disabled;
  select.required = required;

  applyAttributes(select, attributes);
  setFieldAccessibility(select, {
    error,
    helperText,
    messageId,
    describedBy: existingDescribedBy,
  });

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.disabled = true;
  placeholder.textContent = label;
  select.append(placeholder);

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.disabled = option.disabled ?? false;
    select.append(optionElement);
  });

  select.value = value;

  const syncFloatingLabel = () => {
    control.classList.toggle("field__control--has-value", select.value !== "");
  };
  syncFloatingLabel();

  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.append(document.createTextNode(label));

  const icon = document.createElement("span");
  icon.className = "field__select-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = icons.chevronDown;

  select.addEventListener("change", () => {
    syncFloatingLabel();
    onChange?.(select.value);
  });

  control.append(select, labelElement, icon);
  wrapper.append(control);

  const message = createFieldMessage({ id: messageId, error, helperText });
  if (message) wrapper.append(message);

  return wrapper;
}
