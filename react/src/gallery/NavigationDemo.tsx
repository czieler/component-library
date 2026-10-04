import { useState } from "react";
import { type TopNavigationItem, TopNavigation } from "../components/TopNavigation";
import { House, Folder, Plus, Archive, BarChart3, Activity, FileText, Settings, ChevronDown, Menu, X } from "lucide-react";
import { ImplementationDetails } from "./ImplementationDetails";
export function NavigationDemo() {
  const [topActive, setTopActive] = useState("active-projects");
  const topItems: TopNavigationItem[] = [
    {
      id: "home-top",
      label: "Home",
      icon: <House size={17} />
    },
    {
      id: "projects-top",
      label: "Projects",
      icon: <Folder size={17} />,
      children: [
        {
          id: "active-projects",
          label: "Active Projects",
          icon: <Folder size={17} />,
          description: "View work currently in progress"
        },
        {
          id: "new-project",
          label: "New Project",
          icon: <Plus size={17} />,
          description: "Start a new project"
        },
        {
          id: "archive",
          label: "Archive",
          icon: <Archive size={17} />,
          description: "Browse completed work"
        },
      ]
    },
    {
      id: "insights-top",
      label: "Insights",
      icon: <BarChart3 size={17} />,
      children: [
        {
          id: "analytics",
          label: "Analytics",
          icon: <BarChart3 size={17} />,
          description: "Review performance trends"
        },
        {
          id: "activity",
          label: "Activity",
          icon: <Activity size={17} />,
          description: "See recent changes and events"
        },
      ]
    },
    {
      id: "documents-top",
      label: "Documents",
      icon: <FileText size={17} />
    },
    {
      id: "settings-top",
      label: "Settings",
      icon: <Settings size={17} />
    },
  ];
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Navigation patterns</p>
        <h2>Hierarchical navigation that adapts as space changes.</h2>
        <p className="lede">
          The library includes both sidebar/drawer navigation and a top-navigation pattern with responsive flyouts. The consuming application owns labels, IDs, icons, routing, and active state.
        </p>
      </div>
      <section className="demo-section">
        <h3>Top navigation with hover flyouts</h3>
        <p className="component-description">A full-width application navigation pattern with desktop hover/focus flyouts, a page-dimming backdrop, and a built-in mobile drawer.</p>
        <div style={{ borderRadius: 12, overflow: "visible" }}>
          <TopNavigation
            items={topItems}
            activeId={topActive}
            onSelect={setTopActive}
            brand={<strong>Acme Workspace</strong>}
            mobileHeaderEnd={<span style={{ fontSize: ".78rem" }}>DU</span>}
            submenuIcon={<ChevronDown size={15} />}
            menuIcon={<Menu size={20} />}
            closeIcon={<X size={20} />}
          />
        </div>
        <ImplementationDetails>
          <p><code>TopNavigation</code> is application-agnostic. Consumers supply item IDs, labels, optional descriptions/icons, active state, brand content, right-side content, and optional compact mobile-header actions.</p>
          <p>Desktop submenus open on hover or focus and dim the underlying page; keyboard users can use Enter/Space/Arrow Down and Escape. Under 900px the same item model becomes a touch-friendly drawer. React consumers may also control the open submenu with `openMenuId` / `onOpenMenuChange`.</p>
        </ImplementationDetails>
      </section>
      <section className="demo-section navigation-notes">
        <div className="navigation-feature-grid">
          <div>
            <h3>What to try</h3>
            <ul>
              <li>Expand Components to reveal its submenu.</li>
              <li>
                Collapse the desktop sidebar, then hover, focus, or click
                Components to open the flyout.
              </li>
              <li>
                Resize to mobile width and open Components inside the drawer.
              </li>
              <li>Press Escape while the flyout is focused to dismiss it.</li>
            </ul>
          </div>
          <div>
            <h3>Implementation details</h3>
            <p>
              Nested items are configuration-driven. Expanded sidebars render
              children inline, collapsed sidebars expose them as flyouts, and
              mobile navigation keeps them inline for touch-friendly access.
            </p>
            <p>
              Active state stays with the consumer, while native buttons,{" "}
              <code>aria-expanded</code>, focus handling, and Escape behavior
              preserve keyboard accessibility.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
