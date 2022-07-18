import React, { Component } from "react";
import logo from "../assets/ithaka-white-tight-logo.png";

class NavBar extends Component {
  render() {
    return (
      <header className="navbar navbar-light sticky-top flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-4" href="/">
          <img src={logo} alt="logo" />
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
        <div className="flex-fill"></div>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="/signout">
              Sign out
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
