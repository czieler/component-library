# Vanilla JavaScript Components

Framework-free implementation using plain HTML, CSS, and modern ES modules.

```bash
npm install
npm run dev
```

Use `npm run check` for JavaScript syntax validation and `npm run build` for a production build.

Component factories accept configuration objects and share the same design tokens as the React implementation.

## Form controls

Form factories accept an `attributes` object for native and accessibility attributes, such as `{ name: "email", autoComplete: "email", "aria-label": "Email" }`.

## DataTable

The Vanilla `DataTable` mirrors the React implementation with configurable columns, expandable rows, optional section header/footer content, and `all` or `rows` divider modes. Below 700px it automatically renders labeled row cards from the same column definitions.

## WorkflowProgress

The gallery includes a **Workflow Progress** entry so the component can be viewed and resized alongside the other reusable components.

```js
import { createWorkflowProgress } from "./src/components/workflow-progress.js";

const progress = createWorkflowProgress({
  steps: ["Inventory", "Add Tools", "Review", "Complete"],
  currentStep: 2,
  primaryColor: "#555b62",
  highlightColor: "#a61f1f",
});

document.querySelector("#app").append(progress);
```

`currentStep` is 1-based. Completed markers/connectors use `primaryColor`; the active marker/label uses `highlightColor`. `ariaLabel` and `className` are optional.

Desktop shows the complete flow. Tablet shows a focused five-step window. Mobile shows a focused three-step window with previous/next controls and “Step X of Y” context.
