import React from "react";
import { Link } from "react-router-dom";

const SideBarItem = ({ items, selectedItem, onItemSelect }) => {
  return items.map((item) => (
    <li key={item.name}>
      <Link
        onClick={() => onItemSelect(item.name)}
        to={item.name}
        className={
          item.name === selectedItem ? "nav-link active" : "nav-link text-white"
        }
      >
        <div className="row align-items-start">
          <div className="col-2">
            <i className={item.icon}></i>
          </div>
          <div className="col">{item.name}</div>
        </div>
      </Link>
    </li>
  ));
};

export default SideBarItem;
