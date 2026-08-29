import { icons } from "./icons.js";

const createIcon = (markup, className = "nav-item__icon") => {
  const icon = document.createElement("span");
  icon.className = className;
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = markup;
  return icon;
};

export function createSidebar({
  items,
  active,
  collapsed = false,
  onToggle,
  onSelect,
}) {
  const aside = document.createElement("aside");
  aside.className = `sidebar ${collapsed ? "sidebar--collapsed" : ""}`;

  const brand = document.createElement("div");
  brand.className = "sidebar__brand";
  brand.innerHTML =
    '<span class="brand-mark">U</span><strong>Reusable Components</strong>';
  aside.append(brand);

  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Primary navigation");

  items.forEach((item) => {
    const hasChildren = Boolean(item.children?.length);
    const childActive = item.children?.some((child) => child.id === active);
    const group = document.createElement("div");
    group.className = "nav-group";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-item ${item.id === active || childActive ? "nav-item--active" : ""}`;
    button.disabled = item.disabled ?? false;
    button.title = collapsed ? item.label : "";

    if (item.id === active) button.setAttribute("aria-current", "page");
    if (hasChildren) button.setAttribute("aria-expanded", String(!collapsed));

    if (item.icon) button.append(createIcon(item.icon));

    if (!collapsed) {
      const label = document.createElement("span");
      label.className = "nav-item__label";
      label.textContent = item.label;
      button.append(label);

      if (hasChildren) {
        const chevron = createIcon(
          icons.chevronDown,
          "nav-group__chevron nav-group__chevron--open",
        );
        button.append(chevron);
      }
    }

    if (!hasChildren) {
      button.addEventListener("click", () => onSelect(item.id));
    }

    group.append(button);

    if (hasChildren && !collapsed) {
      const children = document.createElement("div");
      children.className = "nav-group__children";
      item.children.forEach((child) => {
        const childButton = document.createElement("button");
        childButton.type = "button";
        childButton.className = `nav-subitem ${child.id === active ? "nav-subitem--active" : ""}`;
        childButton.disabled = child.disabled ?? false;
        if (child.id === active)
          childButton.setAttribute("aria-current", "page");
        childButton.textContent = child.label;
        childButton.addEventListener("click", () => onSelect(child.id));
        children.append(childButton);
      });
      group.append(children);
    }

    if (hasChildren && collapsed) {
      const flyout = document.createElement("div");
      flyout.className = "nav-flyout";
      flyout.hidden = true;

      const title = document.createElement("div");
      title.className = "nav-flyout__title";
      title.textContent = item.label;
      flyout.append(title);

      item.children.forEach((child) => {
        const childButton = document.createElement("button");
        childButton.type = "button";
        childButton.className = `nav-flyout__item ${child.id === active ? "nav-flyout__item--active" : ""}`;
        childButton.textContent = child.label;
        childButton.addEventListener("click", () => onSelect(child.id));
        flyout.append(childButton);
      });

      const open = () => {
        flyout.hidden = false;
        button.setAttribute("aria-expanded", "true");
      };
      const close = () => {
        flyout.hidden = true;
        button.setAttribute("aria-expanded", "false");
      };

      button.addEventListener("click", () => {
        if (flyout.hidden) open();
        else close();
      });
      group.addEventListener("mouseenter", open);
      group.addEventListener("mouseleave", close);
      group.addEventListener("focusin", open);
      group.addEventListener("focusout", (event) => {
        if (!group.contains(event.relatedTarget)) close();
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          close();
          button.focus();
        }
      });

      group.append(flyout);
    }

    nav.append(group);
  });

  aside.append(nav);

  const toggle = document.createElement("button");
  toggle.className = "sidebar-toggle";
  toggle.type = "button";
  toggle.innerHTML = collapsed ? icons.chevronRight : icons.chevronLeft;
  toggle.setAttribute(
    "aria-label",
    collapsed ? "Expand sidebar" : "Collapse sidebar",
  );
  toggle.title = collapsed ? "Expand sidebar" : "Collapse sidebar";
  toggle.addEventListener("click", onToggle);

  aside.append(toggle);
  return aside;
}
