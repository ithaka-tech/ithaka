import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      // <div id="content">
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //     <div className="container-fluid">
      //       <button type="button" id="sidebarCollapse" className="btn btn-info">
      //         <i className="fa fa-align-left"></i>
      //         <span>Toggle Sidebar</span>
      //       </button>
      //     </div>
      //   </nav>
      // </div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
