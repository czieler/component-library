import { registerDemoCleanup } from "./lifecycle.js";
import { text, implementationDetails } from "./content.js";
import { createTopNavigation } from "../components/top-navigation.js";
export const navigationDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Navigation patterns", "eyebrow"),
    text("h2", "Hierarchical navigation that adapts as space changes."),
    text(
      "p",
      "The library includes both sidebar/drawer navigation and a top-navigation pattern with responsive flyouts. The consuming application owns labels, IDs, icons, routing, and active state.",
      "lede",
    ),
  );
  const topSection = document.createElement("section");
  topSection.className = "demo-section";
  topSection.append(text("h3", "Top navigation with hover flyouts"), text("p", "A full-width application navigation pattern with desktop hover flyouts and a built-in mobile drawer.", "component-description"));
  const topItems = [
    {
      id: "home-top",
      label: "Home",
      icon: "⌂"
    },
    {
      id: "projects-top",
      label: "Projects",
      icon: "▣",
      children: [
        {
          id: "active-projects",
          label: "Active Projects",
          icon: "▣",
          description: "View work currently in progress"
        },
        {
          id: "new-project",
          label: "New Project",
          icon: "+",
          description: "Start a new project"
        },
        {
          id: "archive",
          label: "Archive",
          icon: "▤",
          description: "Browse completed work"
        },
      ]
    },
    {
      id: "insights-top",
      label: "Insights",
      icon: "▥",
      children: [
        {
          id: "analytics",
          label: "Analytics",
          icon: "▥",
          description: "Review performance trends"
        },
        {
          id: "activity",
          label: "Activity",
          icon: "↗",
          description: "See recent changes and events"
        },
      ]
    },
    {
      id: "documents-top",
      label: "Documents",
      icon: "▤"
    },
    {
      id: "settings-top",
      label: "Settings",
      icon: "⚙"
    },
  ];
  let topActive = "active-projects";
  const mobileHeaderEnd = document.createElement("span");
  mobileHeaderEnd.textContent = "DU";
  mobileHeaderEnd.style.fontSize = ".78rem";
  const topNav = createTopNavigation({
    items: topItems,
    activeId: topActive,
    brand: "Acme Workspace",
    mobileHeaderEnd,
    onSelect: (id) => {
      topActive = id;
      topNav.setActiveId(id);
    }
  });
  registerDemoCleanup(() => topNav.destroy());
  topSection.append(topNav.element, implementationDetails(["The top navigation is application-agnostic. Consumers provide item IDs, labels, icons, optional descriptions, active state, and brand/end content. Use icons consistently within a menu so labels share one alignment column."], ["Desktop flyouts open on hover and the same item model becomes a touch-friendly drawer on narrow screens."]));
  const section = document.createElement("section");
  section.className = "demo-section navigation-notes";
  const grid = document.createElement("div");
  grid.className = "navigation-feature-grid";
  const tryBlock = document.createElement("div");
  tryBlock.append(text("h3", "What to try"));
  const list = document.createElement("ul");
  [
    "Expand Components to reveal its submenu.",
    "Collapse the desktop sidebar, then hover, focus, or click Components to open the flyout.",
    "Resize to mobile width and open Components inside the drawer.",
    "Press Escape while the flyout is focused to dismiss it.",
  ].forEach((item) => list.append(text("li", item)));
  tryBlock.append(list);
  const detailsBlock = document.createElement("div");
  detailsBlock.append(
    text("h3", "Implementation details"),
    text(
      "p",
      "Nested items are configuration-driven. Expanded sidebars render children inline, collapsed sidebars expose them as flyouts, and mobile navigation keeps them inline for touch-friendly access.",
    ),
    text(
      "p",
      "Active state stays with the consumer, while native buttons, aria-expanded, focus handling, and Escape behavior preserve keyboard accessibility.",
    ),
  );
  grid.append(tryBlock, detailsBlock);
  section.append(grid);
  fragment.append(heading, topSection, section);
  return fragment;
};
