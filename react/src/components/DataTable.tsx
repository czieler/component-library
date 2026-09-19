import { Fragment, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

export type DataTableColumn<T> = {
  id: string;
  label: ReactNode;
  width?: CSSProperties["width"];
  align?: "left" | "center" | "right";
  render: (row: T) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | null | undefined;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  className?: string;

  headerMode?: "columns" | "section";
  sectionHeader?: ReactNode;

  collapsible?: boolean;
  defaultCollapsed?: boolean;
  headerExpandIcon?: ReactNode;
  headerCollapseIcon?: ReactNode;

  cellDividers?: "all" | "rows";

  footer?: ReactNode;
  renderExpandedRow?: (row: T) => ReactNode;
  isRowExpandable?: (row: T) => boolean;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  defaultExpandedIds?: string[];
  emptyMessage?: ReactNode;
  caption?: string;
  onRowClick?: (row: T) => void;
  sortState?: { columnId: string; direction: "asc" | "desc" } | null;
  onSortChange?: (sortState: { columnId: string; direction: "asc" | "desc" }) => void;
  sortMode?: "client" | "external";
};

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  className = "",
  headerMode = "columns",
  sectionHeader,
  collapsible = false,
  defaultCollapsed = false,
  headerExpandIcon = <ChevronDown size={16} strokeWidth={2} />,
  headerCollapseIcon = <ChevronUp size={16} strokeWidth={2} />,
  cellDividers = "all",
  footer,
  renderExpandedRow,
  isRowExpandable,
  expandIcon = <ChevronRight size={16} strokeWidth={2} />,
  collapseIcon = <ChevronDown size={16} strokeWidth={2} />,
  defaultExpandedIds = [],
  emptyMessage = "No rows to display.",
  caption,
  onRowClick,
  sortState: controlledSortState,
  onSortChange,
  sortMode = "client",
}: DataTableProps<T>) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [internalSortState, setInternalSortState] = useState<{ columnId: string; direction: "asc" | "desc" } | null>(null);
  const sortState = controlledSortState !== undefined ? controlledSortState : internalSortState;

  const displayRows = useMemo(() => {
    if (sortMode === "external" || !sortState) return rows;
    const column = columns.find((candidate) => candidate.id === sortState.columnId);
    if (!column?.sortable) return rows;
    const valueFor = column.sortValue ?? ((row: T) => {
      const rendered = column.render(row);
      return typeof rendered === "string" || typeof rendered === "number" ? rendered : "";
    });
    return [...rows].sort((left, right) => {
      const leftValue = valueFor(left);
      const rightValue = valueFor(right);
      if (leftValue == null && rightValue == null) return 0;
      if (leftValue == null) return 1;
      if (rightValue == null) return -1;
      const comparison = typeof leftValue === "number" && typeof rightValue === "number"
        ? leftValue - rightValue
        : String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true, sensitivity: "base" });
      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [columns, rows, sortMode, sortState]);

  const toggleSort = (columnId: string) => {
    const next = sortState?.columnId === columnId
      ? { columnId, direction: sortState.direction === "asc" ? "desc" as const : "asc" as const }
      : { columnId, direction: "asc" as const };
    if (onSortChange) onSortChange(next);
    else setInternalSortState(next);
  };

  const rowsExpandable = Boolean(renderExpandedRow);
  const totalColumns = columns.length;
  const hasSectionHeader = Boolean(sectionHeader);
  const showColumnHeaders = headerMode === "columns";

  const toggleRow = (rowId: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const rootClassName = [
    "data-table",
    className,
    footer ? "data-table--with-footer" : "data-table--without-footer",
    isCollapsed ? "data-table--collapsed" : "",
    hasSectionHeader ? "data-table--with-section-header" : "data-table--no-section-header",
    showColumnHeaders && !hasSectionHeader ? "data-table--standalone-columns" : "",
    cellDividers === "rows" ? "data-table--row-dividers" : "data-table--cell-dividers",
  ].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      {hasSectionHeader && (
        <div className="data-table__header">
          {collapsible ? (
            <button type="button" className="data-table__header-toggle" onClick={() => setIsCollapsed((value) => !value)} aria-expanded={!isCollapsed}>
              <span className="data-table__header-content">{sectionHeader}</span>
              <span className="data-table__header-icon" aria-hidden="true">{isCollapsed ? headerExpandIcon : headerCollapseIcon}</span>
            </button>
          ) : (
            <div className="data-table__header-static">{sectionHeader}</div>
          )}
        </div>
      )}

      {!isCollapsed && (
        <>
          <div className="data-table__scroll">
            <table>
              {caption && <caption className="sr-only">{caption}</caption>}
              {showColumnHeaders && (
                <thead>
                  <tr>
                    {columns.map((column) => {
                      const activeSort = sortState?.columnId === column.id ? sortState.direction : null;
                      return (
                        <th key={column.id} scope="col" style={{ width: column.width }} data-column={column.id} className={`data-table__cell--${column.align ?? "left"}`} aria-sort={column.sortable ? (activeSort === "asc" ? "ascending" : activeSort === "desc" ? "descending" : "none") : undefined}>
                          {column.sortable ? (
                            <button type="button" className="data-table__sort-button" onClick={() => toggleSort(column.id)}>
                              <span>{column.label}</span>
                              <span className="data-table__sort-icon" aria-hidden="true">
                                {activeSort === "asc" ? <span className="data-table__sort-arrow">▲</span> : activeSort === "desc" ? <span className="data-table__sort-arrow">▼</span> : <>
                                  <span className="data-table__sort-arrow">▲</span>
                                  <span className="data-table__sort-arrow">▼</span>
                                </>}
                              </span>
                            </button>
                          ) : column.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.length === 0 ? (
                  <tr><td className="data-table__empty" colSpan={totalColumns}>{emptyMessage}</td></tr>
                ) : displayRows.map((row) => {
                  const rowId = getRowId(row);
                  const rowExpandable = rowsExpandable && (isRowExpandable ? isRowExpandable(row) : true);
                  const isExpanded = rowExpandable && expandedIds.has(rowId);
                  return (
                    <Fragment key={rowId}>
                      <tr
                        className={`data-table__row ${isExpanded ? "data-table__row--expanded" : ""} ${onRowClick ? "data-table__row--clickable" : ""}`}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                        onKeyDown={onRowClick ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onRowClick(row); } } : undefined}
                        tabIndex={onRowClick ? 0 : undefined}
                      >
                        {columns.map((column, columnIndex) => <td key={column.id} data-column={column.id} className={`data-table__cell--${column.align ?? "left"}`}>{rowExpandable && columnIndex === 0 ? <div className="data-table__first-cell-with-expand"><button type="button" className="data-table__expand-button" onClick={(event) => { event.stopPropagation(); toggleRow(rowId); }} aria-expanded={isExpanded} aria-label={isExpanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`}><span aria-hidden="true">{isExpanded ? collapseIcon : expandIcon}</span></button><div className="data-table__first-cell-content">{column.render(row)}</div></div> : column.render(row)}</td>)}
                      </tr>
                      {rowExpandable && isExpanded && (
                        <tr className="data-table__expanded-row"><td colSpan={totalColumns}><div className="data-table__expanded-content">{renderExpandedRow?.(row)}</div></td></tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
              {footer && <tfoot><tr><td className="data-table__footer" colSpan={totalColumns}>{footer}</td></tr></tfoot>}
            </table>
          </div>

          <div className="data-table__mobile" role="list" aria-label={caption ?? "Table rows"}>
            {rows.length === 0 ? (
              <div className="data-table__mobile-empty">{emptyMessage}</div>
            ) : displayRows.map((row) => {
              const rowId = getRowId(row);
              const rowExpandable = rowsExpandable && (isRowExpandable ? isRowExpandable(row) : true);
              const isExpanded = rowExpandable && expandedIds.has(rowId);
              return (
                <article className={`data-table__mobile-card ${onRowClick ? "data-table__mobile-card--clickable" : ""}`} role="listitem" key={`mobile-${rowId}`} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                  {columns.map((column) => (
                    <div className="data-table__mobile-field" key={column.id}>
                      <span className="data-table__mobile-label">{column.label}</span>
                      <div className={`data-table__mobile-value data-table__cell--${column.align ?? "left"}`}>{column.render(row)}</div>
                    </div>
                  ))}
                  {rowExpandable && (
                    <div className="data-table__mobile-expand">
                      <button type="button" className="data-table__expand-button" onClick={() => toggleRow(rowId)} aria-expanded={isExpanded}>
                        <span aria-hidden="true">{isExpanded ? collapseIcon : expandIcon}</span>
                        <span>{isExpanded ? "Hide details" : "Show details"}</span>
                      </button>
                    </div>
                  )}
                  {rowExpandable && isExpanded && <div className="data-table__mobile-expanded">{renderExpandedRow?.(row)}</div>}
                </article>
              );
            })}
            {footer && <div className="data-table__mobile-footer">{footer}</div>}
          </div>
        </>
      )}
    </div>
  );
}
