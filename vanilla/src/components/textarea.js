import {
  createFieldShell,
  configureField,
  createFieldMessage,
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
  const { wrapper, control } = createFieldShell({
    required,
    requiredIndicatorPosition,
    disabled,
    error
  }, false);
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.placeholder = " ";
  const { id, messageId } = configureField(textarea, "textarea", {
    attributes,
    required,
    disabled,
    error,
    helperText
  });
  const labelElement = document.createElement("label");
  labelElement.htmlFor = id;
  labelElement.append(document.createTextNode(label));
  control.append(textarea, labelElement);
  wrapper.append(control);
  const message = createFieldMessage({
    id: messageId,
    error,
    helperText
  });
  if (message) wrapper.append(message);
  return wrapper;
}
