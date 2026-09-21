export function createCard({ tag = "section", padding = "default", elevated = false, className = "", content } = {}) {
  const element = document.createElement(tag);
  element.className = ["card", `card--padding-${padding}`, elevated ? "card--elevated" : "", className].filter(Boolean).join(" ");
  if (content instanceof Node) element.append(content);
  else if (content != null) element.textContent = String(content);
  return element;
}
