# React + TypeScript Components

Vite + React + TypeScript implementation of the shared component patterns.

```bash
npm install
npm run dev
```

Use `npm run check` for TypeScript validation and `npm run build` for a production build.

The demo gallery includes form controls, responsive hierarchical navigation, `DataTable`, and `WorkflowProgress`.

## Form controls

Form components extend native React HTML attribute types. Consumers can use normal props such as `name`, `autoComplete`, `onBlur`, `maxLength`, `aria-*`, and `data-*` alongside component-specific props such as `label`, `error`, `helperText`, `clearable`, and `onClear`.

## DataTable

`DataTable` supports consumer-defined columns, optional expandable rows, an optional collapsible section header, optional footer content, and `all` or `rows` divider modes. Below 700px it automatically renders labeled row cards using the same column definitions.

## WorkflowProgress

The gallery includes a **Workflow Progress** entry so the component can be viewed and resized alongside the other reusable components.

```tsx
import { WorkflowProgress } from "./components/WorkflowProgress";

const steps = ["Inventory", "Add Tools", "Review", "Complete"];

<WorkflowProgress
  steps={steps}
  currentStep={2}
  primaryColor="#555b62"
  highlightColor="#a61f1f"
/>;
```

`currentStep` is 1-based. `primaryColor` styles completed markers/connectors and `highlightColor` styles the active marker/label. `ariaLabel` and `className` are optional.

Desktop shows the complete flow. Tablet shows a focused five-step window. Mobile shows a focused three-step window with previous/next controls and “Step X of Y” context.
