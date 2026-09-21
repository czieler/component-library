const variants = new Set(["primary", "secondary", "outline", "ghost", "danger"]);

export function createButton({
  label = "Button",
  variant = "primary",
  size = "default",
  loading = false,
  loadingLabel = "",
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ariaLabel,
} = {}) {
  const element = document.createElement("button");
  element.type = type;
  const safeVariant = variants.has(variant) ? variant : "primary";
  element.className = ["button", `button--${safeVariant}`, size === "small" ? "button--small" : "", className].filter(Boolean).join(" ");
  if (ariaLabel) element.setAttribute("aria-label", ariaLabel);
  if (onClick) element.addEventListener("click", onClick);

  let currentLabel = label;
  let currentLoading = loading;
  let currentDisabled = disabled;

  const render = () => {
    element.replaceChildren();
    element.disabled = currentDisabled || currentLoading;
    if (currentLoading) {
      element.setAttribute("aria-busy", "true");
      const spinner = document.createElement("span");
      spinner.className = "button__spinner";
      spinner.setAttribute("aria-hidden", "true");
      element.append(spinner);
      if (loadingLabel) element.append(document.createTextNode(loadingLabel));
    } else {
      element.removeAttribute("aria-busy");
      const labelElement = document.createElement("span");
      labelElement.className = "button__label";
      labelElement.textContent = currentLabel;
      element.append(labelElement);
    }
  };
  render();

  return {
    element,
    setLoading(value) { currentLoading = Boolean(value); render(); },
    setDisabled(value) { currentDisabled = Boolean(value); render(); },
    setLabel(value) { currentLabel = String(value); render(); },
  };
}
