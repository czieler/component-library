let fieldIdSequence = 0;

export function createFieldId(prefix) {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  // DOM association IDs also work in HTTP previews and older browsers.
  return `${prefix}-${Date.now().toString(36)}-${(++fieldIdSequence).toString(36)}`;
}

export function applyAttributes(element, attributes = {}) {
  Object.entries(attributes).forEach(([name, value]) => {
    if (name === "id" || value === undefined || value === null) return;
    if (name in element && !name.startsWith("aria-") && !name.startsWith("data-")) {
      try {
        element[name] = value;
        return;
      } catch {
        // Fall back to setAttribute below.
      }
    }
    element.setAttribute(name, String(value));
  });
}
export function createFieldMessage({
  id,
  error = "",
  helperText = "",
}) {
  if (!error && !helperText) return null;
  const message = document.createElement("small");
  message.id = id;
  message.className = "field__message";
  message.textContent = error || helperText;
  return message;
}
export function setFieldAccessibility(element, {
  error = "",
  helperText = "",
  messageId,
  describedBy,
}) {
  if (error) {
    element.setAttribute("aria-invalid", "true");
  } else if (!element.hasAttribute("aria-invalid")) {
    element.setAttribute("aria-invalid", "false");
  }
  const ids = [describedBy, error || helperText ? messageId : ""]
    .filter(Boolean)
    .join(" ");
  if (ids) {
    element.setAttribute("aria-describedby", ids);
  }
}
export function createFieldShell({ required, requiredIndicatorPosition, disabled, error }, select = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `field ${required ? `field--required field--required-${requiredIndicatorPosition}` : ""} ${disabled ? "field--disabled" : ""} ${error ? "field--error" : ""}`;
  const control = document.createElement("div");
  control.className = select ? "field__control field__control--select" : "field__control";
  return { wrapper, control };
}
export function configureField(element, prefix, { attributes, required, disabled, error, helperText }) {
  const id = attributes.id ?? createFieldId(prefix);
  const messageId = `${id}-message`;
  element.id = id;
  element.disabled = disabled;
  element.required = required;
  applyAttributes(element, attributes);
  setFieldAccessibility(element, {
    error,
    helperText,
    messageId,
    describedBy: attributes["aria-describedby"]
  });
  return { id, messageId };
}
