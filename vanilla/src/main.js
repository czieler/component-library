import { items } from "./gallery/navigationItems.js";
import { disposeDemo } from "./gallery/lifecycle.js";
import { createMobileNavigation } from "./components/mobile-navigation.js";
import { icons } from "./components/icons.js";
import { text } from "./gallery/content.js";
import { buttonsDemo } from "./gallery/buttons.js";
import { alertsDemo } from "./gallery/alerts.js";
import { cardsDemo } from "./gallery/cards.js";
import { inputsDemo } from "./gallery/inputs.js";
import { tablesDemo } from "./gallery/tables.js";
import { navigationDemo } from "./gallery/navigation.js";
import { workflowDemo } from "./gallery/workflow.js";
import { busyIndicatorDemo } from "./gallery/busy.js";
import { vennDiagramDemo } from "./gallery/venn.js";
import { overview } from "./gallery/overview.js";
import { createSidebar } from "./components/app-sidebar.js";
import "./styles/globals.css";

const app = document.querySelector("#app");

let active = "overview";

let collapsed = false;

let currentMobileNavigation = null;

const render = () => {
  disposeDemo();
  currentMobileNavigation?.destroy();
  app.replaceChildren();

  const shell = document.createElement("div");
  shell.className = "app-shell";

  const mobile = createMobileNavigation({
    items,
    active,
    onSelect: (id) => {
      active = id;
      render();
    },
  });

  currentMobileNavigation = mobile;

  const main = document.createElement("main");
  main.className = "main";

  const topbar = document.createElement("header");
  topbar.className = "mobile-topbar";

  const trigger = document.createElement("button");
  trigger.className = "mobile-nav__trigger";
  trigger.type = "button";
  trigger.innerHTML = icons.menu;
  trigger.setAttribute("aria-label", "Open navigation");
  trigger.addEventListener("click", () => mobile.setOpen(true, trigger));

  topbar.append(trigger, text("strong", "Reusable Components"));

  main.append(
    topbar,
    active === "buttons"
      ? buttonsDemo()
      : active === "alerts"
        ? alertsDemo()
        : active === "cards"
          ? cardsDemo()
          : active === "inputs"
            ? inputsDemo()
          : active === "tables"
        ? tablesDemo()
        : active === "navigation" || active === "top-navigation"
          ? navigationDemo()
          : active === "workflow"
            ? workflowDemo()
            : active === "busy"
              ? busyIndicatorDemo()
              : active === "venn"
                ? vennDiagramDemo()
                : overview(),
  );

  const sidebar = createSidebar({
    items,
    active,
    collapsed,
    onToggle: () => {
      collapsed = !collapsed;
      render();
    },
    onSelect: (id) => {
      active = id;
      render();
    },
  });

  shell.append(sidebar, mobile.scrim, mobile.drawer, main);
  app.append(shell);
};

render();
