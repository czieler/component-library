import { createTextInput } from "./text-input.js";

export const phoneDigits = (value = "") => value.replace(/\D/g, "").slice(0, 10);
export function formatUsPhone(value = "") {
  const digits = phoneDigits(value);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
export const isValidUsPhone = (value = "") => phoneDigits(value).length === 10;

export function createPhoneInput(options) {
  const field = createTextInput({ ...options, value: formatUsPhone(options.value || ""), attributes: { type: "tel", inputmode: "numeric", autocomplete: "tel", maxlength: "14", ...(options.attributes || {}) } });
  const input = field.querySelector("input");
  input.addEventListener("input", () => {
    input.value = formatUsPhone(input.value);
    options.onInput?.(input.value);
  });
  input.addEventListener("blur", () => {
    const digits = phoneDigits(input.value);
    const invalid = (digits.length > 0 && digits.length !== 10) || (options.required && digits.length === 0);
    let message = field.querySelector(".field__message");
    if (invalid) {
      field.classList.add("field--error"); input.setAttribute("aria-invalid", "true");
      if (!message) { message = document.createElement("small"); message.className = "field__message"; field.append(message); }
      message.textContent = options.invalidMessage || "Enter a valid 10-digit phone number.";
    } else if (!options.error) {
      field.classList.remove("field--error"); input.removeAttribute("aria-invalid");
      if (message && !options.helperText) message.remove();
    }
  });
  return field;
}
