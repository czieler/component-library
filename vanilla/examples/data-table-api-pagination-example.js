import { createDataTable } from "../src/components/data-table.js";

const PAGE_SIZE = 50;
let rows = [];
let hasMore = true;
let loading = false;
let sortState = { columnId: "name", direction: "asc" };
let requestId = 0;

const columns = [
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

const host = document.querySelector("#table-example");
const loadMoreButton = document.querySelector("#load-more");

function render() {
  host.replaceChildren(createDataTable({
    columns,
    rows,
    getRowId: (tool) => tool.id,
    sortMode: "external",
    sortState,
    onSortChange: (nextSort) => {
      sortState = nextSort;
      rows = [];
      hasMore = true;
      render();
      void fetchPage(0, true);
    },
    caption: "Tools",
  }));

  loadMoreButton.hidden = !hasMore;
  loadMoreButton.disabled = loading;
  loadMoreButton.textContent = loading ? "Loading…" : "Load more";
}

async function fetchPage(offset, replace = false) {
  if (loading) return;
  loading = true;
  const id = ++requestId;
  render();

  try {
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(offset),
      sort: sortState.columnId,
      direction: sortState.direction,
    });
    const response = await fetch(`/api/tools?${params}`);
    if (!response.ok) throw new Error("Unable to load tools");
    const data = await response.json();
    if (id !== requestId) return;
    rows = replace ? data.rows : [...rows, ...data.rows];
    hasMore = data.hasMore;
  } finally {
    if (id === requestId) loading = false;
    render();
  }
}

loadMoreButton.addEventListener("click", () => void fetchPage(rows.length));
render();
void fetchPage(0, true);
