# React + TypeScript Components

Vite + React + TypeScript implementation of the shared component patterns.

```bash
npm install
npm run dev
```

Use `npm run check` for TypeScript validation and `npm run build` for a production build.

The demo gallery includes form controls, responsive hierarchical navigation, `DataTable`, `WorkflowProgress`, and `BusyIndicator`.

## Form controls

Form components extend native React HTML attribute types. Consumers can use normal props such as `name`, `autoComplete`, `onBlur`, `maxLength`, `aria-*`, and `data-*` alongside component-specific props such as `label`, `error`, `helperText`, `clearable`, and `onClear`.

## DataTable

`DataTable` supports consumer-defined columns, optional expandable rows, an optional collapsible section header, optional footer content, and `all` or `rows` divider modes. Below 700px it automatically renders labeled row cards using the same column definitions.

### Server/API pagination and sorting

For large datasets, keep pagination, filtering, and sorting in the application/API and use `sortMode="external"`. The table reports sort changes but does not reorder the currently loaded page. Reset to offset 0 when the sort changes, then request subsequent pages as the user scrolls or clicks **Load more**.

See [`examples/DataTableApiPaginationExample.tsx`](examples/DataTableApiPaginationExample.tsx) for a complete 50-row API pagination example. The same pattern works with an `IntersectionObserver` for infinite scrolling.

```tsx
<DataTable
  columns={columns}
  rows={rows}
  getRowId={(row) => row.id}
  sortMode="external"
  sortState={sortState}
  onSortChange={setSortState}
/>
```

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


## BusyIndicator

Use `BusyIndicator` for any in-progress state—not only loading. The spinner inherits the message color through `currentColor` and the component announces status changes politely to assistive technology.

```tsx
import { BusyIndicator } from "./src/components/BusyIndicator";

<BusyIndicator message="Saving changes…" />;
```

The demo gallery includes visible loading, saving, and importing examples.

## VennDiagram

`VennDiagram` renders a responsive two- or three-item SVG comparison. Labels are deliberately outside the circles and connected with leader lines so long tool names do not sit half inside a region. The consuming application calculates the intersections; the component owns drawing and responsive presentation.

```tsx
import { VennDiagram } from "./src/components/VennDiagram";

<VennDiagram
  items={[
    { id: "teams", label: "Microsoft Teams" },
    { id: "slack", label: "Slack" },
  ]}
  sharedAllCount={4}
/>;
```

For three items, pass a third item and optionally provide pair-specific counts with sorted ID keys such as `"slack|teams"`. `items` is intentionally limited to 2–3 entries because larger comparisons are not legible as a Venn diagram. The gallery's **Venn Diagram** menu entry shows both supported forms.


### Inline/button busy state
Use the inline busy variant inside a disabled button so the spinner and status text replace the normal button content without causing layout shift. React: `<BusyIndicator inline message="Importing…" />`. Vanilla: `createBusyIndicator({ message: "Importing…", inline: true })`.

On tablet/mobile, `WorkflowProgress` keeps its compact progress bar at the full component width and centers the `Step X of Y` status below it.
