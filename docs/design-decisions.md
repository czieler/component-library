# Design Decisions

## Why React and Vanilla JavaScript live side by side

The library intentionally keeps a React + TypeScript implementation next to a framework-free Vanilla JavaScript implementation. This makes it possible to compare framework ergonomics without hiding the browser behavior underneath.

The goal is not line-for-line parity. The goal is behavioral parity: equivalent states, accessibility expectations, responsive behavior, and consumer control.

## Why responsive transformations live inside certain components

Some responsive behavior is intrinsic to the component rather than the page using it.

- `DataTable` changes from a semantic desktop table to labeled row cards on small screens.
- `WorkflowProgress` changes from the complete workflow to a focused window of steps on tablet and mobile.
- Navigation changes from desktop sidebar behavior to a mobile drawer.

Keeping those behaviors inside the components prevents consumers from maintaining duplicate mobile markup and reduces drift between desktop and mobile experiences.

## Why DataTable is intentionally not a data grid

`DataTable` handles presentation-oriented table concerns: columns, expandable rows, section headers, footer content, empty states, dividers, captions, and responsive cards.

It deliberately does not attempt to own complex sorting, filtering, virtualization, editing, or server-side pagination. Applications that need those capabilities should use a specialized grid library rather than growing a lightweight component into an incomplete grid framework.

## Why component APIs stay small

A reusable component should expose meaningful variation without becoming a bag of unrelated switches. Application-specific routing, authentication, API calls, product data, and business rules stay outside the library.

Consumers own data and state. Components own presentation and interaction patterns that are genuinely reusable.

## Accessibility approach

Accessibility is treated as part of the component contract. Native semantic elements are preferred, labels and helper/error messaging are associated correctly, keyboard behavior is preserved, and focus behavior is considered when components introduce overlays or navigation states.
