import { createSidebar } from "./components/app-sidebar.js";
import { icons } from "./components/icons.js";
import { createMobileNavigation } from "./components/mobile-navigation.js";
import { createDataTable } from "./components/data-table.js";
import { createSelect } from "./components/select.js";
import { createTextarea } from "./components/textarea.js";
import { createTextInput } from "./components/text-input.js";
import { createWorkflowProgress } from "./components/workflow-progress.js";
import "./styles/globals.css";

const items = [
  { id: "overview", label: "Overview", icon: icons.overview },
  {
    id: "components",
    label: "Components",
    icon: icons.inputs,
    children: [
      { id: "inputs", label: "Inputs", icon: icons.inputs },
      { id: "tables", label: "Data Table", icon: icons.table },
      { id: "navigation", label: "Navigation", icon: icons.navigation },
      { id: "workflow", label: "Workflow Progress", icon: icons.workflow },
    ],
  },
];

const frameworkOptions = [
  { label: "React + TypeScript", value: "react" },
  { label: "Vanilla JavaScript", value: "vanilla" },
  { label: "Svelte (planned)", value: "svelte" },
];

const app = document.querySelector("#app");

let active = "overview";
let collapsed = false;
let currentMobileNavigation = null;

const text = (tag, content, className = "") => {
  const element = document.createElement(tag);
  element.textContent = content;
  element.className = className;
  return element;
};

const implementationDetails = (...paragraphs) => {
  const element = document.createElement("div");
  element.className = "implementation-details";
  element.append(text("strong", "Implementation details"));

  paragraphs.forEach((content) => {
    const paragraph = document.createElement("p");

    content.forEach((part) => {
      if (typeof part === "string") {
        paragraph.append(document.createTextNode(part));
      } else {
        const code = document.createElement("code");
        code.textContent = part.code;
        paragraph.append(code);
      }
    });

    element.append(paragraph);
  });

  return element;
};

const inputsDemo = () => {
  const fragment = document.createDocumentFragment();

  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Form controls", "eyebrow"),
    text("h2", "Inputs that keep the native web underneath."),
    text(
      "p",
      "Each control adds a floating label and clear state model without hiding normal HTML behavior.",
      "lede",
    ),
  );

  fragment.append(heading);

  const showcase = document.createElement("div");
  showcase.className = "component-showcase";

  const inputSection = document.createElement("section");
  inputSection.className = "demo-section";
  inputSection.append(
    text("h3", "Text input"),
    text(
      "p",
      "A labeled input that supports populated, required, error, disabled, and clearable states.",
      "component-description",
    ),
  );

  const inputStates = document.createElement("div");
  inputStates.className = "state-grid";
  inputStates.append(
    createTextInput({
      label: "Default",
      attributes: { name: "default-name" },
    }),
    createTextInput({
      label: "Populated",
      value: "Ada Lovelace",
      attributes: { name: "populated-name" },
    }),
    createTextInput({
      label: "Required - bottom accent",
      required: true,
      helperText: "This value is shown on your profile.",
    }),
    createTextInput({
      label: "Required - left accent",
      required: true,
      requiredIndicatorPosition: "left",
      helperText:
        "Required-field emphasis can be positioned to suit different form designs.",
    }),
    createTextInput({
      label: "Error",
      value: "Needs review",
      error: "Use a different display name.",
    }),
    createTextInput({
      label: "Disabled",
      value: "Unavailable",
      disabled: true,
    }),
    createTextInput({
      label: "Clearable",
      value: "A reusable value",
      clearable: true,
    }),
  );

  inputSection.append(
    inputStates,
    implementationDetails(
      [
        "Native input attributes and events pass through, labels are associated with generated IDs, and helper/error text is linked with ",
        { code: "aria-describedby" },
        ". State stays consumer-controlled, while visual values come from shared design tokens.",
      ],
      [
        { code: "requiredIndicatorPosition" },
        " supports bottom or left accents, allowing required-field emphasis to adapt to different form designs.",
      ],
    ),
  );

  showcase.append(inputSection);

  const selectSection = document.createElement("section");
  selectSection.className = "demo-section";
  selectSection.append(
    text("h3", "Select"),
    text(
      "p",
      "A native select with a floating label, consumer-provided icon, option configuration, and validation messaging.",
      "component-description",
    ),
  );

  const selectStates = document.createElement("div");
  selectStates.className = "state-grid";
  selectStates.append(
    createSelect({
      label: "Default",
      options: frameworkOptions,
    }),
    createSelect({
      label: "Required - bottom accent",
      value: "vanilla",
      options: frameworkOptions,
      required: true,
      helperText: "Choose the implementation you are exploring.",
    }),
    createSelect({
      label: "Required - left accent",
      value: "vanilla",
      options: frameworkOptions,
      required: true,
      requiredIndicatorPosition: "left",
    }),
    createSelect({
      label: "Error",
      options: frameworkOptions,
      error: "Please choose an implementation.",
    }),
    createSelect({
      label: "Disabled",
      value: "react",
      options: frameworkOptions,
      disabled: true,
    }),
  );

  selectSection.append(
    selectStates,
    implementationDetails(
      [
        "Consumers provide options and native select attributes. Label association, validation state, and a lightweight SVG dropdown icon are layered over the browser control without replacing its native keyboard behavior.",
      ],
      [
        { code: "requiredIndicatorPosition" },
        " changes the required accent edge.",
      ],
    ),
  );

  showcase.append(selectSection);

  const textareaSection = document.createElement("section");
  textareaSection.className = "demo-section";
  textareaSection.append(
    text("h3", "Textarea"),
    text(
      "p",
      "A resizable multiline field with the same floating-label, validation, helper-text, required, and disabled states.",
      "component-description",
    ),
  );

  const textareaStates = document.createElement("div");
  textareaStates.className = "state-grid";
  textareaStates.append(
    createTextarea({
      label: "Default",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Required - bottom accent",
      value: "A controlled textarea keeps application state in charge.",
      required: true,
      helperText: "Keep the project context concise.",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Required - left accent",
      value: "A controlled textarea keeps application state in charge.",
      required: true,
      requiredIndicatorPosition: "left",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Error",
      value: "Needs review",
      error: "Add a little more context.",
      attributes: { rows: 3 },
    }),
    createTextarea({
      label: "Disabled",
      value: "Unavailable",
      disabled: true,
      attributes: { rows: 3 },
    }),
  );

  textareaSection.append(
    textareaStates,
    implementationDetails(
      [
        "Native textarea attributes remain available through ",
        { code: "attributes" },
        ", including ",
        { code: "rows" },
        ", ",
        { code: "maxLength" },
        ", ",
        { code: "aria-*" },
        ", and ",
        { code: "data-*" },
        " values.",
      ],
      [
        "State remains consumer-controlled, visual values come from shared design tokens, and ",
        { code: "requiredIndicatorPosition" },
        " supports bottom or left required accents.",
      ],
    ),
  );

  showcase.append(textareaSection);
  fragment.append(showcase);

  return fragment;
};

const demoRows = [
  {
    id: "slow-horses",
    title: "Slow Horses",
    service: "Apple TV+",
    status: "Watching",
    progress: "Season 4",
    note: "Expandable content can contain any consumer-provided DOM content.",
  },
  {
    id: "last-of-us",
    title: "The Last of Us",
    service: "Max",
    status: "Watching",
    progress: "Season 2",
    note: "Rows stay generic; the component does not know anything about shows.",
  },
  {
    id: "ted-lasso",
    title: "Ted Lasso",
    service: "Apple TV+",
    status: "Completed",
    progress: "Finished",
    note: "The same table could be used for users, orders, releases, or inventory.",
  },
];

const strongValue = (value) => {
  const strong = document.createElement("strong");
  strong.textContent = value;
  return strong;
};

const demoColumns = [
  {
    id: "title",
    label: "Title",
    width: "38%",
    render: (row) => strongValue(row.title),
  },
  { id: "service", label: "Service", render: (row) => row.service },
  { id: "status", label: "Status", render: (row) => row.status },
  { id: "progress", label: "Progress", render: (row) => row.progress },
];

const createTableDetails = (row) => {
  const details = document.createElement("div");
  details.className = "table-demo-details";
  details.append(strongValue(row.title), text("p", row.note));
  return details;
};

const createTableHeader = () => {
  const header = document.createElement("div");
  header.className = "table-demo-section-header";
  header.append(
    text("strong", "Tracked titles"),
    text("span", `${demoRows.length} total`),
  );
  return header;
};

const createTableFooter = () => {
  const footer = document.createElement("div");
  footer.className = "table-demo-footer";
  footer.append(
    text("strong", `${demoRows.length} titles`),
    text("span", "Optional footer content"),
  );
  return footer;
};

const tablesDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Data display", "eyebrow"),
    text("h2", "Expandable tables without turning into a data-grid framework."),
    text(
      "p",
      "A semantic table pattern with configurable column headers or a single section header, optional expandable rows, and an optional matching footer.",
      "lede",
    ),
  );
  fragment.append(heading);

  const showcase = document.createElement("div");
  showcase.className = "component-showcase";

  const fullSection = document.createElement("section");
  fullSection.className = "demo-section";
  fullSection.append(
    text("h3", "Collapsible table + column headers + expandable rows"),
    text(
      "p",
      "The outer table header collapses the whole section, while the individual rows can still expand independently for details.",
      "component-description",
    ),
    createDataTable({
      columns: demoColumns,
      rows: demoRows,
      getRowId: (row) => row.id,
      renderExpandedRow: createTableDetails,
      collapsible: true,
      headerExpandIcon: icons.chevronDown,
      headerCollapseIcon: icons.chevronUp,
      sectionHeader: createTableHeader,
      expandIcon: icons.chevronDown,
      collapseIcon: icons.chevronUp,
      footer: createTableFooter,
      caption: "Expandable table with column headers",
    }),
    implementationDetails(
      [
        "The table remains semantic HTML. Consumers define columns, provide a stable row ID, and optionally supply ",
        { code: "renderExpandedRow" },
        ", icons, and footer content.",
      ],
      [
        "When a footer exists, it owns the lower rounded corners. Without a footer, the final body row receives the lower rounding instead.",
      ],
    ),
  );

  const rowsOnlySection = document.createElement("section");
  rowsOnlySection.className = "demo-section";
  rowsOnlySection.append(
    text("h3", "Column headers only + row dividers"),
    text(
      "p",
      "The section header is optional. This variation uses only the column header row and removes vertical cell dividers so the body is separated only by horizontal row borders.",
      "component-description",
    ),
    createDataTable({
      columns: demoColumns,
      rows: demoRows,
      getRowId: (row) => row.id,
      headerMode: "columns",
      cellDividers: "rows",
      renderExpandedRow: createTableDetails,
      expandIcon: icons.chevronDown,
      collapseIcon: icons.chevronUp,
      caption: "Expandable table with column headers only",
    }),
    implementationDetails(
      [
        "Leave ",
        { code: "sectionHeader" },
        " undefined for a conventional table with only column headers.",
      ],
      [
        "Set ",
        { code: 'cellDividers="rows"' },
        " to remove internal vertical borders while retaining horizontal row separators. The default is ",
        { code: 'cellDividers="all"' },
        ".",
      ],
    ),
  );

  showcase.append(fullSection, rowsOnlySection);
  fragment.append(showcase);

  const docs = document.createElement("section");
  docs.className = "demo-section table-api-docs";
  docs.innerHTML = `
    <div class="section-heading section-heading--compact">
      <p class="eyebrow">Developer reference</p>
      <h3>DataTable options</h3>
      <p class="component-description">The component is intentionally small, but its visual structure, row behavior, and content are configurable through a focused API.</p>
    </div>
    <div class="table-docs-grid">
      <div class="table-docs-card">
        <h4>Core data</h4>
        <dl class="table-docs-list">
          <div><dt><code>columns</code></dt><dd>Defines column labels, widths, alignment, and the cell renderer for each row.</dd></div>
          <div><dt><code>rows</code></dt><dd>The consumer-provided array of data to display.</dd></div>
          <div><dt><code>getRowId</code></dt><dd>Returns a stable unique ID for each row and is used for expansion state.</dd></div>
          <div><dt><code>caption</code></dt><dd>Optional accessible caption. It is visually hidden but available to assistive technology.</dd></div>
        </dl>
      </div>
      <div class="table-docs-card">
        <h4>Header options</h4>
        <dl class="table-docs-list">
          <div><dt><code>headerMode</code></dt><dd><code>"columns"</code> shows individual column labels. <code>"section"</code> hides the column-label row.</dd></div>
          <div><dt><code>sectionHeader</code></dt><dd>Optional main header-band content. Leave it undefined for a conventional table with only column headers.</dd></div>
          <div><dt><code>collapsible</code></dt><dd>Lets the main section header expand or collapse the entire table. Requires <code>sectionHeader</code>.</dd></div>
          <div><dt><code>defaultCollapsed</code></dt><dd>Controls the initial collapsed state of the table.</dd></div>
          <div><dt><code>headerExpandIcon / headerCollapseIcon</code></dt><dd>Consumer-provided icons for the main header toggle.</dd></div>
        </dl>
      </div>
      <div class="table-docs-card">
        <h4>Row behavior</h4>
        <dl class="table-docs-list">
          <div><dt><code>renderExpandedRow</code></dt><dd>Enables expandable rows and renders consumer-provided detail content beneath each row.</dd></div>
          <div><dt><code>defaultExpandedIds</code></dt><dd>IDs of rows that should begin expanded.</dd></div>
          <div><dt><code>expandIcon / collapseIcon</code></dt><dd>Consumer-provided icons for individual row toggles.</dd></div>
          <div><dt><code>emptyMessage</code></dt><dd>Content shown when the supplied row array is empty.</dd></div>
        </dl>
      </div>
      <div class="table-docs-card">
        <h4>Visual structure</h4>
        <dl class="table-docs-list">
          <div><dt><code>cellDividers</code></dt><dd><code>"all"</code> shows vertical cell dividers plus row borders. <code>"rows"</code> removes internal vertical dividers and keeps horizontal row separators only.</dd></div>
          <div><dt><code>footer</code></dt><dd>Optional consumer-provided footer content. When present it receives the lower rounded corners and matches the main section-header treatment.</dd></div>
        </dl>
      </div>
    </div>
  `;
  fragment.append(docs);

  return fragment;
};


const workflowDemo = () => {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Workflow pattern", "eyebrow"),
    text("h2", "Progress that keeps the application in control."),
    text("p", "Supply colors, step labels, and the current 1-based step. Completed steps use the primary color; the current step uses the highlight color.", "lede"),
  );
  const section = document.createElement("section");
  section.className = "demo-section";
  const steps = ["Tool Inventory", "Add Tools", "Discovery Map", "Capability Overlap", "Findings", "Executive Overview"];
  section.append(
    createWorkflowProgress({ steps, currentStep: 3, primaryColor: "#555b62", highlightColor: "#a61f1f" }),
    implementationDetails(
      [{ code: 'createWorkflowProgress({ steps, currentStep: 3, primaryColor: "#555b62", highlightColor: "#a61f1f" })' }],
      ["The component is display-only and application-independent. It clamps out-of-range current-step values, exposes the active step with aria-current=step, and scrolls horizontally when space is limited."],
    ),
  );
  fragment.append(heading, section);
  return fragment;
};

const navigationDemo = () => {
  const fragment = document.createDocumentFragment();

  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.append(
    text("p", "Navigation patterns", "eyebrow"),
    text("h2", "Hierarchical navigation that adapts as space changes."),
    text(
      "p",
      "The desktop sidebar and mobile drawer share one item model, including nested items, while the consuming application owns labels, IDs, icons, and active state.",
      "lede",
    ),
  );

  const section = document.createElement("section");
  section.className = "demo-section navigation-notes";

  const grid = document.createElement("div");
  grid.className = "navigation-feature-grid";

  const tryBlock = document.createElement("div");
  tryBlock.append(text("h3", "What to try"));

  const list = document.createElement("ul");
  [
    "Expand Components to reveal its submenu.",
    "Collapse the desktop sidebar, then hover, focus, or click Components to open the flyout.",
    "Resize to mobile width and open Components inside the drawer.",
    "Press Escape while the flyout is focused to dismiss it.",
  ].forEach((item) => list.append(text("li", item)));

  tryBlock.append(list);

  const detailsBlock = document.createElement("div");
  detailsBlock.append(
    text("h3", "Implementation details"),
    text(
      "p",
      "Nested items are configuration-driven. Expanded sidebars render children inline, collapsed sidebars expose them as flyouts, and mobile navigation keeps them inline for touch-friendly access.",
    ),
    text(
      "p",
      "Active state stays with the consumer, while native buttons, aria-expanded, focus handling, and Escape behavior preserve keyboard accessibility.",
    ),
  );

  grid.append(tryBlock, detailsBlock);
  section.append(grid);
  fragment.append(heading, section);

  return fragment;
};

const overview = () => {
  const fragment = document.createDocumentFragment();

  fragment.append(
    text("p", "A small component library", "eyebrow"),
    text("h1", "Reusable Components, built from real product work."),
    text(
      "p",
      "A growing collection of reusable, accessible UI components and interaction patterns extracted and generalized from production-style application development.",
      "hero-description",
    ),
  );

  const panel = document.createElement("section");
  panel.className = "overview-panel";

  const intro = document.createElement("div");
  intro.append(
    text("h2", "Reusable Components"),
    text(
      "p",
      "The same design language is implemented with React + TypeScript and Vanilla JavaScript, making the underlying browser behavior and framework-specific approaches easy to compare.",
    ),
  );

  const facts = document.createElement("dl");
  facts.className = "project-facts";
  facts.innerHTML =
    "<div><dt>Implementations</dt><dd>React + TypeScript<br>Vanilla JavaScript</dd></div><div><dt>Foundation</dt><dd>Shared design tokens<br>Responsive behavior</dd></div><div><dt>Quality bar</dt><dd>Accessible labels<br>Keyboard interaction</dd></div><div><dt>API design</dt><dd>Application-independent<br>Consumer-controlled</dd></div>";

  panel.append(intro, facts);

  const why = document.createElement("section");
  why.className = "why-section";
  why.append(
    text("h2", "Why this exists"),
    text(
      "p",
      "Useful Reusable Components often begin inside applications. This project demonstrates identifying those patterns, removing application-specific coupling, and turning them into reusable components that can be carried into future products.",
    ),
  );

  fragment.append(panel, why);
  return fragment;
};

const render = () => {
  currentMobileNavigation?.destroy();
  app.replaceChildren();

  const shell = document.createElement("div");
  shell.className = "app-shell";

  const mobile = createMobileNavigation({
    items,
    active,
    onSelect: (id) => {
      active = id;
      render();
    },
  });

  currentMobileNavigation = mobile;

  const main = document.createElement("main");
  main.className = "main";

  const topbar = document.createElement("header");
  topbar.className = "mobile-topbar";

  const trigger = document.createElement("button");
  trigger.className = "mobile-nav__trigger";
  trigger.type = "button";
  trigger.innerHTML = icons.menu;
  trigger.setAttribute("aria-label", "Open navigation");
  trigger.addEventListener("click", () => mobile.setOpen(true, trigger));

  topbar.append(trigger, text("strong", "Reusable Components"));

  main.append(
    topbar,
    active === "inputs"
      ? inputsDemo()
      : active === "tables"
        ? tablesDemo()
        : active === "navigation"
          ? navigationDemo()
          : active === "workflow"
            ? workflowDemo()
            : overview(),
  );

  const sidebar = createSidebar({
    items,
    active,
    collapsed,
    onToggle: () => {
      collapsed = !collapsed;
      render();
    },
    onSelect: (id) => {
      active = id;
      render();
    },
  });

  shell.append(sidebar, mobile.scrim, mobile.drawer, main);
  app.append(shell);
};

render();
