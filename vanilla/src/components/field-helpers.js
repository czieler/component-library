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
