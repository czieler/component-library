import { type DataTableColumn, DataTable } from "../components/DataTable";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ImplementationDetails } from "./ImplementationDetails";
export type DemoRow = {
  id: string;
  title: string;
  service: string;
  status: string;
  progress: string;
  note: string;
};
export const demoRows: DemoRow[] = [
  {
    id: "slow-horses",
    title: "Slow Horses",
    service: "Apple TV+",
    status: "Watching",
    progress: "Season 4",
    note: "Expandable content can contain any consumer-provided React content.",
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
export const demoColumns: DataTableColumn<DemoRow>[] = [
  {
    id: "title",
    label: "Title",
    width: "38%",
    sortable: true,
    sortValue: (row) => row.title,
    render: (row) => <strong>{row.title}</strong>,
  },
  {
    id: "service",
    label: "Service",
    sortable: true,
    render: (row) => row.service,
  },
  {
    id: "status",
    label: "Status",
    sortable: true,
    render: (row) => row.status,
  },
  {
    id: "progress",
    label: "Progress",
    render: (row) => row.progress,
  },
];
export function ApiPaginationTableDemo() {
  const pageSize = 2;
  const allRows = demoRows;
  const [sortState, setSortState] = useState<{ columnId: string; direction: "asc" | "desc" }>({
    columnId: "title",
    direction: "asc",
  });
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const sortedRows = [...allRows].sort((left, right) => {
    const column = demoColumns.find((candidate) => candidate.id === sortState.columnId);
    const fallbackValue = (row: DemoRow) => {
      if (sortState.columnId === "service") return row.service;
      if (sortState.columnId === "status") return row.status;
      if (sortState.columnId === "progress") return row.progress;
      return row.title;
    };
    const leftValue = column?.sortValue?.(left) ?? fallbackValue(left);
    const rightValue = column?.sortValue?.(right) ?? fallbackValue(right);
    const comparison = String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true });
    return sortState.direction === "asc" ? comparison : -comparison;
  });
  const rows = sortedRows.slice(0, visibleCount);
  return (
    <>
      <DataTable
        columns={demoColumns}
        rows={rows}
        getRowId={(row) => row.id}
        sortMode="external"
        sortState={sortState}
        onSortChange={(nextSort) => {
          setSortState(nextSort);
          setVisibleCount(pageSize);
        }}
        caption="Server/API pagination example"
      />
      <div className="table-demo-pagination">
        <button
          type="button"
          className="table-demo-pagination__button"
          disabled={visibleCount >= allRows.length}
          onClick={() => setVisibleCount((current) => Math.min(current + pageSize, allRows.length))}
        >
          {visibleCount >= allRows.length ? "All demo rows loaded" : "Load next page"}
        </button>
        <span>{rows.length} of {allRows.length} demo rows loaded</span>
      </div>
    </>
  );
}
export function TablesDemo() {
  const expandIcon = <ChevronDown size={18} strokeWidth={2} />;
  const collapseIcon = <ChevronUp size={18} strokeWidth={2} />;
  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Data display</p>
        <h2>Expandable tables without turning into a data-grid framework.</h2>
        <p className="lede">
          A semantic table pattern with configurable column headers or a single
          section header, optional expandable rows, and an optional matching
          footer. Below 700px the same rows automatically render as labeled
          mobile cards.
        </p>
      </div>
      <div className="component-showcase">
        <section className="demo-section">
          <h3>Collapsible table + column headers + expandable rows</h3>
          <p className="component-description">
            The outer table header collapses the whole section, while the
            individual rows can still expand independently for details.
          </p>
          <DataTable
            columns={demoColumns}
            rows={demoRows}
            getRowId={(row) => row.id}
            renderExpandedRow={(row) => (
              <div className="table-demo-details">
                <strong>{row.title}</strong>
                <p>{row.note}</p>
              </div>
            )}
            collapsible
            headerExpandIcon={expandIcon}
            headerCollapseIcon={collapseIcon}
            sectionHeader={
              <div className="table-demo-section-header">
                <strong>Tracked titles</strong>
                <span>{demoRows.length} total</span>
              </div>
            }
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
            footer={
              <div className="table-demo-footer">
                <strong>{demoRows.length} titles</strong>
                <span>Optional footer content</span>
              </div>
            }
            caption="Expandable table with column headers"
          />
          <ImplementationDetails>
            <p>
              The table remains semantic HTML. Consumers define typed columns,
              provide a stable row ID, and optionally supply{" "}
              <code>renderExpandedRow</code>, icons, and footer content.
            </p>
            <p>
              When a footer exists, it owns the lower rounded corners. Without a
              footer, the final body row receives the lower rounding instead.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Server/API pagination + external sorting</h3>
          <p className="component-description">
            This interactive example mimics a paged API: only a page of rows is supplied to DataTable, and sorting is owned by the consumer. In a real app, the sort callback resets the offset and requests page 1 from the server.
          </p>
          <ApiPaginationTableDemo />
          <ImplementationDetails>
            <p>
              Use <code>sortMode=&quot;external&quot;</code>, control <code>sortState</code>, and handle <code>onSortChange</code>. Your API request sends <code>limit</code>, <code>offset</code>, <code>sort</code>, and <code>direction</code>; append later pages as the user scrolls or requests more rows.
            </p>
            <p>
              The complete fetch example is in <code>examples/DataTableApiPaginationExample.tsx</code>. Sorting or filtering should clear loaded rows and fetch again from offset 0.
            </p>
          </ImplementationDetails>
        </section>
        <section className="demo-section">
          <h3>Column headers only + row dividers</h3>
          <p className="component-description">
            The section header is optional. This variation uses only the column
            header row and removes vertical cell dividers so the body is
            separated only by horizontal row borders.
          </p>
          <DataTable
            columns={demoColumns}
            rows={demoRows}
            getRowId={(row) => row.id}
            headerMode="columns"
            cellDividers="rows"
            renderExpandedRow={(row) => (
              <div className="table-demo-details">
                <strong>{row.title}</strong>
                <p>{row.note}</p>
              </div>
            )}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
            caption="Expandable table with column headers only"
          />
          <ImplementationDetails>
            <p>
              Leave <code>sectionHeader</code> undefined for a conventional
              table with only column headers.
            </p>
            <p>
              Set <code>cellDividers="rows"</code> to remove internal vertical
              borders while retaining horizontal row separators. The default is
              <code>cellDividers="all"</code>.
            </p>
          </ImplementationDetails>
        </section>
      </div>
      <section className="demo-section table-api-docs">
        <div className="section-heading section-heading--compact">
          <p className="eyebrow">Developer reference</p>
          <h3>DataTable options</h3>
          <p className="component-description">
            The component is intentionally small, but its visual structure, row
            behavior, and content are configurable through a focused API.
          </p>
        </div>
        <div className="table-docs-grid">
          <div className="table-docs-card">
            <h4>Core data</h4>
            <dl className="table-docs-list">
              <div>
                <dt>
                  <code>columns</code>
                </dt>
                <dd>
                  Defines column labels, widths, alignment, and the cell
                  renderer for each row.
                </dd>
              </div>
              <div>
                <dt>
                  <code>rows</code>
                </dt>
                <dd>The consumer-provided array of data to display.</dd>
              </div>
              <div>
                <dt>
                  <code>getRowId</code>
                </dt>
                <dd>
                  Returns a stable unique ID for each row and is used for
                  expansion state.
                </dd>
              </div>
              <div>
                <dt>
                  <code>caption</code>
                </dt>
                <dd>
                  Optional accessible caption. It is visually hidden but
                  available to assistive technology.
                </dd>
              </div>
            </dl>
          </div>
          <div className="table-docs-card">
            <h4>Header options</h4>
            <dl className="table-docs-list">
              <div>
                <dt>
                  <code>headerMode</code>
                </dt>
                <dd>
                  <code>"columns"</code> shows individual column labels.
                  <code>"section"</code> hides the column-label row.
                </dd>
              </div>
              <div>
                <dt>
                  <code>sectionHeader</code>
                </dt>
                <dd>
                  Optional main header-band content. Leave it undefined for a
                  conventional table with only column headers.
                </dd>
              </div>
              <div>
                <dt>
                  <code>collapsible</code>
                </dt>
                <dd>
                  Lets the main section header expand or collapse the entire
                  table. Requires <code>sectionHeader</code>.
                </dd>
              </div>
              <div>
                <dt>
                  <code>defaultCollapsed</code>
                </dt>
                <dd>Controls the initial collapsed state of the table.</dd>
              </div>
              <div>
                <dt>
                  <code>headerExpandIcon</code> /{" "}
                  <code>headerCollapseIcon</code>
                </dt>
                <dd>Consumer-provided icons for the main header toggle.</dd>
              </div>
            </dl>
          </div>
          <div className="table-docs-card">
            <h4>Row behavior</h4>
            <dl className="table-docs-list">
              <div>
                <dt>
                  <code>renderExpandedRow</code>
                </dt>
                <dd>
                  Enables expandable rows and renders consumer-provided detail
                  content beneath each row.
                </dd>
              </div>
              <div>
                <dt>
                  <code>defaultExpandedIds</code>
                </dt>
                <dd>IDs of rows that should begin expanded.</dd>
              </div>
              <div>
                <dt>
                  <code>expandIcon</code> / <code>collapseIcon</code>
                </dt>
                <dd>Consumer-provided icons for individual row toggles.</dd>
              </div>
              <div>
                <dt>
                  <code>emptyMessage</code>
                </dt>
                <dd>Content shown when the supplied row array is empty.</dd>
              </div>
            </dl>
          </div>
          <div className="table-docs-card">
            <h4>Visual structure</h4>
            <dl className="table-docs-list">
              <div>
                <dt>
                  <code>cellDividers</code>
                </dt>
                <dd>
                  <code>"all"</code> shows vertical cell dividers plus row
                  borders. <code>"rows"</code> removes internal vertical
                  dividers and keeps horizontal row separators only.
                </dd>
              </div>
              <div>
                <dt>
                  <code>footer</code>
                </dt>
                <dd>
                  Optional consumer-provided footer content. When present it
                  receives the lower rounded corners and matches the main
                  section-header treatment.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="table-docs-card table-docs-card--wide">
          <h4>Column configuration</h4>
          <div className="table-docs-code">
            <code>{`{
  id: "service",
  label: "Service",
  width: "25%",
  align: "left",
  render: (row) => row.service
}`}</code>
          </div>
          <p className="component-description">
            Each column requires an <code>id</code>, <code>label</code>, and{" "}
            <code>render</code> function. <code>width</code> and{" "}
            <code>align</code> are optional.
          </p>
        </div>
        <div className="table-docs-card table-docs-card--wide">
          <h4>Common combinations</h4>
          <div className="table-combination-grid">
            <div>
              <strong>Section-style list</strong>
              <p>
                <code>sectionHeader</code> + <code>headerMode="section"</code> +{" "}
                <code>cellDividers="rows"</code>
              </p>
            </div>
            <div>
              <strong>Traditional table</strong>
              <p>
                No <code>sectionHeader</code> +{" "}
                <code>headerMode="columns"</code>
              </p>
            </div>
            <div>
              <strong>Collapsible section</strong>
              <p>
                <code>sectionHeader</code> + <code>collapsible</code>
              </p>
            </div>
            <div>
              <strong>Expandable details</strong>
              <p>
                Add <code>renderExpandedRow</code> and row toggle icons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
