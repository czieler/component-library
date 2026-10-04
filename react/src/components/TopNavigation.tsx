import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
export type TopNavigationItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
  children?: TopNavigationItem[];
};
type TopNavigationProps = {
  items: TopNavigationItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  brand?: ReactNode;
  endContent?: ReactNode;
  mobileHeaderEnd?: ReactNode;
  ariaLabel?: string;
  menuIcon?: ReactNode;
  closeIcon?: ReactNode;
  submenuIcon?: ReactNode;
  /**
   * Optional controlled desktop/mobile submenu state. Pass null to keep all
   * submenus closed; omit the prop to let TopNavigation own the state.
   */
  openMenuId?: string | null;
  onOpenMenuChange?: (id: string | null) => void;
  onMobileOpenChange?: (open: boolean) => void;
};
export function TopNavigation({
  items,
  activeId,
  onSelect,
  brand = <strong>Reusable Components</strong>,
  endContent,
  mobileHeaderEnd,
  ariaLabel = "Primary navigation",
  menuIcon = "☰",
  closeIcon = "×",
  submenuIcon = "⌄",
  openMenuId,
  onOpenMenuChange,
  onMobileOpenChange,
}: TopNavigationProps) {
  const [internalOpenId, setInternalOpenId] = useState<string>();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const controlled = openMenuId !== undefined;
  const openId = controlled ? openMenuId ?? undefined : internalOpenId;
  const changeOpenId = (next: string | undefined | ((current: string | undefined) => string | undefined)) => {
    const resolved = typeof next === "function" ? next(openId) : next;
    if (!controlled) setInternalOpenId(resolved);
    onOpenMenuChange?.(resolved ?? null);
  };
  const changeMobileOpen = useCallback((next: boolean) => {
    setMobileOpen(next);
    onMobileOpenChange?.(next);
  }, [onMobileOpenChange]);
  const activateItem = (item: TopNavigationItem) => {
    if (item.children?.length) changeOpenId((current) => current === item.id ? undefined : item.id);
    else select(item.id);
  };
  const activeGroupId = items.find((item) => item.children?.some((child) => child.id === activeId))?.id;
  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus();
  }, [mobileOpen]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") changeMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, changeMobileOpen]);
  const select = (id: string) => {
    onSelect(id);
    changeOpenId(undefined);
    changeMobileOpen(false);
  };
  const handleDesktopKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: TopNavigationItem) => {
    if (!item.children?.length) return;
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      changeOpenId(item.id);
      const first = event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(".cz-top-nav__flyout button");
      window.requestAnimationFrame(() => first?.focus());
    }
    if (event.key === "Escape") changeOpenId(undefined);
  };
  return (
    <>
      <header className="cz-top-nav">
        <div className="cz-top-nav__brand">{brand}</div>
        <nav className="cz-top-nav__desktop" aria-label={ariaLabel}>
          {items.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const active = activeId === item.id || activeGroupId === item.id;
            const open = openId === item.id;
            return (
              <div
                className="cz-top-nav__item-wrap"
                key={item.id}
                onMouseEnter={() => hasChildren && changeOpenId(item.id)}
                onMouseLeave={() => hasChildren && changeOpenId((current) => (current === item.id ? undefined : current))}
                onFocus={(event) => {
                  if (hasChildren && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    changeOpenId(item.id);
                  }
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    changeOpenId((current) => (current === item.id ? undefined : current));
                  }
                }}
              >
                <button
                  type="button"
                  className={`cz-top-nav__item ${active ? "cz-top-nav__item--active" : ""}`}
                  disabled={item.disabled}
                  aria-current={!hasChildren && active ? "page" : undefined}
                  aria-expanded={hasChildren ? open : undefined}
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  onClick={() => activateItem(item)}
                  onKeyDown={(event) => handleDesktopKeyDown(event, item)}
                >
                  {item.icon && <span className="cz-top-nav__icon" aria-hidden="true">{item.icon}</span>}
                  <span>{item.label}</span>
                  {hasChildren && <span className="cz-top-nav__chevron" aria-hidden="true">{submenuIcon}</span>}
                </button>
                {hasChildren && open && (
                  <div
                    className="cz-top-nav__flyout"
                    role="menu"
                    aria-label={item.label}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        changeOpenId(undefined);
                        (event.currentTarget.previousElementSibling as HTMLButtonElement | null)?.focus();
                      }
                    }}>
                    {item.children?.map((child) => (
                      <button
                        type="button"
                        role="menuitem"
                        key={child.id}
                        className={`cz-top-nav__flyout-item ${activeId === child.id ? "cz-top-nav__flyout-item--active" : ""}`}
                        disabled={child.disabled}
                        onClick={() => select(child.id)}
                      >
                        <span className="cz-top-nav__flyout-icon" aria-hidden="true">{child.icon}</span>
                        <span className="cz-top-nav__flyout-copy"><strong>{child.label}</strong>{child.description && <small>{child.description}</small>}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <button
          className="cz-top-nav__mobile-trigger"
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          onClick={() => changeMobileOpen(true)}>
          <span aria-hidden="true">{menuIcon}</span>
        </button>
        <div className="cz-top-nav__mobile-brand">{brand}</div>
        <div className="cz-top-nav__mobile-header-end">{mobileHeaderEnd}</div>
        <div className="cz-top-nav__end">{endContent}</div>
      </header>
      {openId && !mobileOpen && (
        <button
          className="cz-top-nav__desktop-scrim"
          type="button"
          aria-label="Close open navigation menu"
          onClick={() => changeOpenId(undefined)} />
      )}
      {mobileOpen && (
        <>
          <button
            className="cz-top-nav__scrim"
            type="button"
            aria-label="Close navigation"
            onClick={() => changeMobileOpen(false)} />
          <aside className="cz-top-nav__mobile-panel" aria-label="Mobile navigation">
            <div className="cz-top-nav__mobile-header">
              <div>{brand}</div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation"
                onClick={() => changeMobileOpen(false)}><span aria-hidden="true">{closeIcon}</span></button>
            </div>
            <nav>
              {items.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const open = openId === item.id;
                const active = activeId === item.id || activeGroupId === item.id;
                return <div className="cz-top-nav__mobile-group" key={item.id}>
                  <button
                    type="button"
                    className={`cz-top-nav__mobile-item ${active ? "cz-top-nav__mobile-item--active" : ""}`}
                    disabled={item.disabled}
                    onClick={() => activateItem(item)}
                    aria-expanded={hasChildren ? open : undefined}
                  >
                    <span className="cz-top-nav__mobile-label">{item.icon && <span className="cz-top-nav__mobile-icon" aria-hidden="true">{item.icon}</span>}<span>{item.label}</span></span>{hasChildren && <span aria-hidden="true">{submenuIcon}</span>}
                  </button>
                  {hasChildren && open && <div className="cz-top-nav__mobile-children">
                    {item.children?.map((child) => <button
                      type="button"
                      key={child.id}
                      className={activeId === child.id ? "is-active" : ""}
                      disabled={child.disabled}
                      onClick={() => select(child.id)}><span className="cz-top-nav__mobile-label"><span className="cz-top-nav__mobile-icon" aria-hidden="true">{child.icon}</span><span>{child.label}</span></span></button>)}
                  </div>}
                </div>;
              })}
            </nav>
            {endContent && <div className="cz-top-nav__mobile-end">{endContent}</div>}
          </aside>
        </>
      )}
    </>
  );
}
