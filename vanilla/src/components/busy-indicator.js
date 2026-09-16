export function createBusyIndicator({ message = "Working…", className = "", attributes = {} } = {}) {
  const root = document.createElement("div");
  root.className = ["busy-indicator", className].filter(Boolean).join(" ");
  root.setAttribute("role", "status");
  root.setAttribute("aria-live", "polite");

  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== false) {
      root.setAttribute(name, value === true ? "" : String(value));
    }
  });

  const spinner = document.createElement("span");
  spinner.className = "busy-indicator__spinner";
  spinner.setAttribute("aria-hidden", "true");

  const messageElement = document.createElement("span");
  messageElement.className = "busy-indicator__message";
  messageElement.textContent = String(message);

  root.append(spinner, messageElement);

  return {
    element: root,
    setMessage(nextMessage) {
      messageElement.textContent = String(nextMessage);
    },
  };
}
