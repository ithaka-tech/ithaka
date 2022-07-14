import React from "react";
import { Link, useParams } from "react-router-dom";

const SideBarItem = ({ items }) => {
  let param = useParams()["*"];
  return items.map((item) => (
    <li key={item.name}>
      <Link
        to={item.name.toLowerCase()}
        className={
          item.name.toLowerCase() === param
            ? "nav-link active m-1"
            : "nav-link text-white m-1"
        }
      >
        <div className="row align-items-start">
          <div className="col-2 ms-2">
            <i className={item.icon}></i>
          </div>
          <div className="col">{item.name}</div>
        </div>
      </Link>
    </li>
  ));
};

export default SideBarItem;
