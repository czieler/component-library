export function createTopNavigation({
  items = [],
  activeId,
  onSelect = () => {},
  brand = "Reusable Components",
  endContent,
  mobileHeaderEnd,
  onMobileOpenChange = () => {},
  ariaLabel = "Primary navigation",
  menuIcon = "☰",
  closeIcon = "×",
  submenuIcon = "⌄",
} = {}) {
  const root = document.createElement("div");
  let openId;

  const createIcon = (icon, className) => {
    const span = document.createElement("span");
    span.className = className;
    span.setAttribute("aria-hidden", "true");
    if (icon instanceof Node) span.append(icon.cloneNode(true));
    else if (icon != null) span.textContent = String(icon);
    return span;
  };

  const header = document.createElement("header");
  header.className = "cz-top-nav";
  const brandEl = document.createElement("div");
  brandEl.className = "cz-top-nav__brand";
  if (brand instanceof Node) brandEl.append(brand); else brandEl.textContent = brand;
  const nav = document.createElement("nav");
  nav.className = "cz-top-nav__desktop";
  nav.setAttribute("aria-label", ariaLabel);
  const end = document.createElement("div");
  end.className = "cz-top-nav__end";
  if (endContent instanceof Node) end.append(endContent);
  const mobileTrigger = document.createElement("button");
  mobileTrigger.type = "button";
  mobileTrigger.className = "cz-top-nav__mobile-trigger";
  mobileTrigger.setAttribute("aria-label", "Open navigation");
  mobileTrigger.innerHTML = `<span aria-hidden="true">${menuIcon}</span>`;
  const mobileBrand = document.createElement("div");
  mobileBrand.className = "cz-top-nav__mobile-brand";
  mobileBrand.textContent = typeof brand === "string" ? brand : "Navigation";
  const mobileHeaderEndEl = document.createElement("div");
  mobileHeaderEndEl.className = "cz-top-nav__mobile-header-end";
  if (mobileHeaderEnd instanceof Node) mobileHeaderEndEl.append(mobileHeaderEnd);
  header.append(brandEl, nav, mobileTrigger, mobileBrand, mobileHeaderEndEl, end);

  const scrim = document.createElement("button");
  scrim.type = "button";
  scrim.className = "cz-top-nav__scrim";
  scrim.setAttribute("aria-label", "Close navigation");
  const desktopScrim = document.createElement("button");
  desktopScrim.type = "button";
  desktopScrim.className = "cz-top-nav__desktop-scrim";
  desktopScrim.setAttribute("aria-label", "Close open navigation menu");
  desktopScrim.hidden = true;
  desktopScrim.addEventListener("click", () => { openId = undefined; render(); });

  const panel = document.createElement("aside");
  panel.className = "cz-top-nav__mobile-panel";
  panel.setAttribute("aria-label", "Mobile navigation");

  const closeMobile = () => {
    scrim.classList.remove("is-open");
    panel.classList.remove("is-open");
    mobileTrigger.setAttribute("aria-expanded", "false");
    onMobileOpenChange(false);
  };
  const openMobile = () => {
    scrim.classList.add("is-open");
    panel.classList.add("is-open");
    mobileTrigger.setAttribute("aria-expanded", "true");
    onMobileOpenChange(true);
    panel.querySelector("button")?.focus();
  };
  mobileTrigger.addEventListener("click", openMobile);
  scrim.addEventListener("click", closeMobile);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { closeMobile(); openId = undefined; render(); } });

  const select = (id) => { onSelect(id); closeMobile(); openId = undefined; render(); };

  function renderDesktop() {
    nav.replaceChildren();
    items.forEach((item) => {
      const wrap = document.createElement("div");
      wrap.className = "cz-top-nav__item-wrap";
      const hasChildren = Boolean(item.children?.length);
      const hasActiveChild = item.children?.some((child) => child.id === activeId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `cz-top-nav__item ${activeId === item.id || hasActiveChild ? "cz-top-nav__item--active" : ""}`;
      button.disabled = Boolean(item.disabled);
      if (item.icon != null) button.append(createIcon(item.icon, "cz-top-nav__icon"));
      const itemLabel = document.createElement("span");
      itemLabel.textContent = item.label;
      button.append(itemLabel);
      if (hasChildren) {
        const chevron = document.createElement("span");
        chevron.className = "cz-top-nav__chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = submenuIcon;
        button.append(chevron);
      }
      if (hasChildren) {
        button.setAttribute("aria-haspopup", "menu");
        button.setAttribute("aria-expanded", String(openId === item.id));
        button.addEventListener("click", () => { openId = openId === item.id ? undefined : item.id; render(); });
        wrap.addEventListener("mouseenter", () => { if (openId !== item.id) { openId = item.id; render(); }});
        wrap.addEventListener("mouseleave", () => { if (openId === item.id) { openId = undefined; render(); }});
      } else {
        if (activeId === item.id) button.setAttribute("aria-current", "page");
        button.addEventListener("click", () => select(item.id));
      }
      wrap.append(button);
      if (hasChildren && openId === item.id) {
        const flyout = document.createElement("div");
        flyout.className = "cz-top-nav__flyout";
        flyout.setAttribute("role", "menu");
        item.children.forEach((child) => {
          const childButton = document.createElement("button");
          childButton.type = "button";
          childButton.className = `cz-top-nav__flyout-item ${activeId === child.id ? "cz-top-nav__flyout-item--active" : ""}`;
          childButton.disabled = Boolean(child.disabled);
          childButton.append(createIcon(child.icon, "cz-top-nav__flyout-icon"));
          const childCopy = document.createElement("span");
          childCopy.className = "cz-top-nav__flyout-copy";
          const childLabel = document.createElement("strong");
          childLabel.textContent = child.label;
          childCopy.append(childLabel);
          if (child.description) {
            const childDescription = document.createElement("small");
            childDescription.textContent = child.description;
            childCopy.append(childDescription);
          }
          childButton.append(childCopy);
          childButton.addEventListener("click", () => select(child.id));
          flyout.append(childButton);
        });
        wrap.append(flyout);
      }
      nav.append(wrap);
    });
  }

  function renderMobile() {
    panel.replaceChildren();
    const head = document.createElement("div");
    head.className = "cz-top-nav__mobile-header";
    const mobileBrand = document.createElement("div");
    mobileBrand.textContent = typeof brand === "string" ? brand : "Navigation";
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Close navigation");
    close.innerHTML = `<span aria-hidden="true">${closeIcon}</span>`;
    close.addEventListener("click", closeMobile);
    head.append(mobileBrand, close);
    const mobileNav = document.createElement("nav");
    items.forEach((item) => {
      const group = document.createElement("div");
      group.className = "cz-top-nav__mobile-group";
      const hasChildren = Boolean(item.children?.length);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cz-top-nav__mobile-item";
      const mobileLabel = document.createElement("span");
      mobileLabel.className = "cz-top-nav__mobile-label";
      if (item.icon != null) mobileLabel.append(createIcon(item.icon, "cz-top-nav__mobile-icon"));
      const mobileLabelText = document.createElement("span");
      mobileLabelText.textContent = item.label;
      mobileLabel.append(mobileLabelText);
      button.append(mobileLabel);
      if (hasChildren) {
        const mobileChevron = document.createElement("span");
        mobileChevron.setAttribute("aria-hidden", "true");
        mobileChevron.textContent = submenuIcon;
        button.append(mobileChevron);
      }
      button.addEventListener("click", () => hasChildren ? (openId = openId === item.id ? undefined : item.id, render()) : select(item.id));
      group.append(button);
      if (hasChildren && openId === item.id) {
        const children = document.createElement("div");
        children.className = "cz-top-nav__mobile-children";
        item.children.forEach((child) => {
          const childButton = document.createElement("button");
          childButton.type = "button";
          const mobileChildLabel = document.createElement("span");
          mobileChildLabel.className = "cz-top-nav__mobile-label";
          mobileChildLabel.append(createIcon(child.icon, "cz-top-nav__mobile-icon"));
          const mobileChildText = document.createElement("span");
          mobileChildText.textContent = child.label;
          mobileChildLabel.append(mobileChildText);
          childButton.append(mobileChildLabel);
          childButton.addEventListener("click", () => select(child.id));
          children.append(childButton);
        });
        group.append(children);
      }
      mobileNav.append(group);
    });
    panel.append(head, mobileNav);
    if (endContent instanceof Node) {
      const mobileEnd = document.createElement("div");
      mobileEnd.className = "cz-top-nav__mobile-end";
      mobileEnd.append(endContent.cloneNode(true));
      panel.append(mobileEnd);
    }
  }

  function render() { renderDesktop(); renderMobile(); desktopScrim.hidden = !openId; }
  render();
  root.append(header, desktopScrim, scrim, panel);
  return { element: root, setActiveId(id) { activeId = id; render(); }, close: closeMobile };
}
