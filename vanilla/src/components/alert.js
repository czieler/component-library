export function createAlert({ variant = "info", title = "", message = "", className = "" } = {}) {
  const element = document.createElement("div");
  element.className = ["alert", `alert--${variant}`, className].filter(Boolean).join(" ");
  element.setAttribute("role", variant === "error" ? "alert" : "status");
  const titleElement = document.createElement("div");
  titleElement.className = "alert__title";
  const content = document.createElement("div");
  content.className = "alert__content";

  const render = () => {
    element.replaceChildren();
    if (title) { titleElement.textContent = title; element.append(titleElement); }
    content.textContent = message;
    element.append(content);
  };
  render();
  return { element, setMessage(value) { message = String(value); render(); } };
}
