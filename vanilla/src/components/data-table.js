const appendContent = (element, content) => {
  if (content === undefined || content === null) return;
  if (content instanceof Node) element.append(content);
  else element.append(document.createTextNode(String(content)));
};

export function createDataTable({
  columns,
  rows,
  getRowId,
  className = "",
  headerMode = "columns",
  sectionHeader,
  collapsible = false,
  defaultCollapsed = false,
  headerExpandIcon = "⌄",
  headerCollapseIcon = "⌃",
  cellDividers = "all",
  footer,
  renderExpandedRow,
  expandIcon = "⌄",
  collapseIcon = "⌃",
  defaultExpandedIds = [],
  emptyMessage = "No rows to display.",
  caption,
  sortState: controlledSortState,
  onSortChange,
  sortMode = "client",
}) {
  const root = document.createElement("div");
  const expandedIds = new Set(defaultExpandedIds);
  let isCollapsed = defaultCollapsed;
  let internalSortState = null;

  const rowsExpandable = typeof renderExpandedRow === "function";
  const hasSectionHeader = sectionHeader !== undefined && sectionHeader !== null;
  const showColumnHeaders = headerMode === "columns";
  const totalColumns = columns.length;

  const setRootClassName = () => {
    root.className = [
      "data-table",
      className,
      footer ? "data-table--with-footer" : "data-table--without-footer",
      isCollapsed ? "data-table--collapsed" : "",
      hasSectionHeader ? "data-table--with-section-header" : "data-table--no-section-header",
      showColumnHeaders && !hasSectionHeader ? "data-table--standalone-columns" : "",
      cellDividers === "rows" ? "data-table--row-dividers" : "data-table--cell-dividers",
    ].filter(Boolean).join(" ");
  };

  const toggleRow = (rowId) => {
    if (expandedIds.has(rowId)) expandedIds.delete(rowId);
    else expandedIds.add(rowId);
    renderTable();
  };

  const getSortState = () => controlledSortState !== undefined ? controlledSortState : internalSortState;

  const getDisplayRows = () => {
    const sortState = getSortState();
    if (sortMode === "external" || !sortState) return rows;
    const column = columns.find((candidate) => candidate.id === sortState.columnId);
    if (!column?.sortable) return rows;
    const valueFor = column.sortValue ?? ((row) => {
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
  };

  const toggleSort = (columnId) => {
    const sortState = getSortState();
    const next = sortState?.columnId === columnId
      ? { columnId, direction: sortState.direction === "asc" ? "desc" : "asc" }
      : { columnId, direction: "asc" };
    if (typeof onSortChange === "function") onSortChange(next);
    else internalSortState = next;
    renderTable();
  };

  const renderTable = () => {
    setRootClassName();
    root.replaceChildren();

    if (hasSectionHeader) {
      const header = document.createElement("div");
      header.className = "data-table__header";
      if (collapsible) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "data-table__header-toggle";
        button.setAttribute("aria-expanded", String(!isCollapsed));
        const content = document.createElement("span");
        content.className = "data-table__header-content";
        appendContent(content, typeof sectionHeader === "function" ? sectionHeader() : sectionHeader);
        const icon = document.createElement("span");
        icon.className = "data-table__header-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML = isCollapsed ? headerExpandIcon : headerCollapseIcon;
        button.append(content, icon);
        button.addEventListener("click", () => { isCollapsed = !isCollapsed; renderTable(); });
        header.append(button);
      } else {
        const content = document.createElement("div");
        content.className = "data-table__header-static";
        appendContent(content, typeof sectionHeader === "function" ? sectionHeader() : sectionHeader);
        header.append(content);
      }
      root.append(header);
    }

    if (isCollapsed) return;

    const scroll = document.createElement("div");
    scroll.className = "data-table__scroll";
    const table = document.createElement("table");
    if (caption) {
      const captionElement = document.createElement("caption");
      captionElement.className = "sr-only";
      captionElement.textContent = caption;
      table.append(captionElement);
    }

    if (showColumnHeaders) {
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      columns.forEach((column) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.className = `data-table__cell--${column.align ?? "left"}`;
        if (column.width) th.style.width = column.width;
        const sortState = getSortState();
        const activeSort = sortState?.columnId === column.id ? sortState.direction : null;
        if (column.sortable) {
          th.setAttribute("aria-sort", activeSort === "asc" ? "ascending" : activeSort === "desc" ? "descending" : "none");
          const button = document.createElement("button");
          button.type = "button";
          button.className = "data-table__sort-button";
          const label = document.createElement("span");
          appendContent(label, column.label);
          const icon = document.createElement("span");
          icon.className = "data-table__sort-icon";
          icon.setAttribute("aria-hidden", "true");
          const arrows = activeSort === "asc" ? ["▲"] : activeSort === "desc" ? ["▼"] : ["▲", "▼"];
          arrows.forEach((arrow) => {
            const span = document.createElement("span");
            span.className = "data-table__sort-arrow";
            span.textContent = arrow;
            icon.append(span);
          });
          button.append(label, icon);
          button.addEventListener("click", () => toggleSort(column.id));
          th.append(button);
        } else {
          appendContent(th, column.label);
        }
        tr.append(th);
      });
      thead.append(tr);
      table.append(thead);
    }

    const tbody = document.createElement("tbody");
    if (rows.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.className = "data-table__empty";
      td.colSpan = totalColumns;
      appendContent(td, emptyMessage);
      tr.append(td);
      tbody.append(tr);
    } else {
      getDisplayRows().forEach((row) => {
        const rowId = getRowId(row);
        const isExpanded = expandedIds.has(rowId);
        const tr = document.createElement("tr");
        tr.className = `data-table__row ${isExpanded ? "data-table__row--expanded" : ""}`;
        columns.forEach((column, columnIndex) => {
          const td = document.createElement("td");
          td.className = `data-table__cell--${column.align ?? "left"}`;
          if (rowsExpandable && columnIndex === 0) {
            const wrapper = document.createElement("div");
            wrapper.className = "data-table__first-cell-with-expand";
            const button = document.createElement("button");
            button.type = "button";
            button.className = "data-table__expand-button";
            button.setAttribute("aria-expanded", String(isExpanded));
            button.setAttribute("aria-label", isExpanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`);
            button.innerHTML = `<span aria-hidden="true">${isExpanded ? collapseIcon : expandIcon}</span>`;
            button.addEventListener("click", (event) => { event.stopPropagation(); toggleRow(rowId); });
            const content = document.createElement("div");
            content.className = "data-table__first-cell-content";
            appendContent(content, column.render(row));
            wrapper.append(button, content);
            td.append(wrapper);
          } else {
            appendContent(td, column.render(row));
          }
          tr.append(td);
        });
        tbody.append(tr);
        if (rowsExpandable && isExpanded) {
          const expandedTr = document.createElement("tr");
          expandedTr.className = "data-table__expanded-row";
          const expandedTd = document.createElement("td");
          expandedTd.colSpan = totalColumns;
          const content = document.createElement("div");
          content.className = "data-table__expanded-content";
          appendContent(content, renderExpandedRow(row));
          expandedTd.append(content);
          expandedTr.append(expandedTd);
          tbody.append(expandedTr);
        }
      });
    }
    table.append(tbody);
    if (footer) {
      const tfoot = document.createElement("tfoot");
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.className = "data-table__footer";
      td.colSpan = totalColumns;
      appendContent(td, typeof footer === "function" ? footer() : footer);
      tr.append(td);
      tfoot.append(tr);
      table.append(tfoot);
    }
    scroll.append(table);
    root.append(scroll);

    const mobile = document.createElement("div");
    mobile.className = "data-table__mobile";
    mobile.setAttribute("role", "list");
    mobile.setAttribute("aria-label", caption || "Table rows");
    if (rows.length === 0) {
      const empty = document.createElement("div");
      empty.className = "data-table__mobile-empty";
      appendContent(empty, emptyMessage);
      mobile.append(empty);
    } else {
      getDisplayRows().forEach((row) => {
        const rowId = getRowId(row);
        const isExpanded = expandedIds.has(rowId);
        const card = document.createElement("article");
        card.className = "data-table__mobile-card";
        card.setAttribute("role", "listitem");
        columns.forEach((column) => {
          const field = document.createElement("div");
          field.className = "data-table__mobile-field";
          const label = document.createElement("span");
          label.className = "data-table__mobile-label";
          appendContent(label, column.label);
          const value = document.createElement("div");
          value.className = `data-table__mobile-value data-table__cell--${column.align ?? "left"}`;
          appendContent(value, column.render(row));
          field.append(label, value);
          card.append(field);
        });
        if (rowsExpandable) {
          const expand = document.createElement("div");
          expand.className = "data-table__mobile-expand";
          const button = document.createElement("button");
          button.type = "button";
          button.className = "data-table__expand-button";
          button.setAttribute("aria-expanded", String(isExpanded));
          button.innerHTML = `<span aria-hidden="true">${isExpanded ? collapseIcon : expandIcon}</span><span>${isExpanded ? "Hide details" : "Show details"}</span>`;
          button.addEventListener("click", (event) => { event.stopPropagation(); toggleRow(rowId); });
          expand.append(button);
          card.append(expand);
        }
        if (rowsExpandable && isExpanded) {
          const details = document.createElement("div");
          details.className = "data-table__mobile-expanded";
          appendContent(details, renderExpandedRow(row));
          card.append(details);
        }
        mobile.append(card);
      });
    }
    if (footer) {
      const mobileFooter = document.createElement("div");
      mobileFooter.className = "data-table__mobile-footer";
      appendContent(mobileFooter, typeof footer === "function" ? footer() : footer);
      mobile.append(mobileFooter);
    }
    root.append(mobile);
  };

  renderTable();
  return root;
}
