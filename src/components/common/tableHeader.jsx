import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="bi bi-caret-up-fill"></i>;
    return <i className="bi bi-caret-down-fill" />;
  };

  render() {
    return (
      <thead>
        <tr style={{ height: "40px" }}>
          {this.props.columns.map((column) => (
            <th
              scope="col"
              style={{ cursor: "pointer", userSelect: "none" }}
              className="clickable mb-5 align-top"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              <div style={{ whiteSpace: "nowrap" }}>
                {column.label}
                {this.renderSortIcon(column)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
