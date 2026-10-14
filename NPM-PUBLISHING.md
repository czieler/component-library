# Publishing the component library to npm

This repository keeps its existing `react/` and `vanilla/` demos and their usual `npm run dev`, `npm run check`, and `npm run build` commands. npm distribution is **additional**, not a replacement.

## Packages (proposed npm names)

- `@czieler/ui-react` — React + TypeScript components (React and React DOM are peer dependencies).
- `@czieler/ui-vanilla` — JavaScript components with no framework dependency.

**Before publishing:** make sure the npm account or organization owns the `@czieler` scope. Package publication is public and irreversible for that version. The packages are licensed under MIT; see [`LICENSE`](./LICENSE).

## Before publishing (in each directory)

```sh
cd react                  # or vanilla
npm ci
npm run check
npm run build             # the ORIGINAL demo build
npm run build:package     # new separate npm build
npm pack --dry-run        # inspect exactly what npm would publish
```

For React, `dist-package/index.js`, `dist-package/index.d.ts`, and `dist-package/styles.css` are distribution entry points. The vanilla package has JavaScript and CSS. The `dist-package/` output is gitignored and only generated when packaging.

Test the resulting tarballs in **separate clean consuming projects** before publication, including CSS, navigation, tables, and accessibility behavior. Run `npm pack` (which calls `prepack` automatically) and install the generated `.tgz` in those projects. Confirm that the app does not include multiple React copies.

## Consumer example

```sh
npm install @czieler/ui-react
```

```tsx
import { Button } from '@czieler/ui-react';
import '@czieler/ui-react/styles.css';
```

For vanilla:

```sh
npm install @czieler/ui-vanilla
```

```js
import { createButton } from '@czieler/ui-vanilla';
import '@czieler/ui-vanilla/styles.css';
```

## Publish only once local integration tests pass

```sh
cd react
npm login
npm publish --access public
cd ../vanilla
npm publish --access public
```

Publish from each individual package directory, **not** the repository root. Use a new semantic version for every subsequent release; never reuse an existing published version. Do not publish automatically in CI at this stage.
