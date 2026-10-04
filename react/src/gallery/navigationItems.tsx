import { type NavItem } from "../components/AppSidebar";
import { LayoutDashboard, FormInput, Table2, Navigation, Milestone, LoaderCircle } from "lucide-react";
export const navItems: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "components",
    label: "Components",
    icon: <FormInput size={18} />,
    children: [
      {
        id: "inputs",
        label: "Inputs",
        icon: <FormInput size={16} />,
      },
      {
        id: "buttons",
        label: "Buttons",
        icon: <FormInput size={16} />
      },
      {
        id: "alerts",
        label: "Alerts",
        icon: <FormInput size={16} />
      },
      {
        id: "cards",
        label: "Cards",
        icon: <FormInput size={16} />
      },
      {
        id: "tables",
        label: "Data Table",
        icon: <Table2 size={16} />,
      },
      {
        id: "navigation",
        label: "Navigation",
        icon: <Navigation size={16} />,
      },
      {
        id: "workflow",
        label: "Workflow Progress",
        icon: <Milestone size={16} />,
      },
      {
        id: "busy",
        label: "Busy Indicator",
        icon: <LoaderCircle size={16} />,
      },
      {
        id: "venn",
        label: "Venn Diagram",
        icon: <Milestone size={16} />,
      },
    ],
  },
];
