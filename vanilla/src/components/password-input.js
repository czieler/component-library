import { createTextInput } from "./text-input.js";
import { passwordIcons } from "./icons.js";

export function createPasswordInput(options) {
  const field = createTextInput({ ...options, attributes: { ...(options.attributes || {}), type: "password" } });
  const control = field.querySelector(".field__control");
  const input = field.querySelector("input");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "field__password-toggle";
  button.setAttribute("aria-label", `Show ${options.label}`);
  button.innerHTML = passwordIcons.eye;
  button.addEventListener("click", () => {
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.setAttribute("aria-label", `${showing ? "Show" : "Hide"} ${options.label}`);
    button.setAttribute("aria-pressed", String(!showing));
    button.innerHTML = showing ? passwordIcons.eye : passwordIcons.eyeOff;
  });
  control.append(button);
  return field;
}
