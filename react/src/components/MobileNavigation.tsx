import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NavItem } from "./AppSidebar";

type MobileNavigationProps = {
  items: NavItem[];
  activeId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  closeIcon?: ReactNode;
  submenuIcon?: ReactNode;
};

export function MobileNavigation({
  items,
  activeId,
  isOpen,
  onClose,
  onSelect,
  closeIcon = "×",
  submenuIcon = "⌄",
}: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeGroupId = items.find((item) =>
    item.children?.some((child) => child.id === activeId),
  )?.id;

  const [openGroupId, setOpenGroupId] = useState<string | undefined>(
    activeGroupId,
  );

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeGroupId) {
      setOpenGroupId(activeGroupId);
    }
  }, [activeGroupId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="mobile-nav__scrim"
        aria-label="Close navigation"
        onClick={onClose}
      />

      <aside
        className="mobile-nav mobile-nav--open"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav__header">
          <h2>Navigation</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-nav__close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <span aria-hidden="true">{closeIcon}</span>
          </button>
        </div>

        <nav>
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
                  onClick={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && (
                    <span className="nav-item__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="nav-item__label">{item.label}</span>
                </button>
              );
            }

            return (
              <div className="mobile-nav-group" key={item.id}>
                <button
                  type="button"
                  className={`nav-item mobile-nav-group__trigger ${
                    hasActiveChild || isActive ? "nav-item--active" : ""
                  }`}
                  disabled={item.disabled}
                  onClick={() =>
                    setOpenGroupId((current) =>
                      current === item.id ? undefined : item.id,
                    )
                  }
                  aria-expanded={isOpen}
                >
                  {item.icon && (
                    <span className="nav-item__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="nav-item__label">{item.label}</span>
                  <span
                    className={`nav-group__chevron ${
                      isOpen ? "nav-group__chevron--open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    {submenuIcon}
                  </span>
                </button>

                {isOpen && (
                  <div className="mobile-nav-group__children">
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
                          onClick={() => {
                            onSelect(child.id);
                            onClose();
                          }}
                          aria-current={childActive ? "page" : undefined}
                        >
                          {child.icon && (
                            <span
                              className="nav-item__icon"
                              aria-hidden="true"
                            >
                              {child.icon}
                            </span>
                          )}
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
      </aside>
    </>
  );
}
