# Vanilla Reusable Components

Framework-free implementation using plain HTML, CSS, and modern ES modules.

```bash
npm install
npm run dev
```

Build with `npm run build`. Component factories accept configuration objects and share the same design tokens as the React demo.

Form factories accept an `attributes` object for native and accessibility attributes, such as `{ name: 'email', autoComplete: 'email', 'aria-label': 'Email' }`. Navigation items use `{ id, label, icon, disabled, children }`, and mobile navigation exposes `setOpen()`. The Vanilla DataTable mirrors the React demo with configurable columns, expandable rows, optional section header/footer content, and `all` or `rows` divider modes.
