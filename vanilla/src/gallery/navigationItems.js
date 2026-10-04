import { icons } from "../components/icons.js";
export const items = [
  {
    id: "overview",
    label: "Overview",
    icon: icons.overview
  },
  {
    id: "components",
    label: "Components",
    icon: icons.inputs,
    children: [
      {
        id: "inputs",
        label: "Inputs",
        icon: icons.inputs
      },
      {
        id: "buttons",
        label: "Buttons",
        icon: icons.inputs
      },
      {
        id: "alerts",
        label: "Alerts",
        icon: icons.inputs
      },
      {
        id: "cards",
        label: "Cards",
        icon: icons.inputs
      },
      {
        id: "tables",
        label: "Data Table",
        icon: icons.table
      },
      {
        id: "navigation",
        label: "Navigation",
        icon: icons.navigation
      },
      {
        id: "top-navigation",
        label: "Top Navigation",
        icon: icons.navigation
      },
      {
        id: "workflow",
        label: "Workflow Progress",
        icon: icons.workflow
      },
      {
        id: "busy",
        label: "Busy Indicator",
        icon: icons.workflow
      },
      {
        id: "venn",
        label: "Venn Diagram",
        icon: icons.workflow
      },
    ],
  },
];
