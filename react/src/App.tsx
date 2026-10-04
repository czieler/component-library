import { useState } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { navItems } from "./gallery/navigationItems";
import { ChevronLeft, ChevronRight, ChevronDown, X, Menu } from "lucide-react";
import { MobileNavigation } from "./components/MobileNavigation";
import { ButtonsDemo } from "./gallery/ButtonsDemo";
import { AlertsDemo } from "./gallery/AlertsDemo";
import { CardsDemo } from "./gallery/CardsDemo";
import { InputsDemo } from "./gallery/InputsDemo";
import { TablesDemo } from "./gallery/TablesDemo";
import { NavigationDemo } from "./gallery/NavigationDemo";
import { WorkflowDemo } from "./gallery/WorkflowDemo";
import { BusyIndicatorDemo } from "./gallery/BusyIndicatorDemo";
import { VennDiagramDemo } from "./gallery/VennDiagramDemo";
import { Overview } from "./gallery/Overview";
import "./styles/globals.scss";

export function App() {
  const [activeId, setActiveId] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <AppSidebar
        items={navItems}
        activeId={activeId}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        onSelect={setActiveId}
        collapseIcon={<ChevronLeft size={16} />}
        expandIcon={<ChevronRight size={16} />}
        submenuIcon={<ChevronDown size={16} />}
      />

      <MobileNavigation
        items={navItems}
        activeId={activeId}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSelect={setActiveId}
        closeIcon={<X size={22} />}
        submenuIcon={<ChevronDown size={16} />}
      />

      <main className="main">
        <header className="mobile-topbar">
          <button
            type="button"
            className="mobile-nav__trigger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
          <strong>Reusable Components</strong>
        </header>

        {activeId === "buttons" ? (
          <ButtonsDemo />
        ) : activeId === "alerts" ? (
          <AlertsDemo />
        ) : activeId === "cards" ? (
          <CardsDemo />
        ) : activeId === "inputs" ? (
          <InputsDemo />
        ) : activeId === "tables" ? (
          <TablesDemo />
        ) : activeId === "navigation" || activeId === "top-navigation" ? (
          <NavigationDemo />
        ) : activeId === "workflow" ? (
          <WorkflowDemo />
        ) : activeId === "busy" ? (
          <BusyIndicatorDemo />
        ) : activeId === "venn" ? (
          <VennDiagramDemo />
        ) : (
          <Overview />
        )}
      </main>
    </div>
  );
}
