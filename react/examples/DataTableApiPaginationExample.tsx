import { useCallback, useEffect, useRef, useState } from "react";
import { DataTable, type DataTableColumn } from "../src/components/DataTable";

type Tool = {
  id: string;
  name: string;
  vendor: string;
  annualCost: number;
};

type SortState = { columnId: string; direction: "asc" | "desc" };

type ToolsResponse = {
  rows: Tool[];
  hasMore: boolean;
};

const PAGE_SIZE = 50;

const columns: DataTableColumn<Tool>[] = [
  { id: "name", label: "Tool", sortable: true, render: (tool) => tool.name },
  { id: "vendor", label: "Vendor", sortable: true, render: (tool) => tool.vendor },
  {
    id: "annualCost",
    label: "Annual cost",
    sortable: true,
    align: "right",
    render: (tool) => tool.annualCost.toLocaleString(undefined, { style: "currency", currency: "USD" }),
  },
];

export function DataTableApiPaginationExample() {
  const [rows, setRows] = useState<Tool[]>([]);
  const [sortState, setSortState] = useState<SortState>({ columnId: "name", direction: "asc" });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  const fetchPage = useCallback(async (offset: number, replace = false) => {
    if (loading) return;
    setLoading(true);
    const id = ++requestId.current;

    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
        sort: sortState.columnId,
        direction: sortState.direction,
      });
      const response = await fetch(`/api/tools?${params}`);
      if (!response.ok) throw new Error("Unable to load tools");
      const data: ToolsResponse = await response.json();
      if (id !== requestId.current) return;
      setRows((current) => replace ? data.rows : [...current, ...data.rows]);
      setHasMore(data.hasMore);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [loading, sortState]);

  useEffect(() => {
    requestId.current += 1; // invalidate an older sort/page request
    setRows([]);
    setHasMore(true);
    void fetchPage(0, true);
    // fetchPage changes when loading changes, so intentionally key this reset to sorting only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(tool) => tool.id}
        sortMode="external"
        sortState={sortState}
        onSortChange={setSortState}
        caption="Tools"
      />

      {hasMore && (
        <button type="button" disabled={loading} onClick={() => void fetchPage(rows.length)}>
          {loading ? "Loading…" : "Load more"}
        </button>
      )}
    </>
  );
}
