import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      // <nav className="navbar bg-light">
      //   <div className="container-fluid justify-content-space-around">
      //     <h3>Current Directory</h3>
      //     <form className="d-flex" role="search">
      //       <input
      //         className="form-control me-2"
      //         type="search"
      //         placeholder="Search"
      //         aria-label="Search"
      //       />
      //     </form>
      //     <img src="..." className="img-thumbnail" alt="..." />
      //   </div>
      // </nav>
      <header className="navbar navbar-light sticky-top flex-md-nowrap p-0 shadow">
        <div>
          <a
            className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-4 text-white"
            href="#"
          >
            Ithaka
          </a>
          <button
            className="navbar-toggler d-md-none ms-2 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">
              Sign out
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
