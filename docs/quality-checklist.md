# Quality Checklist

Use this checklist when adding or changing a component.

## Shared expectations

- Component remains application-independent.
- Consumer controls data, state, callbacks, icons, and product-specific content.
- Native HTML behavior is preserved where practical.
- Focus states are visible.
- Keyboard interaction works for interactive controls.
- Labels and ARIA relationships remain valid.
- Disabled and error states remain understandable without relying on color alone.

## Responsive checks

Test at representative desktop, tablet, and mobile widths.

### DataTable

- Desktop renders semantic table headers and rows.
- Mobile switches to labeled cards without horizontal page overflow.
- Empty state remains readable on desktop and mobile.
- Expandable content remains reachable in both layouts.

### WorkflowProgress

- Desktop shows the complete workflow when space allows.
- Tablet shows a focused five-step window.
- Mobile shows a focused three-step window.
- Current step remains visible when moving through long workflows.
- Previous/next controls do not move the application workflow state; they only change the visible step window.
- Step numbers/checkmarks remain visually centered.
- “Step X of Y” context remains accurate.

### Navigation

- Expanded and collapsed desktop states work.
- Collapse/expand control remains centered and keyboard reachable.
- Nested items remain accessible in collapsed mode.
- Mobile drawer can be opened and dismissed without trapping focus incorrectly.

## Build checks

React:

```bash
cd react
npm run check
npm run build
```

Vanilla JavaScript:

```bash
cd vanilla
npm run check
npm run build
```
