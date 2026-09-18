import { createTextInput } from "./text-input.js";

export function isValidHttpUrl(value = "") {
  const candidate = value.trim();
  if (!candidate) return true;
  try {
    const url = new URL(candidate);
    return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function createUrlInput({ invalidMessage = "Enter a valid URL starting with http:// or https://.", error = "", attributes = {}, ...options }) {
  const value = options.value ?? "";
  const validationError = value.trim() && !isValidHttpUrl(value) ? invalidMessage : "";
  return createTextInput({ ...options, value, error: error || validationError, attributes: { type: "url", inputmode: "url", autocapitalize: "none", spellcheck: "false", ...attributes } });
}
