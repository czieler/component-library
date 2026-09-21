# Reusable Components

A small, framework-conscious component library built by extracting useful UI patterns from real product work and turning them into application-independent components.

![Reusable Components library](./readme.png)

The same design language is implemented in **React + TypeScript** and **Vanilla JavaScript**, making it easy to compare framework-specific approaches with the underlying browser behavior.

## Why This Exists

Useful reusable components often begin inside applications. This project demonstrates the process of identifying those patterns, removing application-specific dependencies, and turning them into portable components with clear APIs.

The goal is not to replace full-scale component libraries or data-grid frameworks. The focus is on lightweight, practical components with intentionally small APIs, responsive behavior, and accessibility built into the component contract.

## Component Support

| Component | React + TypeScript | Vanilla JavaScript | Responsive behavior |
| --- | :---: | :---: | --- |
| TextInput | ✓ | ✓ | Form-safe at narrow widths |
| PasswordInput | ✓ | ✓ | Show/hide password control |
| PhoneInput | ✓ | ✓ | U.S. 10-digit formatting + validation |
| Select | ✓ | ✓ | Native select behavior |
| Textarea | ✓ | ✓ | Fluid width |
| DataTable | ✓ | ✓ | Converts to labeled cards on mobile |
| AppSidebar | ✓ | ✓ | Expanded/collapsed desktop modes |
| MobileNavigation | ✓ | ✓ | Touch-friendly drawer navigation |
| WorkflowProgress | ✓ | ✓ | Full desktop flow, focused tablet/mobile views |
| BusyIndicator | ✓ | ✓ | Compact inline status at any width |
| Button | ✓ | ✓ | Action variants, sizes, disabled/loading states |
| Alert | ✓ | ✓ | Accessible status/error feedback |
| Card | ✓ | ✓ | Generic grouped-content surface |

## Current Patterns

### Form controls

Text input, select, and textarea components support floating labels, required states, configurable required-field accent placement, error and helper messaging, disabled states, native HTML attributes, accessible label/message relationships, and consumer-controlled values and events.

### Responsive navigation

A shared hierarchical navigation model supports expanded and collapsed desktop sidebars, nested navigation, collapsed-sidebar submenu flyouts, a mobile navigation drawer, consumer-provided icons, active-state management, keyboard behavior, and focus handling.

### DataTable

`DataTable` is a lightweight semantic table component with consumer-defined columns, expandable rows, optional section headers, collapsible sections, optional footer content, configurable divider styles, consumer-provided expand/collapse icons, empty states, accessible captions, and responsive mobile rendering.

Below 700px, the same column definitions are rendered as stacked labeled cards. Consumers do not need to build or maintain a second mobile-only table. Sorting is opt-in per column. By default DataTable sorts the supplied rows client-side; consumers using server-side pagination can set `sortMode="external"` and handle `onSortChange` themselves so the table renders server-ordered rows without re-sorting the current page. Filtering, pagination/fetching, virtualization, and inline editing remain application concerns rather than being coupled to the presentation component.


Complete API-pagination examples are included for both implementations: [`react/examples/DataTableApiPaginationExample.tsx`](react/examples/DataTableApiPaginationExample.tsx) and [`vanilla/examples/data-table-api-pagination-example.js`](vanilla/examples/data-table-api-pagination-example.js). They demonstrate 50-row server pages, resetting to offset 0 on sort changes, and loading subsequent pages without making DataTable responsible for API behavior.

### BusyIndicator

`BusyIndicator` provides one reusable spinner-and-message treatment for loading, saving, importing, processing, and other busy states. The ring uses `currentColor`, so it automatically matches the surrounding text color instead of introducing component-specific colors. It also exposes a polite live status for assistive technology.

**React**

```tsx
<BusyIndicator message="Saving changes…" />
```

**Vanilla JavaScript**

```js
const busy = createBusyIndicator({ message: "Saving changes…" });
document.querySelector("#app").append(busy.element);
busy.setMessage("Saved");
```


### Button

`Button` / `createButton` centralizes primary, secondary, outline, ghost, danger, small, disabled, and loading states. Loading progress stays inside the button to avoid layout shift.

### Alert

`Alert` / `createAlert` provides consistent info, success, warning, and error feedback with accessible roles.

### Card

`Card` / `createCard` is intentionally lightweight: border, surface, padding, and optional elevation only. Product-specific card layouts remain application concerns.

### WorkflowProgress

`WorkflowProgress` accepts a consumer-defined `primaryColor`, `highlightColor`, array of `steps`, 1-based `currentStep`, and optional `markerSize` (pixel diameter). Completed steps use the primary color, the current step uses the highlight color, and directional connectors make progression explicit.

Desktop displays the full workflow. Tablet uses a focused five-step viewport. Mobile uses a focused three-step viewport. Both smaller layouts include previous/next controls plus compact “Step X of Y” context.

**React**

```tsx
<WorkflowProgress
  steps={["Inventory", "Add Tools", "Review", "Complete"]}
  currentStep={2}
  primaryColor="#555b62"
  highlightColor="#a61f1f"
  markerSize={32}
/>
```

**Vanilla JavaScript**

```js
createWorkflowProgress({
  steps: ["Inventory", "Add Tools", "Review", "Complete"],
  currentStep: 2,
  primaryColor: "#555b62",
  highlightColor: "#a61f1f",
  markerSize: 32,
});
```

## Design Decisions

**Two implementations, one behavior model.** Maintaining React and Vanilla versions makes the framework boundary visible. The DOM, accessibility, responsive behavior, and interaction model remain conceptually consistent while the implementation style changes.

**Application-independent APIs.** Components do not know about product routing, authentication, APIs, business data, or application state. Consumers provide data, state, icons, callbacks, and content.

**Responsive behavior belongs in the component when it is intrinsic.** `DataTable` owns its table-to-card transformation and `WorkflowProgress` owns its compact step-window behavior. Consumers should not need duplicate markup for common responsive states.

**Native browser behavior first.** Native HTML elements and browser semantics are preserved wherever practical instead of being recreated unnecessarily.

**Accessibility is part of the API.** Labels, ARIA relationships, semantic HTML, keyboard interaction, and focus behavior are considered during component design rather than added afterward.

**Small APIs over endless configuration.** Components expose enough control to be reusable without attempting to solve every possible product requirement.

## Shared Design System

Both implementations consume the same CSS custom-property design tokens for colors, borders, spacing, border radii, shadows, disabled states, required states, and error states. This keeps the visual language aligned while allowing each implementation to remain independent.

## Project Structure

```text
component-library/
├── shared/
│   └── design-tokens.css
├── react/
│   └── src/
│       ├── components/
│       └── styles/
├── vanilla/
│   └── src/
│       ├── components/
│       └── styles/
├── docs/
│   ├── design-decisions.md
│   ├── quality-checklist.md
│   └── roadmap.md
└── README.md
```

## Running Locally

### React

```bash
cd react
npm install
npm run dev
```

### Vanilla JavaScript

```bash
cd vanilla
npm install
npm run dev
```

Each demo includes navigation to the available components and live examples that can be resized to inspect responsive behavior.

## Quality Checks

The React package includes a TypeScript build check and the Vanilla package includes JavaScript syntax checks.

```bash
cd react
npm run check

cd ../vanilla
npm run check
```

A manual QA checklist for responsive behavior and accessibility is available in [`docs/quality-checklist.md`](./docs/quality-checklist.md).

## Background

These components were extracted and generalized from patterns originally developed while building a larger React + TypeScript application. That extraction process is intentionally visible in this repository: application-specific UI evolves into reusable components with cleaner boundaries, clearer APIs, and shared responsive behavior.

## Status

This is an evolving portfolio project. New components are added when a pattern has demonstrated real reuse value rather than simply to increase the component count.


### Venn Diagram

Both React and Vanilla galleries include a reusable responsive `VennDiagram` / `createVennDiagram` component for focused 2–3 item comparisons, including outside labels with leader lines. See each implementation README for usage.


### Inline/button busy state
Use the inline busy variant inside a disabled button so the spinner and status text replace the normal button content without causing layout shift. React: `<BusyIndicator inline message="Importing…" />`. Vanilla: `createBusyIndicator({ message: "Importing…", inline: true })`.

On tablet/mobile, `WorkflowProgress` keeps its compact progress bar at the full component width and centers the `Step X of Y` status below it.

### Specialized form controls
- `PasswordInput` / `createPasswordInput`: password field built on the standard text input with a consistent accessible show/hide control.
- `PhoneInput` / `createPhoneInput`: U.S. phone field that accepts up to 10 digits, displays `(###) ###-####`, and reports an inline validation error after blur when a non-empty value is incomplete. Required instances also report an error when left blank. This component currently targets U.S. 10-digit phone numbers; international formats are intentionally out of scope.
- `UrlInput` / `createUrlInput`: shared HTTP(S) URL input with consistent format validation and inline errors.
- `USStateSelect` / `createUSStateSelect`: shared state dropdown (50 states + District of Columbia) built on the standard Select.
