import { useEffect, useState, type FocusEvent, type ReactNode } from "react";

export type NavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: NavItem[];
};

type AppSidebarProps = {
  items: NavItem[];
  activeId?: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSelect: (id: string) => void;
  brand?: ReactNode;
  ariaLabel?: string;
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  submenuIcon?: ReactNode;
};

export function AppSidebar({
  items,
  activeId,
  collapsed,
  onToggleCollapsed,
  onSelect,
  brand = (
    <>
      <span className="brand-mark">U</span>
      <strong>Reusable Components</strong>
    </>
  ),
  ariaLabel = "Primary navigation",
  collapseIcon = "‹",
  expandIcon = "›",
  submenuIcon = "⌄",
}: AppSidebarProps) {
  const activeGroupId = items.find((item) =>
    item.children?.some((child) => child.id === activeId),
  )?.id;

  const [openGroupId, setOpenGroupId] = useState<string | undefined>(
    activeGroupId,
  );

  useEffect(() => {
    if (!collapsed && activeGroupId) {
      setOpenGroupId(activeGroupId);
    }
  }, [activeGroupId, collapsed]);

  const closeFlyoutOnBlur = (
    event: FocusEvent<HTMLDivElement>,
    groupId: string,
  ) => {
    if (
      collapsed &&
      !event.currentTarget.contains(event.relatedTarget as Node | null)
    ) {
      setOpenGroupId((current) => (current === groupId ? undefined : current));
    }
  };

  const renderIcon = (item: NavItem) =>
    item.icon ? (
      <span className="nav-item__icon" aria-hidden="true">
        {item.icon}
      </span>
    ) : null;

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__brand">{brand}</div>

      <nav aria-label={ariaLabel}>
        {items.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const isActive = activeId === item.id;
          const hasActiveChild = Boolean(
            item.children?.some((child) => child.id === activeId),
          );
          const isOpen = openGroupId === item.id;

          if (!hasChildren) {
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                disabled={item.disabled}
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                {renderIcon(item)}
                {!collapsed && (
                  <span className="nav-item__label">{item.label}</span>
                )}
              </button>
            );
          }

          return (
            <div
              key={item.id}
              className="nav-group"
              onMouseEnter={() => collapsed && setOpenGroupId(item.id)}
              onMouseLeave={() =>
                collapsed &&
                setOpenGroupId((current) =>
                  current === item.id ? undefined : current,
                )
              }
              onBlur={(event) => closeFlyoutOnBlur(event, item.id)}
            >
              <button
                type="button"
                className={`nav-item nav-group__trigger ${
                  hasActiveChild || isActive ? "nav-item--active" : ""
                }`}
                disabled={item.disabled}
                onClick={() =>
                  setOpenGroupId((current) =>
                    current === item.id ? undefined : item.id,
                  )
                }
                aria-expanded={isOpen}
                title={collapsed ? item.label : undefined}
              >
                {renderIcon(item)}

                {!collapsed && (
                  <>
                    <span className="nav-item__label">{item.label}</span>
                    <span
                      className={`nav-group__chevron ${
                        isOpen ? "nav-group__chevron--open" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {submenuIcon}
                    </span>
                  </>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="nav-group__children">
                  {item.children?.map((child) => {
                    const childActive = activeId === child.id;

                    return (
                      <button
                        key={child.id}
                        type="button"
                        className={`nav-subitem ${
                          childActive ? "nav-subitem--active" : ""
                        }`}
                        disabled={child.disabled}
                        onClick={() => onSelect(child.id)}
                        aria-current={childActive ? "page" : undefined}
                      >
                        {renderIcon(child)}
                        <span>{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {collapsed && isOpen && (
                <div
                  className="nav-flyout"
                  aria-label={item.label}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenGroupId(undefined);
                      (
                        event.currentTarget
                          .previousElementSibling as HTMLButtonElement | null
                      )?.focus();
                    }
                  }}
                >
                  <div className="nav-flyout__title">{item.label}</div>

                  {item.children?.map((child) => {
                    const childActive = activeId === child.id;

                    return (
                      <button
                        key={child.id}
                        type="button"
                        className={`nav-flyout__item ${
                          childActive ? "nav-flyout__item--active" : ""
                        }`}
                        disabled={child.disabled}
                        onClick={() => {
                          onSelect(child.id);
                          setOpenGroupId(undefined);
                        }}
                        aria-current={childActive ? "page" : undefined}
                      >
                        {renderIcon(child)}
                        <span>{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span aria-hidden="true">{collapsed ? expandIcon : collapseIcon}</span>
      </button>
    </aside>
  );
}
