const appendContent = (element, content) => {
  if (content === undefined || content === null) return;

  if (content instanceof Node) {
    element.append(content);
  } else {
    element.append(document.createTextNode(String(content)));
  }
};

export function createDataTable({
  columns,
  rows,
  getRowId,
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
}) {
  const root = document.createElement("div");
  const expandedIds = new Set(defaultExpandedIds);
  let isCollapsed = defaultCollapsed;

  const rowsExpandable = typeof renderExpandedRow === "function";
  const hasSectionHeader = sectionHeader !== undefined && sectionHeader !== null;
  const showColumnHeaders = headerMode === "columns";
  const totalColumns = columns.length + (rowsExpandable ? 1 : 0);

  const setRootClassName = () => {
    root.className = [
      "data-table",
      footer ? "data-table--with-footer" : "data-table--without-footer",
      isCollapsed ? "data-table--collapsed" : "",
      hasSectionHeader
        ? "data-table--with-section-header"
        : "data-table--no-section-header",
      showColumnHeaders && !hasSectionHeader
        ? "data-table--standalone-columns"
        : "",
      cellDividers === "rows"
        ? "data-table--row-dividers"
        : "data-table--cell-dividers",
    ]
      .filter(Boolean)
      .join(" ");
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
        button.addEventListener("click", () => {
          isCollapsed = !isCollapsed;
          renderTable();
        });
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

      if (rowsExpandable) {
        const th = document.createElement("th");
        th.className = "data-table__expand-heading";
        th.setAttribute("aria-label", "Expand row");
        tr.append(th);
      }

      columns.forEach((column) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.className = `data-table__cell--${column.align ?? "left"}`;
        if (column.width) th.style.width = column.width;
        appendContent(th, column.label);
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
      rows.forEach((row) => {
        const rowId = getRowId(row);
        const isExpanded = expandedIds.has(rowId);
        const tr = document.createElement("tr");
        tr.className = `data-table__row ${isExpanded ? "data-table__row--expanded" : ""}`;

        if (rowsExpandable) {
          const td = document.createElement("td");
          td.className = "data-table__expand-cell";
          const button = document.createElement("button");
          button.type = "button";
          button.className = "data-table__expand-button";
          button.setAttribute("aria-expanded", String(isExpanded));
          button.setAttribute(
            "aria-label",
            isExpanded ? `Collapse row ${rowId}` : `Expand row ${rowId}`,
          );
          button.innerHTML = `<span aria-hidden="true">${isExpanded ? collapseIcon : expandIcon}</span>`;
          button.addEventListener("click", () => {
            if (expandedIds.has(rowId)) expandedIds.delete(rowId);
            else expandedIds.add(rowId);
            renderTable();
          });
          td.append(button);
          tr.append(td);
        }

        columns.forEach((column) => {
          const td = document.createElement("td");
          td.className = `data-table__cell--${column.align ?? "left"}`;
          appendContent(td, column.render(row));
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
  };

  renderTable();
  return root;
}
