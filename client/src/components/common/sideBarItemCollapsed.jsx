import React from "react";
import { Link } from "react-router-dom";

const SideBarItemCollapsed = ({ items, selectedItem, onItemSelect }) => {
  return items.map((item) => (
    <li key={item.name} className="nav-item">
      <Link
        onClick={() => onItemSelect(item.name)}
        to={item.name.toLowerCase()}
        className={
          item.name === selectedItem
            ? "nav-link active py-3 border-bottom rounded-0"
            : "nav-link py-3 border-bottom rounded-0"
        }
        title={item.name}
        data-bs-toggle="tooltip"
        data-bs-placement="right"
      >
        <i className={item.icon}></i>
      </Link>
    </li>
  ));
};

export default SideBarItemCollapsed;
