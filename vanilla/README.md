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

### Server/API pagination and sorting

For large datasets, keep pagination, filtering, and sorting in the application/API and use `sortMode: "external"`. The table reports sort changes but does not reorder the currently loaded page. Reset to offset 0 when the sort changes, fetch the new page, and recreate the Vanilla table with the new rows/state.

See [`examples/data-table-api-pagination-example.js`](examples/data-table-api-pagination-example.js) for a complete 50-row API pagination example. Replace the example **Load more** button with an `IntersectionObserver` if the application uses infinite scrolling.

```js
createDataTable({
  columns,
  rows,
  getRowId: (row) => row.id,
  sortMode: "external",
  sortState,
  onSortChange: handleSortChange,
});
```

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


## BusyIndicator

Use `createBusyIndicator` for any in-progress state—not only loading. The spinner inherits the message color through `currentColor`, and the returned controller lets an application update the message without rebuilding the component.

```js
import { createBusyIndicator } from "./src/components/busy-indicator.js";

const busy = createBusyIndicator({ message: "Saving changes…" });
document.querySelector("#app").append(busy.element);
busy.setMessage("Importing tools…");
```

The demo gallery includes visible loading, saving, and importing examples.

## VennDiagram

`createVennDiagram` renders a responsive two- or three-item SVG comparison. Labels sit outside the circles and use leader lines so names remain readable. The consuming application calculates intersections; the component owns drawing and responsive presentation.

```js
import { createVennDiagram } from "./src/components/venn-diagram.js";

document.querySelector("#app").append(createVennDiagram({
  items: [
    { id: "teams", label: "Microsoft Teams" },
    { id: "slack", label: "Slack" },
  ],
  sharedAllCount: 4,
}));
```

For three items, pass a third item and optionally provide pair-specific counts with sorted ID keys such as `"slack|teams"`. The factory intentionally accepts exactly 2–3 items. The gallery's **Venn Diagram** menu entry shows both supported forms.
