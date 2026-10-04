import { text, implementationDetails } from "./content.js";
import { createDataTable } from "../components/data-table.js";
import { icons } from "../components/icons.js";
export const demoRows = [
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
    note: "The same table could be used for users, orders, releases, or other record sets.",
  },
];
export const strongValue = (value) => {
  const strong = document.createElement("strong");
  strong.textContent = value;
  return strong;
};
export const demoColumns = [
  {
    id: "title",
    label: "Title",
    width: "38%",
    sortable: true,
    sortValue: (row) => row.title,
    render: (row) => strongValue(row.title),
  },
  {
    id: "service",
    label: "Service",
    sortable: true,
    render: (row) => row.service
  },
  {
    id: "status",
    label: "Status",
    sortable: true,
    render: (row) => row.status
  },
  {
    id: "progress",
    label: "Progress",
    render: (row) => row.progress
  },
];
export const createTableDetails = (row) => {
  const details = document.createElement("div");
  details.className = "table-demo-details";
  details.append(strongValue(row.title), text("p", row.note));
  return details;
};
export const createTableHeader = () => {
  const header = document.createElement("div");
  header.className = "table-demo-section-header";
  header.append(
    text("strong", "Tracked titles"),
    text("span", `${demoRows.length} total`),
  );
  return header;
};
export const createTableFooter = () => {
  const footer = document.createElement("div");
  footer.className = "table-demo-footer";
  footer.append(
    text("strong", `${demoRows.length} titles`),
    text("span", "Optional footer content"),
  );
  return footer;
};
export const tablesDemo = () => {
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
  const apiSection = document.createElement("section");
  apiSection.className = "demo-section";
  apiSection.append(
    text("h3", "Server/API pagination + external sorting"),
    text(
      "p",
      "This interactive example mimics a paged API: only a page of rows is supplied to DataTable, and sorting is owned by the consumer. In a real app, the sort callback resets the offset and requests page 1 from the server.",
      "component-description",
    ),
  );
  const apiHost = document.createElement("div");
  const paginationControls = document.createElement("div");
  paginationControls.className = "table-demo-pagination";
  const loadMore = document.createElement("button");
  loadMore.type = "button";
  loadMore.className = "table-demo-pagination__button";
  const pageStatus = document.createElement("span");
  paginationControls.append(loadMore, pageStatus);
  const pageSize = 2;
  let visibleCount = pageSize;
  let apiSortState = { columnId: "title", direction: "asc" };
  const renderApiTable = () => {
    const column = demoColumns.find((candidate) => candidate.id === apiSortState.columnId);
    const sorted = [...demoRows].sort((left, right) => {
      const leftValue = column?.sortValue?.(left) ?? left[apiSortState.columnId] ?? "";
      const rightValue = column?.sortValue?.(right) ?? right[apiSortState.columnId] ?? "";
      const comparison = String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true });
      return apiSortState.direction === "asc" ? comparison : -comparison;
    });
    const pageRows = sorted.slice(0, visibleCount);
    apiHost.replaceChildren(createDataTable({
      columns: demoColumns,
      rows: pageRows,
      getRowId: (row) => row.id,
      sortMode: "external",
      sortState: apiSortState,
      onSortChange: (nextSort) => {
        apiSortState = nextSort;
        visibleCount = pageSize;
        renderApiTable();
      },
      caption: "Server/API pagination example",
    }));
    loadMore.disabled = visibleCount >= demoRows.length;
    loadMore.textContent = visibleCount >= demoRows.length ? "All demo rows loaded" : "Load next page";
    pageStatus.textContent = `${pageRows.length} of ${demoRows.length} demo rows loaded`;
  };
  loadMore.addEventListener("click", () => {
    visibleCount = Math.min(visibleCount + pageSize, demoRows.length);
    renderApiTable();
  });
  renderApiTable();
  apiSection.append(
    apiHost,
    paginationControls,
    implementationDetails(
      [
        "Use ", { code: 'sortMode: "external"' }, ", control ", { code: "sortState" }, ", and handle ", { code: "onSortChange" }, ". Your API request sends limit, offset, sort, and direction; append later pages as the user scrolls or requests more rows.",
      ],
      [
        "The complete fetch example is in ", { code: "examples/data-table-api-pagination-example.js" }, ". Sorting or filtering should clear loaded rows and fetch again from offset 0.",
      ],
    ),
  );
  showcase.append(fullSection, apiSection, rowsOnlySection);
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
