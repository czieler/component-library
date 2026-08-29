import { icons } from "./icons.js";

export function createMobileNavigation({ items, active, onSelect }) {
  const scrim = document.createElement("div");
  scrim.className = "mobile-nav__scrim";
  scrim.hidden = true;

  const drawer = document.createElement("aside");
  drawer.className = "mobile-nav";
  drawer.setAttribute("aria-label", "Mobile navigation");

  const header = document.createElement("div");
  header.className = "mobile-nav__header";
  const title = document.createElement("h2");
  title.textContent = "Navigation";
  const close = document.createElement("button");
  close.className = "mobile-nav__close";
  close.type = "button";
  close.innerHTML = icons.close;
  close.setAttribute("aria-label", "Close navigation");
  header.append(title, close);
  drawer.append(header);

  let returnFocusTo = null;

  const setOpen = (open, trigger = null) => {
    if (open && trigger) returnFocusTo = trigger;
    drawer.classList.toggle("mobile-nav--open", open);
    scrim.hidden = !open;
    if (open) close.focus();
    else if (returnFocusTo?.isConnected) returnFocusTo.focus();
  };

  close.addEventListener("click", () => setOpen(false));
  scrim.addEventListener("click", () => setOpen(false));

  const handleKeydown = (event) => {
    if (event.key === "Escape" && drawer.classList.contains("mobile-nav--open")) {
      setOpen(false);
    }
  };
  document.addEventListener("keydown", handleKeydown);

  items.forEach((item) => {
    const hasChildren = Boolean(item.children?.length);
    const childActive = item.children?.some((child) => child.id === active);
    const group = document.createElement("div");
    group.className = "mobile-nav-group";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-item ${item.id === active || childActive ? "nav-item--active" : ""}`;
    button.disabled = item.disabled ?? false;

    if (item.icon) {
      const icon = document.createElement("span");
      icon.className = "nav-item__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = item.icon;
      button.append(icon);
    }

    const label = document.createElement("span");
    label.className = "nav-item__label";
    label.textContent = item.label;
    button.append(label);

    if (hasChildren) {
      button.setAttribute("aria-expanded", "true");
      const chevron = document.createElement("span");
      chevron.className = "nav-group__chevron nav-group__chevron--open";
      chevron.setAttribute("aria-hidden", "true");
      chevron.innerHTML = icons.chevronDown;
      button.append(chevron);
    } else {
      if (item.id === active) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => {
        setOpen(false);
        onSelect(item.id);
      });
    }

    group.append(button);

    if (hasChildren) {
      const children = document.createElement("div");
      children.className = "mobile-nav-group__children";
      item.children.forEach((child) => {
        const childButton = document.createElement("button");
        childButton.type = "button";
        childButton.className = `nav-subitem ${child.id === active ? "nav-subitem--active" : ""}`;
        childButton.textContent = child.label;
        if (child.id === active) childButton.setAttribute("aria-current", "page");
        childButton.addEventListener("click", () => {
          setOpen(false);
          onSelect(child.id);
        });
        children.append(childButton);
      });
      group.append(children);
    }

    drawer.append(group);
  });

  return {
    drawer,
    scrim,
    setOpen,
    destroy: () => document.removeEventListener("keydown", handleKeydown),
  };
}
