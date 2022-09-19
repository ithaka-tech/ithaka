import React, { Component } from "react";

class FilterItemList extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex gap-5 justify-content-center">
        <div className="dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px">
          <form className="p-2 mb-2 bg-light border-bottom">
            <input
              type="search"
              className="form-control"
              autoComplete="false"
              placeholder="Type to filter..."
            />
          </form>
          <ul className="list-unstyled mb-0">
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span className="d-inline-block bg-success rounded-circle p-1"></span>
                Action
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span className="d-inline-block bg-primary rounded-circle p-1"></span>
                Another action
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span className="d-inline-block bg-danger rounded-circle p-1"></span>
                Something else here
              </a>
            </li>
            <li>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span className="d-inline-block bg-info rounded-circle p-1"></span>
                Separated link
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterItemList;
